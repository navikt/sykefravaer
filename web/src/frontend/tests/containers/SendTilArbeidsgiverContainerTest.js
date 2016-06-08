import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import sinon from 'sinon';
import { hentSykmeldinger } from '../../js/actions/dineSykmeldinger_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { SendTilArbeidsgiverSide, mapStateToProps } from "../../js/containers/SendTilArbeidsgiverContainer.js";
import AppSpinner from '../../js/components/AppSpinner.js';
import Feilmelding from '../../js/components/Feilmelding.js';
import SendTilArbeidsgiver from '../../js/components/SendTilArbeidsgiver.js';

let component;

const sykmeldinger = [{
    id: 2,
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: "2015-12-31T00:00:00Z",
        tom: "2016-01-06T00:00:00Z",
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
        fom: "2015-12-31T00:00:00Z",
        tom: "2016-01-06T00:00:00Z",
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
        fom: "2015-12-31T00:00:00Z",
        tom: "2016-01-06T00:00:00Z",
        grad: 67
    }],
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
}];

describe("SendTilArbeidsgiverContainer", () => {

    let component; 
    let ownProps = {};
    let state; 
    let dispatch;

    beforeEach(() => {
        state = {
            arbeidsgiversSykmeldinger: {
                data: sykmeldinger,
                hentingFeilet: false,
                henter: false
            },
            ledetekster: {
                data: []
            },
            brukerinfo: {
                bruker: {
                    data: {
                        toggleSendTilArbeidsgiver: true,
                    },
                },
            },
        };
        ownProps.params = {};
        ownProps.params.sykmeldingId = 3;
        dispatch = sinon.spy(); 
    })

    describe("mapStateToProps", () => {

        it("Skal returnere sykmelding basert på ownProps.params.sykmeldingId", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmelding.data).to.equal(sykmeldinger[2])
        });

        it("Skal returnere henter-flagget fra sykmeldinger", () => {
            state.arbeidsgiversSykmeldinger.henter = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmelding.henter).to.equal(true);
        });

        it("Skal returnere hentingFeilet-flagget fra sykmeldinger", () => {
            state.arbeidsgiversSykmeldinger.hentingFeilet = true; 
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

    });

    describe("SendTilArbeidsgiverSide", () => {

        it("Skal vise AppSpinner når siden laster", () => {
            let sykmelding = {
                henter: true
            };
            const brukerinfo = {
                toggleSendTilArbeidsgiver: true,
            };

            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledetekster}
                                                             dispatch={dispatch} brukerinfo={brukerinfo}/>);
            expect(component.find(AppSpinner)).to.have.length(1);
        }); 

        it("Skal vise Feilmelding dersom noe feiler", () => {
            let sykmelding = {
                hentingFeilet: true
            };
            const brukerinfo = {
                toggleSendTilArbeidsgiver: true,
            };
            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledetekster}
                                                             dispatch={dispatch} brukerinfo={brukerinfo}/>);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it("Skal vise feilmelding dersom sykmeldingen ikke finnes", () => {
            let sykmelding = {
                data: undefined
            };
            const brukerinfo = {
                toggleSendTilArbeidsgiver: true,
            };
            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledetekster}
                                                             dispatch={dispatch} brukerinfo={brukerinfo}/>);
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal vise arbeidsgivers versjon dersom sykmeldingen finnes", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: sykmeldinger[1]
            };
            const brukerinfo = {
                toggleSendTilArbeidsgiver: true,
            };
            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledetekster}
                                                             dispatch={dispatch} brukerinfo={brukerinfo}/>);
            expect(component.find(SendTilArbeidsgiver)).to.have.length(1);
        }); 

        it("Skal kalle dispatch når den mountes", () => {
            const brukerinfo = {
                toggleSendTilArbeidsgiver: true,
            };
            let sykmelding = {}
            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledetekster}
                                                             dispatch={dispatch} brukerinfo={brukerinfo}/>);
            expect(typeof dispatch.getCall(0).args[0]).to.equal("function");
            expect(dispatch.calledOnce).to.equal(true);
        });

    });

}); 