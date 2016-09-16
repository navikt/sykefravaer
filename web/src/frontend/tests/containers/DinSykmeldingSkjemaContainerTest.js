import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

import { DinSykmldSkjema, mapStateToProps, validate } from "../../js/containers/DinSykmeldingSkjemaContainer";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("DinSykmeldingSkjemaContainer", () => {

    const getState = (state = {}) => {
        const defaultState = {
            arbeidsgiversSykmeldinger: {
                data: [{
                    id: 123,
                    navn: "Olsen"
                }, {
                    id: 1234,
                    navn: "Hansen"
                }],
                sender: true,
            },
            arbeidsgivere: {
                data: [{
                    navn: "Oles pizza",
                    orgnummer: "123456789"
                }, {
                    navn: "Doles pizza",
                    orgnummer: "***REMOVED***"
                }]
            },
            dineSykmeldinger: {

            },
            ledetekster: {
                data: ledetekster
            },
            brukerinfo: {
                bruker: {
                    data: {
                        strengtFortroligAdresse: true
                    }
                }
            }
        };
        return Object.assign({}, defaultState, state);
    }

    describe("validate", () => {

        let fields = {}

        beforeEach(() => {
            fields = {
                feilaktigeOpplysninger: undefined,
                opplysningeneErRiktige: undefined,
                arbeidssituasjon: undefined,
                valgtArbeidsgiver: undefined
            };
        });

        it("Skal returnere opplysningeneErRiktige og arbeidssituasjon dersom opplysningeneErRiktige === undefined og arbeidssituasjon === undefined", () => {
            const res = validate(fields);
            expect(typeof res.opplysningeneErRiktige).to.equal("string");
            expect(typeof res.arbeidssituasjon).to.equal("string");
        });

        it("Skal returnere opplysningeneErRiktige dersom opplysningeneErRiktige === undefined", () => {
            const res = validate(fields);
            expect(typeof res.opplysningeneErRiktige).to.equal("string");
        });

        it("Skal ikke returnere opplysningeneErRiktige dersom opplysningeneErRiktige === true", () => {
            fields.opplysningeneErRiktige = true;
            const res = validate(fields);
            expect(res.opplysningeneErRiktige).to.be.undefined;
        });

        it("Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === {}", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger = {};
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige")
        });

        it("Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === { periode: false }", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger = {
                periode: false
            };
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige")
        });

        it("Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === { periode: true }", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger = {
                periode: true
            };
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.be.undefined;
        });

        it("Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === { periode: true, sykmeldingsgrad: false }", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger = {
                periode: true,
                sykmeldingsgrad: false,
            };
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.be.undefined;
        });


        it("Skal returnere arbeidssituasjon dersom arbeidssituasjon = 'arbeidstaker'", () => {
            fields.arbeidssituasjon = undefined;
            const res = validate(fields);
            expect(res.arbeidssituasjon).to.be.defined;
        });

        it("Skal ikke returnere arbeidssituasjon dersom arbeidssituasjon === 'arbeidstaker'", () => {
            fields.arbeidssituasjon = 'arbeidstaker';
            const res = validate(fields);
            expect(res.arbeidssituasjon).to.be.undefined;
        });

        it("Skal returnere valgtArbeidsgiver dersom arbeidssituasjon === 'arbeidstaker' og valgtArbeidsgiver === undefined", () => {
            fields.arbeidssituasjon = 'arbeidstaker';
            const res = validate(fields);
            expect(res.valgtArbeidsgiver).to.be.defined;
        });

        it("Skal ikke returnere valgtArbeidsgiver dersom arbeidssituasjon === 'arbeidstaker' og valgtArbeidsgiver === {}", () => {
            fields.arbeidssituasjon = 'arbeidstaker';
            fields.valgtArbeidsgiver = {
                orgnummer: "***REMOVED***",
                navn: "Alna Frisør"
            }
            const res = validate(fields);
            expect(res.valgtArbeidsgiver).to.be.undefined;
        });

        it("Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og periode er feilaktig", () => {
            fields = {"opplysningeneErRiktige":false,"feilaktigeOpplysninger":{"periode":true}};
            const res = validate(fields);
            expect(res).to.deep.equal({});
        });

        it("Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og sykmeldingsgrad er feilaktig", () => {
            fields = {"opplysningeneErRiktige":false,"feilaktigeOpplysninger":{"sykmeldingsgrad":true}};
            const res = validate(fields);
            expect(res).to.deep.equal({});
        });

        it("SKal returnere arbeidssituasjon dersom opplysningeneErRiktige === false og alt annet er undefined", () => {
            fields.opplysningeneErRiktige = false;
            const res = validate(fields);
            expect(res).to.deep.equal({
                arbeidssituasjon: "Vennligst oppgi din arbeidssituasjon",
                feilaktigeOpplysninger: "Vennligst oppgi hvilke opplysninger som ikke er riktige"
            })
        });

        it("Skal returnere {} dersom  opplysningeneErRiktige === true og arbeidssituasjon === 'arbeidstaker' og man har strengt fortrolig adresse", () => {
            fields.opplysningeneErRiktige = true;
            fields.arbeidssituasjon = 'arbeidstaker';
            const props = {
                harStrengtFortroligAdresse: true,
            }
            const res = validate(fields, props);
            expect(res).to.deep.equal({})
        })


    });

    describe("mapStateToProps", () => {

        it("Skal returnere sykmelding", () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.sykmelding).to.deep.equal({
                id: 123,
                navn: "Olsen"
            })
        });

        it("Skal returnere ledetekster", () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.ledetekster).to.deep.equal(ledetekster);
        });

        it("Skal returnere sender", () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.sender).to.be.true;
        });

        it("Skal returnere strengt fortrolig adresse", () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.harStrengtFortroligAdresse).to.be.true;
        });

        it("Skal returnere arbeidsgivere", () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.arbeidsgivere).to.deep.equal([{
                navn: "Oles pizza",
                orgnummer: "123456789"
            }, {
                navn: "Doles pizza",
                orgnummer: "***REMOVED***"
            }, {
                navn: "Annen arbeidsgiver",
                orgnummer: "0"
            }])
        })

    });

});