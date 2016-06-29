import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import hendelserData from "../../js/hendelserData";
import Tidslinje from "../../js/components/Tidslinje.js";
import Hendelse from "../../js/components/Hendelse.js";
import TidslinjeVelgArbeidssituasjonContainer from '../../js/containers/TidslinjeVelgArbeidssituasjonContainer.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Tidslinje", () => { 

    it("Skal rendre en Hendelse per tidspunkt", () => {
        let component = shallow(<Tidslinje ledetekster={ledetekster} hendelser={hendelserData} />)
        expect(component.find(Hendelse)).to.have.length(hendelserData.length);
    });

    it("Skal vise en TidslinjeVelgArbeidssituasjonContainer", () => {
        let component = shallow(<Tidslinje ledetekster={ledetekster} hendelser={hendelserData} arbeidssituasjon="MED_ARBEIDSGIVER" />)
        expect(component.find(TidslinjeVelgArbeidssituasjonContainer)).to.have.length(1);
        expect(component.find(TidslinjeVelgArbeidssituasjonContainer).prop("arbeidssituasjon")).to.equal("MED_ARBEIDSGIVER");
    }); 

}) 