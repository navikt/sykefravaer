import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Plan from "../../../js/components/oppfolgingsdialoger/Plan";
import GodkjennPlan from "../../../js/components/oppfolgingsdialoger/GodkjennPlan";
import {
    OppfolgingsdialogSide,
    GodkjennPlanSendt,
    GodkjentPlan,
} from "oppfolgingsdialog-npm";
import getOppfolgingsdialog from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

const oppfolgingsdialog = getOppfolgingsdialog();

describe("Plan", () => {

    let component;

    it("Skal vise en OppfolgingsdialogSide", () => {
        component = shallow(<Plan oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(OppfolgingsdialogSide)).to.have.length(1);
    });

    it("Skal vise en GodkjennPlan, om plan ikke er godkjent av Sykmeldt", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            godkjentAvArbeidstaker: false,
        });
        component = shallow(<Plan oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(GodkjennPlan)).to.have.length(1);
    });

    it("Skal vise en GodkjennPlanSendt, om plan er godkjent av Sykmeldt, men ikke av Arbeidsgiver", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            godkjentAvArbeidstaker: true,
            godkjentAvArbeidsgiver: false,
        });
        component = shallow(<Plan oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(GodkjennPlanSendt)).to.have.length(1);
    });

    it("Skal vise en GodkjentPlan, om plan er godkjent av Sykmeldt og Arbeidsgiver", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            godkjentAvArbeidstaker: true,
            godkjentAvArbeidsgiver: true
        });
        component = shallow(<Plan oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(GodkjentPlan)).to.have.length(1);
    });

});
