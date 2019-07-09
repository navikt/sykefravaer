import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import { Container, Inngang } from './ArbeidsrettetOppfolgingInngang';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ArbeidsrettetOppfolging', () => {
    it('Skal vise inngang hvis erTiltakSykmeldteInngangAktiv er true på sykeforloepMetadata', () => {
        const wrapper = shallow(<Container skalViseInngang />);
        expect(wrapper.find(Inngang))
            .to
            .have
            .lengthOf(1);
    });

    it('Skal ikke vise inngang hvis erTiltakSykmeldteInngangAktiv er true på sykeforloepMetadata', () => {
        const wrapper = shallow(<Container skalViseInngang={false} />);
        expect(wrapper.find(Inngang))
            .to
            .have
            .lengthOf(0);
    });
});
