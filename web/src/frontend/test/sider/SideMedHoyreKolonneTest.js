import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";
import InnloggingContainer from "../../js/containers/InnloggingContainer";
const DocumentTitle = require('react-document-title');

chai.use(chaiEnzyme());
const expect = chai.expect;

import SideMedHoyreKolonne from "../../js/sider/SideMedHoyrekolonne";
import Brodsmuler from '../../js/components/Brodsmuler';

let component;

describe("SideMedHoyreKolonne", () => {

    let component; 
    let brodsmuler = [{
        tittel: 'Dine sykmeldinger',
        sti: '/sykmeldinger',
        erKlikkbar: true,
    }, {
        tittel: 'Sykmelding',
    }]; 

    beforeEach(() => {
        
        component = shallow(<SideMedHoyreKolonne tittel="Min side" brodsmuler={brodsmuler}>
            <article id="mitt-innhold">Mitt innhold</article>
            </SideMedHoyreKolonne>);
    })

    it("Skal rendre DocumentTitle", () => {
        expect(component.find(DocumentTitle)).to.have.length(1)
    })

    it("Skal rendre innhold som sendes inn", () => {
        expect(component.contains(<article id="mitt-innhold">Mitt innhold</article>)).to.equal(true);
    });

    it("SKal vise aside med disclaimer", () => {
        expect(component.find("aside")).to.have.length(1)
        expect(component.find("aside").text()).to.contain("Dette er en tjeneste som fortsatt er under utvikling. Gi oss tilbakemelding slik at vi kan bli bedre!")
        expect(component.find("aside").text()).to.contain("Gi tilbakemelding")
    }); 

    it("Skal wrappe children i en InnloggingContainer", () => {
       expect(component.find(InnloggingContainer)).to.have.length(1);
       expect(component.find(InnloggingContainer).find("#mitt-innhold")).to.have.length(1);
    });



}); 