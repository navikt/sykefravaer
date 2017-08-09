import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import GodkjennPlan from "../../../js/components/oppfolgingsdialoger/GodkjennPlan";
import {
    GodkjennPlanOversikt,
    GodkjennPlanMottatt,
    OppfolgingsdialogSamtykke,
} from "oppfolgingsdialog-npm";
import getOppfolgingsdialog from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

const oppfolgingsdialog = getOppfolgingsdialog();

describe("GodkjennPlan", () => {

    let component;

    it("Skal vise en GodkjennPlanOversikt, om plan ikke er godkjent av Sykmeldt", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            godkjentAvArbeidsgiver: false,
        });
        component = shallow(<GodkjennPlan oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(GodkjennPlanOversikt)).to.have.length(1);
    });

    it("Skal vise en GodkjennPlanMottatt, om plan er godkjent av Sykmeldt, men ikke av Arbeidsgiver", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            godkjentAvArbeidsgiver: true,
        });
        component = shallow(<GodkjennPlan oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(GodkjennPlanMottatt)).to.have.length(1);
    });

    it("Skal vise en OppfolgingsdialogSamtykke, om plan er godkjent", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {});
        component = shallow(<GodkjennPlan oppfolgingsdialog={oppfolgingsdialog} />);
        component.setState({side: 1});
        expect(component.find(OppfolgingsdialogSamtykke)).to.have.length(1);
    });

});
