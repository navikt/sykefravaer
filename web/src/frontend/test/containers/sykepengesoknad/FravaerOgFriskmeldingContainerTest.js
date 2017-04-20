import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import FravaerOgFriskmelding from '../../../js/components/sykepengesoknad/FravaerOgFriskmelding/FravaerOgFriskmelding';
import FravaerOgFriskmeldingContainer, { Controller } from '../../../js/containers/sykepengesoknad/FravaerOgFriskmeldingContainer';
import GenerellSoknadContainer from '../../../js/containers/sykepengesoknad/GenerellSoknadContainer';
import Kvittering from '../../../js/components/sykepengesoknad/Kvittering';
import StartIgjen from '../../../js/components/sykepengesoknad/StartIgjen';
import { getSoknad } from '../../mockSoknader';

describe("FravaerOgFriskmeldingContainer", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<FravaerOgFriskmeldingContainer />);
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
            const containerComponent = shallow(<Controller sykepengesoknad={getSoknad()} />)
            expect(containerComponent.find(StartIgjen)).to.have.length(1);
        })

        it("Skal vise Kvittering hvis søknad har status SENDT", () => {
            const sykepengesoknad = getSoknad({
                status: "SENDT",
            });
            const containerComponent = shallow(<Controller sykepengesoknad={sykepengesoknad} skjemasoknad={skjemasoknad} />)
            expect(containerComponent.find(Kvittering)).to.have.length(1);
            expect(containerComponent.find(FravaerOgFriskmelding)).to.have.length(0);
        });

        it("Skal vise FravaerOgFriskmelding hvis søknad har status = NY", () => {
            const sykepengesoknad = getSoknad({
                status: "NY",
            });
            const containerComponent = shallow(<Controller sykepengesoknad={sykepengesoknad} skjemasoknad={skjemasoknad} />)
            expect(containerComponent.find(Kvittering)).to.have.length(0);
            expect(containerComponent.find(FravaerOgFriskmelding)).to.have.length(1);
        });
        
    });

});