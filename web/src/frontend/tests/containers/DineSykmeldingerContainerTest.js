import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { DineSykmldSide, mapStateToProps } from "../../js/containers/DineSykmeldingerContainer.js";
import AppSpinner from '../../js/components/AppSpinner.js';
import Feilmelding from '../../js/components/Feilmelding.js';
import DineSykmeldinger from '../../js/components/DineSykmeldinger.js';

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

describe("DineSykmeldingerContainer", () => {

    let component; 

    describe("mapStateToProps", () => {

        it("Skal returnere sykmeldinger", function() {
            const res = mapStateToProps({
                sykmeldinger: sykmeldinger,
                localStorage: {
                    skjulUnderUtviklingVarsel: true
                }
            });
            expect(res.sykmeldinger).to.deep.equal(sykmeldinger)
        });

        it("Skal returnere skjulUnderUtviklingVarsel", function() {
            const res = mapStateToProps({
                sykmeldinger: sykmeldinger,
                localStorage: {
                    skjulUnderUtviklingVarsel: true
                }                
            });
            expect(res.skjulVarsel).to.equal(true)
        });

        it("Skal returnere ledtekster", function() {
            const res = mapStateToProps({
                ledetekster: {
                    "min.tekst": "Dette er en test"
                },
                localStorage: {
                    skjulUnderUtviklingVarsel: true
                }                
            });
            expect(res.ledetekster).to.deep.equal({
                "min.tekst": "Dette er en test"
            })
        });        

    });

    describe("DineSykmldSide", () => {

        it("Skal vise spinner dersom sykmeldinger hentes", () => {
            let sykmeldinger = {
                henter: true
            }
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={sykmeldinger} />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it("Skal ikke spinner dersom sykmeldinger ikke hentes", () => {
            let sykmeldinger = {
                henter: false
            }
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={sykmeldinger} />);
            expect(component.contains(<AppSpinner />)).to.equal(false);
        });

        it("Skal vise feilmelding dersom henting feilet", () => {
            let sykmeldinger = {
                hentingFeilet: true
            }
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={sykmeldinger} />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        }); 

        it("Skal vise DineSykmeldinger dersom henting er OK", () => {
            let sykmeldinger = {
                hentingFeilet: false, 
                henter: false,
                data: []
            }
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={sykmeldinger} />);
            expect(component.find(DineSykmeldinger)).to.have.length(1);
        });
    })

}); 