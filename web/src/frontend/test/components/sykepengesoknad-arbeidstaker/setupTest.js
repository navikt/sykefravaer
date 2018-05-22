import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import deepFreeze from 'deep-freeze';
import { mapAktiviteter } from '../../../js/utils/sykepengesoknadUtils';

import { mapStateToPropsMedInitialValues, mapStateToProps, mapToInitialValues, andreInntektskilder } from '../../../js/components/sykepengesoknad-arbeidstaker/setup';
import { getSoknad } from '../../mockSykepengesoknader';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('setup', () => {
    let state;
    let ownProps;

    beforeEach(() => {
        state = {
            sykepengesoknader: {
                data: [],
            },
        };
        ownProps = {};
    });

    describe('mapStateToPropsMedInitialValues', () => {
        it('Skal mappe til initielle verdier hvis det er en NY søknad', () => {
            ownProps.sykepengesoknad = getSoknad({
                status: 'NY',
            });
            const props = mapStateToPropsMedInitialValues(state, ownProps);
            expect(props.initialValues.harHattFerie).to.equal(undefined);
        });

        it("Skal mappe til skjemasøknad hvis søknaden har status === 'UTKAST_TIL_KORRIGERING'", () => {
            ownProps.sykepengesoknad = getSoknad({
                status: 'UTKAST_TIL_KORRIGERING',
            });
            const props = mapStateToPropsMedInitialValues(state, ownProps);
            expect(props.initialValues.harHattFerie).to.equal(false);
        });

        it('Skal mappe aktiviteter', () => {
            ownProps.sykepengesoknad = deepFreeze(getSoknad({
                fom: new Date('2016-07-18'),
                tom: new Date('2016-07-24'),
                aktiviteter: [
                    {
                        periode: {
                            fom: new Date('2016-07-15'),
                            tom: new Date('2016-07-20'),
                        },
                        grad: 100,
                        avvik: null,
                    },
                    {
                        periode: {
                            fom: new Date('2016-07-21'),
                            tom: new Date('2016-07-25'),
                        },
                        grad: 60,
                        avvik: null,
                    },
                    {
                        periode: {
                            fom: new Date('2016-07-26'),
                            tom: new Date('2016-07-30'),
                        },
                        grad: 60,
                        avvik: null,
                    },
                ],
            }));
            const props = mapStateToPropsMedInitialValues(state, ownProps);
            const mappetSoknad = mapAktiviteter(ownProps.sykepengesoknad);
            expect(props.sykepengesoknad).to.deep.equal(mappetSoknad);
        });
    });

    describe('mapStateToProps', () => {
        it('Skal mappe aktiviteter', () => {
            ownProps.sykepengesoknad = deepFreeze(getSoknad({
                fom: new Date('2016-07-18'),
                tom: new Date('2016-07-24'),
                aktiviteter: [
                    {
                        periode: {
                            fom: new Date('2016-07-15'),
                            tom: new Date('2016-07-20'),
                        },
                        grad: 100,
                        avvik: null,
                    },
                    {
                        periode: {
                            fom: new Date('2016-07-21'),
                            tom: new Date('2016-07-25'),
                        },
                        grad: 60,
                        avvik: null,
                    },
                    {
                        periode: {
                            fom: new Date('2016-07-26'),
                            tom: new Date('2016-07-30'),
                        },
                        grad: 60,
                        avvik: null,
                    },
                ],
            }));
            const props = mapStateToProps(state, ownProps);
            const mappetSoknad = mapAktiviteter(ownProps.sykepengesoknad);
            expect(props.sykepengesoknad).to.deep.equal(mappetSoknad);
        });
    });

    describe('mapToInitialValues', () => {
        let values;
        let arbeidsgiver;

        beforeEach(() => {
            arbeidsgiver = {
                navn: 'Odda Camping',
                orgnummer: '876',
            };
            values = {
                arbeidsgiver,
                andreInntektskilder: [],
                fom: new Date('2016-07-18'),
                tom: new Date('2016-07-24'),
                aktiviteter: [
                    {
                        periode: {
                            fom: new Date('2016-07-15'),
                            tom: new Date('2016-07-20'),
                        },
                        grad: 100,
                        avvik: null,
                    },
                    {
                        periode: {
                            fom: new Date('2016-07-21'),
                            tom: new Date('2016-07-25'),
                        },
                        grad: 60,
                        avvik: null,
                    },
                    {
                        periode: {
                            fom: new Date('2016-07-26'),
                            tom: new Date('2016-07-30'),
                        },
                        grad: 60,
                        avvik: null,
                    },
                ],
            };
        });

        it('Skal sette avvik på aktiviteter', () => {
            const res = mapToInitialValues(deepFreeze(values));
            expect(res.aktiviteter[0].avvik).to.deep.equal({});
            expect(res.aktiviteter[1].avvik).to.deep.equal({});
        });

        it('Skal sette utdanning til tomt objekt', () => {
            const res = mapToInitialValues(deepFreeze(values));
            expect(res.utdanning).to.deep.equal({});
        });

        it('Skal sette andreInntektskilder til defaultverdier', () => {
            const res = mapToInitialValues(deepFreeze(values));
            expect(res.andreInntektskilder).to.deep.equal(andreInntektskilder);
        });

        it('Skal sette utenlandsopphold til objekt med perioder', () => {
            const res = mapToInitialValues(deepFreeze(values));
            expect(res.utenlandsopphold).to.deep.equal({
                perioder: [],
            });
        });

        it('Skal hente ut aktiviteter basert på fom/tom', () => {
            const res = mapToInitialValues(deepFreeze(values));
            expect(res.aktiviteter.length).to.equal(2);
            expect(res.aktiviteter).to.deep.equal([
                {
                    periode: {
                        fom: new Date('2016-07-18'),
                        tom: new Date('2016-07-20'),
                    },
                    grad: 100,
                    avvik: {},
                },
                {
                    periode: {
                        fom: new Date('2016-07-21'),
                        tom: new Date('2016-07-24'),
                    },
                    grad: 60,
                    avvik: {},
                },
            ]);
        });

        describe('Forhåndsutfylling av egenmeldingsperioder', () => {
            const identdato1 = new Date('1984-08-02');
            const identdato3 = new Date('1985-01-01');
            let sykepengesoknader;
            let korrigerendeSoknad = {
                id: 'soknad-id-korrigerer',
                sykmeldingId: 'lang-sykmelding-id',
                identdato: identdato1,
                korrigerer: 'soknad-id-2',
                status: 'UTKAST_TIL_KORRIGERING',
                sendtTilArbeidsgiverDato: new Date('2018-01-15'),
                egenmeldingsperioder: [],
                arbeidsgiver,
            };

            beforeEach(() => {
                korrigerendeSoknad = {
                    id: 'soknad-id-korrigerer',
                    sykmeldingId: 'lang-sykmelding-id',
                    identdato: identdato1,
                    korrigerer: 'soknad-id-2',
                    status: 'UTKAST_TIL_KORRIGERING',
                    sendtTilArbeidsgiverDato: new Date('2018-01-15'),
                    egenmeldingsperioder: [],
                    arbeidsgiver,
                };

                sykepengesoknader = [{
                    id: 'soknad-id',
                    sykmeldingId: 'sykmelding-id-0',
                    identdato: identdato3,
                    egenmeldingsperioder: [],
                    status: 'NY',
                    arbeidsgiver,
                }, {
                    id: 'soknad-id-3',
                    sykmeldingId: 'lang-sykmelding-id',
                    identdato: identdato1,
                    egenmeldingsperioder: [],
                    status: 'NY',
                    arbeidsgiver,
                }, {
                    id: 'soknad-id-2',
                    sykmeldingId: 'lang-sykmelding-id',
                    identdato: identdato1,
                    sendtTilArbeidsgiverDato: new Date('2018-01-12'),
                    egenmeldingsperioder: [],
                    status: 'SENDT',
                    arbeidsgiver,
                }, korrigerendeSoknad];
            });

            it('Skal ikke forhåndsutfylle dersom det ikke finnes samme søknader med samme identdato', () => {
                values.identdato = new Date('2018-01-13');
                const res = mapToInitialValues(deepFreeze(values), deepFreeze(sykepengesoknader));
                expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.equal(undefined);
                expect(res._erEgenmeldingsdagerPreutfylt).not.to.equal(true);
            });

            describe('Dersom det finnes andre søknader som er SENDT og har samme identdato', () => {
                it('Skal forhåndsutfylle når det ikke er oppgitt egenmeldingsperioder i forrige sendte søknad', () => {
                    values.id = 'soknad-id-3';
                    values.identdato = identdato1;
                    const res = mapToInitialValues(deepFreeze(values), deepFreeze(sykepengesoknader));
                    expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.equal(false);
                    expect(res._erEgenmeldingsdagerPreutfylt).to.equal(true);
                });

                describe('Dersom det finnes en tidligere sendt søknad', () => {
                    beforeEach(() => {
                        sykepengesoknader.push({
                            id: 'soknad-id-1',
                            sykmeldingId: 'lang-sykmelding-id',
                            identdato: identdato1,
                            status: 'SENDT',
                            arbeidsgiver,
                            sendtTilArbeidsgiverDato: new Date('2018-01-10'),
                            egenmeldingsperioder: [{
                                fom: new Date('2018-01-21'),
                                tom: new Date('2018-01-24'),
                            }, {
                                fom: new Date('2018-01-12'),
                                tom: new Date('2018-01-15'),
                            }],
                        });
                    });

                    it('Skal ikke endre forhåndsutfylling dersom søknaden korrigerer en annen søknad', () => {
                        values = {
                            ...values,
                            ...korrigerendeSoknad,
                        };

                        const res = mapToInitialValues(deepFreeze(values), deepFreeze(sykepengesoknader));
                        expect(res.egenmeldingsperioder).to.deep.equal([]);
                        expect(res._erEgenmeldingsdagerPreutfylt).not.to.equal(true);
                    });

                    it('Skal forhåndsutfylle bruktEgenmeldingsdagerFoerLegemeldtFravaer når det er oppgitt egenmeldingsperioder i forrige søknad', () => {
                        values.id = 'soknad-id-3';
                        values.identdato = identdato1;
                        const res = mapToInitialValues(deepFreeze(values), deepFreeze(sykepengesoknader));
                        expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.equal(true);
                        expect(res.egenmeldingsperioder).to.deep.equal([{
                            fom: '12.01.2018',
                            tom: '15.01.2018',
                        }, {
                            fom: '21.01.2018',
                            tom: '24.01.2018',
                        }]);
                        expect(res._erEgenmeldingsdagerPreutfylt).to.equal(true);
                    });

                    it('Skal forhåndsutfylle bruktEgenmeldingsdagerFoerLegemeldtFravaer med info fra forrige søknad for denne arbeidsgiveren', () => {
                        const soknad = sykepengesoknader.pop();
                        sykepengesoknader.push({
                            id: 'soknad-id-annen-arbeidsgiver',
                            sykmeldingId: 'lang-sykmelding-id',
                            identdato: identdato1,
                            arbeidsgiver: {
                                navn: 'Oslo Bad og Rør',
                                orgnummer: '12345678',
                            },
                            status: 'SENDT',
                            sendtTilArbeidsgiverDato: new Date('2018-01-10'),
                            egenmeldingsperioder: [{
                                fom: new Date('2018-01-22'),
                                tom: new Date('2018-01-24'),
                            }, {
                                fom: new Date('2018-01-12'),
                                tom: new Date('2018-01-14'),
                            }],
                        });
                        sykepengesoknader.push(soknad);
                        values.id = 'soknad-id-3';
                        values.identdato = identdato1;
                        const res = mapToInitialValues(deepFreeze(values), deepFreeze(sykepengesoknader));
                        expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.equal(true);
                        expect(res.egenmeldingsperioder).to.deep.equal([{
                            fom: '12.01.2018',
                            tom: '15.01.2018',
                        }, {
                            fom: '21.01.2018',
                            tom: '24.01.2018',
                        }]);
                        expect(res._erEgenmeldingsdagerPreutfylt).to.equal(true);
                    });
                });
            });
        });
    });
});
