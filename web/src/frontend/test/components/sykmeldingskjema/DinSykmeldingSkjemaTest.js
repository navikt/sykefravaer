
import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import getSykmelding from "../../mockSykmeldinger";
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import DinSykmeldingSkjema, { DinSykmeldingSkjemaComponent, validate, getSkjemaModus } from "../../../js/components/sykmeldingskjema/DinSykmeldingSkjema";
import StrengtFortroligInfo from "../../../js/components/sykmeldingskjema/StrengtFortroligInfo";
import VelgArbeidssituasjon from "../../../js/components/sykmeldingskjema/VelgArbeidssituasjon";
import { DineSykmeldingOpplysninger } from "digisyfo-npm";
import VelgArbeidsgiver from "../../../js/components/sykmeldingskjema/VelgArbeidsgiver";
import ArbeidsgiversSykmeldingContainer from "../../../js/containers/sykmelding/ArbeidsgiversSykmeldingContainer";
import { Varselstripe } from "digisyfo-npm";
import ErLederRiktig from "../../../js/components/sykmeldingskjema/ErLederRiktig";
import { Provider } from 'react-redux';
import feilaktigeOpplysninger from "../../../js/enums/feilaktigeOpplysninger";
import { hentAktuelleArbeidsgivere } from '../../../js/actions/dineArbeidsgivere_actions';
import deepFreeze from 'deep-freeze';
import { setLedetekster } from 'digisyfo-npm';

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
    let dispatch;
    let registrerInnsending;
    let getState;

    beforeEach(() => {
        setLedetekster(ledetekster);
        deepFreeze(feilaktigeOpplysninger);
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
            form: {
                dinSykmeldingSkjema: {}
            }
        };

        store = mockStore(getState);

        brukerinfo = {
            strengtFortroligAdresse: false,
        };

        skjemaData = {
            fields: {},
            values: {}
        }
        registrerInnsending = sinon.spy();
        dispatch = sinon.spy();
    });

    it("Skal vise VelgArbeidssituasjon", () => {
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()} />
        </Provider>);
        expect(component.find(VelgArbeidssituasjon)).to.have.length(1);
    });

    it("Skal ikke vise VelgArbeidsgiver dersom arbeidssituasjon === undefined", () => {
        component = shallow(<DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()} skjemaData={skjemaData} />);
        expect(component.find(VelgArbeidsgiver)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal ikke vise VelgArbeidsgiver arbeidssituasjon === 'ARBEIDSLEDIG'", () => {
        skjemaData.values.valgtArbeidssituasjon = 'ARBEIDSLEDIG';
        component = shallow(<DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding({
                    'arbeidssituasjon': 'ARBEIDSLEDIG',
                })} skjemaData={skjemaData} />);
        expect(component.find(VelgArbeidsgiver)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal vise ArbeidsgiversSykmeldingContainer dersom arbeidssituasjon === 'ARBEIDSTAKER'", () => {
        skjemaData.values.valgtArbeidssituasjon = 'ARBEIDSTAKER';
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={[]} />
        </Provider>);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(1);
    });

    it("Skal vise info om utskrift dersom harStrengtFortroligAdresse = true", () => {
        skjemaData.values.valgtArbeidssituasjon = 'ARBEIDSTAKER';
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()} arbeidsgivere={[]} harStrengtFortroligAdresse={true} skjemaData={skjemaData}  />
        </Provider>);
        expect(component.find(StrengtFortroligInfo)).to.have.length(1);
    });

    it("Skal ikke vise info om utskrift dersom harStrengtFortroligAdresse = false", () => {
        skjemaData.values.valgtArbeidssituasjon = 'ARBEIDSTAKER';
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()}  harStrengtFortroligAdresse={false} skjemaData={skjemaData} arbeidsgivere={[]} />
        </Provider>);
        expect(component.find(StrengtFortroligInfo)).to.have.length(0);
    });

    it("Skal hente aktuelle arbeidsgivere", () => {
        const dispatch = sinon.spy();
        component = mount(<Provider store={store}>
            <DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()} harStrengtFortroligAdresse={false} skjemaData={skjemaData} arbeidsgivere={[]} />
        </Provider>);
        expect(component.find(StrengtFortroligInfo)).to.have.length(0);
    });

    describe("getSkjemaModus", () => {

        let component;

        it("Skal være GA_VIDERE by default", () => {
            const modus = getSkjemaModus({}, false);
            expect(modus).to.equal("GA_VIDERE")
        })

        it("Skal være AVBRYT dersom periode eller sykmeldingsgrad er feil", () => {
            let values = {
                feilaktigeOpplysninger: [{
                    opplysning: "periode",
                    avkrysset: true,
                }],
                opplysningeneErRiktige: false,
            }
            const modus = getSkjemaModus(values, false);
            expect(modus).to.equal("AVBRYT")

            values.feilaktigeOpplysninger = [{
                opplysning: "sykmeldingsgrad",
                avkrysset: true,
            }]
            const modus2 = getSkjemaModus(values, false);
            expect(modus2).to.equal("AVBRYT")
        });

        it("Skal være SEND dersom valgtArbeidssituasjon === 'ARBEIDSTAKER'", () => {
            let values = {
                valgtArbeidssituasjon: 'ARBEIDSTAKER'
            }
            const modus = getSkjemaModus(values, false);
            expect(modus).to.equal("SEND")
        });


        it("Skal være BEKREFT dersom arbeidssituasjon === 'ARBEIDSTAKER' og valgtArbeidsgiver.orgnummer = '0'", () => {
            let values = {
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                valgtArbeidsgiver: {
                    orgnummer: '0'
                }
            }
            const modus = getSkjemaModus(values, false);
            expect(modus).to.equal("BEKREFT")
        });

        it("Skal være BEKREFT dersom bruker har strengt fortrolig adresse", () => {
            let values = {
                valgtArbeidssituasjon: 'ARBEIDSTAKER'
            }
            const modus = getSkjemaModus(values, true);
            expect(modus).to.equal("BEKREFT")
        });

    });

    describe("getFeilaktigeOpplysninger", () => {
        let component; 

        beforeEach(() => {
            skjemaData = {};
        });
        
        it("Skal returnere tomt object hvis opplysningeneErRiktige === true", () => {
            skjemaData.values = {
                feilaktigeOpplysninger: [...feilaktigeOpplysninger],
                opplysningeneErRiktige: true
            };
            component = shallow(<DinSykmeldingSkjemaComponent
            dispatch={dispatch} sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />);
            expect(component.instance().getFeilaktigeOpplysninger()).to.deep.equal({})
        });

        it("Skal returnere avkryssede opplysninger object hvis opplysningeneErRiktige === false", () => {
            const f = [...feilaktigeOpplysninger];
            f[0] = Object.assign({}, feilaktigeOpplysninger[0], {
                avkrysset: true,
            });
            f[1] = Object.assign({}, feilaktigeOpplysninger[1], {
                avkrysset: true,
            })
            f[2] = Object.assign({}, feilaktigeOpplysninger[2], {
                avkrysset: false,
            })
            skjemaData.values = {
                feilaktigeOpplysninger: f,
                opplysningeneErRiktige: false,
            };
            component = shallow(<DinSykmeldingSkjemaComponent
            dispatch={dispatch} sykmelding={getSykmelding()} skjemaData={skjemaData} handleSubmit={sinon.spy()} />);
            expect(component.instance().getFeilaktigeOpplysninger()).to.deep.equal({
                periode: true,
                sykmeldingsgrad: true,
            })
        }); 

    })

    describe("handleSubmit", () => {

        let component;
        let skjemaData;

        beforeEach(() => {
            skjemaData = {};
            skjemaData.values = {
                feilaktigeOpplysninger: [...feilaktigeOpplysninger]
            };
        })

        it("Lagrer opplysningeneErRiktige", () => {
            const setOpplysningeneErRiktigeSpy = sinon.spy();
            const setArbeidssituasjonSpy = sinon.spy();
            const setArbeidsgiverSpy = sinon.spy()
            const setFeilaktigOpplysningSpy = sinon.spy();
            component = shallow(<DinSykmeldingSkjemaComponent
                dispatch={dispatch}
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                setFeilaktigOpplysning={setFeilaktigOpplysningSpy}
                sykmelding={getSykmelding({
                    id: "olsen"
                })}
                handleSubmit={sinon.spy()} />);
            component.instance().handleSubmit({
                opplysningeneErRiktige: true,
                feilaktigeOpplysninger,
            });
            expect(setOpplysningeneErRiktigeSpy.calledOnce).to.be.true;
            expect(setOpplysningeneErRiktigeSpy.getCall(0).args[0]).to.equal("olsen");
            expect(setOpplysningeneErRiktigeSpy.getCall(0).args[1]).to.equal(true);
        });

        it("Lagrer feilaktigeOpplysninger", () => {
            const setFeilaktigOpplysningSpy = sinon.spy();
            const setOpplysningeneErRiktigeSpy = sinon.spy();
            const setArbeidssituasjonSpy = sinon.spy();
            const setArbeidsgiverSpy = sinon.spy();

            component = shallow(<DinSykmeldingSkjemaComponent
                dispatch={dispatch}
                setFeilaktigOpplysning={setFeilaktigOpplysningSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                sykmelding={getSykmelding({
                    id: "olsen"
                })}
                handleSubmit={sinon.spy()} />);
            component.instance().handleSubmit({
                feilaktigeOpplysninger: [{
                    opplysning: "periode",
                    avkrysset: true,
                }, {
                    opplysning: "sykmeldingsgrad",
                    avkrysset: true,
                }]
            });
            expect(setFeilaktigOpplysningSpy.callCount).to.equal(2);
            expect(setFeilaktigOpplysningSpy.getCall(0).args[0]).to.equal("olsen");
            expect(setFeilaktigOpplysningSpy.getCall(0).args[1]).to.equal("periode");
            expect(setFeilaktigOpplysningSpy.getCall(0).args[2]).to.equal(true);
            expect(setFeilaktigOpplysningSpy.getCall(1).args[0]).to.equal("olsen");
            expect(setFeilaktigOpplysningSpy.getCall(1).args[1]).to.equal("sykmeldingsgrad");
            expect(setFeilaktigOpplysningSpy.getCall(1).args[2]).to.equal(true);
        });

        it("Sender feilaktigeOpplysninger til arbeidsgiver", () => {
            const setFeilaktigOpplysningSpy = sinon.spy();
            const setOpplysningeneErRiktigeSpy = sinon.spy();
            const setArbeidssituasjonSpy = sinon.spy();
            const setArbeidsgiverSpy = sinon.spy();
            const handleSubmitSpy = sinon.spy();
            const sendSykmeldingTilArbeidsgiverSpy = sinon.spy();
            const f = [...feilaktigeOpplysninger];
            f[4] = Object.assign({}, f[4], {
                avkrysset: true,
            })

            component = shallow(<DinSykmeldingSkjemaComponent
                dispatch={dispatch}
                setFeilaktigOpplysning={setFeilaktigOpplysningSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                sykmelding={getSykmelding({
                    id: "olsen"
                })}
                skjemaData={skjemaData}
                registrerInnsending={registrerInnsending}
                sendSykmeldingTilArbeidsgiver={sendSykmeldingTilArbeidsgiverSpy}
                handleSubmit={handleSubmitSpy} />);
            component.instance().handleSubmit({
                feilaktigeOpplysninger: f,
                opplysningeneErRiktige: false,
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                valgtArbeidsgiver: {
                    orgnummer: "123456789"
                }
            });
            expect(sendSykmeldingTilArbeidsgiverSpy.callCount).to.equal(1);
            expect(sendSykmeldingTilArbeidsgiverSpy.getCall(0).args).to.deep.equal(["olsen", "123456789", {
                andre: true,
            }, undefined]);
        });

        it("Lagrer arbeidssituasjon", () => {
            const setFeilaktigOpplysningSpy = sinon.spy();
            const setOpplysningeneErRiktigeSpy = sinon.spy();
            const setArbeidssituasjonSpy = sinon.spy();
            const setArbeidsgiverSpy = sinon.spy()
            const sendSykmeldingTilArbeidsgiverStub = sinon.stub().returns({
                then: () => {
                    
                }
            });

            component = shallow(<DinSykmeldingSkjemaComponent
                dispatch={dispatch}
                setFeilaktigOpplysning={setFeilaktigOpplysningSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                sendSykmeldingTilArbeidsgiver={sendSykmeldingTilArbeidsgiverStub}
                skjemaData={skjemaData}
                registrerInnsending={registrerInnsending}
                sykmelding={getSykmelding({
                    id: "olsen"
                })}
                handleSubmit={sinon.spy()} />);
            component.instance().handleSubmit({
                feilaktigeOpplysninger,
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                valgtArbeidsgiver: {}
            });
            expect(setArbeidssituasjonSpy.calledOnce).to.be.true;
            expect(setArbeidssituasjonSpy.getCall(0).args[0]).to.equal("ARBEIDSTAKER");
            expect(setArbeidssituasjonSpy.getCall(0).args[1]).to.equal("olsen");
        });

        it("Lagrer valgtArbeidsgiver", () => {
            const setFeilaktigOpplysningSpy = sinon.spy();
            const setOpplysningeneErRiktigeSpy = sinon.spy();
            const setArbeidssituasjonSpy = sinon.spy();
            const setArbeidsgiverSpy = sinon.spy()

            component = shallow(<DinSykmeldingSkjemaComponent
                dispatch={dispatch}
                setFeilaktigOpplysning={setFeilaktigOpplysningSpy}
                setArbeidssituasjon={setArbeidssituasjonSpy}
                setOpplysningeneErRiktige={setOpplysningeneErRiktigeSpy}
                setArbeidsgiver={setArbeidsgiverSpy}
                skjemaData={skjemaData}
                sykmelding={getSykmelding({
                    id: "887766"
                })}
                handleSubmit={sinon.spy()} />);
            component.instance().handleSubmit({
                opplysningeneErRiktige: true,
                feilaktigeOpplysninger,
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
                <DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()} skjemaData={skjemaData} />
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
            skjemaData.values.valgtArbeidssituasjon = 'ARBEIDSTAKER';

            arbeidsgivere = [{
                orgnummer: "123456789",
                navn: "Mortens frukt og grønt"
            }, {
                orgnummer: "0", 
                navn: "Annen arbeidsgiver"
            }];

            component = mount(<Provider store={store}>
                <DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={arbeidsgivere} />
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
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
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
            setLedetekster(ledetekster);

            const component = mount(<Provider store={store}>
                <DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={arbeidsgivere} />
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
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
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
            setLedetekster(ledetekster);

            const component = mount(<Provider store={store}>
                <DinSykmeldingSkjema dispatch={dispatch} sykmelding={getSykmelding()} skjemaData={skjemaData} arbeidsgivere={arbeidsgivere} />
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
                feilaktigeOpplysninger: [...feilaktigeOpplysninger],
                opplysningeneErRiktige: undefined,
                valgtArbeidssituasjon: undefined,
                valgtArbeidsgiver: undefined
            };
        });

        it("Skal returnere opplysningeneErRiktige og arbeidssituasjon dersom opplysningeneErRiktige === undefined og valgtArbeidssituasjon === undefined", () => {
            const res = validate(fields);
            expect(Object.keys(res)).to.deep.equal(["opplysningeneErRiktige", "valgtArbeidssituasjon"]);
        });

        it("Skal returnere valgtArbeidssituasjon hvis valgtArbeidssituasjon === DEFAULT", () => {
            fields.valgtArbeidssituasjon = 'DEFAULT';
            const res = validate(fields);
            expect(Object.keys(res)).to.deep.equal(["opplysningeneErRiktige", "valgtArbeidssituasjon"]);
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

        it("Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger === default", () => {
            fields.opplysningeneErRiktige = false;
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger._error).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige")
        });

        it("Skal returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger har en uavkrysset opplysning", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger[0] = Object.assign({}, feilaktigeOpplysninger[0], {
                avkrysset: false,
            });
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger._error).to.equal("Vennligst oppgi hvilke opplysninger som ikke er riktige");
        });

        it("Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger har en avkrysset opplysning", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger[0] = Object.assign({}, feilaktigeOpplysninger[0], {
                avkrysset: true,
            });
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.be.undefined;
        });

        it("Skal ikke returnere feilaktigeOpplysninger dersom opplysningeneErRiktige === false og feilaktigeOpplysninger har en avkrysset og en uavkrysset opplysning", () => {
            fields.opplysningeneErRiktige = false;
            fields.feilaktigeOpplysninger[0] = Object.assign({}, feilaktigeOpplysninger[0], {
                avkrysset: false,
            });
            fields.feilaktigeOpplysninger[1] = Object.assign({}, feilaktigeOpplysninger[1], {
                avkrysset: true,
            });
            const res = validate(fields);
            expect(res.feilaktigeOpplysninger).to.be.undefined;
        });


        it("Skal returnere valgtArbeidssituasjon dersom valgtArbeidssituasjon = 'ARBEIDSTAKER'", () => {
            fields.valgtArbeidssituasjon = undefined;
            const res = validate(fields);
            expect(res.valgtArbeidssituasjon).not.to.be.undefined;
        });

        it("Skal ikke returnere valgtArbeidssituasjon dersom valgtArbeidssituasjon === 'ARBEIDSTAKER'", () => {
            fields.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            const res = validate(fields);
            expect(res.valgtArbeidssituasjon).to.be.undefined;
        });

        it("Skal returnere valgtArbeidsgiver dersom valgtArbeidssituasjon === 'ARBEIDSTAKER' og valgtArbeidsgiver === undefined", () => {
            fields.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            const res = validate(fields);
            expect(res.valgtArbeidsgiver).not.to.be.undefined;
        });

        it("Skal ikke returnere valgtArbeidsgiver dersom valgtArbeidssituasjon === 'ARBEIDSTAKER' og valgtArbeidsgiver === {}", () => {
            fields.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            fields.valgtArbeidsgiver = {
                orgnummer: "***REMOVED***",
                navn: "Alna Frisør"
            }
            const res = validate(fields);
            expect(res.valgtArbeidsgiver).to.be.undefined;
        });

        it("Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og periode er feilaktig", () => {
            fields = {
                "opplysningeneErRiktige":false,
                "feilaktigeOpplysninger": [{
                    opplysning: "periode",
                    avkrysset: true
                }]};
            const res = validate(fields);
            expect(res).to.deep.equal({});
        });

        it("Skal ikke returnere noen ting dersom opplysningeneErRiktige = false og sykmeldingsgrad er feilaktig", () => {
            fields = {
                "opplysningeneErRiktige": false,
                "feilaktigeOpplysninger": [{
                    opplysning: "sykmeldingsgrad",
                    avkrysset: true,
                }]};
            const res = validate(fields);
            expect(res).to.deep.equal({});
        });

        it("Skal returnere valgtArbeidssituasjon dersom opplysningeneErRiktige === false og alt annet er undefined", () => {
            fields.opplysningeneErRiktige = false;
            fields.beOmNyNaermesteLeder = true;
            const res = validate(fields);
            expect(res).to.deep.equal({
                valgtArbeidssituasjon: "Vennligst oppgi din arbeidssituasjon for denne sykmeldingen",
                feilaktigeOpplysninger: { _error: "Vennligst oppgi hvilke opplysninger som ikke er riktige" }
            })
        });

        it("Skal returnere {} dersom  opplysningeneErRiktige === true og valgtArbeidssituasjon === 'ARBEIDSTAKER' og man har strengt fortrolig adresse", () => {
            fields.opplysningeneErRiktige = true;
            fields.beOmNyNaermesteLeder = true;
            fields.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            const props = {
                harStrengtFortroligAdresse: true,
            }
            const res = validate(fields, props);
            expect(res).to.deep.equal({})
        });

        describe("beOmNyNaermesteLeder", () => {

            it("Skal ikke returnere beOmNyNaermesteLeder dersom det ikke er valgt arbeidsgiver", () => {
                const res = validate(fields);
                expect(res.beOmNyNaermesteLeder).to.be.undefined;
            });

            it("Skal ikke returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver, men ikke arbeidssituasjon", () => {
                fields.valgtArbeidsgiver = {
                    orgnummer: "123",
                    navn: "Alna",
                    naermesteLeder: {}
                }
                const res = validate(fields);
                expect(res.beOmNyNaermesteLeder).to.be.undefined;
            });

            it("Skal ikke returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver og arbeidssituasjon, men arbeidssituasjon er FRILANSER", () => {
                fields.valgtArbeidsgiver = {
                    orgnummer: "123",
                    navn: "Alna",
                    naermesteLeder: {}
                }
                fields.valgtArbeidssituasjon = "FRILANSER";
                const res = validate(fields);
                expect(res.beOmNyNaermesteLeder).to.be.undefined;
            });

            it("Skal ikke returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver og arbeidssituasjon, men arbeidsgiver er uten nærmeste leder", () => {
                fields.valgtArbeidsgiver = {
                    orgnummer: "123",
                    navn: "Alna",
                }
                fields.valgtArbeidssituasjon = "ARBEIDSTAKER";
                const res = validate(fields);
                expect(res.beOmNyNaermesteLeder).to.be.undefined;
            });

            it("Skal returnere beOmNyNaermesteLeder dersom det er valgt arbeidsgiver og arbeidssituasjon, og arbeidsgiver har nærmeste leder", () => {
                fields.valgtArbeidsgiver = {
                    orgnummer: "123",
                    navn: "Alna",
                    naermesteLeder: {
                        navn: "Ole"
                    }
                }
                fields.valgtArbeidssituasjon = "ARBEIDSTAKER";
                const res = validate(fields);
                expect(typeof res.beOmNyNaermesteLeder).to.equal("string")
            });
        })

    });

});