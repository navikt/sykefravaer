import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import FoerDuBegynner from '../../../js/components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import FoerDuBegynnerContainer, { Controller } from '../../../js/containers/sykepengesoknad/FoerDuBegynnerContainer';
import GenerellSoknadContainer from '../../../js/containers/sykepengesoknad/GenerellSoknadContainer';
import SendtSoknad from '../../../js/components/sykepengesoknad/SendtSoknad';

describe("FoerDuBegynnerContainer", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<FoerDuBegynnerContainer />);
    });

    it("Skal inneholde en Controller med riktige props", () => {
        expect(component.find(GenerellSoknadContainer)).to.have.length(1);
        expect(component.find(GenerellSoknadContainer).prop("Component")).to.deep.equal(Controller);
        expect(component.find(GenerellSoknadContainer).prop("Brodsmuler")).to.be.defined;
    });

    describe("Hvis søknad er SENDT", () => {

        it("Skal vise en SendtSoknad hvis sykepengesoknad.status === 'SENDT'", () => {
            const sykepengesoknad = {
                status: 'SENDT'
            };
            const component = shallow(<Controller sykepengesoknad={sykepengesoknad} />);
            expect(component.find(SendtSoknad)).to.have.length(1);
            expect(component.find(FoerDuBegynner)).to.have.length(0);
        });

        it("Skal vise en FoerDuBegynner hvis sykepengesoknad.status === 'NY'", () => {
            const sykepengesoknad = {
                status: 'NY'
            };
            const component = shallow(<Controller sykepengesoknad={sykepengesoknad} />);
            expect(component.find(FoerDuBegynner)).to.have.length(1);
            expect(component.find(SendtSoknad)).to.have.length(0);
        })

    })

});