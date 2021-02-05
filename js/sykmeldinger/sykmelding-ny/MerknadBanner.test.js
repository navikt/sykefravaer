import { shallow } from 'enzyme';
import React from 'react';
import MerknadBanner from './MerknadBanner';
import expect from '../../../test/expect';

describe('MerknadBanner', () => {
    it('Skal vise riktig innhold ved UGYLDIG_TILBAKEDATERING merknad', () => {
        const sykmelding = {
            merknader: [
                {
                    type: 'UGYLDIG_TILBAKEDATERING',
                },
            ],
        };

        const component = shallow(<MerknadBanner sykmelding={sykmelding} />);

        expect(component.find('.js-merknad-banner-title')).to.contain(
            'Tilbakedateringen kan ikke godkjennes',
        );
    });

    it('Skal vise riktig innhold ved KREVER_FLERE_OPPLYSNINGER merknad', () => {
        const sykmelding = {
            merknader: [
                {
                    type: 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
                },
            ],
        };

        const component = shallow(<MerknadBanner sykmelding={sykmelding} />);

        expect(component.find('.js-merknad-banner-title')).to.contain(
            'Behov for mer opplysninger',
        );
    });

    it('Skal ikke vise noe manglende merknad', () => {
        const sykmelding = {
            merknader: [],
        };

        const component = shallow(<MerknadBanner sykmelding={sykmelding} />);

        // linter complains about empty "being" a function when it's not
        // eslint-disable-next-line no-unused-expressions
        expect(component).to.be.empty;
    });
});
