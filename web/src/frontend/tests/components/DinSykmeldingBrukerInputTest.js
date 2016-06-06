import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Dropdown from '../../js/components/Dropdown.js';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());

const expect = chai.expect;

import DinSykmeldingBrukerInput from "../../js/components/DinSykmeldingBrukerInput.js";

describe("DinSykmeldingBrukerInput", () => {

    const arbeidssituasjoner = [
        {
            'tekst': 'Velg arbeidssituasjon',
            'verdi': 'default',
            'skjult': true,
        },
        {
            'tekst': 'Arbeidstaker',
            'verdi': 'arbeidstaker',
        },
        {
            'tekst': 'Test',
            'verdi': 'test',
        }
    ];

    it("Prepopulerer dropdown om status er satt", function () {
        const sykmelding = { arbeidssituasjon: 'test' };

        const component = shallow(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                            arbeidssituasjoner={arbeidssituasjoner}
                                                            ledetekster={ledetekster}
        />);
        const dropdown = component.find(Dropdown);
        expect(component.find(Dropdown)).to.have.length(1);
        expect(dropdown.prop('alternativer')).to.deep.equal(arbeidssituasjoner);
        expect(dropdown.prop('valgtAlternativ')).to.equal('test');
    });

    it("Setter dropdown til velg om status ikke er satt", function () {
        const sykmelding = {};

        const component = shallow(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                            arbeidssituasjoner={arbeidssituasjoner}
                                                            ledetekster={ledetekster}/>);
        const dropdown = component.find(Dropdown);
        expect(component.find(Dropdown)).to.have.length(1);
        expect(dropdown.prop('valgtAlternativ')).to.equal(undefined);
    });

    it("Validering slår ut om dropdown ikke er valgt", function () {
        const sykmelding = {};
        const component = mount(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                          arbeidssituasjoner={arbeidssituasjoner}
                                                          ledetekster={ledetekster}
        />);
        component.simulate('submit');
        expect(component.state('forsoktSendt')).to.be.true;
    });

    it("Sending går igjennom", function () {
        const sykmelding = { arbeidssituasjon: 'test' };
        var stub = sinon.stub(DinSykmeldingBrukerInput.prototype, "redirect");
        const component = mount(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                          arbeidssituasjoner={arbeidssituasjoner}
                                                          ledetekster={ledetekster}/>);
        component.simulate('submit');
        expect(component.state('forsoktSendt')).to.be.false;
        expect(stub.calledOnce).to.be.true;
    });

    it("setArbeidssituasjon blir kalt når arbeidssituasjon velges", function () {
        const sykmelding = { id: 23 };
        const spy = sinon.spy();
        const component = mount(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                          arbeidssituasjoner={arbeidssituasjoner}
                                                          setArbeidssituasjon={spy}
                                                          ledetekster={ledetekster}
        />);
        component.find('select').simulate('change', {
            target: {
                value: "test"
            }
        });
        expect(spy.calledOnce).to.be.true;
        expect(spy.getCall(0).args[0]).to.equal('test');
        expect(spy.getCall(0).args[1]).to.equal(23);
    })
}); 