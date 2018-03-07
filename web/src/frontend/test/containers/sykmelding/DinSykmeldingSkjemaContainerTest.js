import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import ledetekster from "../../mockLedetekster";
import getSykmelding from '../../mockSykmeldinger';
import Feilmelding from '../../../js/components/Feilmelding';

import { DinSykmldSkjema, mapStateToProps, Skjemalaster } from "../../../js/containers/sykmelding/DinSykmeldingSkjemaContainer";
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

        it("Skal returnere skalHenteBrukerinfo = false hvis brukerinfo er hentet", () => {
            const state = getState();
            state.brukerinfo.bruker.hentet = true;
            const res = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(res.skalHenteBrukerinfo).to.be.false;
        });

        it("Skal returnere skalHenteBrukerinfo = true hvis brukerinfo ikke er hentet", () => {
            const state = getState();
            const res = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(res.skalHenteBrukerinfo).to.be.true;
        });

        it("Skal returnere henter dersom det hentes vedlikehold men ikke brukerinfo", () => {
            const state = getState();
            state.vedlikehold.henter = true;
            state.brukerinfo.bruker.henter = false;
            const res = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(res.henter).to.be.true;
        });

        it("Skal returnere henter dersom det hentes brukerinfo men ikke vedlikehold", () => {
            const state = getState();
            state.vedlikehold.henter = false;
            state.brukerinfo.bruker.henter = true;
            const res = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(res.henter).to.be.true;
        });

        it("Skal returnere henter dersom det ikke hentes brukerinfo og ikke vedlikehold og ikke arbeidsgivers sykmeldinger", () => {
            const state = getState();
            state.arbeidsgiversSykmeldinger.henter = false;
            state.arbeidsgiversSykmeldinger.hentet = true;
            state.vedlikehold.henter = false;
            state.brukerinfo.bruker.henter = false;
            const res = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(res.henter).to.be.false;
        });

        it("Skal returnere henter === true dersom det hentes arbeidsgiversSykmeldinger", () => {
            const state = getState();
            state.arbeidsgiversSykmeldinger.henter = true;
            state.arbeidsgiversSykmeldinger.hentet = false;
            const res = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(res.henter).to.be.true;
            expect(res.skalHenteArbeidsgiversSykmeldinger).to.be.false;
        });

        it("Skal returnere henter === true dersom arbeidsgiversSykmeldinger ikke er hentet", () => {
            const state = getState();
            state.arbeidsgiversSykmeldinger.hentet = false;
            state.arbeidsgiversSykmeldinger.henter = false;
            const res = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(res.henter).to.be.true;
            expect(res.skalHenteArbeidsgiversSykmeldinger).to.be.true;
        });

        it("Skal returnere henter === false dersom arbeidsgiversSykmeldinger er hentet", () => {
            const state = getState();
            state.arbeidsgiversSykmeldinger.henter = false;
            state.arbeidsgiversSykmeldinger.hentet = true;
            const res = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(res.henter).to.be.false;
            expect(res.skalHenteArbeidsgiversSykmeldinger).to.be.false;
        });

    });

    describe("Render", () => {

        let actions;
        let hentAktuelleArbeidsgivere;
        let hentArbeidsgiversSykmeldinger;
        let hentBrukerinfo;

        beforeEach(() => {
            hentBrukerinfo = sinon.spy();
            hentAktuelleArbeidsgivere = sinon.spy();
            hentArbeidsgiversSykmeldinger = sinon.spy();
            actions = { hentBrukerinfo, hentAktuelleArbeidsgivere, hentArbeidsgiversSykmeldinger }; 
        })

        it("Skal vise planlagt-vedlikehold ved vedlikehold", () => {
            const comp = shallow(<Skjemalaster {...actions} vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b'} }} />);
            expect(comp.find(Feilmelding)).to.have.length(1);
        });

        it("Skal hente brukerinfo hvis brukerinfo ikke er hentet", () => {
            shallow(<Skjemalaster skalHenteBrukerinfo {...actions} vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b'} }} />);
            expect(hentBrukerinfo.calledOnce).to.be.true;
        });

        it("Skal ikke hente brukerinfo hvis brukerinfo er hentet", () => {
            shallow(<Skjemalaster {...actions} vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b'} }} />);
            expect(hentBrukerinfo.calledOnce).to.be.false;
        });

    });
});