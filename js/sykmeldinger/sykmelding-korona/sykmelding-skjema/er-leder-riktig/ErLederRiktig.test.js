import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from '@navikt/digisyfo-npm';
import ledetekster from '../../../../../test/mock/mockLedetekster';
import ErLederRiktig, { RendreErLederRiktig } from './ErLederRiktig';
import Radioknapper from '../../../../components/skjema/Radioknapper';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('ErLederRiktig', () => {
    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it('Skal inneholde et Field med name = beOmNyNaermesteLeder', () => {
        const component = shallow(<ErLederRiktig />);
        expect(component.find(Field).prop('name')).to.equal('beOmNyNaermesteLeder');
    });

    describe('RendreErLederRiktig', () => {
        let c;
        let props;

        beforeEach(() => {
            props = {
                input: { test: 'test' },
                meta: { test2: 'test2' },
                naermesteLeder: {},
            };
            c = shallow(<RendreErLederRiktig {...props} />);
        });

        it('Skal inneholde to radioknapper', () => {
            expect(c.find('input')).to.have.length(2);
            expect(c.find('input').first().prop('value')).to.equal(false);
            expect(c.find('input').last().prop('value')).to.equal(true);
        });

        it('Skal inneholde Radioknapper', () => {
            expect(c.find(Radioknapper).prop('input')).to.deep.equal(props.input);
            expect(c.find(Radioknapper).prop('meta')).to.deep.equal(props.meta);
        });
    });
});
