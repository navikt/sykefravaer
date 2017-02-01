import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import AktiviteterISykmeldingsperioden from '../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import AktiviteterISykmeldingsperiodenContainer from '../../../js/containers/sykepengesoknad/AktiviteterISykmeldingsperiodenContainer';
import GenerellSoknadContainer from '../../../js/containers/sykepengesoknad/GenerellSoknadContainer';

describe("AktiviteterISykmeldingsperiodenContainer", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<AktiviteterISykmeldingsperiodenContainer />);
    });

    it("Skal inneholde en GenerellSoknadContainer med riktige props", () => {
        expect(component.find(GenerellSoknadContainer)).to.have.length(1);
        expect(component.find(GenerellSoknadContainer).prop("Component")).to.deep.equal(AktiviteterISykmeldingsperioden);
        expect(component.find(GenerellSoknadContainer).prop("Brodsmuler")).to.be.defined;
    });

});