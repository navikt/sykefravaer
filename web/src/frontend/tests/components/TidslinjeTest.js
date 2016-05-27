import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import informasjonsdata from "../../js/informasjonsdata";
import Tidslinje from "../../js/components/Tidslinje.js";
import Milepael from "../../js/components/Milepael.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Tidslinje", () => {

    it("Skal rendre en Milepael per tidspunkt", () => {
        let component = shallow(<Tidslinje ledetekster={ledetekster} tidspunkter={informasjonsdata} />)
        expect(component.find(Milepael)).to.have.length(informasjonsdata.length);
    });

    it("Skal sende inn riktige parametre til hver Milepael", () => {
        let component = shallow(<Tidslinje ledetekster={ledetekster} tidspunkter={informasjonsdata} />);
        for(let i = 0; i < informasjonsdata.length; i++) {
            expect(component.contains(<Milepael {...informasjonsdata[i]} ledetekster={ledetekster} />)).to.equal(true)    
        }
    }); 

}) 