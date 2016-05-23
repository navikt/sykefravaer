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


describe("DinSykmeldingContainer", () => {

    let component; 
    let ownProps = {};
    let state; 

    beforeEach(() => {
        state = {
            sykmeldinger: {
                data: sykmeldinger,
                hentingFeilet: false,
                henter: false
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

        it("Skal returnere henter-flagget fra sykmeldinger", () => {
            state.sykmeldinger.henter = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmelding.henter).to.equal(true);
        });

        it("Skal returnere hentingFeilet-flagget fra sykmeldinger", () => {
            state.sykmeldinger.hentingFeilet = true; 
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

    describe("DinSykmldSide", () => {

        it("Skal vise AppSpinner når siden laster", () => {
            let sykmelding = {
                henter: true
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster}/>)
            expect(component.find(AppSpinner)).to.have.length(1);
        }); 

        it("Skal vise Feilmelding når siden laster", () => {
            let sykmelding = {
                hentingFeilet: true
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster}/>)
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it("Skal vise feilmelding dersom sykmeldingen ikke finnes", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: undefined
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster}/>)
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal vise sykmelding dersom den finnes", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: sykmeldinger[1]
            };
            let component = shallow(<DinSykmldSide sykmelding={sykmelding} ledetekster={ledetekster}/>)
            expect(component.find(DinSykmelding)).to.have.length(1);
        });

    });

}); 