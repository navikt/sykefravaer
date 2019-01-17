import React from 'react';
import { Field } from 'redux-form';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Alternativer, { Label } from '../../../../js/components/moter/moteplanlegger/Alternativer';
import { SvarMedIkon, NavKan } from '../../../../js/components/moter/moteplanlegger/SvarMedIkon';
import ledetekster from '../../../mock/mockLedetekster';
import getMote, { moteIkkeBesvart } from '../../../mock/mockMote';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Alternativer', () => {
    let getAlternativer;
    let touch;
    let autofill;

    beforeEach(() => {
        touch = sinon.spy();
        autofill = sinon.spy();

        getAlternativer = (_mote, _props = {}) => {
            const mote = getMote(_mote);
            const props = Object.assign({}, {
                mote,
                alternativer: mote.alternativer,
                autofill,
                touch,
                ledetekster,
                meta: {},
                deltakertype: 'Bruker',
            }, _props);
            return shallow(<Alternativer {...props} />);
        };
    });

    describe('Alternativer', () => {
        it('Skal inneholde en liste med alternativer', () => {
            const comp = getAlternativer();
            expect(comp.find('.js-alternativ')).to.have.length(2);
        });

        describe('Når ingen har svart', () => {
            let comp;

            beforeEach(() => {
                comp = getAlternativer(moteIkkeBesvart);
            });

            it('Skal vise 3 Field', () => {
                expect(comp.find(Field)).to.have.length(3);
            });

            it('Skal vise et Field for hvert tidspunkt - i sortert rekkefølge', () => {
                expect(comp.find(Field).at(0).find(Label).prop('tid')).to.deep.equal(new Date('2017-02-25T15:18:24.323'));
                expect(comp.find(Field).at(1).find(Label).prop('tid')).to.deep.equal(new Date('2017-03-07T15:18:24.323'));
            });

            it('Skal vise svaret til annen bruker', () => {
                const annenBruker = moteIkkeBesvart.deltakere[0];
                const annensSvar1 = moteIkkeBesvart.deltakere[0].svar[1];
                const annensSvar2 = moteIkkeBesvart.deltakere[0].svar[0];
                expect(comp.find(SvarMedIkon)).to.have.length(2);
                expect(comp.find(SvarMedIkon).at(0).prop('bruker')).to.deep.equal(annenBruker);
                expect(comp.find(SvarMedIkon).at(1).prop('bruker')).to.deep.equal(annenBruker);
                expect(comp.find(SvarMedIkon).at(0).prop('svar')).to.deep.equal(annensSvar1);
                expect(comp.find(SvarMedIkon).at(1).prop('svar')).to.deep.equal(annensSvar2);
            });

            it('Skal vise svaret til NAV', () => {
                expect(comp.find(NavKan)).to.have.length(2);
            });
        });

        describe('Når ingen har svart og deltakertype === "arbeidsgiver"', () => {
            let comp;

            beforeEach(() => {
                comp = getAlternativer(moteIkkeBesvart, {
                    deltakertype: 'arbeidsgiver',
                });
            });

            it('Skal vise 3 Field', () => {
                expect(comp.find(Field)).to.have.length(3);
            });

            it('Skal vise et Field for hvert tidspunkt - i sortert rekkefølge', () => {
                expect(comp.find(Field).at(0).find(Label).prop('tid')).to.deep.equal(new Date('2017-02-25T15:18:24.323'));
                expect(comp.find(Field).at(1).find(Label).prop('tid')).to.deep.equal(new Date('2017-03-07T15:18:24.323'));
            });

            it('Skal vise svaret til arbeidsgiver', () => {
                const arbeidsgiver = moteIkkeBesvart.deltakere[1];
                const arbeidsgiversSvar1 = arbeidsgiver.svar[1];
                const arbeidsgiversSvar2 = arbeidsgiver.svar[0];
                expect(comp.find(SvarMedIkon)).to.have.length(2);
                expect(comp.find(SvarMedIkon).at(0).prop('bruker')).to.deep.equal(arbeidsgiver);
                expect(comp.find(SvarMedIkon).at(1).prop('bruker')).to.deep.equal(arbeidsgiver);
                expect(comp.find(SvarMedIkon).at(0).prop('svar')).to.deep.equal(arbeidsgiversSvar1);
                expect(comp.find(SvarMedIkon).at(1).prop('svar')).to.deep.equal(arbeidsgiversSvar2);
            });
        });
    });
});
