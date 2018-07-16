import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Sporsmal from '../../../js/components/soknad-felles/Sporsmal';
import Undersporsmal from '../../../js/components/soknad-felles/Undersporsmal';
import { getSoknad } from '../../mockSoknader';
import Checkbox from '../../../js/components/soknad-felles/Checkbox';
import Tall from '../../../js/components/soknad-felles/Tall';
import Tekstinput from '../../../js/components/soknad-felles/Tekstinput';
import Dato from '../../../js/components/soknad-felles/Dato';

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

    it('Skal rendre et Spørsmål med Checkbox når svartype er CHECKBOX', () => {
        const sporsmal = {
            id: '18',
            kriterieForVisningAvUndersporsmal: null,
            max: null,
            min: null,
            sporsmalstekst: null,
            svar: [],
            svartype: 'CHECKBOX',
            tag: 'CHECKBOXTEST',
            undersporsmal: [],
            undertekst: null,
        };
        const component = shallow(<Sporsmal sporsmal={sporsmal} />);
        expect(component.find(Checkbox)).to.have.length(1);
    });

    it('Skal rendre en Dato hvis underspørsmålet har svartype === DATO', () => {
        const sporsmal = {
            id: '24',
            tag: null,
            sporsmalstekst: 'Når var du tilbake i arbeid?',
            undersporsmal: [],
            kriterieForVisningAvUndersporsmal: null,
            min: new Date('2018-05-09'),
            max: new Date('2018-05-19'),
            svartype: 'DATO',
            svar: [],
        };
        const component = shallow(<Sporsmal sporsmal={sporsmal} />);
        expect(component.find(Dato)).to.have.length(1);
    });

    it('Skal rendre et Tall hvis underspørsmålet har svartype === TIMER', () => {
        const sporsmal = {
            id: '26',
            tag: null,
            sporsmalstekst: 'Hvor mange timer jobbet du normalt per uke som frilanser?',
            min: 0,
            max: 100,
            kriterieForVisningAvUndersporsmal: null,
            undersporsmal: [],
            svartype: 'TIMER',
            svar: [],
        };
        const component = shallow(<Sporsmal sporsmal={sporsmal} />);
        expect(component.find(Tall)).to.have.length(1);
    });

    it('Skal rendre en Tekstinput hvis underspørsmålet har svartype === FRITEKST', () => {
        const sporsmal = {
            id: '26',
            tag: null,
            sporsmalstekst: 'Hvor mange timer jobbet du normalt per uke som frilanser?',
            min: 0,
            max: 0,
            kriterieForVisningAvUndersporsmal: null,
            undersporsmal: [],
            svartype: 'FRITEKST',
            svar: [],
        };
        const component = shallow(<Sporsmal sporsmal={sporsmal} />);
        expect(component.find(Tekstinput)).to.have.length(1);
    });
});

