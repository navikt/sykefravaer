import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Sporsmal from '../../../js/components/soknad-felles/Sporsmal';
import Undersporsmal from '../../../js/components/soknad-felles/Undersporsmal';
import { getSoknad } from '../../mockSoknader';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Sporsmal', () => {
    let soknad;

    beforeEach(() => {
        soknad = getSoknad();
    });

    it('Skal rendre et Underspørsmål hvis spørsmålet har Underspørsmål med svar', () => {
        const sporsmal = soknad.sporsmal[1];
        const component = shallow(<Sporsmal sporsmal={sporsmal} />);
        expect(component.find(Undersporsmal)).to.have.length(1);
    });
});

