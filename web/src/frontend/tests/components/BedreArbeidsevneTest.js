import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import BedreArbeidsevne from "../../js/components/BedreArbeidsevne.js";

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

describe("Hva skal til for å bedre arbeidsevnen?", () => {

    describe("tilretteleggingArbeidsplass", () => {
        it("Skal vise tilretteleggingArbeidsplass dersom den finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                tilretteleggingArbeidsplass: "trenger ny pult"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tilretteleggingArbeidsplass").text()).to.equal("trenger ny pult")
        });

        it("Skal ikke vise tilretteleggingArbeidsplass dersom den ikke finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                tilretteleggingArbeidsplass: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tilretteleggingArbeidsplass").length).to.equal(0)
        });
    });

    describe("tiltakNAV", () => {
        it("Skal vise tiltakNAV dersom den finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                tiltakNAV: "NAV må bli flinkere til å blablabla."
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tiltakNAV").text()).to.equal("NAV må bli flinkere til å blablabla.")
        });

        it("Skal ikke vise tiltakNAV dersom den ikke finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                tiltakNAV: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tiltakNAV").length).to.equal(0)
        });
    });

    describe("tiltakAndre", () => {
        it("Skal vise tiltakAndre dersom den finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                tiltakAndre: "Verden må bli et bedre sted å være. Takk for meg."
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tiltakAndre").text()).to.equal("Verden må bli et bedre sted å være. Takk for meg.")
        });

        it("Skal ikke vise tiltakAndre dersom den ikke finnes", () => {
            let component = shallow(<BedreArbeidsevne sykmelding={getSykmelding({
                tiltakAndre: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tiltakAndre").length).to.equal(0)
        });
    });       


}); 