import chai from 'chai';
import { arbeidssituasjoner, feilaktigeOpplysninger } from '@navikt/digisyfo-npm';
import validerSykmeldingskjema from './validerSykmeldingskjema';

const { expect } = chai;

describe('validerSykmeldingskjema', () => {
    const { ARBEIDSTAKER, FRILANSER } = arbeidssituasjoner;

    let fields = {};
    let props;

    beforeEach(() => {
        fields = {
            feilaktigeOpplysninger: [...feilaktigeOpplysninger],
            opplysningeneErRiktige: undefined,
            valgtArbeidssituasjon: undefined,
            valgtArbeidsgiver: undefined,
        };

        props = {
            arbeidsgivere: [],
            sykmelding: {},
            harStrengtFortroligAdresse: false,
        };
    });

    it('Skal returnere opplysningeneErRiktige og arbeidssituasjon dersom opplysningeneErRiktige === undefined og valgtArbeidssituasjon === undefined', () => {
        const res = validerSykmeldingskjema(fields, props);
        expect(Object.keys(res)).to.deep.equal(['opplysningeneErRiktige', 'valgtArbeidssituasjonShadow']);
    });

    it('Skal returnere valgtArbeidssituasjon hvis valgtArbeidssituasjon ikke er satt', () => {
        fields.valgtArbeidssituasjon = null;
        fields.valgtArbeidssituasjonShadow = null;
        const res = validerSykmeldingskjema(fields, props);
        expect(Object.keys(res)).to.deep.equal(['opplysningeneErRiktige', 'valgtArbeidssituasjonShadow']);
    });

    it('Skal returnere opplysningeneErRiktige dersom opplysningeneErRiktige === undefined', () => {
        const res = validerSykmeldingskjema(fields, props);
        expect(typeof res.opplysningeneErRiktige).to.equal('string');
    });

    it('Skal ikke returnere opplysningeneErRiktige dersom opplysningeneErRiktige === true', () => {
        fields.opplysningeneErRiktige = true;
        const res = validerSykmeldingskjema(fields, props);
        expect(res.opplysningeneErRiktige).to.equal(undefined);
    });

    it('Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === default', () => {
        fields.opplysningeneErRiktige = false;
        const res = validerSykmeldingskjema(fields, props);
        expect(res.feilaktigeOpplysninger._error).to.equal('Du må oppgi hvilke opplysninger som ikke er riktige');
    });

    it('Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger har en uavkrysset opplysning', () => {
        fields.opplysningeneErRiktige = false;
        fields.feilaktigeOpplysninger[0] = Object.assign({}, feilaktigeOpplysninger[0], {
            avkrysset: false,
        });
        const res = validerSykmeldingskjema(fields, props);
        expect(res.feilaktigeOpplysninger._error).to.equal('Du må oppgi hvilke opplysninger som ikke er riktige');
    });

    it('Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger har en avkrysset opplysning', () => {
        fields.opplysningeneErRiktige = false;
        fields.feilaktigeOpplysninger[0] = Object.assign({}, feilaktigeOpplysninger[0], {
            avkrysset: true,
        });
        const res = validerSykmeldingskjema(fields, props);
        expect(res.feilaktigeOpplysninger).to.equal(undefined);
    });

    it('Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger har en avkrysset og en uavkrysset opplysning', () => {
        fields.opplysningeneErRiktige = false;
        fields.feilaktigeOpplysninger[0] = Object.assign({}, feilaktigeOpplysninger[0], {
            avkrysset: false,
        });
        fields.feilaktigeOpplysninger[1] = Object.assign({}, feilaktigeOpplysninger[1], {
            avkrysset: true,
        });
        const res = validerSykmeldingskjema(fields, props);
        expect(res.feilaktigeOpplysninger).to.equal(undefined);
    });

    it("Skal ikke returnere valgtArbeidssituasjon dersom valgtArbeidssituasjon === 'ARBEIDSTAKER'", () => {
        fields.valgtArbeidssituasjon = ARBEIDSTAKER;
        const res = validerSykmeldingskjema(fields, props);
        expect(res.valgtArbeidssituasjon).to.equal(undefined);
    });

    it('Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og periode er feilaktig', () => {
        fields = {
            opplysningeneErRiktige: false,
            feilaktigeOpplysninger: [{
                opplysning: 'periode',
                avkrysset: true,
            }],
        };
        const res = validerSykmeldingskjema(fields, props);
        expect(res).to.deep.equal({});
    });

    it('Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og sykmeldingsgrad er feilaktig', () => {
        fields = {
            opplysningeneErRiktige: false,
            feilaktigeOpplysninger: [{
                opplysning: 'sykmeldingsgrad',
                avkrysset: true,
            }],
        };
        const res = validerSykmeldingskjema(fields, props);
        expect(res).to.deep.equal({});
    });

    it('Skal returnere valgtArbeidssituasjon dersom opplysningeneErRiktige === false og alt annet er undefined', () => {
        fields.opplysningeneErRiktige = false;
        fields.beOmNyNaermesteLeder = true;
        const res = validerSykmeldingskjema(fields, props);
        expect(res).to.deep.equal({
            valgtArbeidssituasjonShadow: 'Du må må svare på hva du er sykmeldt fra',
            feilaktigeOpplysninger: { _error: 'Du må oppgi hvilke opplysninger som ikke er riktige' },
        });
    });

    it("Skal returnere {} dersom  opplysningeneErRiktige === true og valgtArbeidssituasjonShadow === 'ARBEIDSTAKER' og man har strengt fortrolig adresse", () => {
        fields.opplysningeneErRiktige = true;
        fields.beOmNyNaermesteLeder = true;
        fields.valgtArbeidssituasjonShadow = ARBEIDSTAKER;
        const res = validerSykmeldingskjema(fields, {
            ...props,
            harStrengtFortroligAdresse: true,
        });
        expect(res).to.deep.equal({});
    });

    describe('beOmNyNaermesteLeder', () => {
        it('Skal ikke returnere beOmNyNaermesteLeder dersom det ikke er valgt arbeidsgiver', () => {
            const res = validerSykmeldingskjema(fields, props);
            expect(res.beOmNyNaermesteLeder).to.equal(undefined);
        });

        it('Skal ikke returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver, men ikke arbeidssituasjon', () => {
            fields.valgtArbeidsgiver = {
                orgnummer: '123',
                navn: 'Alna',
                naermesteLeder: {},
            };
            fields.valgtArbeidsgiverShasow = '123';
            const res = validerSykmeldingskjema(fields, props);
            expect(res.beOmNyNaermesteLeder).to.equal(undefined);
        });

        it('Skal ikke returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver og arbeidssituasjon, men arbeidssituasjon er FRILANSER', () => {
            fields.valgtArbeidsgiver = {
                orgnummer: '123',
                navn: 'Alna',
                naermesteLeder: {},
            };
            fields.valgtArbeidssituasjon = FRILANSER;
            const res = validerSykmeldingskjema(fields, props);
            expect(res.beOmNyNaermesteLeder).to.equal(undefined);
        });

        it('Skal ikke returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver og arbeidssituasjon, men arbeidsgiver er uten nærmeste leder', () => {
            fields.valgtArbeidsgiver = {
                orgnummer: '123',
                navn: 'Alna',
            };
            fields.valgtArbeidssituasjon = ARBEIDSTAKER;
            const res = validerSykmeldingskjema(fields, props);
            expect(res.beOmNyNaermesteLeder).to.equal(undefined);
        });

        it('Skal returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver og arbeidssituasjon, og arbeidsgiver har nærmeste leder', () => {
            const arbeidsgiverMedNaermesteLeder = {
                orgnummer: '123',
                navn: 'Alna',
                naermesteLeder: {
                    navn: 'Ole',
                },
            };
            fields.valgtArbeidsgiver = arbeidsgiverMedNaermesteLeder;
            props.arbeidsgivere = [arbeidsgiverMedNaermesteLeder];
            fields.valgtArbeidssituasjonShadow = '123';
            const res = validerSykmeldingskjema(fields, props);
            expect(typeof res.beOmNyNaermesteLeder).to.equal('string');
        });
    });

    describe('Spørsmål for frilansere', () => {
        let values;

        beforeEach(() => {
            values = {
                valgtArbeidssituasjonShadow: '123',
                opplysningeneErRiktige: true,
                valgtArbeidsgiver: {
                    orgnummer: '123',
                    navn: 'Alna',
                },
            };
        });

        it('Skal ikke returnere noe relatert til disse spørsmålene hvis frilanser-spørsmålene ikke vises', () => {
            props.visFrilansersporsmal = false;
            const res = validerSykmeldingskjema(values, props);
            expect(res).to.deep.equal({});
        });

        describe('Hvis frilanser-spørsmålene vises', () => {
            beforeEach(() => {
                props.visFrilansersporsmal = true;
            });

            describe('harAnnetFravaer', () => {
                it('Skal klage hvis feltet ikke er fylt ut', () => {
                    const res = validerSykmeldingskjema(values, props);
                    expect(res.harAnnetFravaer).to.equal('Du må svare på om du brukte egenmelding eller noen annen sykmelding før denne datoen');
                    expect(res.fravaersperioder).to.equal(undefined);
                });

                it('Skal ikke klage hvis harAnnetFravaer er fylt ut', () => {
                    values.harAnnetFravaer = true;
                    const res = validerSykmeldingskjema(values, props);
                    expect(res.harAnnetFravaer).to.equal(undefined);
                });

                it('Skal ikke klage hvis harAnnetFravaer er fylt ut med NEI', () => {
                    values.harAnnetFravaer = false;
                    const res = validerSykmeldingskjema(values, props);
                    expect(res.harAnnetFravaer).to.equal(undefined);
                    expect(res.fravaersperioder).to.equal(undefined);
                });
            });

            describe('Egenmeldingsperioder', () => {
                beforeEach(() => {
                    values.harAnnetFravaer = true;
                    values.fravaersperioder = [];
                });

                it('Skal ikke klage hvis fravaersperioder er fylt ut', () => {
                    values.fravaersperioder = [{
                        fom: '12.01.2018',
                        tom: '14.01.2018',
                    }];
                    const res = validerSykmeldingskjema(values, props);
                    expect(res.fravaersperioder).to.equal(undefined);
                });

                it('Skal klage hvis fravaersperioder er fylt ut med sluttdato før startdato', () => {
                    values.fravaersperioder = [{
                        fom: '14.01.2018',
                        tom: '12.01.2018',
                    }];
                    const res = validerSykmeldingskjema(values, props);
                    expect(res.fravaersperioder).to.have.length(1);
                });
            });

            describe('harForsikring', () => {
                it('Skal klage hvis harForsikring ikke er fylt ut', () => {
                    const res = validerSykmeldingskjema(values, props);
                    expect(res.harForsikring).to.equal('Du må svare på om du har forsikring som gjelder de første 16 dagene av sykefraværet');
                });

                it('Skal ikke klage hvis harForsikring er fylt ut med NEI', () => {
                    values.harForsikring = false;
                    const res = validerSykmeldingskjema(values, props);
                    expect(res.harForsikring).to.equal(undefined);
                });
            });
        });
    });
});
