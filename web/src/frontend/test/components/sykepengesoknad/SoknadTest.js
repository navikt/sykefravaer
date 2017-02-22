import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import Soknad from '../../../js/components/sykepengesoknad/Soknad';
import Oppsummering from '../../../js/components/sykepengesoknad/Oppsummering/Oppsummering';
import { Utvidbar } from 'digisyfo-npm';

describe("Soknad", () => {

    let component; 
    let sykepengesoknad = { test: "OK" };
    let ledetekster = {"test": "ledetekst" };

    beforeEach(() => {
        component = shallow(<Soknad sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />)
    });

    it("Skal inneholde en åpen Utvidbar", () => {
        expect(component.find(Utvidbar)).to.have.length(1);
        expect(component.find(Utvidbar).prop("erApen")).to.be.true;
    });

    it("Skal inneholde en Oppsummering", () => {
        expect(component.contains(<Oppsummering sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />)).to.be.true;
    });

    it("Skal inneholde en VaerKlarOverAt", () => {
        expect(component.find(".js-vaer-klar-over-at")).to.have.length(1);
    });

    it("Skal sende apentUtdrag videre til Utvidbar", () => {
        component = shallow(<Soknad sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} apentUtdrag={false} />)
        expect(component.find(Utvidbar).prop("erApen")).to.be.false;
    })

})