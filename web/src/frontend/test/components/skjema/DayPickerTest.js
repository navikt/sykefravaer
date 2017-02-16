import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import DayPicker from 'react-day-picker';
import { Field } from 'redux-form';
import MaskedInput from 'react-maskedinput';
import { connect } from 'react-redux';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Datovelger, { DatoField, validerDatoField } from '../../../js/components/skjema/Datovelger';
import DaypickerComponent, { Caption, MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from '../../../js/components/skjema/DayPicker';

describe("DaypickerComponent", () => {

    let component; 
    let input;
    let meta;
    let preventDefault;
    let stopImmediatePropagation;
    let clock;
    let dp;
    let onKeyUp;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
        input = {
            value: ""
        }
        meta = {
            touched: false,
            error: ""
        }
        onKeyUp = sinon.spy();
        component = shallow(<DaypickerComponent input={input} meta={meta} onKeyUp={onKeyUp} />)
        dp = component.find(DayPicker);
    });

    afterEach(() => {
        clock.restore();
    });

    it("Skal ha en selectedDays-funksjon som returnere false (fordi dato ikke er satt)", () => {
        expect(component.instance().selectedDays(new Date())).to.be.false;
    });

    it("Skal sette initialMonth til dagens måned", () => {
        expect(dp.prop("initialMonth")).to.deep.equal(new Date())
    });

    describe("Når dato er satt", () => {
        beforeEach(() => {
            input.value = "22.02.2017";
            component = shallow(<DaypickerComponent input={input} meta={meta} />);
            component.setState({erApen: true});
        });

        it("Skal sette initialMonth til valgt måned", () => {
            expect(component.find(DayPicker).prop("initialMonth")).to.deep.equal(new Date("2017-02-22"))        
        });

        it("Skal ha en selectedDays-funksjon som returnere true hvis innsendt dato er lik valgt dato", () => {
            expect(component.instance().selectedDays(new Date("2017-02-22"))).to.be.true;
        });

        it("Skal ha en selectedDays-funksjon som returnere true hvis innsendt dato ikke er lik valgt dato", () => {
            expect(component.instance().selectedDays(new Date("2017-02-21"))).to.be.false;
        });
    });

    describe("Når dato er satt til noe ugyldig", () => {
        beforeEach(() => {
            input.value = "22.02.201";
            component = shallow(<DaypickerComponent input={input} meta={meta} id="olsen" />);
            component.setState({erApen: true});
        });

        it("Skal sette initialMonth til dagens måned", () => {
            expect(component.find(DayPicker).prop("initialMonth")).to.deep.equal(new Date())        
        });

        it("Skal ha en selectedDays-funksjon som returnerer false", () => {
            expect(component.instance().selectedDays(new Date("2017-02-22"))).to.be.false;
        });
    });

});