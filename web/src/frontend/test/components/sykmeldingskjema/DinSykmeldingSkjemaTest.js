import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import getSykmelding from "../../mockSykmeldinger";
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import DinSykmeldingSkjema, { DinSykmeldingSkjemaComponent, DinSykmeldingConnectedSkjema } from "../../../js/components/sykmeldingskjema/DinSykmeldingSkjema";
import StrengtFortroligInfo from "../../../js/components/sykmeldingskjema/StrengtFortroligInfo";
import VelgArbeidssituasjon from "../../../js/components/sykmeldingskjema/VelgArbeidssituasjon";
import { DineSykmeldingOpplysninger } from "digisyfo-npm";
import VelgArbeidsgiver from "../../../js/components/sykmeldingskjema/VelgArbeidsgiver";
import ArbeidsgiversSykmeldingContainer from "../../../js/containers/sykmelding/ArbeidsgiversSykmeldingContainer";
import { Varselstripe } from "digisyfo-npm";
import ErLederRiktig from "../../../js/components/sykmeldingskjema/ErLederRiktig";
import { Provider } from 'react-redux';
import * as dinSykmeldingActions from '../../../js/actions/dinSykmelding_actions';
import deepFreeze from 'deep-freeze';
import { setLedetekster, feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("DinSykmeldingSkjema -", () => {

    let component;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const mockStore = configureMockStore(middlewares);

    let store;
    let brukerinfo;
    let values;
    
    let state;
    let getStore;

    let feilaktigeOpplysninger = Object.keys(feilaktigeOpplysningerEnums).map((key) => {
        return {
            opplysning: feilaktigeOpplysningerEnums[key],
        };
    });

    let props;
    let actions;
    let getComponent;
    let handleSubmit;
    let ownProps;

    beforeEach(() => {
        setLedetekster(ledetekster);
        deepFreeze(feilaktigeOpplysninger);
        state = {
            ledetekster: { 
                data: ledetekster,
            },
            arbeidsgiversSykmeldinger: {
                data: [getSykmelding({id: "123"})]
            },
            dineSykmeldinger: {

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

        brukerinfo = {
            strengtFortroligAdresse: false,
        };

        getStore = (_values = {}, _state = state) => {
            const stateToStore = {
                ..._state,
                form: {
                    dinSykmeldingSkjema: {
                        values: _values,
                    }
                }
            };
            return mockStore(stateToStore);
        }

        ownProps = {
            sykmelding: getSykmelding({
                id: "sykmelding-id"
            }),
        }
        actions = {}
        getComponent = (store = getStore()) => {
            return mount(<Provider store={store}>
                <DinSykmeldingSkjema {...ownProps} />
            </Provider>)
        }

    });

    it("Skal vise VelgArbeidssituasjon", () => {
        component = getComponent(getStore());
        expect(component.find(VelgArbeidssituasjon)).to.have.length(1);
    });

    it("Skal ikke vise VelgArbeidsgiver dersom arbeidssituasjon === undefined", () => {
        component = getComponent(getStore());
        expect(component.find(VelgArbeidsgiver)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal ikke vise VelgArbeidsgiver arbeidssituasjon === 'ARBEIDSLEDIG'", () => {
        const store = getStore({
            valgtArbeidssituasjon: 'ARBEIDSLEDIG'
        });
        component = getComponent(store);
        expect(component.find(VelgArbeidsgiver)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal vise ArbeidsgiversSykmeldingContainer dersom arbeidssituasjon === 'ARBEIDSTAKER'", () => {
        const store = getStore({
            valgtArbeidssituasjon: 'ARBEIDSTAKER'
        });
        component = getComponent(store);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(1);
    });

    it("Skal vise info om utskrift dersom harStrengtFortroligAdresse = true", () => {
        state.brukerinfo.bruker.data.strengtFortroligAdresse = true;
        const store = getStore({
            valgtArbeidssituasjon: 'ARBEIDSTAKER'
        });
        component = getComponent(store);
        expect(component.find(StrengtFortroligInfo)).to.have.length(1);
    });

    it("Skal vise info om utskrift dersom harStrengtFortroligAdresse = true", () => {
        state.brukerinfo.bruker.data.strengtFortroligAdresse = false;
        store = getStore({
            valgtArbeidssituasjon: 'ARBEIDSTAKER'
        });
        component = getComponent(store);
        expect(component.find(StrengtFortroligInfo)).to.have.length(0);
    });

    describe("getFeilaktigeOpplysninger", () => {
        let component; 
        let props;
        let values; 

        beforeEach(() => {
            actions = {
                handleSubmit: sinon.spy(),
            };
            props = {
                modus: "",
                sykmelding: getSykmelding(),
            };
            values = {};
        });
        
        it("Skal returnere tomt object hvis opplysningeneErRiktige === true", () => {
            values = {
                feilaktigeOpplysninger: [...feilaktigeOpplysninger],
                opplysningeneErRiktige: true
            };
            props.values = values;
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
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
            props.values = {
                feilaktigeOpplysninger: f,
                opplysningeneErRiktige: false,
            };
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getFeilaktigeOpplysninger()).to.deep.equal({
                periode: true,
                sykmeldingsgrad: true,
            })
        }); 

    })

    describe("handleSubmit", () => {

        let component;
        let values;

        beforeEach(() => {
            values = {
                feilaktigeOpplysninger: [...feilaktigeOpplysninger],
                opplysningeneErRiktige: false,
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                valgtArbeidsgiver: {
                    orgnummer: "123456789"
                }
            };
        })

        it("Sender feilaktigeOpplysninger til arbeidsgiver", () => {
            const sendSykmeldingTilArbeidsgiverSpy = sinon.spy();
            const f = [...feilaktigeOpplysninger];
            f[4] = Object.assign({}, f[4], {
                avkrysset: true,
            });
            values.feilaktigeOpplysninger = f;
            
            const sendSykmeldingTilArbeidsgiver = sinon.stub(dinSykmeldingActions, "sendSykmeldingTilArbeidsgiver");

            component = getComponent(getStore(values));
            component.simulate("submit");

            expect(sendSykmeldingTilArbeidsgiver.callCount).to.equal(1);
            expect(sendSykmeldingTilArbeidsgiver.getCall(0).args).to.deep.equal([
                "sykmelding-id",
                "123456789", {
                    andre: true,
                }, 
                undefined]);
            sendSykmeldingTilArbeidsgiver.restore();
        });

        it("Sender feilaktigeOpplysninger og valgt arbeidssituasjon når sykmeldingen bekreftes", () => {
            const sendSykmeldingTilArbeidsgiverSpy = sinon.spy();
            const f = [...feilaktigeOpplysninger];
            f[4] = Object.assign({}, f[4], {
                avkrysset: true,
            });
            values.feilaktigeOpplysninger = f;
            values.valgtArbeidssituasjon = 'FRILANSER';

            const bekreftSykmelding = sinon.stub(dinSykmeldingActions, "bekreftSykmelding");

            component = getComponent(getStore(values));
            component.simulate("submit");

            expect(bekreftSykmelding.callCount).to.equal(1);
            expect(bekreftSykmelding.getCall(0).args).to.deep.equal([
                "sykmelding-id",
                "FRILANSER", {
                    andre: true,
                }]);
            bekreftSykmelding.restore();
        });

    });

    describe("Velg arbeidssituasjon", () => { 

        let component;

        beforeEach(() => {
            component = getComponent();
        });

        it("Viser en select", () => {
            expect(component.find("select")).to.have.length(1);
        });

        it("Setter dropdown til 'Velg' om arbeidssituasjon ikke er satt", function () {
            const dropdown = component.find("select");
            expect(dropdown.value).to.equal(undefined);
        });
    });


    describe("Logikk i skjemaet basert på svar i VelgArbeidsgiver", () => {

        let component;
        let arbeidsgivere; 

        beforeEach(() => {
            values = {};
            values.opplysningeneErRiktige = true;
            values.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            const ledetekster = {
                'starte-sykmelding.info.send-med-naermeste-leder': 'Sykmeldingen blir sendt til bedriftens innboks i Altinn. Din nærmeste leder vil også få se sykmeldingen ved å logge seg på nav.no. Lederen kan bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det.',
                'starte-sykmelding.knapp.SEND-MED-NAERMESTE-LEDER': 'Send sykmelding',
                'starte-sykmelding.info.send': 'Sykmeldingen blir sendt til bedriftens innboks i Altinn. Vi anbefaler at du tipser arbeidsgiveren din om at du har sendt sykmeldingen siden dette er nytt for dem også.',
                'starte-sykmelding.knapp.SEND': 'Send sykmelding',
            };
            setLedetekster(ledetekster);
        });

        it("Skal vise egen tekst for innsending ved JA på bekreft nærmest leder", () => {
            values = {
                beOmNyNaermesteLeder: false,
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                valgtArbeidsgiver: {
                    orgnummer: "123456789",
                    navn: "Mortens frukt og grønt",
                    naermesteLeder: {
                        navn: "Ole sykmelding-id",
                        epost: "ole.sykmelding-id@test.no"
                    }
            }};
            
            const component = getComponent(getStore(values));

            expect(component.text()).to.contain('Sykmeldingen blir sendt til bedriftens innboks i Altinn. Din nærmeste leder vil også få se sykmeldingen ved å logge seg på nav.no. Lederen kan bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det.')
            expect(component.text()).to.contain('Send sykmelding')
        });

        it("Skal ikke vise egen tekst for innsending ved NEI på bekreft nærmest leder", () => {
            values = {
                beOmNyNaermesteLeder: true,
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                valgtArbeidsgiver: {
                    orgnummer: "123456789",
                    navn: "Mortens frukt og grønt",
                    naermesteLeder: {
                        navn: "Ole sykmelding-id",
                        epost: "ole.sykmelding-id@test.no"
                    }
                }
            };
            const component = getComponent(getStore(values));

            expect(component.text()).to.not.contain('Sykmeldingen blir sendt til bedriftens innboks i Altinn. Din nærmeste leder vil også få se sykmeldingen ved å logge seg på nav.no. Lederen kan bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det.')
            expect(component.text()).to.contain('Sykmeldingen blir sendt til bedriftens innboks i Altinn. Vi anbefaler at du tipser arbeidsgiveren din om at du har sendt sykmeldingen siden dette er nytt for dem også.')
            expect(component.text()).to.contain('Send sykmelding')
        });

    });

});