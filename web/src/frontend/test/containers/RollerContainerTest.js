import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { RollerSide } from '../../js/containers/RollerContainer';
import Artikkel from '../../js/components/Artikkel';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('RollerContainer', () => {
    describe('RollerSide', () => {
        it('Skal vise en artikkel', () => {
            const component = shallow(<RollerSide brodsmuler={[{}]} />);
            expect(component.find(Artikkel)).to.have.length(1);
        });
    });
});
