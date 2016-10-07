import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from '../mockSykmeldinger';

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
                data: [
                    getSykmelding({
                        id: 2,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 1, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
                                grad: 67
                            }],
                        }
                    }), 
                    getSykmelding({
                        id: 1,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 2, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 2, dayOfMonth: 6 },
                                grad: 67
                            }],
                        }
                    }), 
                    getSykmelding({
                        id: 3,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 3, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 3, dayOfMonth: 10 },
                                grad: 67
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 4,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 3, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 3, dayOfMonth: 20 },
                                grad: 67
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 5,
                        status: "GAMMEL",
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 3, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 3, dayOfMonth: 20 },
                                grad: 67
                            }],
                        }
                    })
                ]
            },
            ledetekster: {
                data: ledetekster
            },
            form: {
                dinSykmeldingSkjema: {
                    "test": "OK"
                }
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
        });

        it("Skal returnere skjemadata", () => {
            const state = getState(); 
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.skjemaData).to.deep.equal({
                "test": "OK"
            })
        });

    });

});