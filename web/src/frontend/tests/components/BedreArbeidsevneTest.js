import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import BedreArbeidsevne from "../../js/components/sykmeldingOpplysninger/BedreArbeidsevne.js";
import getSykmelding from "../mockSykmeldinger.js";

let component;

describe("Hva skal til for å bedre arbeidsevnen?", () => {

    describe("tilretteleggingArbeidsplass", () => {
        it("Skal vise tilretteleggingArbeidsplass dersom den finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                arbeidsevne: {
                    tilretteleggingArbeidsplass: "trenger ny pult"
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tilretteleggingArbeidsplass").text()).to.equal("trenger ny pult")
        });

        it("Skal ikke vise tilretteleggingArbeidsplass dersom den ikke finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                arbeidsevne: {
                    tilretteleggingArbeidsplass: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tilretteleggingArbeidsplass").length).to.equal(0)
        });
    });

    describe("tiltakNAV", () => {
        it("Skal vise tiltakNAV dersom den finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                arbeidsevne: {
                    tiltakNAV: "NAV må bli flinkere til å blablabla."
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tiltakNAV").text()).to.equal("NAV må bli flinkere til å blablabla.")
        });

        it("Skal ikke vise tiltakNAV dersom den ikke finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                arbeidsevne: {
                    tiltakNAV: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tiltakNAV").length).to.equal(0)
        });
    });

    describe("tiltakAndre", () => {
        it("Skal vise tiltakAndre dersom den finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                arbeidsevne: {
                    tiltakAndre: "Verden må bli et bedre sted å være. Takk for meg."
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tiltakAndre").text()).to.equal("Verden må bli et bedre sted å være. Takk for meg.")
        });

        it("Skal ikke vise tiltakAndre dersom den ikke finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                arbeidsevne: {
                    tiltakAndre: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tiltakAndre").length).to.equal(0)
        });
    });       


}); 