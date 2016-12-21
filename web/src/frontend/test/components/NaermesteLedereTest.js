import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";
import sinon from 'sinon';

import NaermesteLedere from '../../js/components/NaermesteLedere';
import BekreftFeilLederContainer from '../../js/containers/BekreftFeilLederContainer';
import Lightbox from '../../js/components/Lightbox';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("NaermesteLedere", () => {

    let ledere;

    beforeEach(() => {
        ledere = [{
            navn: "Ole Olsen",
            orgnummer: "123456789",
            organisasjonsnavn: "Solstrålen Barnehage"
        }]
    })

    it("Skal vise ledere", () => {
        const compo = shallow(<NaermesteLedere ledere={ledere} />)
        expect(compo.text()).to.contain("Ole Olsen");
        expect(compo.text()).to.contain("Solstrålen Barnehage");
    });

    it("Skal vise en lightbox når man klikker på Dette er feil", () => {
        const compo = shallow(<NaermesteLedere ledere={ledere} />);
        compo.find(".js-feil").simulate("click");
        expect(compo.find(Lightbox)).to.have.length(1);
    });

    it("Skal vise BekreftFeilLederContainer når man klikker på Dette er feil", () => {
       const compo = shallow(<NaermesteLedere ledere={ledere} />);
       compo.find(".js-feil").simulate("click");
       expect(compo.find(BekreftFeilLederContainer)).to.have.length(1); 
    })

});