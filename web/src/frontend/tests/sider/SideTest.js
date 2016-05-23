import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
const DocumentTitle = require('react-document-title');

chai.use(chaiEnzyme());
const expect = chai.expect;

import Side from "../../js/sider/Side.js";
import Brodsmuler from '../../js/components/Brodsmuler.js';

let component;

describe("Side", () => {

    let component; 
    let brodsmuler = [{
        tittel: 'Dine sykmeldinger',
        sti: '/sykmeldinger',
        erKlikkbar: true,
    }, {
        tittel: 'Sykmelding',
    }]; 

    beforeEach(() => {
        
        component = mount(<Side tittel="Min side" brodsmuler={brodsmuler}>
            <article>Mitt innhold</article>
            </Side>);
    })

    it("Skal rendre brødsmuler", () => {
        expect(component.contains(<Brodsmuler brodsmuler={brodsmuler} />)).to.equal(true);
    }); 

    it("Skal rendre DocumentTitle", () => {
        expect(component.find(DocumentTitle)).to.have.length(1)
    })

    it("Skal rendre innhold som sendes inn", () => {
        expect(component.contains(<article>Mitt innhold</article>)).to.equal(true);
    });

}); 