import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { getSoknad } from '../../mockSykepengesoknader';
import FremtidigSoknadTeaser from '../../../js/components/sykepengesoknader/FremtidigSoknadTeaser';
import { getSoknad as getModerneSoknad } from '../../mockSoknader';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SoknadTeasere', () => {
    it('Viser arbeidsgivernavn om søknaden skal til arbeidsgiver', () => {
        const soknad = getSoknad({
            arbeidsgiver: {
                navn: 'Arbeidsgiver AS',
            },
        });
        const component = shallow(<FremtidigSoknadTeaser soknad={soknad} />);
        expect(component.find('.inngangspanel__undertekst')).to.have.length(1);
        expect(component.find('.inngangspanel__undertekst').text()).to.contain('Arbeidsgiver AS');
    });

    it('Viser ikke arbeidsgivernavn om søknaden er for selvstendig/frilans', () => {
        const soknad = getModerneSoknad();
        const component = shallow(<FremtidigSoknadTeaser soknad={soknad} />);
        expect(component.find('.inngangspanel__undertekst')).to.have.length(0);
    });
});
