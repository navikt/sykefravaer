import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { arbeidssituasjoner as situasjoner } from '@navikt/digisyfo-npm';
import Arbeidssituasjon from './Arbeidssituasjon';
import Arbeidssituasjoner, {
    Arbeidsgiver,
    mapArbeidssituasjonTilIkonSrc,
} from './Arbeidssituasjoner';

const {
    ARBEIDSTAKER, NAERINGSDRIVENDE, FRILANSER, ARBEIDSLEDIG, ANNET,
} = situasjoner;

chai.use(chaiEnzyme());
const { expect } = chai;

describe('Arbeidssituasjoner', () => {
    describe('mapArbeidssituasjonTilIkonSrc', () => {
        it('Skal mappe Arbeidstaker til arbeidsgiver.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc(ARBEIDSTAKER)).to.contain('arbeidsgiver.svg');
        });

        it('Skal mappe Selvstendig næringsdrivende til id-kort.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc(NAERINGSDRIVENDE)).to.contain('id-kort.svg');
        });

        it('Skal mappe Frilanser til id-kort.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc(FRILANSER)).to.contain('id-kort.svg');
        });

        it('Skal mappe Arbeidsledig til skilt.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc(ARBEIDSLEDIG)).to.contain('skilt.svg');
        });

        it('Skal mappe Annet til skilt.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc(ANNET)).to.contain('skilt.svg');
        });
    });

    describe('Arbeidssituasjoner', () => {
        it('Skal vise Arbeidssituasjon for arbeidsgivere', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={['SOLSTRÅLEN PIZZA']} arbeidssituasjoner={[]} />);
            expect(component.find(Arbeidssituasjon)).to.have.length(1);
        });

        it('Skal vise Arbeidssituasjon for arbeidssituasjoner', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={[]} arbeidssituasjoner={[ARBEIDSTAKER]} />);
            expect(component.find(Arbeidssituasjon)).to.have.length(1);
        });

        it('Skal ha margin mellom arbeidssituasjoner', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={[]} arbeidssituasjoner={[ARBEIDSTAKER]} />);
            expect(component.find('.situasjon__arbeidssituasjon')).to.have.length(1);
        });

        it('Skal vise border mellom arbeidsgivere', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={['SOLSTRÅLEN PIZZA', 'SOLSTRÅLEN BARNEHAGE']} arbeidssituasjoner={[]} />);
            expect(component.find('.situasjon__arbeidsgiver')).to.have.length(1);
        });

        it('Skal vise Arbeidsgiver for arbeidsgivere', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={['SOLSTRÅLEN PIZZA']} arbeidssituasjoner={[]} />);
            expect(component.find(Arbeidssituasjon).props().situasjon).to.deep.equal(<Arbeidsgiver arbeidsgiver="SOLSTRÅLEN PIZZA" />);
        });
    });
});
