import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { DinSykmldSide, mapStateToProps } from "../../js/containers/DinSykmeldingContainer.js";
import AppSpinner from '../../js/components/AppSpinner.js';
import Feilmelding from '../../js/components/Feilmelding.js';
import DinSykmelding from '../../js/components/sykmelding/DinSykmelding.js';
import SykmeldingKvittering from '../../js/components/sykmelding/SykmeldingKvittering.js';
import DinSendteSykmelding from '../../js/components/sykmelding/DinSendteSykmelding.js';
import DinAvbrutteSykmelding from '../../js/components/sykmelding/DinAvbrutteSykmelding.js';
import DinBekreftedeSykmelding from '../../js/components/sykmelding/DinBekreftedeSykmelding.js';
import sinon from 'sinon';
import * as dineArbeidsgivereActions from '../../js/actions/dineArbeidsgivere_actions';
import * as arbeidsgiversSykmeldingerActions from '../../js/actions/arbeidsgiversSykmeldinger_actions';

let component;

describe("DinSykmeldingContainer", () => {

    let component; 
    let ownProps = {};
    let state; 
    let sykmeldinger;

    beforeEach(() => {

        sykmeldinger = [{
            id: 2,
            fnr: "12",
            fornavn: "Per",
            etternavn: "Person",
            sykmelder: "Ove Olsen",
            arbeidsgiver: "Selskapet AS",
            perioder: [{
                fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
                tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
                grad: 67
            }],
            hoveddiagnose: {
                diagnose: "Influensa",
                diagnosesystem: "ICPC",
                diagnosekode: "LP2"
            },
            arbeidsfoerEtterPerioden: true,
            status: 'NY'
        }, {
            id: 1,
            fnr: "12",
            fornavn: "Per",
            etternavn: "Person",
            sykmelder: "Ove Olsen",
            arbeidsgiver: "Selskapet AS",
            perioder: [{
                fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
                tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
                grad: 67
            }],
            hoveddiagnose: {
                diagnose: "Influensa",
                diagnosesystem: "ICPC",
                diagnosekode: "LP2"
            },
            arbeidsfoerEtterPerioden: true,
            status: 'NY'
        }, {
            id: 3,
            fnr: "12",
            fornavn: "Per",
            etternavn: "Person",
            sykmelder: "Ove Olsen",
            arbeidsgiver: "Selskapet AS",
            perioder: [{
                fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
                tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
                grad: 67
            }],
            hoveddiagnose: {
                diagnose: "Influensa",
                diagnosesystem: "ICPC",
                diagnosekode: "LP2"
            },
            arbeidsfoerEtterPerioden: true,
            status: 'NY'
        }];

        state = {
            dineSykmeldinger: {
                data: sykmeldinger,
                hentingFeilet: false,
                henter: false
            },
            arbeidsgiversSykmeldinger: {
                data: [],
                hentingFeilet: false,
                henter: true,
            },
            ledetekster: {
                data: [],
                henter: true
            },
            brukerinfo: {
                bruker: {
                    data: {
                        strengtFortroligAdresse: false,
                    },
                }
            },
            arbeidsgivere: {
                data: [{
                    orgnummer: 12345678,
                    erpilotarbeidsgiver: true,
                }]
            }
        };
        ownProps.params = {};
        ownProps.params.sykmeldingId = 3
    })

    describe("mapStateToProps", () => {

        it("Skal returnere sykmelding basert på ownProps.params.sykmeldingId", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.dinSykmelding).to.equal(sykmeldinger[2])
        });

        it("Skal returnere sykmeldingId basert på ownProps.params.sykmeldingId", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmeldingId).to.equal(3);
        });        

        it("Skal returnere henter-flagget fra sykmeldinger", () => {
            state.dineSykmeldinger.henter = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.henter).to.equal(true);
        });

        it("Skal returnere hentingFeilet-flagget fra sykmeldinger", () => {
            state.dineSykmeldinger.hentingFeilet = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.hentingFeilet).to.equal(true);
        });

        it("Skal returnere ledetekster", () => {
            state.ledetekster = {
                data: ledetekster
            };
            const res = mapStateToProps(state, ownProps);
            expect(res.ledetekster).to.deep.equal(ledetekster);
        });

        it("Skal returnere harPilotarbeidsgiver === true hvis man har én pilotarbeidsgiver", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.harPilotarbeidsgiver).to.be.true;
        });

        it("Skal returnere harPilotarbeidsgiver === false hvis man har ingen pilotarbeidsgivere", () => {
            state.arbeidsgivere.data = [{
                orgnummer: 1234,
                erpilotarbeidsgiver: false
            }]
            const res = mapStateToProps(state, ownProps);
            expect(res.harPilotarbeidsgiver).to.be.false;
        }); 

        it("Skal returnere harPilotarbeidsgiver === false hvis man har flere arbeidsgivere", () => {
            state.arbeidsgivere.data = [{
                orgnummer: 1234,
                erpilotarbeidsgiver: true
            }, {
                orgnummer: 12345678,
                erpilotarbeidsgiver: false
            }]
            const res = mapStateToProps(state, ownProps);
            expect(res.harPilotarbeidsgiver).to.be.false;
        }); 

        describe("Dersom dinSykmelding.status === 'SENDT'", () => {

            beforeEach(() => {
                state.dineSykmeldinger.data.push({
                    id: 44,
                    status: "SENDT"
                });
                ownProps = {
                    params: {
                        sykmeldingId: 44
                    }
                };
            });

            it("Skal returnere arbeidsgiversSykmelding når arbeidsgiversSykmeldinger = []'", () => {
                state.arbeidsgiversSykmeldinger = {
                    data: [],
                    hentingFeilet: false,
                    henter: false,
                }
                const res = mapStateToProps(state, ownProps);
                expect(res.arbeidsgiversSykmelding).to.deep.equal(undefined);
            });

            it("Skal returnere arbeidsgiversSykmelding når arbeidsgiversSykmeldinger = [{...}]'", () => {
                state.arbeidsgiversSykmeldinger = {
                    data: [{
                        id: 44, 
                        fornavn: "Hans",
                        etternavn: "Olsen"
                    }],
                    hentingFeilet: false, 
                    henter: false,
                }
                const res = mapStateToProps(state, ownProps);
                expect(res.arbeidsgiversSykmelding).to.deep.equal({
                    id: 44, 
                    fornavn: "Hans",
                    etternavn: "Olsen"
                });
            });            

        })

    });

    describe("DinSykmldSide", () => {

        let dispatch;
        let sykmelding; 

        beforeEach(() => {
            dispatch = sinon.spy(); 
            sykmelding = {
                status: 'NY'
            };
        });

        it("Skal vise AppSpinner når siden laster", () => {
            let component = shallow(<DinSykmldSide henter={true} dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(AppSpinner)).to.have.length(1);
        }); 

        it("Skal vise Feilmelding når siden laster", () => {
            let component = shallow(<DinSykmldSide hentingFeilet={true} dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it("Skal vise feilmelding dersom sykmeldingen ikke finnes", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: undefined
            };
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal vise sykmelding dersom den finnes", () => {
            let sykmelding = sykmeldinger[1];
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(DinSykmelding)).to.have.length(1);
        });

        it("Skal vise DinSendteSykmelding dersom sykmeldingen har status === 'SENDT'", () => {
            let sykmelding = {
                status: 'SENDT'
            }
            let arbeidsgiversSykmelding = {
                data: {}
            }
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(DinSendteSykmelding)).to.have.length(1);
        });

        it("Skal vise DinAvbrutteSykmelding dersom sykmeldingen har status === 'AVBRUTT'", () => {
            let sykmelding = {
                status: "AVBRUTT",
            }
            let arbeidsgiversSykmelding = {
                data: {}
            }
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(DinAvbrutteSykmelding)).to.have.length(1);
        });

        it("Skal vise DinBekreftedeSykmelding dersom sykmeldingen har status === 'BEKREFTET'", () => {
            let sykmelding = {
                status: "BEKREFTET",
            }
            let arbeidsgiversSykmelding = {
                data: {}
            }
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(DinBekreftedeSykmelding)).to.have.length(1);
        });

        it("Skal vise DinBekreftedeSykmelding med arbeidsgivers sykmelding dersom sykmeldingen har status === 'BEKREFTET' og valgtArbeidssituasjon === 'ARBEIDSTAKER'", () => {
            let sykmelding = {
                status: "BEKREFTET",
                valgtArbeidssituasjon: 'ARBEIDSTAKER'
            }
            let arbeidsgiversSykmelding = {
                navn: "Olsen"
            }
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.contains(<DinBekreftedeSykmelding dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} />)).to.be.true;
        }); 

        it("Skal hente aktuelle arbeidsgivere'", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: Object.assign({}, sykmeldinger[1], {
                    status: "NY"
                }),
            };
            let spy = sinon.spy(dineArbeidsgivereActions, "hentAktuelleArbeidsgivere");
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(dispatch.calledTwice).to.be.true;
            expect(spy.calledOnce).to.be.true;
            spy.restore();
        });

        it("Skal hente arbeidsgiversSykmeldinger", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: Object.assign({}, sykmeldinger[1], {
                    status: "SENDT"
                }),
            };
            let spy = sinon.spy(arbeidsgiversSykmeldingerActions, "hentArbeidsgiversSykmeldinger");
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(dispatch.calledTwice).to.be.true;
            expect(spy.calledOnce).to.be.true;
            spy.restore();
        });



    });

}); 