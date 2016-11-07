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
import createSagaMiddleware from 'redux-saga';

import DinSykmeldingSkjema, { DinSykmeldingSkjemaComponent, validate } from "../../js/components/sykmelding/DinSykmeldingSkjema";
import StrengtFortroligInfo from "../../js/components/sykmelding/StrengtFortroligInfo";
import VelgArbeidssituasjon from "../../js/components/sykmelding/VelgArbeidssituasjon";
import { DineSykmeldingOpplysninger } from "digisyfo-npm";
import VelgArbeidsgiver from "../../js/components/sykmelding/VelgArbeidsgiver";
import ArbeidsgiversSykmeldingContainer from "../../js/containers/ArbeidsgiversSykmeldingContainer";
import { Varselstripe } from "digisyfo-npm";
import Checkboxgruppe from '../../js/components/skjema/Checkboxgruppe';
import HvilkeOpplysningerErIkkeRiktige, { SykmeldingFeilaktigeOpplysningerInfo, DuTrengerNySykmelding, DuKanBrukeSykmeldingenDinDiagnoseAndre, DuKanBrukeSykmeldingenDinArbeidsgiver } from '../../js/components/sykmelding/HvilkeOpplysningerErIkkeRiktige';
import ErLederRiktig from '../../js/components/sykmelding/ErLederRiktig';

import { Provider } from 'react-redux';

describe("DinSykmeldingSkjema -", () => {

    let component;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
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
            const modus = component.instance().getSkjemaModus({}, false);
            expect(modus).to.equal("GA_VIDERE")
        })

        it("Skal være AVBRYT dersom periode eller sykmeldingsgrad er feil", () => {
            let values = {
                feilaktigeOpplysninger: {
                    periode: true
                },
                opplysningeneErRiktige: false,
            }
            component = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />); 
            const modus = component.instance().getSkjemaModus(values, false);
            expect(modus).to.equal("AVBRYT")

            values.feilaktigeOpplysninger = {
                sykmeldingsgrad: true,
            }
            let component2 = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />); 
            const modus2 = component2.instance().getSkjemaModus(values, false);
            expect(modus2).to.equal("AVBRYT")
        });

        it("Skal være SEND dersom valgtArbeidssituasjon === 'arbeidstaker'", () => {
            let values = {
                valgtArbeidssituasjon: 'arbeidstaker'
            }
            component = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />); 
            const modus = component.instance().getSkjemaModus(values, false);
            expect(modus).to.equal("SEND")
        });


        it("Skal være BEKREFT dersom arbeidssituasjon === 'arbeidstaker' og valgtArbeidsgiver.orgnummer = '0'", () => {
            let values = {
                valgtArbeidssituasjon: 'arbeidstaker',
                valgtArbeidsgiver: {
                    orgnummer: '0'
                }
            }
            component = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />); 
            const modus = component.instance().getSkjemaModus(values, false);
            expect(modus).to.equal("BEKREFT")
        });

        it("Skal være BEKREFT dersom bruker har strengt fortrolig adresse", () => {
            let values = {
                valgtArbeidssituasjon: 'arbeidstaker'
            }
            component = shallow(<DinSykmeldingSkjemaComponent sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />); 
            const modus = component.instance().getSkjemaModus(values, true);
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
            const sendSykmeldingTilArbeidsgiverStub = sinon.stub().returns({
                then: () => {
                    
                }
            })
            const skjemaData = {};
            skjemaData.values = {};

            component = shallow(<DinSykmeldingSkjemaComponent
                setFeilaktigOpplysning={setFeilaktigOpplysningSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                sendSykmeldingTilArbeidsgiver={sendSykmeldingTilArbeidsgiverStub}
                skjemaData={skjemaData}
                sykmelding={getSykmelding({
                    id: "olsen"
                })}
                handleSubmit={sinon.spy()} />);
            component.instance().handleSubmit({
                valgtArbeidssituasjon: 'arbeidstaker',
                valgtArbeidsgiver: {}
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

    describe("HvilkeOpplysningerErIkkeRiktige - ", () => {

        beforeEach(() => {
            skjemaData.values = {};
            skjemaData.values.opplysningeneErRiktige = false;
        });
        
        it("Skal inneholde en Checkboxgruppe", () => {
            let component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} />
            </Provider>);
            expect(component.find(Checkboxgruppe)).to.have.length(1);
        });

        it("Skal inneholde fem input-felter", () => {
            let component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} />
            </Provider>);
            expect(component.find("input[type='checkbox']")).to.have.length(5);
        });

        it("Skal inneholde SykmeldingFeilaktigeOpplysningerInfo", () => {
            let component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} />
            </Provider>);
            expect(component.find(SykmeldingFeilaktigeOpplysningerInfo)).to.have.length(1);
        });

    });


    describe("SykmeldingFeilaktigeOpplysningerInfo", () => {

        beforeEach(() => {
            skjemaData.values = {};
            skjemaData.values.opplysningeneErRiktige = false;
        });

        it("Skal inneholde 'Du trenger ny sykmelding' dersom periode eller sykmeldingsgrad er blant de feilaktige opplysningene", () => {
            const feilaktigeOpplysninger1 = {
                periode: true
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo ledetekster={ledetekster} feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuTrengerNySykmelding ledetekster={ledetekster} />)).to.be.true;

            const feilaktigeOpplysninger2 = {
                sykmeldingsgrad: true
            };
            let component2 = shallow(<SykmeldingFeilaktigeOpplysningerInfo ledetekster={ledetekster} feilaktigeOpplysninger={feilaktigeOpplysninger2} />);
            expect(component2.contains(<DuTrengerNySykmelding ledetekster={ledetekster} />)).to.be.true;
        }); 

        it("Skal inneholde 'Du kan bruke sykmeldingen din Arbeidsgiver' dersom arbeidsgiver er den eneste feilaktige opplysningen", () => {
            const feilaktigeOpplysninger1 = {
                arbeidsgiver: true,
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo ledetekster={ledetekster} feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver ledetekster={ledetekster} />)).to.be.true;
        }); 

        it("Skal inneholde 'Du kan bruke sykmeldingen din Arbeidsgiver' dersom arbeidsgiver og diagnose er de feilaktige opplysnignene", () => {
            const feilaktigeOpplysninger1 = {
                arbeidsgiver: true,
                diagnose: true,
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo ledetekster={ledetekster} feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver ledetekster={ledetekster} />)).to.be.true;
            expect(component1.contains(<DuTrengerNySykmelding ledetekster={ledetekster} />)).to.be.false;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre ledetekster={ledetekster} />)).to.be.false;
        }); 

        it("Skal inneholde 'Du trenger ny sykmelding' dersom periode og diagnose er de feilaktige opplysningene", () => {
            const feilaktigeOpplysninger1 = {
                periode: true,
                diagnose: true,
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo ledetekster={ledetekster} feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuTrengerNySykmelding ledetekster={ledetekster} />)).to.be.true;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver ledetekster={ledetekster} />)).to.be.false;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre ledetekster={ledetekster} />)).to.be.false;
        });

        it("Skal inneholde 'DuKanBrukeSykmeldingenDinDiagnoseAndre' dersom diagnose er den feilaktige opplysningen", () => {
            const feilaktigeOpplysninger1 = {
                diagnose: true,
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo ledetekster={ledetekster} feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuTrengerNySykmelding ledetekster={ledetekster} />)).to.be.false;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver ledetekster={ledetekster} />)).to.be.false;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre ledetekster={ledetekster} />)).to.be.true;
        });

        it("Skal returnere null dersom ingen opplysninger er feilaktige", () => {
            let component = shallow(<SykmeldingFeilaktigeOpplysningerInfo ledetekster={ledetekster} />);
            expect(component.contains(<DuTrengerNySykmelding ledetekster={ledetekster} />)).to.be.false;
            expect(component.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver ledetekster={ledetekster} />)).to.be.false;
            expect(component.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre ledetekster={ledetekster} />)).to.be.false;    
        })

    }); 

    describe("Velg arbeidssituasjon", () => { 

        let component;

        beforeEach(() => {
            skjemaData.values = {};

            component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} />
            </Provider>);
        });

        it("Viser en select", () => {
            expect(component.find("select")).to.have.length(1);
        });

        it("Setter dropdown til velg om status ikke er satt", function () {
            const dropdown = component.find("select");
            expect(dropdown.value).to.equal(undefined);
        });

        it("Fjerner default når man velger arbeidssituasjon", () => {
            skjemaData.values.valgtArbeidssituasjon = 'arbeidsledig';
            component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} />
            </Provider>);
            expect(component.find("option")).to.have.length(5);
        });

    }); 


    describe("VelgArbeidsgiver", () => { 

        let component;
        let arbeidsgivere; 

        beforeEach(() => {
            skjemaData.values = {};
            skjemaData.values.opplysningeneErRiktige = true;
            skjemaData.values.valgtArbeidssituasjon = 'arbeidstaker';

            arbeidsgivere = [{
                orgnummer: "123456789",
                navn: "Mortens frukt og grønt"
            }, {
                orgnummer: "0", 
                navn: "Annen arbeidsgiver"
            }]

            component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={arbeidsgivere} />
            </Provider>);
        })

        it("Skal inneholde radioknapper", () => {
            expect(component.find("#arbeidsgiver-0")).to.have.length(1);
            expect(component.find("#arbeidsgiver-123456789")).to.have.length(1);
        });

        it("Skal dekorere navn med orgnummer på format 123 456 789", () => {
            expect(component.text()).to.contain("123 456 789");
        });

        it("Skal i utgangspunktet ikke vise mer info", () => {
            expect(component.find(".js-annen-info")).to.have.length(0);
        });

        it("Skal vise mer info dersom man velger annen arbeidsgiver", () => {
            skjemaData.values.valgtArbeidsgiver = {
                orgnummer: "0"
            }
            component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={arbeidsgivere} ledetekster={{}} />
            </Provider>);
            expect(component.find(".js-annen-info")).to.have.length(1);
        });

        it("Skal ikke spørre om oppgitt nærmeste leder er riktig leder dersom man ikke har valgt arbeidsgiver", () => {
            expect(component.find(ErLederRiktig)).to.have.length(0);
        });

        it("Skal ikke spørre om oppgitt nærmeste leder er riktig leder dersom valgt arbeidsgiver ikke har noen ledere", () => {
            skjemaData.values.valgtArbeidsgiver = {
                orgnummer: "123456789",
                navn: "Mortens frukt og grønt"
            }
            component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={arbeidsgivere} />
            </Provider>);
            expect(component.find(ErLederRiktig)).to.have.length(0);
        });

        it("Skal spørre om oppgitt nærmeste leder er riktig leder dersom valgt arbeidsgiver har en leder", () => {
            const arbeidsgivere = [{
                orgnummer: "123456789",
                navn: "Mortens frukt og grønt"
            }, {
                orgnummer: "0", 
                navn: "Annen arbeidsgiver"
            }]
            skjemaData.values.valgtArbeidsgiver = {
                orgnummer: "123456789",
                navn: "Mortens frukt og grønt",
                naermesteLeder: {
                    navn: "Ole Olsen",
                    epost: "ole.olsen@test.no"
                }
            }
            const component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={arbeidsgivere} />
            </Provider>);
            expect(component.find(ErLederRiktig)).to.have.length(1);
        });

    });

    describe("validate", () => {

        let fields = {}

        beforeEach(() => {
            fields = {
                feilaktigeOpplysninger: undefined,
                opplysningeneErRiktige: undefined,
                valgtArbeidssituasjon: undefined,
                valgtArbeidsgiver: undefined
            };
        });

        it("Skal returnere opplysningeneErRiktige og arbeidssituasjon dersom opplysningeneErRiktige === undefined og valgtArbeidssituasjon === undefined", () => {
            const res = validate(fields);
            expect(typeof res.opplysningeneErRiktige).to.equal("string");
            expect(typeof res.valgtArbeidssituasjon).to.equal("string");
        });

        it("Skal returnere opplysningeneErRiktige dersom opplysningeneErRiktige === undefined", () => {
            const res = validate(fields);
            expect(typeof res.opplysningeneErRiktige).to.equal("string");
        });

        it("Skal ikke returnere opplysningeneErRiktige dersom opplysningeneErRiktige === true", () => {
            fields.opplysningeneErRiktige = true;
            const res = validate(fields);
            expect(res.opplysningeneErRiktige).to.be.undefined;
        });

        it("Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === {}", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger = {};
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige")
        });

        it("Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === { periode: false }", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger = {
                periode: false
            };
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige")
        });

        it("Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === { periode: true }", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger = {
                periode: true
            };
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.be.undefined;
        });

        it("Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === { periode: true, sykmeldingsgrad: false }", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger = {
                periode: true,
                sykmeldingsgrad: false,
            };
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.be.undefined;
        });


        it("Skal returnere valgtArbeidssituasjon dersom valgtArbeidssituasjon = 'arbeidstaker'", () => {
            fields.valgtArbeidssituasjon = undefined;
            const res = validate(fields);
            expect(res.valgtArbeidssituasjon).to.be.defined;
        });

        it("Skal ikke returnere valgtArbeidssituasjon dersom valgtArbeidssituasjon === 'arbeidstaker'", () => {
            fields.valgtArbeidssituasjon = 'arbeidstaker';
            const res = validate(fields);
            expect(res.valgtArbeidssituasjon).to.be.undefined;
        });

        it("Skal returnere valgtArbeidsgiver dersom valgtArbeidssituasjon === 'arbeidstaker' og valgtArbeidsgiver === undefined", () => {
            fields.valgtArbeidssituasjon = 'arbeidstaker';
            const res = validate(fields);
            expect(res.valgtArbeidsgiver).to.be.defined;
        });

        it("Skal ikke returnere valgtArbeidsgiver dersom valgtArbeidssituasjon === 'arbeidstaker' og valgtArbeidsgiver === {}", () => {
            fields.valgtArbeidssituasjon = 'arbeidstaker';
            fields.valgtArbeidsgiver = {
                orgnummer: "***REMOVED***",
                navn: "Alna Frisør"
            }
            const res = validate(fields);
            expect(res.valgtArbeidsgiver).to.be.undefined;
        });

        it("Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og periode er feilaktig", () => {
            fields = {"opplysningeneErRiktige":false,"feilaktigeOpplysninger":{"periode":true}};
            const res = validate(fields);
            expect(res).to.deep.equal({});
        });

        it("Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og sykmeldingsgrad er feilaktig", () => {
            fields = {"opplysningeneErRiktige":false,"feilaktigeOpplysninger":{"sykmeldingsgrad":true}};
            const res = validate(fields);
            expect(res).to.deep.equal({});
        });

        it("SKal returnere valgtArbeidssituasjon dersom opplysningeneErRiktige === false og alt annet er undefined", () => {
            fields.opplysningeneErRiktige = false;
            fields.beOmNyNaermesteLeder = true;
            const res = validate(fields);
            expect(res).to.deep.equal({
                valgtArbeidssituasjon: "Vennligst oppgi din arbeidssituasjon",
                feilaktigeOpplysninger: "Vennligst oppgi hvilke opplysninger som ikke er riktige"
            })
        });

        it("Skal returnere {} dersom  opplysningeneErRiktige === true og valgtArbeidssituasjon === 'arbeidstaker' og man har strengt fortrolig adresse", () => {
            fields.opplysningeneErRiktige = true;
            fields.beOmNyNaermesteLeder = true,
            fields.valgtArbeidssituasjon = 'arbeidstaker';
            const props = {
                harStrengtFortroligAdresse: true,
            }
            const res = validate(fields, props);
            expect(res).to.deep.equal({})
        });

        it("Skal returnere beOmNyNaermesteLeder dersom beOmNyNaermesteLeder === undefined", () => {
            const res = validate(fields);
            expect(typeof res.beOmNyNaermesteLeder).to.equal("string");
        });


    });



});