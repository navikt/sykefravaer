import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;
import ledetekster from "../ledetekster_mock.js";
import { lagHtml } from "../../js/components/TidslinjeBudskap.js";

describe.only("TidslinjeBudskap", () => {

    it("Skal vise bilde dersom det finnes bilde", () => {
        let html = lagHtml("Olsen", "Olsen.jpg");
        expect(html).to.deep.equal({
            __html: '<div class=\"side-innhold milepael-budskap\"><img class=\"js-img\" alt=\"\" src=\"Olsen.jpg\" /> Olsen</div>'
        });
    });

    it("Skal vise alt-tekst dersom det finnes bilde og alt-tekst", () => {
        let html = lagHtml("Olsen", "Olsen.jpg", "Mr. Olsen");
        expect(html).to.deep.equal({
            __html: '<div class=\"side-innhold milepael-budskap\"><img class=\"js-img\" alt=\"Mr. Olsen\" src=\"Olsen.jpg\" /> Olsen</div>'
        });
    })

    it("Skal ikke vise bilde dersom det ikke finnes bilde", () => {
        let html = lagHtml("Hansen");
        expect(html).to.deep.equal({
            __html: '<div class=\"side-innhold milepael-budskap\">Hansen</div>'
        });
    })


}); 