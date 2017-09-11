import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { RollerSide, mapStateToProps } from "../../js/containers/RollerContainer";
import Artikkel from '../../js/components/Artikkel';

describe("RollerContainer", () => {

    describe("RollerSide", () => {

        it("Skal vise en artikkel", () => {
            let component = shallow(<RollerSide brodsmuler={[{}]}/>);
            expect(component.find(Artikkel)).to.have.length(1);
        });
    })

}); 