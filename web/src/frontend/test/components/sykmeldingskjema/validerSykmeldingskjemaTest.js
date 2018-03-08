import chai from 'chai';
import sinon from 'sinon';
import validerSykmeldingskjema from "../../../js/components/sykmeldingskjema/validerSykmeldingskjema";
import { feilaktigeOpplysninger } from 'digisyfo-npm';

const expect = chai.expect;

    describe("validerSykmeldingskjema", () => {

        let fields = {};

        beforeEach(() => {
            fields = {
                feilaktigeOpplysninger: [...feilaktigeOpplysninger],
                opplysningeneErRiktige: undefined,
                valgtArbeidssituasjon: undefined,
                valgtArbeidsgiver: undefined
            };
        });

        it("Skal returnere opplysningeneErRiktige og arbeidssituasjon dersom opplysningeneErRiktige === undefined og valgtArbeidssituasjon === undefined", () => {
            const res = validerSykmeldingskjema(fields);
            expect(Object.keys(res)).to.deep.equal(["opplysningeneErRiktige", "valgtArbeidssituasjon"]);
        });

        it("Skal returnere valgtArbeidssituasjon hvis valgtArbeidssituasjon === DEFAULT", () => {
            fields.valgtArbeidssituasjon = 'DEFAULT';
            const res = validerSykmeldingskjema(fields);
            expect(Object.keys(res)).to.deep.equal(["opplysningeneErRiktige", "valgtArbeidssituasjon"]);
        });

        it("Skal returnere opplysningeneErRiktige dersom opplysningeneErRiktige === undefined", () => {
            const res = validerSykmeldingskjema(fields);
            expect(typeof res.opplysningeneErRiktige).to.equal("string");
        });

        it("Skal ikke returnere opplysningeneErRiktige dersom opplysningeneErRiktige === true", () => {
            fields.opplysningeneErRiktige = true;
            const res = validerSykmeldingskjema(fields);
            expect(res.opplysningeneErRiktige).to.be.undefined;
        });

        it("Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === default", () => {
            fields.opplysningeneErRiktige = false;
            const res = validerSykmeldingskjema(fields);
            expect(res.feilaktigeOpplysninger._error).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige")
        });

        it("Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger har en uavkrysset opplysning", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger[0] = Object.assign({}, feilaktigeOpplysninger[0], {
                avkrysset: false,
            });
            const res = validerSykmeldingskjema(fields);
            expect(res.feilaktigeOpplysninger._error).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige");
        });

        it("Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger har en avkrysset opplysning", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger[0] = Object.assign({}, feilaktigeOpplysninger[0], {
                avkrysset: true,
            });
            const res = validerSykmeldingskjema(fields);
            expect(res.feilaktigeOpplysninger).to.be.undefined;
        });

        it("Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger har en avkrysset og en uavkrysset opplysning", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger[0] = Object.assign({}, feilaktigeOpplysninger[0], {
                avkrysset: false,
            });
            fields.feilaktigeOpplysninger[1] = Object.assign({}, feilaktigeOpplysninger[1], {
                avkrysset: true,
            });
            const res = validerSykmeldingskjema(fields);
            expect(res.feilaktigeOpplysninger).to.be.undefined;
        });


        it("Skal returnere valgtArbeidssituasjon dersom valgtArbeidssituasjon = 'ARBEIDSTAKER'", () => {
            fields.valgtArbeidssituasjon = undefined;
            const res = validerSykmeldingskjema(fields);
            expect(res.valgtArbeidssituasjon).not.to.be.undefined;
        });

        it("Skal ikke returnere valgtArbeidssituasjon dersom valgtArbeidssituasjon === 'ARBEIDSTAKER'", () => {
            fields.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            const res = validerSykmeldingskjema(fields);
            expect(res.valgtArbeidssituasjon).to.be.undefined;
        });

        it("Skal returnere valgtArbeidsgiver dersom valgtArbeidssituasjon === 'ARBEIDSTAKER' og valgtArbeidsgiver === undefined", () => {
            fields.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            const res = validerSykmeldingskjema(fields);
            expect(res.valgtArbeidsgiver).not.to.be.undefined;
        });

        it("Skal ikke returnere valgtArbeidsgiver dersom valgtArbeidssituasjon === 'ARBEIDSTAKER' og valgtArbeidsgiver === {}", () => {
            fields.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            fields.valgtArbeidsgiver = {
                orgnummer: "***REMOVED***",
                navn: "Alna Frisør"
            }
            const res = validerSykmeldingskjema(fields);
            expect(res.valgtArbeidsgiver).to.be.undefined;
        });

        it("Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og periode er feilaktig", () => {
            fields = {
                "opplysningeneErRiktige":false,
                "feilaktigeOpplysninger": [{
                    opplysning: "periode",
                    avkrysset: true
                }]};
            const res = validerSykmeldingskjema(fields);
            expect(res).to.deep.equal({});
        });

        it("Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og sykmeldingsgrad er feilaktig", () => {
            fields = {
                "opplysningeneErRiktige": false,
                "feilaktigeOpplysninger": [{
                    opplysning: "sykmeldingsgrad",
                    avkrysset: true,
                }]};
            const res = validerSykmeldingskjema(fields);
            expect(res).to.deep.equal({});
        });

        it("Skal returnere valgtArbeidssituasjon dersom opplysningeneErRiktige === false og alt annet er undefined", () => {
            fields.opplysningeneErRiktige = false;
            fields.beOmNyNaermesteLeder = true;
            const res = validerSykmeldingskjema(fields);
            expect(res).to.deep.equal({
                valgtArbeidssituasjon: "Vennligst oppgi din arbeidssituasjon for denne sykmeldingen",
                feilaktigeOpplysninger: { _error: "Vennligst oppgi hvilke opplysninger som ikke er riktige" }
            })
        });

        it("Skal returnere {} dersom  opplysningeneErRiktige === true og valgtArbeidssituasjon === 'ARBEIDSTAKER' og man har strengt fortrolig adresse", () => {
            fields.opplysningeneErRiktige = true;
            fields.beOmNyNaermesteLeder = true;
            fields.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            const props = {
                harStrengtFortroligAdresse: true,
            }
            const res = validerSykmeldingskjema(fields, props);
            expect(res).to.deep.equal({})
        });

        describe("beOmNyNaermesteLeder", () => {

            it("Skal ikke returnere beOmNyNaermesteLeder dersom det ikke er valgt arbeidsgiver", () => {
                const res = validerSykmeldingskjema(fields);
                expect(res.beOmNyNaermesteLeder).to.be.undefined;
            });

            it("Skal ikke returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver, men ikke arbeidssituasjon", () => {
                fields.valgtArbeidsgiver = {
                    orgnummer: "123",
                    navn: "Alna",
                    naermesteLeder: {}
                }
                const res = validerSykmeldingskjema(fields);
                expect(res.beOmNyNaermesteLeder).to.be.undefined;
            });

            it("Skal ikke returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver og arbeidssituasjon, men arbeidssituasjon er FRILANSER", () => {
                fields.valgtArbeidsgiver = {
                    orgnummer: "123",
                    navn: "Alna",
                    naermesteLeder: {}
                }
                fields.valgtArbeidssituasjon = "FRILANSER";
                const res = validerSykmeldingskjema(fields);
                expect(res.beOmNyNaermesteLeder).to.be.undefined;
            });

            it("Skal ikke returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver og arbeidssituasjon, men arbeidsgiver er uten nærmeste leder", () => {
                fields.valgtArbeidsgiver = {
                    orgnummer: "123",
                    navn: "Alna",
                }
                fields.valgtArbeidssituasjon = "ARBEIDSTAKER";
                const res = validerSykmeldingskjema(fields);
                expect(res.beOmNyNaermesteLeder).to.be.undefined;
            });

            it("Skal returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver og arbeidssituasjon, og arbeidsgiver har nærmeste leder", () => {
                fields.valgtArbeidsgiver = {
                    orgnummer: "123",
                    navn: "Alna",
                    naermesteLeder: {
                        navn: "Ole"
                    }
                }
                fields.valgtArbeidssituasjon = "ARBEIDSTAKER";
                const res = validerSykmeldingskjema(fields);
                expect(typeof res.beOmNyNaermesteLeder).to.equal("string")
            });
        })

    });