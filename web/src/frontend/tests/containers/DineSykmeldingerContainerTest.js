import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { DineSykmldSide, mapStateToProps } from "../../js/containers/DineSykmeldingerContainer.js";
import AppSpinner from '../../js/components/AppSpinner.js';
import Feilmelding from '../../js/components/Feilmelding.js';
import DineSykmeldinger from '../../js/components/DineSykmeldinger.js';

let component;
let sykmeldinger;

describe("DineSykmeldingerContainer", () => {

    let component; 
    let dispatch;

    beforeEach(() => {
        const sykmeldingerArray = [{
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

        sykmeldinger = {
            data: sykmeldingerArray
        }
    })

    describe("mapStateToProps", () => {

        it("Skal returnere dineSykmeldinger", function() {
            const res = mapStateToProps({
                dineSykmeldinger: sykmeldinger,
                brukerinfo: {
                    data: {}
                }
            });
            expect(res.sykmeldinger).to.deep.equal(sykmeldinger)
        });

        it("Skal returnere ledtekster", function() {
            const res = mapStateToProps({
                ledetekster: {
                    "min.tekst": "Dette er en test"
                },
                brukerinfo: {
                    data: {}
                }     
            });
            expect(res.ledetekster).to.deep.equal({
                "min.tekst": "Dette er en test"
            })
        });


    });

    describe("DineSykmldSide", () => {

        beforeEach(() => {
            dispatch = sinon.spy(); 
        });

        it("Skal vise spinner dersom sykmeldinger hentes", () => {
            let sykmeldinger = {
                henter: true
            }
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={sykmeldinger} dispatch={dispatch} />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it("Skal ikke spinner dersom sykmeldinger ikke hentes", () => {
            let sykmeldinger = {
                henter: false
            }
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={sykmeldinger} dispatch={dispatch} />);
            expect(component.contains(<AppSpinner />)).to.equal(false);
        });

        it("Skal vise feilmelding dersom henting feilet", () => {
            let sykmeldinger = {
                hentingFeilet: true
            }
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={sykmeldinger} dispatch={dispatch} />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        }); 

        it("Skal vise DineSykmeldinger dersom henting er OK", () => {
            let sykmeldinger = {
                hentingFeilet: false, 
                henter: false,
                data: []
            }
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={sykmeldinger} dispatch={dispatch} />);
            expect(component.find(DineSykmeldinger)).to.have.length(1);
        });     

    })

}); 