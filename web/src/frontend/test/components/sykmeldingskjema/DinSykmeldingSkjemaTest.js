import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import getSykmelding from "../../mockSykmeldinger";
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import DinSykmeldingSkjema, { DinSykmeldingSkjemaComponent, validate } from "../../../js/components/sykmeldingskjema/DinSykmeldingSkjema";
import StrengtFortroligInfo from "../../../js/components/sykmeldingskjema/StrengtFortroligInfo";
import VelgArbeidssituasjon from "../../../js/components/sykmeldingskjema/VelgArbeidssituasjon";
import { DineSykmeldingOpplysninger } from "digisyfo-npm";
import VelgArbeidsgiver from "../../../js/components/sykmeldingskjema/VelgArbeidsgiver";
import ArbeidsgiversSykmeldingContainer from "../../../js/containers/ArbeidsgiversSykmeldingContainer";
import { Varselstripe } from "digisyfo-npm";
import ErLederRiktig from "../../../js/components/sykmeldingskjema/ErLederRiktig";
import ForskuttererArbeidsgiver from "../../../js/components/sykmeldingskjema/ForskuttererArbeidsgiver";
import { Provider } from 'react-redux';

chai.use(chaiEnzyme());
const expect = chai.expect;

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

    it("Skal vise ArbeidsgiversSykmeldingContainer dersom arbeidssituasjon === 'arbeidstaker'", () => {
        skjemaData.values.valgtArbeidssituasjon = 'arbeidstaker';
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={[]} />
        </Provider>);
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
    }); 


    describe("Logikk i skjemaet basert på svar i VelgArbeidsgiver", () => {

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
        });

        it("Skal vise egen tekst for innsending ved JA på bekreft nærmest leder", () => {
            const arbeidsgivere = [{
                orgnummer: "123456789",
                navn: "Mortens frukt og grønt"
            }, {
                orgnummer: "0",
                navn: "Annen arbeidsgiver"
            }];
            skjemaData.values = {
                beOmNyNaermesteLeder: false,
                valgtArbeidssituasjon: 'arbeidstaker',
                valgtArbeidsgiver: {
                    orgnummer: "123456789",
                    navn: "Mortens frukt og grønt",
                    naermesteLeder: {
                        navn: "Ole Olsen",
                        epost: "ole.olsen@test.no"
                    }
            }};
            const ledetekster = {
                'starte-sykmelding.info.send-med-naermeste-leder': 'Sykmeldingen blir sendt til bedriftens innboks i Altinn. Din nærmeste leder vil også få se sykmeldingen ved å logge seg på nav.no. Lederen kan bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det.',
                'starte-sykmelding.knapp.SEND-MED-NAERMESTE-LEDER': 'Send sykmelding',
            };

            const component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={arbeidsgivere} ledetekster={ledetekster}/>
            </Provider>);

            expect(component.text()).to.contain('Sykmeldingen blir sendt til bedriftens innboks i Altinn. Din nærmeste leder vil også få se sykmeldingen ved å logge seg på nav.no. Lederen kan bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det.')
            expect(component.text()).to.contain('Send sykmelding')
        });

        it("Skal ikke vise egen tekst for innsending ved NEI på bekreft nærmest leder", () => {
            const arbeidsgivere = [{
                orgnummer: "123456789",
                navn: "Mortens frukt og grønt"
            }, {
                orgnummer: "0",
                navn: "Annen arbeidsgiver"
            }];
            skjemaData.values = {
                beOmNyNaermesteLeder: true,
                valgtArbeidssituasjon: 'arbeidstaker',
                valgtArbeidsgiver: {
                    orgnummer: "123456789",
                    navn: "Mortens frukt og grønt",
                    naermesteLeder: {
                        navn: "Ole Olsen",
                        epost: "ole.olsen@test.no"
                    }
                }};
            const ledetekster = {
                'starte-sykmelding.info.send-med-naermeste-leder': 'Sykmeldingen blir sendt til bedriftens innboks i Altinn. Din nærmeste leder vil også få se sykmeldingen ved å logge seg på nav.no. Lederen kan bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det.',
                'starte-sykmelding.knapp.SEND-MED-NAERMESTE-LEDER': 'Send sykmelding',
                'starte-sykmelding.info.send': 'Sykmeldingen blir sendt til bedriftens innboks i Altinn. Vi anbefaler at du tipser arbeidsgiveren din om at du har sendt sykmeldingen siden dette er nytt for dem også.',
                'starte-sykmelding.knapp.SEND': 'Send sykmelding',
            };

            const component = mount(<Provider store={store}>
                <DinSykmeldingSkjema sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={arbeidsgivere} ledetekster={ledetekster}/>
            </Provider>);

            expect(component.text()).to.not.contain('Sykmeldingen blir sendt til bedriftens innboks i Altinn. Din nærmeste leder vil også få se sykmeldingen ved å logge seg på nav.no. Lederen kan bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det.')
            expect(component.text()).to.contain('Sykmeldingen blir sendt til bedriftens innboks i Altinn. Vi anbefaler at du tipser arbeidsgiveren din om at du har sendt sykmeldingen siden dette er nytt for dem også.')
            expect(component.text()).to.contain('Send sykmelding')
        });

    });

    describe("validate", () => {

        let fields = {};

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
            expect(res.feilaktigeOpplysninger._error).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige")
        });

        it("Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === { periode: false }", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger = {
                periode: false
            };
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger._error).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige")
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
                feilaktigeOpplysninger: { _error: "Vennligst oppgi hvilke opplysninger som ikke er riktige" }
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