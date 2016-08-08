import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Friskmelding from "../../js/components/sykmeldingOpplysninger/Friskmelding.js";

let component;

describe("Friskmelding", () => {

    describe("Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos samme arbeidsgiver", () => {

        it("Skal vise checkbox dersom sykmelding.antarReturSammeArbeidsgiver === true", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    antarReturSammeArbeidsgiver: true
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-antarReturSammeArbeidsgiver").text()).to.equal("Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos samme arbeidsgiver")
        });

        it("Skal ikke vise noe dersom sykmelding.antarReturSammeArbeidsgiver === false", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    antarReturSammeArbeidsgiver: false
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-antarReturSammeArbeidsgiver").length).to.equal(0)
        });

        it("Skal vise dato dersom dette finnes", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    antarReturSammeArbeidsgiver: true,
                    antattDatoReturSammeArbeidsgiver: { year: 2015, monthValue: 12, dayOfMonth: 31 }
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-antattDatoReturSammeArbeidsgiver").text()).to.equal("31.12.2015");
        });

        it("Skal ikke vise dato dersom dette ikke finnes", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    antarReturSammeArbeidsgiver: true,
                    antattDatoReturSammeArbeidsgiver: null
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-antattDatoReturSammeArbeidsgiver").length).to.equal(0);
        });        

    });

    describe("Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos annen arbeidsgiver", () => {

        it("Skal vise checkbox dersom sykmelding.antarReturAnnenArbeidsgiver === true", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    antarReturAnnenArbeidsgiver: true
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-antarReturAnnenArbeidsgiver").text()).to.equal("Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos annen arbeidsgiver")
        });

        it("Skal ikke vise noe dersom sykmelding.antarReturAnnenArbeidsgiver === false", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    antarReturAnnenArbeidsgiver: false
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-antarReturAnnenArbeidsgiver").length).to.equal(0)
        });

    });

    describe("Jeg er usikker på om pasienten kan komme tilbake i arbeid hos egen eller annen arbeidsgiver", () => {

        it("Skal vise checkbox dersom sykmelding.tilbakemeldingReturArbeid === (dato)", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    tilbakemeldingReturArbeid: { year: 2015, monthValue: 12, dayOfMonth: 31 }
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-tilbakemeldingReturArbeid").text()).to.equal("Jeg er usikker på om pasienten kan komme tilbake i arbeid hos egen eller annen arbeidsgiver")
        });

        it("Skal vise datoen dersom sykmelding.tilbakemeldingReturArbeid === (dato)", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    tilbakemeldingReturArbeid: { year: 2015, monthValue: 12, dayOfMonth: 31 }
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-tilbakemeldingReturArbeidDato").text()).to.equal("31.12.2015")
        });

        it("Skal ikke vise noe dersom sykmelding.tilbakemeldingReturArbeid === null", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    antarReturAnnenArbeidsgiver: false
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-tilbakemeldingReturArbeid").length).to.equal(0)
            expect(component.find(".js-tilbakemeldingReturArbeidDato").length).to.equal(0)
        });

    });

    describe("Jeg antar at pasienten på sikt kan komme tilbake i arbeid", () => {

        it("Skal vise checkbox dersom sykmelding.utenArbeidsgiverAntarTilbakeIArbeid === true", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    utenArbeidsgiverAntarTilbakeIArbeid: true
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-utenArbeidsgiverAntarTilbakeIArbeid").text()).to.equal("Jeg antar at pasienten på sikt kan komme tilbake i arbeid")
        });

        it("Skal ikke vise datoen dersom sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato !== (dato)", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    utenArbeidsgiverAntarTilbakeIArbeid: true,
                    utenArbeidsgiverAntarTilbakeIArbeidDato: null
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-utenArbeidsgiverAntarTilbakeIArbeidDato").length).to.equal(0)
        });        

        it("Skal vise datoen dersom sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato === (dato)", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    utenArbeidsgiverAntarTilbakeIArbeid: true,
                    utenArbeidsgiverAntarTilbakeIArbeidDato: { year: 2015, monthValue: 12, dayOfMonth: 31 }
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-utenArbeidsgiverAntarTilbakeIArbeidDato").text()).to.equal("31.12.2015")
        });

        it("Skal ikke vise noe dersom sykmelding.utenArbeidsgiverAntarTilbakeIArbeid === null", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    utenArbeidsgiverAntarTilbakeIArbeid: null
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-utenArbeidsgiverAntarTilbakeIArbeid").length).to.equal(0)
            expect(component.find(".js-utenArbeidsgiverAntarTilbakeIArbeidDato").length).to.equal(0)
        });


    }); 

    describe("Jeg er usikker på om pasienten kan komme tilbake i arbeid", () => {

        it("Skal vise checkbox dersom sykmelding.utenArbeidsgiverTilbakemelding === (dato)", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    utenArbeidsgiverTilbakemelding: { year: 2015, monthValue: 12, dayOfMonth: 31 }
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-utenArbeidsgiverTilbakemelding").text()).to.equal("Jeg er usikker på om pasienten kan komme tilbake i arbeid")
        }); 

        it("Skal vise dato dersom sykmelding.utenArbeidsgiverTilbakemelding === (dato)", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    utenArbeidsgiverTilbakemelding: { year: 2015, monthValue: 12, dayOfMonth: 31 }
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-utenArbeidsgiverTilbakemeldingDato").text()).to.equal("31.12.2015");
        });         

        it("Skal ikke vise noe dersom sykmelding.utenArbeidsgiverAntarTilbakeIArbeid === null", () => {
            component = mount(<Friskmelding sykmelding={getSykmelding({
                friskmelding: {
                    utenArbeidsgiverTilbakemelding: null
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-utenArbeidsgiverTilbakemelding").length).to.equal(0)
            expect(component.find(".js-utenArbeidsgiverTilbakemeldingDato").length).to.equal(0)
        });

    });

});