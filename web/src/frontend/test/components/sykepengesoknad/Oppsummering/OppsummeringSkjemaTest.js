import chai from "chai";
import React from "react";
import { shallow } from "enzyme";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";
import { Field } from "redux-form";

import { OppsummeringForm, SendingFeilet } from "../../../../js/components/sykepengesoknad/Oppsummering/OppsummeringSkjema";
import ForskuttererArbeidsgiver from "../../../../js/components/sykepengesoknad/Oppsummering/ForskuttererArbeidsgiver";
import { getSoknad } from "../../../mockSoknader";
import { setLedetekster, Soknad } from "digisyfo-npm";
import { Link } from "react-router";

import CheckboxSelvstendig from "../../../../js/components/skjema/CheckboxSelvstendig";
import AvbrytSoknadContainer from '../../../../js/containers/sykepengesoknad/AvbrytSoknadContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("OppsummeringSkjema", () => {

    let sendTilFoerDuBegynner;
    let gyldigeVerdier;

    describe("OppsummeringSide", () => {

        let component;
        let skjemasoknad;
        let sykepengesoknad;
        let ledetekster;
        let handleSubmit;

        beforeEach(() => {
            skjemasoknad = getSoknad({
                utdanning: {}
            });
            sykepengesoknad = getSoknad({
                id: "olsen"
            });
            setLedetekster({tekst: "test"});
            handleSubmit = sinon.spy();

            component = shallow(<OppsummeringForm
                backendsoknad={{"backendsoknad": "backendsoknad"}}
                handleSubmit={handleSubmit}
                skjemasoknad={skjemasoknad}
                sykepengesoknad={sykepengesoknad}/>);
        });

        it("Skal inneholde et Field med riktig name", () => {
            expect(component.find(Field)).to.have.length(1);
            expect(component.find(Field).prop("component")).to.deep.equal(CheckboxSelvstendig);
            expect(component.find(Field).prop("name")).to.equal("bekreftetKorrektInformasjon");
        });

        it("Skal inneholde en Soknad med riktige props", () => {
            expect(component.find(Soknad).prop("sykepengesoknad")).to.deep.equal({"backendsoknad": "backendsoknad"})
        });

        it("Skal inneholde en Link til forrige side", () => {
            expect(component.find(Link).prop("to")).to.equal("/sykefravaer/soknader/olsen/aktiviteter-i-sykmeldingsperioden")
        });

        it("SKal inneholde en SendingFeilet hvis sendingFeilet", () => {
            const component2 = shallow(<OppsummeringForm handleSubmit={handleSubmit} skjemasoknad={skjemasoknad}
                                                         sykepengesoknad={sykepengesoknad} sendingFeilet={true}/>);
            expect(component2.find(SendingFeilet)).to.have.length(1);
        });

        it("Skal ikke vise en SendingFeilet hvis sending ikke feilet", () => {
            expect(component.find(SendingFeilet)).to.have.length(0);
        });

        it("Inneholder mottakertekst om vi ikke spør om forskuttering", () => {
            const component2 = shallow(<OppsummeringForm handleSubmit={handleSubmit}
                                                         skjemasoknad={skjemasoknad}
                                                         sykepengesoknad={sykepengesoknad}
                                                         visForskutteringssporsmal={false}/>);
            expect(component2.find('.js-mottaker')).to.have.length(1);
            expect(component2.find(ForskuttererArbeidsgiver)).to.have.length(0);
        });

        it("Inneholder forskuttering og ikke mottaker", () => {
            const component2 = shallow(<OppsummeringForm handleSubmit={handleSubmit}
                                                         skjemasoknad={skjemasoknad}
                                                         sykepengesoknad={sykepengesoknad}
                                                         visForskutteringssporsmal={true}/>);
            expect(component2.find('.js-mottaker')).to.have.length(0);
            expect(component2.find(ForskuttererArbeidsgiver)).to.have.length(1);
        });

        it("Inneholder AvbrytSoknadContainer", () => {
            expect(component.contains(<AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />)).to.be.true;
        })
    });
});