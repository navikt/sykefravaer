import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import FravaerOgFriskmelding from '../../../js/components/sykepengesoknad/FravaerOgFriskmelding/FravaerOgFriskmelding';
import FravaerOgFriskmeldingContainer from '../../../js/containers/sykepengesoknad/FravaerOgFriskmeldingContainer';
import GenerellSoknadContainer from '../../../js/containers/sykepengesoknad/GenerellSoknadContainer';

describe.only("FravaerOgFriskmeldingContainer", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<FravaerOgFriskmeldingContainer />);
    });

    it("Skal inneholde en GenerellSoknadContainer med riktige props", () => {
        expect(component.find(GenerellSoknadContainer)).to.have.length(1);
        expect(component.find(GenerellSoknadContainer).prop("Component")).to.deep.equal(FravaerOgFriskmelding);
        expect(component.find(GenerellSoknadContainer).prop("Brodsmuler")).to.be.defined;
    });

});