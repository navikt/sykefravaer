import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import FoerDuBegynner from '../../../js/components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import FoerDuBegynnerContainer from '../../../js/containers/sykepengesoknad/FoerDuBegynnerContainer';
import GenerellSoknadContainer from '../../../js/containers/sykepengesoknad/GenerellSoknadContainer';

describe("FoerDuBegynnerContainer", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<FoerDuBegynnerContainer />);
    });

    it("Skal inneholde en GenerellSoknadContainer med riktige props", () => {
        expect(component.find(GenerellSoknadContainer)).to.have.length(1);
        expect(component.find(GenerellSoknadContainer).prop("Component")).to.deep.equal(FoerDuBegynner);
        expect(component.find(GenerellSoknadContainer).prop("Brodsmuler")).to.be.defined;
    });

});