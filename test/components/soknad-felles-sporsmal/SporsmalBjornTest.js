import chai from 'chai';
import React from 'react';
import { Bjorn } from '@navikt/digisyfo-npm';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import SporsmalBjorn from '../../../js/components/soknad-felles-sporsmal/SporsmalBjorn';
import { getNySoknadSelvstendig } from '../../mock/mockSoknadSelvstendig';
import mockNySoknadArbeidstaker from '../../mock/mockNySoknadArbeidstaker';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SporsmalBjorn', () => {
    it('Skal vise Bjorn når tag = JOBBET_DU_GRADERT_0 og søknadstype = ARBEIDSTAKERE', () => {
        const component = shallow(<SporsmalBjorn tag="JOBBET_DU_GRADERT_0" soknad={mockNySoknadArbeidstaker()} />);
        expect(component.find(Bjorn)).to.have.length(1);
    });

    it('Skal ikke vise Bjorn når tag = JOBBET_DU_GRADERT_0 og søknadstype = FRILANSERE', () => {
        const component = shallow(<SporsmalBjorn tag="JOBBET_DU_GRADERT_0" soknad={getNySoknadSelvstendig()} />);
        expect(component.find(Bjorn)).to.have.length(0);
    });

    it('Skal ikke vise Bjorn når tag = BLABLA og søknadstype = FRILANSERE', () => {
        const component = shallow(<SporsmalBjorn tag="BLABLA" soknad={getNySoknadSelvstendig()} />);
        expect(component.find(Bjorn)).to.have.length(0);
    });
});
