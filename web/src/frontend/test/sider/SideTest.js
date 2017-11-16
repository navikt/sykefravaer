import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import sinon from 'sinon';
import Feilmelding from '../../js/components/Feilmelding';

const DocumentTitle = require('react-document-title');

chai.use(chaiEnzyme());
const expect = chai.expect;

import { SideComponent } from "../../js/sider/Side";
import Brodsmuler from '../../js/components/Brodsmuler';

let component;

describe("SideComponent", () => {

    let component; 
    let brodsmuler = [{
        tittel: 'Dine sykmeldinger',
        sti: '/sykmeldinger',
        erKlikkbar: true,
    }, {
        tittel: 'Sykmelding',
    }];
    let props;
    let erInnlogget;
    let sjekkInnlogging;

    beforeEach(() => {
        sjekkInnlogging = sinon.spy();
        props = {
            erInnlogget: true,
            sjekkInnlogging,
            brodsmuler,
            tittel: "Min side"
        }
        component = mount(<SideComponent {...props}>
            <article>Mitt innhold</article>
        </SideComponent>);
    });

    it("Skal rendre brødsmuler", () => {
        expect(component.contains(<Brodsmuler brodsmuler={brodsmuler} />)).to.be.true;
    }); 

    it("Skal rendre DocumentTitle", () => {
        expect(component.find(DocumentTitle)).to.have.length(1)
    })

    it("Skal rendre innhold som sendes inn", () => {
        expect(component.contains(<article>Mitt innhold</article>)).to.be.true;
        expect(component.find(Feilmelding)).to.have.length(0);
    });

    it("Skal rendre feilmelding hvis bruker er utlogget", () => {
        props.erInnlogget = false;
        const c = mount(<SideComponent {...props}>
            <article>Mitt innhold</article>
        </SideComponent>); 
        expect(c.find(Feilmelding)).to.have.length(1);
    });

}); 