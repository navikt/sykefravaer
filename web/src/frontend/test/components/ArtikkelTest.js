import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Artikkel from '../../js/components/Artikkel';

chai.use(chaiEnzyme());

const expect = chai.expect;

describe('Artikkel', () => {
    const tittel = 'Min fine artikkel';
    const innhold = '<p>Dette er noe innhold</p>';

    it('Skal vise tittel', () => {
        const component = shallow(<Artikkel tittel={tittel} innhold={innhold} />);
        expect(component.text()).to.contain('Min fine artikkel');
    });

    it('Skal vise innhold som HTML', () => {
        const component = shallow(<Artikkel tittel={tittel} innhold={innhold} />);
        expect(component.html()).to.contain('<p>Dette er noe innhold</p>');
    });
});
