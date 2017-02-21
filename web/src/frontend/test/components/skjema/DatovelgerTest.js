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

import Datovelger, { DatoField, Caption, MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT, validerDatoField } from '../../../js/components/skjema/Datovelger';
import DaypickerComponent from '../../../js/components/skjema/DayPicker';

describe("Datovelger", () => {

    let component; 
    let input;
    let meta;
    let preventDefault;
    let stopImmediatePropagation;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    })

    afterEach(() => {
        clock.restore();
    });

    describe("Datovelger", () => {
        beforeEach(() => {
            component = shallow(<Datovelger name="halla" prop="minprop" />);
        });

        it("Skal inneholde et Field", () => {
            expect(component.find(Field)).to.have.length(1);
            expect(component.find(Field).prop("skjemanavn")).to.deep.equal("SYKEPENGERSKJEMA");
        });

        it("Skal sende en validate-funksjon videre til Field", () => {
            expect(typeof component.find(Field).prop("validate")).to.equal("function");
        })

        it("Skal sende props videre til Field", () => {
            expect(component.find(Field).prop("name")).to.equal("halla");
            expect(component.find(Field).prop("prop")).to.equal("minprop");
        })
    });

    describe("validerDatoField", () => {
        it("Skal returnere undefined hvis dato ikke er sendt inn", () => {
            const res = validerDatoField();
            expect(res).to.be.undefined;
        });

        it("Skal returnere Datoen må være på formatet dd.mm.åååå hvis dato er på feil format", () => {
            const s = "Datoen må være på formatet dd.mm.åååå";
            const res = validerDatoField("olsen");
            const res2 = validerDatoField("22.02.200")
            expect(res).to.equal(s);
            expect(res2).to.equal(s);
        });

        it("Skal si i fra om at datoen er ugyldig hvis datoen er ugyldig", () => {
            const res = validerDatoField("31.11.2018");
            expect(res).to.equal("Datoen er ikke gyldig");
        });

        it("Skal klage hvis datoen er før fra", () => {
            const res = validerDatoField("30.11.2018", {
                fra: new Date("2018-12-01"),
                til: new Date("2018-12-10"),
            });
            expect(res).to.equal("Datoen må være innenfor perioden 01.12.2018-10.12.2018");
        });

        it("Skal ikke klage hvis datoen er samme dato som fra", () => {
            const res = validerDatoField("01.12.2018", {
                fra: new Date("2018-12-01"),
                til: new Date("2018-12-10"),
            });
            expect(res).to.be.undefined;
        });

        it("Skal ikke klage hvis datoen er etter som fra", () => {
            const res = validerDatoField("02.12.2018", {
                fra: new Date("2018-12-01"),
                til: new Date("2018-12-10"),
            });
            expect(res).to.be.undefined;
        });

        it("Skal klage hvis datoen er etter til", () => {
            const res = validerDatoField("31.12.2018", {
                fra: new Date("2018-12-01"),
                til: new Date("2018-12-10"),
            });
            expect(res).to.equal("Datoen må være innenfor perioden 01.12.2018-10.12.2018");
        });

        it("Skal ikke klage hvis datoen er samme dato som til", () => {
            const res = validerDatoField("10.12.2018", {
                fra: new Date("2018-12-01"),
                til: new Date("2018-12-10"),
            });
            expect(res).to.be.undefined;
        });

        it("Skal klage hvis datoen er etter til hvis bare til er oppgitt", () => {
            const res = validerDatoField("12.12.2018", {
                til: new Date("2018-12-11"),
            });
            expect(res).to.equal("Datoen må være før 11.12.2018");
        });

        it("Skal ikke klage hvis datoen er samme dato som til hvis bare til er oppgitt", () => {
            const res = validerDatoField("11.12.2018", {
                til: new Date("2018-12-11"),
            });
            expect(res).to.be.undefined;
        });

        it("Skal ikke klage hvis datoen er før til hvis bare til er oppgitt", () => {
            const res = validerDatoField("10.12.2018", {
                til: new Date("2018-12-11"),
            });
            expect(res).to.be.undefined;
        });

        it("Skal klage hvis datoen er før fra hvis bare fra er oppgitt", () => {
            const res = validerDatoField("10.12.2018", {
                fra: new Date("2018-12-11"),
            });
            expect(res).to.equal("Datoen må være etter 11.12.2018");
        });

        it("Skal ikke klage hvis datoen er samme dag som fra hvis bare fra er oppgitt", () => {
            const res = validerDatoField("11.12.2018", {
                fra: new Date("2018-12-11"),
            });
            expect(res).to.be.undefined;
        });

        it("Skal ikke klage hvis datoen er etter fra hvis bare fra er oppgitt", () => {
            const res = validerDatoField("12.12.2018", {
                fra: new Date("2018-12-11"),
            });
            expect(res).to.be.undefined;
        });

    });

    describe("DatoField", () => {

        beforeEach(() => {
            input = {
                value: ""
            }
            meta = {
                touched: false,
                error: ""
            }
            component = shallow(<DatoField input={input} meta={meta} id="olsen" />);
            preventDefault = sinon.spy();
            stopImmediatePropagation = sinon.spy();
            
        });


        it("Skal sette erApen til false", () => {
            expect(component.state()).to.deep.equal({
                erApen: false,
            });
        });

        it("Skal ikke vise en DaypickerComponent", () => {
            expect(component.find(DaypickerComponent)).to.have.length(0);
        });

        it("Skal inneholde et MaskedInput-felt med riktig ID", () => {
            expect(component.find('MaskedInput#olsen[type="tel"]')).to.have.length(1);
        });

        describe("Når man klikker på toggle", () => {

            let dp;

            beforeEach(() => {
                component.find(".js-toggle").simulate("click", {
                    preventDefault
                });
                dp = component.find(DaypickerComponent);
            });

            it("Skal vise en DaypickerComponent", () => {
                expect(dp).to.have.length(1);
            });

            it("Skal sende med dager, måneder og år på norsk", () => {
                expect(dp.prop("weekdaysShort")).to.equal(WEEKDAYS_SHORT);
                expect(dp.prop("weekdaysLong")).to.equal(WEEKDAYS_LONG);
                expect(dp.prop("months")).to.equal(MONTHS)
            });

        });

        describe("Når man klikker på toggle to ganger", () => {
            beforeEach(() => {
                component = mount(<DatoField input={input} meta={meta} id="olsen" />);
                component.find(".js-toggle").simulate("click", {
                    preventDefault,
                    stopImmediatePropagation
                });
                component.find(".js-toggle").simulate("click", {
                    preventDefault,
                    stopImmediatePropagation
                });
            });

            it("Skal ikke vise en DaypickerComponent", () => {
                expect(component.find(DaypickerComponent)).to.have.length(0);
            });

        });


    });

});