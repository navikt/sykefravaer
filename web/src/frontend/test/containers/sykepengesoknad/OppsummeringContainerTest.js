import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Oppsummering from '../../../js/components/sykepengesoknad/Oppsummering/Oppsummering';
import OppsummeringContainer, { Controller } from '../../../js/containers/sykepengesoknad/OppsummeringContainer';
import GenerellSoknadContainer from '../../../js/containers/sykepengesoknad/GenerellSoknadContainer';
import Kvittering from '../../../js/components/sykepengesoknad/Kvittering';
import StartIgjen from '../../../js/components/sykepengesoknad/StartIgjen';

describe("OppsummeringContainer", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<OppsummeringContainer />);
    });

    it("Skal inneholde en GenerellSoknadContainer med riktige props", () => {
        expect(component.find(GenerellSoknadContainer)).to.have.length(1);
        expect(component.find(GenerellSoknadContainer).prop("Component")).to.deep.equal(Controller);
        expect(component.find(GenerellSoknadContainer).prop("Brodsmuler")).to.be.defined;
    });

    describe("Controller", () => {

        let skjemasoknad;

        beforeEach(() => {
            skjemasoknad = {}
        });

        it("SKal vise StartIgjen hvis skjemasoknad ikke finnes", () => {
            const containerComponent = shallow(<Controller sykepengesoknad={{}} />)
            expect(containerComponent.find(StartIgjen)).to.have.length(1);
        })

        it("Skal vise Kvittering hvis søknad har status SENDT", () => {
            const sykepengesoknad = {
                status: "SENDT",
            }
            const containerComponent = shallow(<Controller sykepengesoknad={sykepengesoknad} skjemasoknad={skjemasoknad} />)
            expect(containerComponent.find(Kvittering)).to.have.length(1);
            expect(containerComponent.find(Oppsummering)).to.have.length(0);
        });

        it("Skal vise Oppsummering hvis søknad har status = NY", () => {
            const sykepengesoknad = {
                status: "NY",
            }
            const containerComponent = shallow(<Controller sykepengesoknad={sykepengesoknad} skjemasoknad={skjemasoknad} />)
            expect(containerComponent.find(Kvittering)).to.have.length(0);
            expect(containerComponent.find(Oppsummering)).to.have.length(1);
        });

    });

});