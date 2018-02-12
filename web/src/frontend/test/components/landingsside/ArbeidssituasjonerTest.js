import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Arbeidssituasjon from "../../../js/components/landingsside/Arbeidssituasjon";
import Arbeidssituasjoner, {
    Arbeidsgiver,
    mapArbeidssituasjonTilIkonSrc
} from '../../../js/components/landingsside/Arbeidssituasjoner'

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Arbeidssituasjoner', () => {

    describe('mapArbeidssituasjonTilIkonSrc', () => {

        it('Skal mappe Arbeidstaker til arbeidsgiver.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc('Arbeidstaker')).to.contain('arbeidsgiver.svg');
        });

        it('Skal mappe Selvstendig næringsdrivende til id-kort.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc('Selvstendig næringsdrivende')).to.contain('id-kort.svg');
        });

        it('Skal mappe Frilanser til id-kort.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc('Frilanser')).to.contain('id-kort.svg');
        });

        it('Skal mappe Arbeidsledig til skilt.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc('Arbeidsledig')).to.contain('skilt.svg');
        });

        it('Skal mappe Annet til skilt.svg', () => {
            expect(mapArbeidssituasjonTilIkonSrc('Annet')).to.contain('skilt.svg');
        });

    });

    describe('Arbeidssituasjoner', () => {

        it('Skal vise Arbeidssituasjon for arbeidsgivere', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={['SOLSTRÅLEN PIZZA']} arbeidssituasjoner={[]} />);
            expect(component.find(Arbeidssituasjon)).to.have.length(1);
        });

        it('Skal vise Arbeidssituasjon for arbeidssituasjoner', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={[]} arbeidssituasjoner={['Arbeidstaker']} />);
            expect(component.find(Arbeidssituasjon)).to.have.length(1);
        });

        it('Skal ha margin mellom arbeidssituasjoner', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={[]} arbeidssituasjoner={['Arbeidstaker']} />);
            expect(component.find('.situasjon__margin')).to.have.length(1);
        });

        it('Skal vise border mellom arbeidsgivere', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={['SOLSTRÅLEN PIZZA', 'SOLSTRÅLEN BARNEHAGE']} arbeidssituasjoner={[]} />);
            expect(component.find('.situasjon__arbeidsgiver-border')).to.have.length(1);
        });

        it('Skal vise Arbeidsgiver for arbeidsgivere', () => {
            const component = shallow(<Arbeidssituasjoner arbeidsgivere={['SOLSTRÅLEN PIZZA']} arbeidssituasjoner={[]} />);
            expect(component.find(Arbeidssituasjon).props().situasjon).to.deep.equal(<Arbeidsgiver arbeidsgiver={"SOLSTRÅLEN PIZZA"} />);
        });

    });

});