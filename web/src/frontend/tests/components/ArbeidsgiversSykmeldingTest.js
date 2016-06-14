import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Utvidbar from "../../js/components/Utvidbar.js";
import FlereOpplysninger from "../../js/components/FlereOpplysninger.js";

import SendTilArbeidsgiver from "../../js/components/SendTilArbeidsgiver.js";
import SykmeldingPerioder from "../../js/components/SykmeldingPerioder.js";
import ArbeidsgiversSykmelding from '../../js/components/ArbeidsgiversSykmelding.js';

let component;


describe("ArbeidsgiversSykmelding", () => {

    beforeEach(() => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>)
    })

    it("Skal vise perioder", () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(SykmeldingPerioder)).to.have.length(1)
    });

    it("Skal vise diagnose som et skravert felt dersom sykmelding.skalViseSkravertFelt === true", () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding({
            skalViseSkravertFelt: true
        })} ledetekster={ledetekster}/>);
        expect(component.find(".js-diagnose")).to.have.length(1);
        expect(component.find(".js-diagnose").text()).to.equal("Diagnosen er skjult for arbeidsgiver")
    });

    it("Skal ikke vise diagnose som et skravert felt dersom sykmelding.skalViseSkravertFelt === false", () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding({
            skalViseSkravertFelt: false
        })} ledetekster={ledetekster}/>);
        expect(component.find(".js-diagnose")).to.have.length(0);
    });    

    it("Skal vise fødselsnummer", () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(".js-fnr").text()).to.equal("***REMOVED***")
    });

    it("Skal inneholde en Utvidbar", () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(Utvidbar)).to.have.length(1);
    });

    it("Viser FlereOpplysninger", () => {
        expect(component.find(FlereOpplysninger)).to.have.length(1);
    });

    describe("Hensyn på arbeidsplassen", () => {

        it("Skal vise dersom det finnes", () => {
            component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding({
                friskmelding: {
                    hensynPaaArbeidsplassen: "Ta godt vare på denne personen"
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-hensynPaaArbeidsplassen")).to.have.length(1);
            expect(component.find(".js-hensynPaaArbeidsplassen").text()).to.equal("Ta godt vare på denne personen");
        }); 

        it("Skal ikke vise dersom det ikke finnes", () => {
            component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
            expect(component.find(".js-hensynPaaArbeidsplassen").length).to.equal(0);
        }); 

    });

    describe("Arbeidsgiver for denne sykmeldingen", () => {

        it("Skal vise dersom det finnes", () => {
            component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding({
                arbeidsgiver: "Hansen AS"
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-arbeidsgiver")).to.have.length(1);
            expect(component.find(".js-arbeidsgiver").text()).to.equal("Hansen AS");
        }); 

        it("Skal ikke vise dersom det ikke finnes", () => {
            component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding({
                arbeidsgiver: null
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-arbeidsgiver").length).to.equal(0);
        }); 

    });

    describe("Lege/sykmelder", () => {

        it("Skal vise dersom det finnes", () => {
            component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
            expect(component.find(".js-sykmelder")).to.have.length(1);
            expect(component.find(".js-sykmelder").text()).to.equal("Ove Olsen");
        }); 

        it("Skal ikke vise dersom det ikke finnes", () => {
            component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding({
                bekreftelse: {
                    sykmelder: null
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-sykmelder").length).to.equal(0);
        });
    });
});
