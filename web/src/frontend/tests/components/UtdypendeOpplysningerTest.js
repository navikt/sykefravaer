import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import UtdypendeOpplysninger from "../../js/components/UtdypendeOpplysninger.js";

let component;

const sykmelding = {
    id: 3456789,
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
};

const getSykmelding = (skmld = {}) => {
    return Object.assign({}, sykmelding, skmld);
}

describe("Utdypende opplysninger", () => {

    describe("Sykehistorie", () => {
        it("Skal vise sykehistorie dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                sykehistorie: "Min sykehistorie er ganske kort. Flaks for meg."
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-sykehistorie").text()).to.equal("Min sykehistorie er ganske kort. Flaks for meg.")
        });

        it("Skal ikke vise sykehistorie dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                sykehistorie: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-sykehistorie").length).to.equal(0)
        });
    });

    describe("Hvordan påvirker sykdommen arbeidsevnen?", () => {
        it("Skal vise dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                paavirkningArbeidsevne: "I stor grad"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-paavirkningArbeidsevne").text()).to.equal("I stor grad")
        });

        it("Skal ikke vise dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                paavirkningArbeidsevne: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-paavirkningArbeidsevne").length).to.equal(0)
        });
    });

    describe("Har behandlingen frem til nå bedret arbeidsevnen?", () => {
        it("Skal vise dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                resultatAvBehandling: "Gode resultater"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-resultatAvBehandling").text()).to.equal("Gode resultater")
        });

        it("Skal ikke vise dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                resultatAvBehandling: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-resultatAvBehandling").length).to.equal(0)
        });
    });

    describe("Beskriv pågående og planlagt henvisning, utredning og/eller behandling", () => {
        it("Skal vise dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                henvisningUtredningBehandling: "Dette er min beskrivelse"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-henvisningUtredningBehandling").text()).to.equal("Dette er min beskrivelse")
        });

        it("Skal ikke vise dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                henvisningUtredningBehandling: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-henvisningUtredningBehandling").length).to.equal(0)
        });
    });    

}); 