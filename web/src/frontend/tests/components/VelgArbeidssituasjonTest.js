import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Dropdown from '../../js/components/skjema/Dropdown.js';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());

const expect = chai.expect;

import VelgArbeidssituasjon from "../../js/components/sykmelding/VelgArbeidssituasjon.js";

describe("VelgArbeidssituasjon", () => {

    const arbeidssituasjoner = [{
            tekst: 'Velg arbeidssituasjon',
            verdi: 'default',
        },
        {
            tekst: 'Arbeidstaker',
            verdi: 'arbeidstaker',
        },
        {
            tekst: 'Selvstendig næringsdrivende',
            verdi: 'selvstendig_naeringsdrivende',
        },
        {
            tekst: 'Frilanser', 
            verdi: 'frilanser',
        },
        {
            tekst: 'Arbeidsledig',
            verdi: 'arbeidsledig',
        },
        {
            tekst: 'Annet',
            verdi: 'annet',
        },
    ];

    describe("Velg arbeidssituasjon", () => { 
        it("Prepopulerer dropdown om status er satt", function () {
            const sykmelding = { arbeidssituasjon: 'arbeidstaker' };

            const component = shallow(<VelgArbeidssituasjon sykmelding={sykmelding}
                                                                arbeidssituasjoner={arbeidssituasjoner}
                                                                ledetekster={ledetekster}
            />);
            const dropdown = component.find(Dropdown);
            expect(component.find(Dropdown)).to.have.length(1);
            expect(dropdown.prop('alternativer')).to.deep.equal([
            {
                tekst: 'Arbeidstaker',
                verdi: 'arbeidstaker',
            },
            {
                tekst: 'Selvstendig næringsdrivende',
                verdi: 'selvstendig_naeringsdrivende',
            },
            {
                tekst: 'Frilanser',
                verdi: 'frilanser',
            },
            {
                tekst: 'Arbeidsledig',
                verdi: 'arbeidsledig',
            },
            {
                tekst: 'Annet',
                verdi: 'annet',
            },
        ]);
            expect(dropdown.prop('valgtAlternativ')).to.equal('arbeidstaker');
        });

        it("Setter dropdown til velg om status ikke er satt", function () {
            const sykmelding = {};

            const component = shallow(<VelgArbeidssituasjon sykmelding={sykmelding}
                                                                arbeidssituasjoner={arbeidssituasjoner}
                                                                ledetekster={ledetekster}/>);
            const dropdown = component.find(Dropdown);
            expect(component.find(Dropdown)).to.have.length(1);
            expect(dropdown.prop('valgtAlternativ')).to.equal(undefined);
        });

        it("Setter dropdown til velg om status ikke er satt", function () {
            const sykmelding = {};

            const component = shallow(<VelgArbeidssituasjon sykmelding={sykmelding}
                                                                arbeidssituasjoner={arbeidssituasjoner}
                                                                ledetekster={ledetekster}/>);
            const dropdown = component.find(Dropdown);
            expect(component.find(Dropdown)).to.have.length(1);
            expect(dropdown.prop('valgtAlternativ')).to.equal(undefined);
        });

        it("Fjerner default når man velger arbeidssituasjon", () => {
            const sykmelding = { arbeidssituasjon: 'arbeidstaker' };

            const component = render(<VelgArbeidssituasjon sykmelding={sykmelding}
                                                                arbeidssituasjoner={arbeidssituasjoner}
                                                                ledetekster={ledetekster}
            />);
            expect(component.find("option")).to.have.length(5);
        });

        it("setArbeidssituasjon blir kalt når arbeidssituasjon velges", function () {
            const sykmelding = { id: 23 };
            const spy = sinon.spy();
            const component = mount(<VelgArbeidssituasjon sykmelding={sykmelding}
                                                              arbeidssituasjoner={arbeidssituasjoner}
                                                              setArbeidssituasjon={spy}
                                                              ledetekster={ledetekster}
            />);
            component.find('select').simulate('change', {
                target: {
                    value: "arbeidstaker"
                }
            });
            expect(spy.calledOnce).to.be.true;
            expect(spy.getCall(0).args[0]).to.equal('arbeidstaker');
            expect(spy.getCall(0).args[1]).to.equal(23);
        });

    }); 


}); 