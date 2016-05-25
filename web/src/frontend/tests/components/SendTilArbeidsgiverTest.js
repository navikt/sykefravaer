import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Utvidbar from "../../js/components/Utvidbar.js";
import MulighetForArbeid from "../../js/components/MulighetForArbeid.js";
import Friskmelding from "../../js/components/Friskmelding.js";
import UtdypendeOpplysninger from "../../js/components/UtdypendeOpplysninger.js";
import BedreArbeidsevne from "../../js/components/BedreArbeidsevne.js";
import MeldingTilNAV from "../../js/components/MeldingTilNAV.js";
import MeldingTilArbeidsgiver from "../../js/components/MeldingTilArbeidsgiver.js";
import Tilbakedatering from "../../js/components/Tilbakedatering.js";
import AndreSykmeldingOpplysninger from '../../js/components/AndreSykmeldingOpplysninger.js'

import SendTilArbeidsgiver from "../../js/components/SendTilArbeidsgiver.js";
import SykmeldingPerioder from "../../js/components/SykmeldingPerioder.js";


let component;

const sykmelding = {
    id: 3456789,
    fnr: "***REMOVED***",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: "2015-12-31T00:00:00Z",
        tom: "2016-01-06T00:00:00Z",
        grad: 67
    }],
    arbeidsfoerEtterPerioden: true
};

const getSykmelding = (skmld = {}) => {
    return Object.assign({}, sykmelding, skmld);
}

describe.only("SendTilArbeidsgiver", () => {

    beforeEach(() => {
        component = mount(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>)
    })

    it("Skal vise perioder", () => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(SykmeldingPerioder)).to.have.length(1)
    });

    it("Skal vise diagnose som et skravert felt", () => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(".js-diagnose").text()).to.equal("Diagnosen er skjult for arbeidsgiver")
    });

    it("Skal vise fødselsnummer", () => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(".js-fnr").text()).to.equal("***REMOVED***")
    });

    it("Skal inneholde en Utvidbar", () => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(Utvidbar)).to.have.length(1);
    });

    describe("Hensyn på arbeidsplassen", () => {

        it("Skal vise dersom det finnes", () => {
            component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding({
                hensynPaaArbeidsplassen: "Ta godt vare på denne personen"
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-hensynPaaArbeidsplassen")).to.have.length(1);
        }); 

        it("Skal ikke vise dersom det ikke finnes", () => {
            component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
            expect(component.find(".js-hensynPaaArbeidsplassen").length).to.equal(0);
        }); 

    });

    describe("Arbeidsgiver for denne sykmeldingen", () => {

        it("Skal vise dersom det finnes", () => {
            component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding({
                arbeidsgiver: "Hansen AS"
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-arbeidsgiver")).to.have.length(1);
            expect(component.find(".js-arbeidsgiver").text()).to.equal("Hansen AS");
        }); 

        it("Skal ikke vise dersom det ikke finnes", () => {
            component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding({
                arbeidsgiver: null
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-arbeidsgiver").length).to.equal(0);
        }); 

    });

    describe("Lege/sykmelder", () => {

        it("Skal vise dersom det finnes", () => {
            component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
            expect(component.find(".js-sykmelder")).to.have.length(1);
            expect(component.find(".js-sykmelder").text()).to.equal("Ove Olsen");
        }); 

        it("Skal ikke vise dersom det ikke finnes", () => {
            component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding({
                sykmelder: null
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-sykmelder").length).to.equal(0);
        }); 

    });

    describe("Flere opplysninger", () => {
        beforeEach(() => {
            component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster} />)
        });

        it("Viser MulighetForArbeid", () => {
            expect(component.find(MulighetForArbeid)).to.have.length(1);
        });

        it("Viser Friskmelding", () => {
            expect(component.find(Friskmelding)).to.have.length(1);
        });

        it("Viser UtdypendeOpplysninger", () => {
            expect(component.find(UtdypendeOpplysninger)).to.have.length(1);
        });

        it("Viser BedreArbeidsevne", () => {
            expect(component.find(BedreArbeidsevne)).to.have.length(1);
        });

        it("Viser MeldingTilNAV", () => {
            expect(component.find(MeldingTilNAV)).to.have.length(1);
        });

        it("Viser MeldingTilArbeidsgiver", () => {
            expect(component.find(MeldingTilArbeidsgiver)).to.have.length(1);
        });                        

        it("Viser Tilbakedatering", () => {
            expect(component.find(Tilbakedatering)).to.have.length(1);
        });

        it("Viser AndreSykmeldingOpplysninger", () => {
            expect(component.find(AndreSykmeldingOpplysninger)).to.have.length(1);
        });

    }); 

});
