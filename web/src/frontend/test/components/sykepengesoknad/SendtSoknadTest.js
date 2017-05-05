import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import SendtSoknad, { getNokkelopplysninger} from '../../../js/components/sykepengesoknad/SendtSoknad';
import { Soknad } from 'digisyfo-npm';
import Sidetopp from '../../../js/components/Sidetopp';
import SykmeldingUtdrag from '../../../js/components/sykepengesoknad/SykmeldingUtdrag';
import Soknadstatuspanel from '../../../js/components/sykepengesoknad/Soknadstatuspanel';
import { Avkrysset } from '../../../js/components/sykepengesoknad/SendtSoknad';
import  { getSoknad } from '../../mockSoknader';
import ledetekster from '../../mockLedetekster';
import { Varselstripe, setLedetekster } from 'digisyfo-npm';

describe("SendtSoknad", () => {

    let component; 
    let sykepengesoknad = getSoknad();

    beforeEach(() => {
        setLedetekster(Object.assign({}, ledetekster, {
            'sykepengesoknad.oppsummering.status.label': "Status",
            'sykepengesoknad.status.TIL_SENDING': 'Sendes...'
        }));
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />)
    });

    it("Skal inneholde en Sidetopp", () => {
        expect(component.contains(<Sidetopp tittel="Søknad om sykepenger" />)).to.be.true;
    });

    it("Skal inneholde et SykmeldingUtdrag", () => {
        expect(component.contains(<SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />)).to.be.true;
    });

    it("Skal inneholde en Soknad", () => {
        expect(component.contains(<Soknad sykepengesoknad={sykepengesoknad} tittel={'Oppsummering'}/>)).to.be.true;
    });

    it("Skal inneholde en Avkrysset", () => {
        expect(component.contains(<Avkrysset tekst="Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte" />)).to.be.true;
    });

    it("SKal inneholde en Varselstripe", () => {
        component = mount(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        expect(component.find(Varselstripe)).to.have.length(1);
    });

    it("Skal inneholde Soknadstatuspanel", () => {
        component = mount(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        expect(component.find(Soknadstatuspanel)).to.have.length(1);
    });

});