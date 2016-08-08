import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import UtdypendeOpplysninger from "../../js/components/sykmeldingOpplysninger/UtdypendeOpplysninger.js";
import getSykmelding from "../mockSykmeldinger.js";

let component;

describe("Utdypende opplysninger", () => {

    describe("Sykehistorie", () => {
        it("Skal vise sykehistorie dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                utdypendeOpplysninger: {
                    sykehistorie: "Min sykehistorie er ganske kort. Flaks for meg."
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-sykehistorie").text()).to.equal("Min sykehistorie er ganske kort. Flaks for meg.")
        });

        it("Skal ikke vise sykehistorie dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                utdypendeOpplysninger: {
                    sykehistorie: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-sykehistorie").length).to.equal(0)
        });
    });

    describe("Hvordan påvirker sykdommen arbeidsevnen?", () => {
        it("Skal vise dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                utdypendeOpplysninger: {
                    paavirkningArbeidsevne: "I stor grad"
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-paavirkningArbeidsevne").text()).to.equal("I stor grad")
        });

        it("Skal ikke vise dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                utdypendeOpplysninger: {
                    paavirkningArbeidsevne: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-paavirkningArbeidsevne").length).to.equal(0)
        });
    });

    describe("Har behandlingen frem til nå bedret arbeidsevnen?", () => {
        it("Skal vise dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                utdypendeOpplysninger: {
                    resultatAvBehandling: "Gode resultater"
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-resultatAvBehandling").text()).to.equal("Gode resultater")
        });

        it("Skal ikke vise dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                utdypendeOpplysninger: {
                    resultatAvBehandling: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-resultatAvBehandling").length).to.equal(0)
        });
    });

    describe("Beskriv pågående og planlagt henvisning, utredning og/eller behandling", () => {
        it("Skal vise dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                utdypendeOpplysninger: {
                    henvisningUtredningBehandling: "Dette er min beskrivelse"
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-henvisningUtredningBehandling").text()).to.equal("Dette er min beskrivelse")
        });

        it("Skal ikke vise dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getSykmelding({
                utdypendeOpplysninger: {
                    henvisningUtredningBehandling: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-henvisningUtredningBehandling").length).to.equal(0)
        });
    });    

}); 