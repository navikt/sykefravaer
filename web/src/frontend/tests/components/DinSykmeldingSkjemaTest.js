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

import { Provider } from 'react-redux';

describe("DinSykmeldingSkjema -", () => {

    let component;

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    let store;
    let state;
    let brukerinfo;
    let skjemaData;

    const getField = (value) => {
        return {
            value
        }
    }

    let reduxFormProps = {}

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
                    'arbeidssituasjon': 'arbeidsledig'
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

        it.only("Lagrer opplysningeneErRiktige", () => {
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
                })} />);
            component.instance().handleSubmit({
                arbeidssituasjon: 'arbeidstaker'
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

    describe("Tekst på knapp", () => {

        it("Er 'Bekreft sykmelding' dersom man velger 'naeringsdrivende',", () => {
            reduxFormProps.fields.arbeidssituasjon = getField("naeringsdrivende");
            const sykmelding = { id: '23', arbeidssituasjon: 'naeringsdrivende' };
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} {...reduxFormProps} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

        it("Er 'Bekreft sykmelding' dersom man velger 'frilanser',", () => {
            const sykmelding = { id: '23', arbeidssituasjon: 'frilanser' };
            reduxFormProps.fields.arbeidssituasjon = getField("frilanser");
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} {...reduxFormProps} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

        it("Er 'Bekreft sykmelding' dersom man velger 'annet',", () => {
            const sykmelding = { id: '23', arbeidssituasjon: 'annet' };
            reduxFormProps.fields.arbeidssituasjon = getField("annet");
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} {...reduxFormProps} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

        it("Er 'Bekreft sykmelding' dersom man velger 'arbeidsledig',", () => {
            const sykmelding = { id: '23', arbeidssituasjon: 'arbeidsledig' };
            reduxFormProps.fields.arbeidssituasjon = getField("arbeidsledig");
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} {...reduxFormProps} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

        it("Er 'Bekreft sykmelding' dersom man velger 'arbeidstaker' og deretter 'Annen arbeidsgiver',", () => {
            const sykmelding = { id: '23', arbeidssituasjon: 'arbeidstaker', valgtArbeidsgiver: {orgnummer: '0'} };
            reduxFormProps.fields.opplysningeneErRiktige = {
                value: true
            }
            reduxFormProps.fields.arbeidssituasjon = getField("arbeidstaker");
            reduxFormProps.fields.valgtArbeidsgiver = {
                value: {
                    orgnummer: '0'
                }
            }
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} {...reduxFormProps} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

        it("Er 'Send sykmelding' dersom man velger 'arbeidstaker',", () => {
            const sykmelding = { id: '23', arbeidssituasjon: 'arbeidstaker' };
            reduxFormProps.fields.arbeidssituasjon = getField("arbeidstaker");
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} {...reduxFormProps} />);
            expect(component.find(".js-submit").text()).to.equal("Send sykmelding")
        });

        it("Er 'Bekreft sykmelding' dersom man har strengt fortrolig adresse", () => {
            const sykmelding = { id: '23', arbeidssituasjon: 'arbeidstaker' };
            reduxFormProps.fields.arbeidssituasjon = getField("arbeidstaker");
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} {...reduxFormProps} harStrengtFortroligAdresse={true} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

    }); 



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



});