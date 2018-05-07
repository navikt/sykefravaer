import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Field } from 'redux-form';
import Datovelger, { DatoField, MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from '../../../../js/components/skjema/datovelger/Datovelger';
import DaypickerComponent from '../../../../js/components/skjema/datovelger/DayPicker';

chai.use(chaiEnzyme());
const expect = chai.expect;


describe('Datovelger', () => {
    let component;
    let input;
    let meta;
    let preventDefault;
    let stopImmediatePropagation;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    describe('Datovelger', () => {
        beforeEach(() => {
            component = shallow(<Datovelger name="halla" prop="minprop" />);
        });

        it('Skal inneholde et Field', () => {
            expect(component.find(Field)).to.have.length(1);
        });

        it('Skal sende en validate-funksjon videre til Field', () => {
            expect(typeof component.find(Field).prop('validate')).to.equal('function');
        });

        it('Skal sende props videre til Field', () => {
            expect(component.find(Field).prop('name')).to.equal('halla');
            expect(component.find(Field).prop('prop')).to.equal('minprop');
        });
    });

    describe('DatoField', () => {
        beforeEach(() => {
            input = {
                value: '',
            };
            meta = {
                touched: false,
                error: '',
            };
            component = shallow(<DatoField input={input} meta={meta} id="olsen" />);
            preventDefault = sinon.spy();
            stopImmediatePropagation = sinon.spy();
        });


        it('Skal sette erApen til false', () => {
            expect(component.state()).to.deep.equal({
                erApen: false,
            });
        });

        it('Skal inneholde et MaskedInput-felt med riktig ID', () => {
            expect(component.find('MaskedInput#olsen[type="tel"]')).to.have.length(1);
        });

        describe('Når man klikker på toggle', () => {
            let dp;

            beforeEach(() => {
                component.find('.js-toggle').simulate('click', {
                    preventDefault,
                });
                dp = component.find(DaypickerComponent);
            });

            it('Skal sette erApen til true', () => {
                expect(component.state()).to.deep.equal({
                    erApen: true,
                });
            });

            it('Skal sende med dager, måneder og år på norsk', () => {
                expect(dp.prop('weekdaysShort')).to.equal(WEEKDAYS_SHORT);
                expect(dp.prop('weekdaysLong')).to.equal(WEEKDAYS_LONG);
                expect(dp.prop('months')).to.equal(MONTHS);
            });
        });

        describe('Når man klikker på toggle to ganger', () => {
            beforeEach(() => {
                component = mount(<DatoField input={input} meta={meta} id="olsen" />);
                component.find('.js-toggle').simulate('click', {
                    preventDefault,
                    stopImmediatePropagation,
                });
                component.find('.js-toggle').simulate('click', {
                    preventDefault,
                    stopImmediatePropagation,
                });
            });

            it('Skal sette erApen til false', () => {
                expect(component.state()).to.deep.equal({
                    erApen: false,
                });
            });
        });
    });
});
