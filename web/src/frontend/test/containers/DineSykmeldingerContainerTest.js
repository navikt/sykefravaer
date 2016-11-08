import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { DineSykmldSide, mapStateToProps } from "../../js/containers/DineSykmeldingerContainer";
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import DineSykmeldinger from '../../js/components/sykmeldinger/DineSykmeldinger';

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

        sykmeldinger = {
            data: sykmeldingerArray
        }
    })

    describe("mapStateToProps", () => {

        it("Skal returnere dineSykmeldinger", function() {
            const res = mapStateToProps({
                dineSykmeldinger: sykmeldinger,
                ledetekster: {
                    data: []
                },
                brukerinfo: {
                    bruker: {},
                    innstillinger: {}
                }
            });
            expect(res.sykmeldinger).to.deep.equal(sykmeldinger.data)
        });

        it("Skal returnere ledetekster", function () {
            const res = mapStateToProps({
                ledetekster: {
                    data: {
                        "min.tekst": "Dette er en test"
                    }
                },
                dineSykmeldinger: sykmeldinger,
                brukerinfo: {
                    bruker: {},
                    innstillinger: {}
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

        it("Skal vise spinner dersom data hentes", () => {
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={[]} henter dispatch={dispatch} />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it("Skal ikke spinner dersom data ikke hentes", () => {
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={[]} dispatch={dispatch} />);
            expect(component.contains(<AppSpinner />)).to.equal(false);
        });

        it("Skal vise feilmelding dersom henting feilet", () => {
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={[]} dispatch={dispatch} hentingFeilet />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        }); 

        it("Skal vise DineSykmeldinger dersom henting er OK", () => {
            let sykmeldinger = [];
            let component = shallow(<DineSykmldSide ledetekster={ledetekster} sykmeldinger={[]} dispatch={dispatch} />);
            expect(component.find(DineSykmeldinger)).to.have.length(1);
        });     

    })

}); 