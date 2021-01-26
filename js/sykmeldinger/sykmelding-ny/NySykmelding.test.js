import React from 'react';
import expect from '../../../test/expect';
import NySykmelding from "./NySykmelding";
import SykmeldingContext from '../contexts/SykmeldingContext';
import {mount} from 'enzyme';

describe('NySykmelding', () => {
    let sykmelding;

    beforeEach(() => {
        sykmelding = {
            id: '60fb7e58-3918-4a3f-8973-ab505b3407b0',
        };
    })

    it('Skal vise veilederpanel med informasjon om tilbakedatert sykmelding hvis sykmelding har merknad "UGYLDING_TILBAKEDATERING"', () => {
        sykmelding = {
            ...sykmelding,
            merknader: [
                {
                    type: 'UGYLDING_TILBAKEDATERING',
                    beskrivelse: 'Dette er en beskrivelse',
                }
            ]
        }
        const Component = () => {
            <SykmeldingContext.Provider value={sykmelding}>
                <NySykmelding />
            </SykmeldingContext.Provider>
        }
        const element = mount(Component)
        expect(element.find(NySykmelding).dive().text()).toBe('Tilbakedateringen kan ikke godkjennes')
    })
})
