import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import LandingssideLenke from '../../../js/components/landingsside/LandingssideLenke'

describe("LandingsideLenke", () => {
	it('Skal vise tittel', () => {
        let lenke = shallow(<LandingssideLenke tittel="Tittel" undertittel="Undertittel" ikon="ikon" ikonAlt="banan" />);
        expect(lenke.find("h2").length).to.equal(1);
	});

    it('Skal vise tom undertittel om den ikke er definert', () => {
        let lenke = shallow(<LandingssideLenke tittel="Tittel" ikon="ikon" ikonAlt="banan" />);
        expect(lenke.find("p").text()).to.equal('');
    });

	it('Viser undertittel om den er gitt', () => {
        let lenke = shallow(<LandingssideLenke tittel="Tittel" undertittel="Undertittel" ikon="ikon" ikonAlt="banan"  />);
        expect(lenke.find("p").length).to.equal(1);
	});

    it('Viser ikon', () => {
        let lenke = shallow(<LandingssideLenke tittel="Tittel" undertittel="Undertittel" ikon="ikon" ikonAlt="banan" />);
        expect(lenke.find(".peker__ikon").get(0).props.children.props.src).to.equal('/sykefravaer/img/svg/ikon.svg');
        expect(lenke.find(".peker__ikon").get(0).props.children.props.alt).to.equal('banan');
    })
});
