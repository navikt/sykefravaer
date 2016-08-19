import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";
import ErOpplysningeneRiktige, { HvilkeOpplysningerErIkkeRiktige } from '../../js/components/sykmelding/ErOpplysningeneRiktige';
import Radiogruppe from '../../js/components/skjema/Radiogruppe';
import Checkboxgruppe from '../../js/components/skjema/Checkboxgruppe';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("ErOpplysningeneRiktige", () => {

    it("Skal inneholde en Radiogruppe med spoersmaal = 'Er opplysningene i sykmeldingen riktige?'", () => {
        let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} />);
        expect(component.find(Radiogruppe)).to.have.length(1);
        expect(component.find(Radiogruppe).prop("spoersmaal")).to.equal("Er opplysningene i sykmeldingen riktige?");
    });

    it("Skal inneholde to input-felter", () => {
        let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} />);
        expect(component.contains(<input name="ja" label="Ja, opplysningene er riktige" />)).to.be.true;
        expect(component.contains(<input name="nei" label="Nei, opplysningene er ikke riktige"><HvilkeOpplysningerErIkkeRiktige /></input>)).to.be.true;
    });

    xit("Skal vise HvilkeOpplysningerErIkkeRiktige dersom man velger nei", () => {
        let sykmelding = getSykmelding({
            opplysningeneErRiktige: false,
        })
        let component = mount(<ErOpplysningeneRiktige sykmelding={sykmelding} />);
        expect(component.contains(HvilkeOpplysningerErIkkeRiktige)).to.be.true;
    });

});


describe.only("HvilkeOpplysningerErIkkeRiktige", () => {
    
    it("Skal inneholde en Checkboxgruppe med spoersmaal = 'Hvilke opplysninger er ikke riktige?'", () => {
        let component = shallow(<HvilkeOpplysningerErIkkeRiktige />);
        expect(component.find(Checkboxgruppe)).to.have.length(1);
        expect(component.find(Checkboxgruppe).prop("spoersmaal")).to.equal("Hvilke opplysninger er ikke riktige?")
    });

    it("Skal inneholde fem input-felter", () => {
        let component = shallow(<HvilkeOpplysningerErIkkeRiktige />);
        expect(component.find("input")).to.have.length(5);
        expect(component.contains(<input value="periode" label="Periode" />)).to.be.true;
        expect(component.contains(<input value="sykmeldingsgrad" label="Sykmeldingsgrad" />)).to.be.true;
        expect(component.contains(<input value="arbeidsgiver" label="Arbeidsgiver" />)).to.be.true;
        expect(component.contains(<input value="diagnose" label="Diagnose" />)).to.be.true;
        expect(component.contains(<input value="andre" label="Andre opplysninger" />)).to.be.true;
    });

});