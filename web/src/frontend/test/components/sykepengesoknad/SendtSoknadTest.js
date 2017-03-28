import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import SendtSoknad from '../../../js/components/sykepengesoknad/SendtSoknad';
import { Soknad } from 'digisyfo-npm';
import Sidetopp from '../../../js/components/Sidetopp';
import SykmeldingUtdrag from '../../../js/components/sykepengesoknad/SykmeldingUtdrag';
import Statuspanel from '../../../js/components/sykepengesoknad/Statuspanel';
import { Avkrysset } from '../../../js/components/sykepengesoknad/SendtSoknad';
import  { getSoknad } from '../../mockSoknader';
import ledetekster from '../../mockLedetekster';
import { Varselstripe } from 'digisyfo-npm';

describe("SendtSoknad", () => {

    let component; 
    let sykepengesoknad = getSoknad();

    beforeEach(() => {
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />)
    });

    it("Skal inneholde en Sidetopp", () => {
        expect(component.contains(<Sidetopp tittel="Søknad om sykepenger" />)).to.be.true;
    });

    it("Skal inneholde et SykmeldingUtdrag", () => {
        expect(component.contains(<SykmeldingUtdrag ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />)).to.be.true;
    });

    it("Skal inneholde en Soknad", () => {
        expect(component.contains(<Soknad ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} tittel={'Oppsummering'}/>)).to.be.true;
    });

    it("Skal inneholde en Avkrysset", () => {
        expect(component.contains(<Avkrysset tekst="Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte" />)).to.be.true;
    });

    it("SKal inneholde en Varselstripe", () => {
        component = mount(<SendtSoknad sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />);
        expect(component.find(Varselstripe)).to.have.length(1);
    });

    it("Skal inneholde statuspanel", () => {
        component = mount(<SendtSoknad sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />);
        expect(component.find(Statuspanel)).to.have.length(1);
    });
});