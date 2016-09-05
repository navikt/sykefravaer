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

    let reduxFormProps;

    describe("Velg arbeidssituasjon", () => { 

        beforeEach(() => {
            reduxFormProps = {
                fields: {
                    arbeidssituasjon: {
                        value: 'arbeidstaker',
                    }
                }
            }
        })

        it("Prepopulerer dropdown om status er satt", function () {
            const sykmelding = { arbeidssituasjon: 'arbeidstaker' };

            const component = shallow(<VelgArbeidssituasjon 
                sykmelding={sykmelding}
                arbeidssituasjoner={arbeidssituasjoner}
                ledetekster={ledetekster}
                {...reduxFormProps}
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
            const fields = {
                arbeidssituasjon: {
                    value: '',
                }
            }
            const component = shallow(<VelgArbeidssituasjon 
                sykmelding={sykmelding}
                arbeidssituasjoner={arbeidssituasjoner}
                ledetekster={ledetekster}
                fields={fields} />);
            const dropdown = component.find(Dropdown);
            expect(component.find(Dropdown)).to.have.length(1);
            expect(dropdown.prop('valgtAlternativ')).to.equal(undefined);
        });

        it("Fjerner default når man velger arbeidssituasjon", () => {
            const sykmelding = { arbeidssituasjon: 'arbeidsledig' };
            const fields = {
                arbeidssituasjon: {
                    value: 'arbeidsledig',
                }
            }
            const component = render(<VelgArbeidssituasjon 
                sykmelding={sykmelding}
                arbeidssituasjoner={arbeidssituasjoner}
                ledetekster={ledetekster}
                fields={fields}
            />);
            expect(component.find("option")).to.have.length(5);
        });

        it("untouch blir kalt når arbeidssituasjon velges", function () {
            const sykmelding = { id: "23" };
            const untouchSpy = sinon.spy();
            const changeSpy = sinon.spy();
            const blurSpy = sinon.spy();
            const fields = {
                arbeidssituasjon: {
                    value: '',
                    onChange: changeSpy,
                    onBlur: blurSpy,
                }
            }
            const component = mount(<VelgArbeidssituasjon 
                sykmelding={sykmelding}
                arbeidssituasjoner={arbeidssituasjoner}
                ledetekster={ledetekster}
                fields={fields}
                untouch={untouchSpy}
            />);
            component.find('select').simulate('change', {

                target: {
                    value: "slabbedask"
                }
            });
            expect(untouchSpy.calledOnce).to.be.true;
            expect(untouchSpy.getCall(0).args[0]).to.equal('sendSykmelding');
            expect(untouchSpy.getCall(0).args[1]).to.equal('valgtArbeidsgiver');
            expect(changeSpy.calledOnce).to.be.true;
            expect(changeSpy.getCall(0).args[0]).to.equal('slabbedask');
        });

    }); 


}); 