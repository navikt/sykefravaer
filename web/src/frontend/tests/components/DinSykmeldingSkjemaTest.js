import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DinSykmeldingSkjema, { DinSykmeldingSkjemaComponent } from "../../js/components/sykmelding/DinSykmeldingSkjema";
import StrengtFortroligInfo from "../../js/components/sykmelding/StrengtFortroligInfo";
import VelgArbeidssituasjon from "../../js/components/sykmelding/VelgArbeidssituasjon";
import DineSykmeldingOpplysninger from "../../js/components/sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import VelgArbeidsgiver from "../../js/components/sykmelding/VelgArbeidsgiver";
import ArbeidsgiversSykmeldingContainer from "../../js/containers/ArbeidsgiversSykmeldingContainer";
import Varselstripe from "../../js/components/Varselstripe";
import Checkboxgruppe from '../../js/components/skjema/Checkboxgruppe';
import HvilkeOpplysningerErIkkeRiktige, { SykmeldingFeilaktigeOpplysningerInfo, DuTrengerNySykmelding, DuKanBrukeSykmeldingenDinDiagnoseAndre, DuKanBrukeSykmeldingenDinArbeidsgiver } from '../../js/components/sykmelding/HvilkeOpplysningerErIkkeRiktige';

import { Provider } from 'react-redux';

describe.only("DinSykmeldingSkjema -", () => {

    let component;

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    let store;
    let brukerinfo;
    let skjemaData;

    beforeEach(() => {
        getState = {
            ledetekster: { 
                data: ledetekster,
            },
            arbeidsgiversSykmeldinger: {
                data: [getSykmelding({id: "123"})]
            },
            arbeidsgivere: {
                data: [],
            },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
        };

        store = mockStore(getState);

        brukerinfo = {
            strengtFortroligAdresse: false,
        };

        skjemaData = {
            fields: {},
            values: {}
        }
    });

    it("Skal vise VelgArbeidssituasjon", () => {
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema />
        </Provider>);
        expect(component.find(VelgArbeidssituasjon)).to.have.length(1);
    });

    it("Skal ikke vise VelgArbeidsgiver dersom arbeidssituasjon === undefined", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} />);
        expect(component.find(VelgArbeidsgiver)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal ikke vise VelgArbeidsgiver arbeidssituasjon === 'arbeidsledig'", () => {
        skjemaData.values.valgtArbeidssituasjon = 'arbeidsledig';
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding({
                    'arbeidssituasjon': 'arbeidsledig',
                })} skjemaData={skjemaData} />);
        expect(component.find(VelgArbeidsgiver)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal vise VelgArbeidsgiver og ArbeidsgiversSykmeldingContainer dersom arbeidssituasjon === 'arbeidstaker'", () => {
        skjemaData.values.valgtArbeidssituasjon = 'arbeidstaker';
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={[]} />
        </Provider>);
        expect(component.find(VelgArbeidsgiver)).to.have.length(1);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(1);
    });

    it("Skal vise info om utskrift dersom harStrengtFortroligAdresse = true", () => {
        skjemaData.values.valgtArbeidssituasjon = 'arbeidstaker';
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema sykmelding={getSykmelding()} arbeidsgivere={[]} harStrengtFortroligAdresse={true} skjemaData={skjemaData} ledetekster={ledetekster} />
        </Provider>);
        expect(component.find(StrengtFortroligInfo)).to.have.length(1);
    });

    it("Skal ikke vise info om utskrift dersom harStrengtFortroligAdresse = false", () => {
        skjemaData.values.valgtArbeidssituasjon = 'arbeidstaker';
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema sykmelding={getSykmelding()} ledetekster={ledetekster} harStrengtFortroligAdresse={false} skjemaData={skjemaData} arbeidsgivere={[]} />
        </Provider>);
        expect(component.find(StrengtFortroligInfo)).to.have.length(0);
    });

    describe("getSkjemaModus", () => {

        let component;

        it("Skal være GA_VIDERE by default", () => {
            component = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />);
            const modus = component.instance().getSkjemaModus();
            expect(modus).to.equal("GA_VIDERE")
        })

        it("Skal være AVBRYT dersom periode eller sykmeldingsgrad er feil", () => {
            skjemaData.values = {
                feilaktigeOpplysninger: {
                    periode: true
                },
                opplysningeneErRiktige: false,
            }
            component = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />); 
            const modus = component.instance().getSkjemaModus();
            expect(modus).to.equal("AVBRYT")

            skjemaData.values.feilaktigeOpplysninger = {
                sykmeldingsgrad: true,
            }
            let component2 = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />); 
            const modus2 = component2.instance().getSkjemaModus();
            expect(modus2).to.equal("AVBRYT")
        });

        it("Skal være SEND dersom valgtArbeidssituasjon === 'arbeidstaker'", () => {
            skjemaData.values = {
                valgtArbeidssituasjon: 'arbeidstaker'
            }
            component = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />); 
            const modus = component.instance().getSkjemaModus();
            expect(modus).to.equal("SEND")
        });


        it("Skal være BEKREFT dersom arbeidssituasjon === 'arbeidstaker' og valgtArbeidsgiver.orgnummer = '0'", () => {
            skjemaData.values = {
                valgtArbeidssituasjon: 'arbeidstaker',
                valgtArbeidsgiver: {
                    orgnummer: '0'
                }
            }
            component = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />); 
            const modus = component.instance().getSkjemaModus();
            expect(modus).to.equal("BEKREFT")
        });

        it("Skal være BEKREFT dersom bruker har strengt fortrolig adresse", () => {
            skjemaData.values = {
                valgtArbeidssituasjon: 'arbeidstaker'
            }
            component = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} harStrengtFortroligAdresse handleSubmit={sinon.spy()} />); 
            const modus = component.instance().getSkjemaModus();
            expect(modus).to.equal("BEKREFT")
        });

    });

    describe("handleSubmit", () => {

        let component;

        it("Lagrer opplysningeneErRiktige", () => {
            const setOpplysningeneErRiktigeSpy = sinon.spy();
            const setArbeidssituasjonSpy = sinon.spy();
            const setArbeidsgiverSpy = sinon.spy()
            component = shallow(<DinSykmeldingSkjemaComponent
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                sykmelding={getSykmelding({
                    id: "olsen"
                })}
                handleSubmit={sinon.spy()} />);
            component.instance().handleSubmit({
                opplysningeneErRiktige: true
            });
            expect(setOpplysningeneErRiktigeSpy.calledOnce).to.be.true;
            expect(setOpplysningeneErRiktigeSpy.getCall(0).args[0]).to.equal("olsen");
            expect(setOpplysningeneErRiktigeSpy.getCall(0).args[1]).to.equal(true);
        });

        it("Lagrer feilaktigeOpplysninger", () => {
            const setFeilaktigOpplysningSpy = sinon.spy();
            const setOpplysningeneErRiktigeSpy = sinon.spy();
            const setArbeidssituasjonSpy = sinon.spy();
            const setArbeidsgiverSpy = sinon.spy()

            component = shallow(<DinSykmeldingSkjemaComponent
                setFeilaktigOpplysning={setFeilaktigOpplysningSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                sykmelding={getSykmelding({
                    id: "olsen"
                })}
                handleSubmit={sinon.spy()} />);
            component.instance().handleSubmit({
                feilaktigeOpplysninger: {
                    periode: true,
                    sykmeldingsgrad: true,
                }
            });
            expect(setFeilaktigOpplysningSpy.calledTwice).to.be.true;
            expect(setFeilaktigOpplysningSpy.getCall(0).args[0]).to.equal("olsen");
            expect(setFeilaktigOpplysningSpy.getCall(0).args[1]).to.equal("periode");
            expect(setFeilaktigOpplysningSpy.getCall(0).args[2]).to.equal(true);
            expect(setFeilaktigOpplysningSpy.getCall(1).args[0]).to.equal("olsen");
            expect(setFeilaktigOpplysningSpy.getCall(1).args[1]).to.equal("sykmeldingsgrad");
            expect(setFeilaktigOpplysningSpy.getCall(1).args[2]).to.equal(true);
        });

        it("Lagrer arbeidssituasjon", () => {
            const setFeilaktigOpplysningSpy = sinon.spy();
            const setOpplysningeneErRiktigeSpy = sinon.spy();
            const setArbeidssituasjonSpy = sinon.spy();
            const setArbeidsgiverSpy = sinon.spy()

            component = shallow(<DinSykmeldingSkjemaComponent
                setFeilaktigOpplysning={setFeilaktigOpplysningSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                sykmelding={getSykmelding({
                    id: "olsen"
                })}
                handleSubmit={sinon.spy()} />);
            component.instance().handleSubmit({
                valgtArbeidssituasjon: 'arbeidstaker'
            });
            expect(setArbeidssituasjonSpy.calledOnce).to.be.true;
            expect(setArbeidssituasjonSpy.getCall(0).args[0]).to.equal("arbeidstaker");
            expect(setArbeidssituasjonSpy.getCall(0).args[1]).to.equal("olsen");
        });

        it("Lagrer valgtArbeidsgiver", () => {
            const setFeilaktigOpplysningSpy = sinon.spy();
            const setOpplysningeneErRiktigeSpy = sinon.spy();
            const setArbeidssituasjonSpy = sinon.spy();
            const setArbeidsgiverSpy = sinon.spy()

            component = shallow(<DinSykmeldingSkjemaComponent
                setFeilaktigOpplysning={setFeilaktigOpplysningSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                sykmelding={getSykmelding({
                    id: "887766"
                })}
                handleSubmit={sinon.spy()} />);
            component.instance().handleSubmit({
                valgtArbeidsgiver: {
                    orgnummer: "123456",
                    navn: "Hansens pizzabud"
                }
            });
            expect(setArbeidsgiverSpy.calledOnce).to.be.true;
            expect(setArbeidsgiverSpy.getCall(0).args[0]).to.equal("887766");
            expect(setArbeidsgiverSpy.getCall(0).args[1]).to.deep.equal({
                orgnummer: "123456",
                navn: "Hansens pizzabud"
            });
        });

    })

    xdescribe("Sending", () => {
        it("Går igjennom", function () {
            const sykmelding = getSykmelding({ 
                arbeidssituasjon: 'arbeidstaker', 
                valgtArbeidsgiver: {
                    orgnummer: "12345678",
                    navn: "Olsens Pizza AS"
                },
                id: "123",
            });
            const spy = () => {
                return {
                    then: (func) => {
                        func();
                    }
                };
            }
            var sendStub = sinon.stub(DinSykmeldingSkjema.prototype, "send");
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} sendSykmeldingTilArbeidsgiver={spy}/>);
            component.simulate('submit');
            expect(sendStub.calledOnce).to.be.true;
            sendStub.restore();
        });

        it("Skal vise spinner når det sendes", () => {
            const sykmelding = getSykmelding({ 
                arbeidssituasjon: 'arbeidstaker', 
                valgtArbeidsgiver: {
                    orgnummer: "12345678",
                    navn: "Olsens Pizza AS"
                },
                id: "123",
            });
            const spy = () => {
                return {
                    then: (func) => {
                        func();
                    }
                };
            }
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} sendSykmeldingTilArbeidsgiver={spy} sender={true} />);
            expect(component.find(".js-spinner")).to.have.length(1);
        })
    });

    xdescribe("Bekreft sykmelding", () => {

        it("Kaller på bekreftSykmelding med sykmeldingId og arbeidssituasjon dersom man klikker på Bekreft-knappen,", () => {
            const sykmelding = { id: '23', arbeidssituasjon: 'frilanser' };
            const sendSpy = sinon.spy(); 
            const httpRespons = {
                status: 200
            }
            const bekreft = () => {
                return {
                    then: (func) => {
                        return;
                    }
                };
            }
            let bekreftSpy = sinon.spy(bekreft);
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding}
              ledetekster={ledetekster}
              bekreftSykmelding={bekreftSpy}
              sendSykmeldingTilArbeidsgiver={sendSpy}
            />);
            component.simulate("submit");
            expect(bekreftSpy.calledOnce).to.be.true;
            expect(bekreftSpy.getCall(0).args[0]).to.equal(23);
            expect(bekreftSpy.getCall(0).args[1]).to.equal("frilanser");
        }); 

        it("Kaller på bekreftSykmelding med sykmeldingId og arbeidssituasjon dersom man klikker på Bekreft-knappen når man har strengt fortrolig adresse", () => {
            const sykmelding = { id: '23', arbeidssituasjon: 'arbeidstaker' };
            const sendSpy = sinon.spy(); 
            const httpRespons = {
                status: 200
            }
            const bekreft = () => {
                return {
                    then: (func) => {
                        return;
                    }
                };
            }
            let bekreftSpy = sinon.spy(bekreft);
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding}
              ledetekster={ledetekster}
              bekreftSykmelding={bekreftSpy}
              sendSykmeldingTilArbeidsgiver={sendSpy}
              harStrengtFortroligAdresse={true}
            />);
            component.simulate("submit");
            expect(bekreftSpy.calledOnce).to.be.true;
            expect(bekreftSpy.getCall(0).args[0]).to.equal(23);
            expect(bekreftSpy.getCall(0).args[1]).to.equal("arbeidstaker");
        }); 

    });

    describe("ErOpplysningeneRiktige", () => {

        let skjemaData = {}
        let bekreftSpy;
        let sendSpy;

        beforeEach(() => {
            skjemaData = {
                values: {
                    opplysningeneErRiktige: undefined,
                    feilaktigeOpplysninger: {},
                },
            };
            bekreftSpy = sinon.spy();
            sendSpy = sinon.spy();
        });

        it("Skal inneholde spørsmål", () => {
            let component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={{}}
                  ledetekster={ledetekster}
                  bekreftSykmelding={bekreftSpy}
                  sendSykmeldingTilArbeidsgiver={sendSpy}
                  skjemaData={skjemaData}
                />
            </Provider>);
            expect(component.text()).to.contain("Er opplysningene riktige?")
        }); 

        it("Skal inneholde to input-felter", () => {
            let component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={{}}
                  ledetekster={ledetekster}
                  bekreftSykmelding={bekreftSpy}
                  sendSykmeldingTilArbeidsgiver={sendSpy}
                  skjemaData={skjemaData}
                />
            </Provider>);
            expect(component.find("input")).to.have.length(2);
            expect(component.text()).to.contain("Ja, opplysningene er riktige")
            expect(component.text()).to.contain("Nei, opplysningene er ikke riktige")
        });

        it("Skal vise HvilkeOpplysningerErIkkeRiktige dersom opplysningene ikke er riktige", () => {
            skjemaData.values.opplysningeneErRiktige = false;
            let component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={{}}
                  ledetekster={ledetekster}
                  bekreftSykmelding={bekreftSpy}
                  sendSykmeldingTilArbeidsgiver={sendSpy}
                  skjemaData={skjemaData}
                />
            </Provider>);
            expect(component.find(HvilkeOpplysningerErIkkeRiktige)).to.have.length(1);
        });

        it("Skal ikke vise HvilkeOpplysningerErIkkeRiktige dersom opplysningene er riktige", () => {
            skjemaData.values.opplysningeneErRiktige = true;
            let component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={{}}
                  ledetekster={ledetekster}
                  bekreftSykmelding={bekreftSpy}
                  sendSykmeldingTilArbeidsgiver={sendSpy}
                  skjemaData={skjemaData}
                />
            </Provider>);
            expect(component.find(HvilkeOpplysningerErIkkeRiktige)).to.have.length(0);
        });

    });

    xdescribe("HvilkeOpplysningerErIkkeRiktige", () => {

        beforeEach(() => {
            skjemaData.values = {};
            skjemaData.values.opplysningeneErRiktige = true;
        });
        
        it("Skal inneholde en Checkboxgruppe", () => {
            let component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} />
            </Provider>);
            console.log(component.html())
            expect(component.find(Checkboxgruppe)).to.have.length(1);
        });

        it("Skal inneholde fem input-felter", () => {
            let component = mount(<HvilkeOpplysningerErIkkeRiktige skjemaData={skjemaData}  />);
            expect(component.find("input[type='checkbox']")).to.have.length(5);
        });

        it("Skal inneholde SykmeldingFeilaktigeOpplysningerInfo", () => {
            let component = shallow(<HvilkeOpplysningerErIkkeRiktige skjemaData={skjemaData}  />)
            expect(component.contains(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={{}} />)).to.be.true;
        });

        it("Skal sette valgte feilaktige opplysninger til checked", () => {
            const feilaktigeOpplysninger = {
                periode: true,
                diagnose: true,
            }
            reduxFormProps.fields.feilaktigeOpplysninger.value = feilaktigeOpplysninger;
            let component = mount(<HvilkeOpplysningerErIkkeRiktige skjemaData={skjemaData} sykmeldingId="33" ledetekster={ledetekster} />);
            expect(component.find("input[name='periode']")).to.be.checked();
            expect(component.find("input[name='diagnose']")).to.be.checked();
            expect(component.find("input[name='sykmeldingsgrad']")).not.to.be.checked();
            expect(component.find("input[name='andre']")).not.to.be.checked();
        });

        it("Skal kalle onChange når man velger en checkbox", () => {
            const spy = sinon.spy();
            reduxFormProps.fields.feilaktigeOpplysninger.onChange = spy;
            let component = mount(<HvilkeOpplysningerErIkkeRiktige sykmeldingId="33" setFeilaktigOpplysning={spy} ledetekster={ledetekster}  skjemaData={skjemaData} />);
            component.find("input[name='periode']").simulate("change", {
                target: {
                    checked: true
                }
            });
            component.find("input[name='sykmeldingsgrad']").simulate("change", {
                target: {
                    checked: false
                }
            });
            expect(spy.calledTwice).to.equal(true);
            expect(spy.getCall(0).args[0]).to.deep.equal({
                periode: true
            });
            expect(spy.getCall(1).args[0]).to.deep.equal({
                sykmeldingsgrad: false
            });
        });

        describe("SykmeldingFeilaktigeOpplysningerInfo", () => {

            it("Skal inneholde 'Du trenger ny sykmelding' dersom periode eller sykmeldingsgrad er blant de feilaktige opplysningene", () => {
                const feilaktigeOpplysninger1 = {
                    periode: true
                };
                let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
                expect(component1.contains(<DuTrengerNySykmelding />)).to.be.true;

                const feilaktigeOpplysninger2 = {
                    sykmeldingsgrad: true
                };
                let component2 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger2} />);
                expect(component2.contains(<DuTrengerNySykmelding />)).to.be.true;
            }); 

            it("Skal inneholde 'Du kan bruke sykmeldingen din Arbeidsgiver' dersom arbeidsgiver er den eneste feilaktige opplysningen", () => {
                const feilaktigeOpplysninger1 = {
                    arbeidsgiver: true,
                };
                let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
                expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.true;
            }); 

            it("Skal inneholde 'Du kan bruke sykmeldingen din Arbeidsgiver' dersom arbeidsgiver og diagnose er de feilaktige opplysnignene", () => {
                const feilaktigeOpplysninger1 = {
                    arbeidsgiver: true,
                    diagnose: true,
                };
                let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
                expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.true;
                expect(component1.contains(<DuTrengerNySykmelding />)).to.be.false;
                expect(component1.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre />)).to.be.false;
            }); 

            it("Skal inneholde 'Du trenger ny sykmelding' dersom periode og diagnose er de feilaktige opplysningene", () => {
                const feilaktigeOpplysninger1 = {
                    periode: true,
                    diagnose: true,
                };
                let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
                expect(component1.contains(<DuTrengerNySykmelding />)).to.be.true;
                expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.false;
                expect(component1.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre />)).to.be.false;
            });

            it("Skal inneholde 'DuKanBrukeSykmeldingenDinDiagnoseAndre' dersom diagnose er den feilaktige opplysningen", () => {
                const feilaktigeOpplysninger1 = {
                    diagnose: true,
                };
                let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
                expect(component1.contains(<DuTrengerNySykmelding />)).to.be.false;
                expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.false;
                expect(component1.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre />)).to.be.true;
            });

            it("Skal returnere null dersom ingen opplysninger er feilaktige", () => {
                let component = shallow(<SykmeldingFeilaktigeOpplysningerInfo />);
                expect(component.contains(<DuTrengerNySykmelding />)).to.be.false;
                expect(component.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.false;
                expect(component.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre />)).to.be.false;    
            })

        }); 

    });



});