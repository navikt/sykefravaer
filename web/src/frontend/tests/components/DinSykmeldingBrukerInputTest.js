import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Dropdown from '../../js/components/Dropdown.js';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());

const expect = chai.expect;

import DinSykmeldingBrukerInput from "../../js/components/DinSykmeldingBrukerInput.js";

describe("DinSykmeldingBrukerInput", () => {

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

            const component = shallow(<DinSykmeldingBrukerInput sykmelding={sykmelding}
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

            const component = shallow(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                                arbeidssituasjoner={arbeidssituasjoner}
                                                                ledetekster={ledetekster}/>);
            const dropdown = component.find(Dropdown);
            expect(component.find(Dropdown)).to.have.length(1);
            expect(dropdown.prop('valgtAlternativ')).to.equal(undefined);
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

        it("Fjerner default når man velger arbeidssituasjon", () => {
            const sykmelding = { arbeidssituasjon: 'arbeidstaker' };

            const component = render(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                                arbeidssituasjoner={arbeidssituasjoner}
                                                                ledetekster={ledetekster}
            />);
            expect(component.find("option")).to.have.length(5);
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
                    value: "arbeidstaker"
                }
            });
            expect(spy.calledOnce).to.be.true;
            expect(spy.getCall(0).args[0]).to.equal('arbeidstaker');
            expect(spy.getCall(0).args[1]).to.equal(23);
        });

    }); 

    describe("Sending", () => {
        it("Går igjennom", function () {
            const sykmelding = { arbeidssituasjon: 'arbeidstaker' };
            const spy = () => {
                return {
                    then: (func) => {
                        func();
                    }
                };
            }
            var sendStub = sinon.stub(DinSykmeldingBrukerInput.prototype, "gaTilSend");
            const component = mount(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                              arbeidssituasjoner={arbeidssituasjoner}
                                                              ledetekster={ledetekster}
                                                              bekreftSykmelding={spy}/>);
            component.simulate('submit');
            expect(component.state('forsoktSendt')).to.be.false;
            expect(sendStub.calledOnce).to.be.true;
        }); 
    }); 

    describe("Bekreft sykmelding", () => {

        it("Endrer tekst på knapp dersom man velger 'selvstendig_naeringsdrivende',", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'selvstendig_naeringsdrivende' };
            const spy = sinon.spy();
            const component = mount(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                              arbeidssituasjoner={arbeidssituasjoner}
                                                              setArbeidssituasjon={spy}
                                                              ledetekster={ledetekster}
            />);
            expect(component.find(".js-videre")).to.have.value("Bekreft")
        });

        it("Endrer tekst på knapp dersom man velger 'frilanser',", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'frilanser' };
            const spy = sinon.spy();
            const component = mount(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                              arbeidssituasjoner={arbeidssituasjoner}
                                                              setArbeidssituasjon={spy}
                                                              ledetekster={ledetekster}
            />);
            expect(component.find(".js-videre")).to.have.value("Bekreft")
        });

        it("Endrer tekst på knapp dersom man velger 'annet',", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'annet' };
            const spy = sinon.spy();
            const component = mount(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                              arbeidssituasjoner={arbeidssituasjoner}
                                                              setArbeidssituasjon={spy}
                                                              ledetekster={ledetekster}
            />);
            expect(component.find(".js-videre")).to.have.value("Bekreft")
        });

        it("Endrer tekst på knapp dersom man velger 'arbeidsledig',", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'arbeidsledig' };
            const spy = sinon.spy();
            const component = mount(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                              arbeidssituasjoner={arbeidssituasjoner}
                                                              setArbeidssituasjon={spy}
                                                              ledetekster={ledetekster}
            />);
            expect(component.find(".js-videre")).to.have.value("Bekreft")
        });

        xit("Kaller på bekreftSykmelding med sykmeldingId og arbeidssituasjon dersom man klikker på Bekreft-knappen,", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'frilanser' };
            const setSpy = sinon.spy();
            const sendSpy = sinon.spy(); 
            const bekreftSpy = sinon.spy();
            const component = mount(<DinSykmeldingBrukerInput sykmelding={sykmelding}
                                                              arbeidssituasjoner={arbeidssituasjoner}
                                                              setArbeidssituasjon={setSpy}
                                                              ledetekster={ledetekster}
                                                              bekreftSykmelding={bekreftSpy}
            />);
            component.simulate("submit");
            expect(bekreftSpy.calledOnce).to.be.true;
            expect(sendSpy.calledOnce).to.be.false;
            expect(bekreftSpy.getCall(0).args[0]).to.equal(23);
            expect(bekreftSpy.getCall(0).args[1]).to.equal("frilanser");
        }); 

    });



}); 