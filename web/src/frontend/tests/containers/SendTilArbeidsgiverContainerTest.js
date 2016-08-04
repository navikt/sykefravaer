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
import SykmeldingKvittering from '../../js/components/SykmeldingKvittering.js';

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
                    },
                },
            },
        };
        ownProps.params = {};
        ownProps.params.sykmeldingId = 3;
        dispatch = sinon.spy(); 
    })

    describe("mapStateToProps", () => {

        it("Skal returnere henter-flagget fra sykmeldinger", () => {
            state.arbeidsgiversSykmeldinger.henter = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.henter).to.equal(true);
        });

        it("Skal returnere hentingFeilet-flagget fra sykmeldinger", () => {
            state.arbeidsgiversSykmeldinger.hentingFeilet = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.hentingFeilet).to.equal(true);
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

        let ledeteksterObj;

        beforeEach(() => {
            ledeteksterObj = {
                data: ledetekster
            }
        })

        it("Skal vise AppSpinner når siden laster", () => {
            let sykmelding = {};
            const brukerinfo = {};

            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledeteksterObj}
                                                             dispatch={dispatch} brukerinfo={brukerinfo} henter={true}/>);
            expect(component.find(AppSpinner)).to.have.length(1);
        }); 

        it("Skal vise SykmeldingKvittering dersom sykmeldingen er sendt", () => {
            let sykmelding = {
                status: "SENDT",
                valgtArbeidsgiver: {
                    navn: "BEKK"
                }
            };
            const brukerinfo = {};

            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledeteksterObj}
                                                             dispatch={dispatch} brukerinfo={brukerinfo} henter={false}/>);
            expect(component.find(SykmeldingKvittering)).to.have.length(1);
        }); 

        it("Skal vise Feilmelding dersom noe feiler", () => {
            let sykmelding = {};
            const brukerinfo = {};
            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledeteksterObj}
                                                             dispatch={dispatch} brukerinfo={brukerinfo} hentingFeilet={true} />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it("Skal vise feilmelding dersom sykmeldingen ikke finnes", () => {
            let sykmelding = undefined;
            const brukerinfo = {};
            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledeteksterObj}
                                                             dispatch={dispatch} brukerinfo={brukerinfo}/>);
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal vise arbeidsgivers versjon dersom sykmeldingen finnes", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: sykmeldinger[1]
            };
            const brukerinfo = {};
            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledeteksterObj}
                                                             dispatch={dispatch} brukerinfo={brukerinfo}/>);
            expect(component.find(SendTilArbeidsgiver)).to.have.length(1);
        }); 

        it("Skal kalle dispatch når den mountes", () => {
            const brukerinfo = {};
            let sykmelding = {}
            let component = shallow(<SendTilArbeidsgiverSide sykmelding={sykmelding} ledetekster={ledeteksterObj}
                                                             dispatch={dispatch} brukerinfo={brukerinfo}/>);
            expect(typeof dispatch.getCall(0).args[0]).to.equal("function");
            expect(dispatch.calledOnce).to.equal(true);
        });

    });

}); 