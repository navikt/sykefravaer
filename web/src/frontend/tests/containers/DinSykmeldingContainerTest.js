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
import DinSykmelding from '../../js/components/DinSykmelding.js';
import SykmeldingKvittering from '../../js/components/SykmeldingKvittering.js';
import DinSendteSykmelding from '../../js/components/DinSendteSykmelding.js';
import sinon from 'sinon';

let component;

const sykmeldinger = [{
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
    arbeidsfoerEtterPerioden: true
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
    arbeidsfoerEtterPerioden: true
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
    arbeidsfoerEtterPerioden: true
}];


describe("DinSykmeldingContainer", () => {

    let component; 
    let ownProps = {};
    let state; 

    beforeEach(() => {
        state = {
            dineSykmeldinger: {
                data: sykmeldinger,
                hentingFeilet: false,
                henter: false
            },
            ledetekster: {
                data: [],
            },
            brukerinfo: {
                bruker: {
                    data: {
                        strengtFortroligAdresse: false,
                        toggleSendTilArbeidsgiver: true,
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
            expect(res.sykmelding.data).to.equal(sykmeldinger[2])
        });

        it("Skal returnere sykmeldingId basert på ownProps.params.sykmeldingId", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmeldingId).to.equal(3);
        });        

        it("Skal returnere henter-flagget fra sykmeldinger", () => {
            state.dineSykmeldinger.henter = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmelding.henter).to.equal(true);
        });

        it("Skal returnere hentingFeilet-flagget fra sykmeldinger", () => {
            state.dineSykmeldinger.hentingFeilet = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmelding.hentingFeilet).to.equal(true);
        });

        it("Skal returnere ledetekster", () => {
            state.ledetekster = {
                data: ledetekster
            };
            const res = mapStateToProps(state, ownProps);
            expect(res.ledetekster.data).to.deep.equal(ledetekster);
        });

        it("Skal returnere visSendTilArbeidsgiver === true hvis man har én pilotarbeidsgiver", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.visSendTilArbeidsgiver).to.be.true;
        });

        it("Skal returnere visSendTilArbeidsgiver === false hvis man har ingen pilotarbeidsgivere", () => {
            state.arbeidsgivere.data = [{
                orgnummer: 1234,
                erpilotarbeidsgiver: false
            }]
            const res = mapStateToProps(state, ownProps);
            expect(res.visSendTilArbeidsgiver).to.be.false;
        }); 

        it("Skal returnere visSendTilArbeidsgiver === false hvis man har flere arbeidsgivere", () => {
            state.arbeidsgivere.data = [{
                orgnummer: 1234,
                erpilotarbeidsgiver: true
            }, {
                orgnummer: 12345678,
                erpilotarbeidsgiver: false
            }]
            const res = mapStateToProps(state, ownProps);
            expect(res.visSendTilArbeidsgiver).to.be.false;
        }); 

        it("Skal returnere visSendTilArbeidsgiver === false hvis man strengt fortrolig adresse", () => {
            state.brukerinfo.bruker = {
                data: {
                    strengtFortroligAdresse: true,
                }
            };
            const res = mapStateToProps(state, ownProps);
            expect(res.visSendTilArbeidsgiver).to.be.false;
        }); 

        it("Skal returnere visSendTilArbeidsgiver === false hvis man strengt fortrolig adresse og én arbeidsgiver som ikke er pilotarbeidsgiver", () => {
            state.brukerinfo.bruker = {
                data: {
                    strengtFortroligAdresse: true,
                }
            };
            state.arbeidsgivere = {};
            state.arbeidsgivere.data = [{
                orgnummer: 1234,
                erpilotarbeidsgiver: false
            }]
            const res = mapStateToProps(state, ownProps);
            expect(res.visSendTilArbeidsgiver).to.be.false;
        });

        it("Skal returnere visSendTilArbeidsgiver === false hvis toggleSendTilArbeidsgiver === false", () => {
            state.brukerinfo.bruker.data.toggleSendTilArbeidsgiver = false;
            const res = mapStateToProps(state, ownProps);
            expect(res.visSendTilArbeidsgiver).to.be.false; 
        })

    });

    describe("DinSykmldSide", () => {

        let dispatch;

        beforeEach(() => {
            dispatch = sinon.spy(); 
        });

        it("Skal vise AppSpinner når siden laster", () => {
            let sykmelding = {
                henter: true
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster} dispatch={dispatch} />)
            expect(component.find(AppSpinner)).to.have.length(1);
        }); 

        it("Skal vise Feilmelding når siden laster", () => {
            let sykmelding = {
                hentingFeilet: true
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster} dispatch={dispatch} />)
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it("Skal vise feilmelding dersom sykmeldingen ikke finnes", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: undefined
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster} dispatch={dispatch} />)
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal vise sykmelding dersom den finnes", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: sykmeldinger[1]
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster} dispatch={dispatch} />)
            expect(component.find(DinSykmelding)).to.have.length(1);
        });

        it("Skal vise kvittering dersom sykmeldingen har status === 'BEKREFTET' og nettoppBekreftet === true", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: {
                    status: "BEKREFTET",
                    nettoppBekreftet: true
                }
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster} dispatch={dispatch} />)
            expect(component.find(SykmeldingKvittering)).to.have.length(1);
        });

        it("Skal vise DinSendteSykmelding dersom sykmeldingen har status === 'SENDT'", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: {
                    status: "SENDT",
                    nettoppBekreftet: true
                }
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster} dispatch={dispatch} />)
            expect(component.find(DinSendteSykmelding)).to.have.length(1);
        });

        it("Skal kalle dispatch", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: sykmeldinger[1]
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster} dispatch={dispatch} />)
            expect(dispatch.calledOnce).to.be.true;
        })

    });

}); 