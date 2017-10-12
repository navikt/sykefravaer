import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import getSykmelding from '../../mockSykmeldinger';
import Feilmelding from '../../../js/components/Feilmelding';

import { DinSykmldSkjema, mapStateToProps, validate, Skjema } from "../../../js/containers/sykmelding/DinSykmeldingSkjemaContainer";
import { setLedetekster } from 'digisyfo-npm';

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
                                fom: "2016-01-01",
                                tom: "2016-01-06",
                                grad: 67
                            }],
                        }
                    }), 
                    getSykmelding({
                        id: 1,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: "2016-02-01",
                                tom: "2016-02-06",
                                grad: 67
                            }],
                        }
                    }), 
                    getSykmelding({
                        id: 3,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: "2016-03-01",
                                tom: "2016-03-10",
                                grad: 67
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 4,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: "2016-03-01",
                                tom: "2016-03-20",
                                grad: 67
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 5,
                        status: "GAMMEL",
                        mulighetForArbeid: {
                            perioder: [{
                                fom: "2016-03-01",
                                tom: "2016-03-20",
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
            },
            vedlikehold: {
                data: {
                    vedlikehold: false
                },
                henter: false,
            }
        };
        return Object.assign({}, defaultState, state);
    };

    describe("mapStateToProps", () => {

        beforeEach(() => {
            setLedetekster(ledetekster);
        });

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

        it("Skal returnere hentingFeilet dersom arbeidsgivere feiler", () => {
            const state = getState();
            state.arbeidsgivere.hentingFeilet = true;
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.hentingFeilet).to.be.true;
        });

        it("Skal returnere hentingFeilet === false dersom arbeidsgivere ikke feiler", () => {
            const state = getState();
            state.arbeidsgivere.hentingFeilet = false;
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.hentingFeilet).to.be.false;
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

    describe("Render", () => {
        it("Skal vise planlagt-vedlikehold ved vedlikehold", () => {
            const comp = shallow(<Skjema vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b'} }} />);
            expect(comp.find(Feilmelding)).to.have.length(1);
        });
    });
});