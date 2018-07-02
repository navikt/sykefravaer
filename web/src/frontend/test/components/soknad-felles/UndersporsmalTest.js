import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Undersporsmal from '../../../js/components/soknad-felles/Undersporsmal';
import Dato from '../../../js/components/soknad-felles/Dato';
import Tall from '../../../js/components/soknad-felles/Tall';

const expect = chai.expect;

describe('Undersporsmal', () => {
    it('Skal rendre en Dato hvis underspørsmålet har svartype === DATO', () => {
        const undersporsmal = {
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
        const component = shallow(<Undersporsmal sporsmal={undersporsmal} />);
        expect(component.find(Dato)).to.have.length(1);
    });

    it('Skal rendre et Tall hvis underspørsmålet har svartype === TIMER', () => {
        const undersporsmal = {
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
        const component = shallow(<Undersporsmal sporsmal={undersporsmal} />);
        expect(component.find(Tall)).to.have.length(1);
    });
});

