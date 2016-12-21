import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";
import sinon from 'sinon';

import NaermesteLedere, { BekreftFeil } from '../../js/components/NaermesteLedere';
import Lightbox from '../../js/components/Lightbox';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("NaermesteLedere", () => {

    let ledere;

    beforeEach(() => {
        ledere = [{
            navn: "Ole Olsen",
            orgnummer: "123456789",
            organisasjon: "Solstrålen Barnehage"
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

    it("Skal vise BekreftFeil når man klikker på Dette er feil", () => {
       const compo = shallow(<NaermesteLedere ledere={ledere} />);
       compo.find(".js-feil").simulate("click");
       expect(compo.find(BekreftFeil)).to.have.length(1); 
    })

});

describe("BekreftFeil", () => {

    let feil;
    let compo;
    let onBekreft;
    let onAvbryt;
    let leder;
    let preventDefault;

    beforeEach(() => {
        onBekreft = sinon.spy();
        onAvbryt = sinon.spy();
        preventDefault = sinon.spy();
        leder = {
            navn: "Ole Olsen",
            orgnummer: "123456789",
            organisasjon: "Solstrålen Barnehage"
        };
        compo = shallow(<BekreftFeil leder={leder} onBekreft={onBekreft} onAvbryt={onAvbryt} />)
    });

    it("Skal kalle på onBekreft når man klikker på bekreft", () => {
        compo.find(".js-bekreft").simulate("click");
        expect(onBekreft.calledWith("123456789")).to.be.true;
    });

    it("Skal kalle på onAvbryt når man klikker på avbryt", () => {
        compo.find(".js-avbryt").simulate("click", {
            preventDefault
        });
        expect(preventDefault.calledOnce).to.be.true;
        expect(onAvbryt.calledOnce).to.be.true;
    })

})