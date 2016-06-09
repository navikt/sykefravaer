import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import milepaelerData from "../../js/milepaelerData";
import Tidslinje from "../../js/components/Tidslinje.js";
import Milepael from "../../js/components/Milepael.js";
import TidslinjeVelgArbeidssituasjonContainer from '../../js/containers/TidslinjeVelgArbeidssituasjonContainer.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Tidslinje", () => { 

    it("Skal rendre en Milepael per tidspunkt", () => {
        let component = shallow(<Tidslinje ledetekster={ledetekster} milepaeler={milepaelerData} />)
        expect(component.find(Milepael)).to.have.length(milepaelerData.length);
    });

    it("Skal vise en TidslinjeVelgArbeidssituasjonContainer", () => {
        let component = shallow(<Tidslinje ledetekster={ledetekster} milepaeler={milepaelerData} arbeidssituasjon="MED_ARBEIDSGIVER" />)
        expect(component.find(TidslinjeVelgArbeidssituasjonContainer)).to.have.length(1);
        expect(component.find(TidslinjeVelgArbeidssituasjonContainer).prop("arbeidssituasjon")).to.equal("MED_ARBEIDSGIVER");
    }); 

}) 