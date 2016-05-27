import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import milepaelerData from "../../js/milepaelerData";
import Tidslinje from "../../js/components/Tidslinje.js";
import Milepael from "../../js/components/Milepael.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Tidslinje", () => {

    it("Skal rendre en Milepael per tidspunkt", () => {
        let component = shallow(<Tidslinje ledetekster={ledetekster} tidspunkter={milepaelerData} />)
        expect(component.find(Milepael)).to.have.length(milepaelerData.length);
    });

    it("Skal sende inn riktige parametre til hver Milepael", () => {
        let component = shallow(<Tidslinje ledetekster={ledetekster} tidspunkter={milepaelerData} />);
        for(let i = 0; i < milepaelerData.length; i++) {
            expect(component.contains(<Milepael {...milepaelerData[i]} ledetekster={ledetekster} />)).to.equal(true)    
        }
    }); 

}) 