import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import LandingssideLenke from '../../../js/components/landingsside/LandingssideLenke';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('LandingsideLenke', () => {
    it('Skal vise tittel', () => {
        const lenke = shallow(<LandingssideLenke tittel="Tittel" undertittel="Undertittel" ikon="ikon" ikonAlt="banan" />);
        expect(lenke.find('h2').length).to.equal(1);
    });

    it('Skal ikke vise undertittel om den ikke er definert', () => {
        const lenke = shallow(<LandingssideLenke tittel="Tittel" ikon="ikon" ikonAlt="banan" />);
        expect(lenke.find('p').length).to.equal(0);
    });

    it('Viser ikon', () => {
        const lenke = shallow(<LandingssideLenke tittel="Tittel" undertittel="Undertittel" ikon="ikon" ikonAlt="banan" />);
        expect(lenke.find('.peker__ikon').get(0).props.children.props.src).to.equal('/sykefravaer/img/svg/ikon.svg');
        expect(lenke.find('.peker__ikon').get(0).props.children.props.alt).to.equal('banan');
    });
});
