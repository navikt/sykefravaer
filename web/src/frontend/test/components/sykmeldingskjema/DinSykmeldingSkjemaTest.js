import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { setLedetekster, feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from 'digisyfo-npm';
import deepFreeze from 'deep-freeze';
import DinSykmeldingSkjema, { DinSykmeldingSkjemaComponent, mapStateToProps } from '../../../js/components/sykmeldingskjema/DinSykmeldingSkjema';
import StrengtFortroligInfo from '../../../js/components/sykmeldingskjema/StrengtFortroligInfo';
import VelgArbeidssituasjon from '../../../js/components/sykmeldingskjema/VelgArbeidssituasjon';
import VelgArbeidsgiver from '../../../js/components/sykmeldingskjema/VelgArbeidsgiver';
import ArbeidsgiversSykmeldingContainer from '../../../js/containers/sykmelding/ArbeidsgiversSykmeldingContainer';
import * as dinSykmeldingActions from '../../../js/actions/dinSykmelding_actions';
import ledetekster from '../../mockLedetekster';
import getSykmelding from '../../mockSykmeldinger';
import { getSykmeldingSkjemanavn } from '../../../js/enums/skjemanavn';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('DinSykmeldingSkjema -', () => {
    let component;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const mockStore = configureMockStore(middlewares);

    let values;
    let state;
    let getStore;

    const feilaktigeOpplysninger = Object.keys(feilaktigeOpplysningerEnums).map((key) => {
        return {
            opplysning: feilaktigeOpplysningerEnums[key],
        };
    });

    let actions;
    let getComponent;
    let ownProps;

    beforeEach(() => {
        setLedetekster(ledetekster);
        deepFreeze(feilaktigeOpplysninger);
        state = {
            ledetekster: {
                data: ledetekster,
            },
            arbeidsgiversSykmeldinger: {
                data: [getSykmelding({ id: '123' })],
            },
            dineSykmeldinger: {
                data: [getSykmelding({ id: '123' })],
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

        getStore = (_values = {}, _state = state) => {
            const stateToStore = {
                ..._state,
                form: {
                    [getSykmeldingSkjemanavn('sykmelding-id')]: {
                        values: _values,
                    },
                },
            };
            return mockStore(stateToStore);
        };

        ownProps = {
            sykmelding: getSykmelding({
                id: 'sykmelding-id',
            }),
        };
        actions = {};
        getComponent = (s = getStore()) => {
            return mount(<Provider store={s}>
                <DinSykmeldingSkjema
                    {...ownProps}
                />
            </Provider>);
        };
    });

    it('Skal vise VelgArbeidssituasjon', () => {
        component = getComponent(getStore());
        expect(component.find(VelgArbeidssituasjon)).to.have.length(1);
    });

    it('Skal ikke vise VelgArbeidsgiver dersom arbeidssituasjon === undefined', () => {
        component = getComponent(getStore());
        expect(component.find(VelgArbeidsgiver)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal ikke vise VelgArbeidsgiver arbeidssituasjon === 'ARBEIDSLEDIG'", () => {
        component = getComponent(getStore({
            valgtArbeidssituasjon: 'ARBEIDSLEDIG',
        }));
        expect(component.find(VelgArbeidsgiver)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal vise ArbeidsgiversSykmeldingContainer dersom arbeidssituasjon === 'ARBEIDSTAKER'", () => {
        component = getComponent(getStore({
            valgtArbeidssituasjon: 'ARBEIDSTAKER',
        }));
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(1);
    });

    it('Skal vise info om utskrift dersom harStrengtFortroligAdresse = true', () => {
        state.brukerinfo.bruker.data.strengtFortroligAdresse = true;
        component = getComponent(getStore({
            valgtArbeidssituasjon: 'ARBEIDSTAKER',
        }));
        expect(component.find(StrengtFortroligInfo)).to.have.length(1);
    });

    it('Skal ikke vise info om utskrift dersom harStrengtFortroligAdresse = true', () => {
        state.brukerinfo.bruker.data.strengtFortroligAdresse = false;
        component = getComponent(getStore({
            valgtArbeidssituasjon: 'ARBEIDSTAKER',
        }));
        expect(component.find(StrengtFortroligInfo)).to.have.length(0);
    });

    describe('mapStateToProps', () => {
        describe("initialValues", () => {
            const initialValues = {
                feilaktigeOpplysninger: [{
                    opplysning: 'periode',
                }, {
                    opplysning: 'sykmeldingsgrad',
                }, {
                    opplysning: 'arbeidsgiver',
                }, {
                    opplysning: 'diagnose',
                }, {
                    opplysning: 'andre',
                }],
                valgtArbeidssituasjon: 'DEFAULT',
            };

            it("Skal returnere initialValues", () => {
                const props = mapStateToProps(state, ownProps);
                expect(props.initialValues).to.deep.equal(initialValues);
            });

            describe("Når det finnes en sykmelding med spørsmal besvart", () => {
                it("Skal returnere svar på spørsmål når de er besvart med nei", () => {
                    state.dineSykmeldinger.data = [
                        getSykmelding({
                            id: ownProps.sykmelding.id,
                            sporsmal: {
                                arbeidssituasjon: 'FRILANSER',
                                harForsikring: false,
                                harAnnetFravaer: false,
                            },
                        })];
                    const props = mapStateToProps(state, ownProps);
                    expect(props.initialValues).to.deep.equal({
                        ...initialValues,
                        valgtArbeidssituasjon: 'FRILANSER',
                        harForsikring: false,
                        harAnnetFravaer: false,
                    });
                });

                it("Skal ikke returnere svar på spørsmål når de ikke er besvart", () => {
                    state.dineSykmeldinger.data = [
                        getSykmelding({
                            id: ownProps.sykmelding.id,
                            sporsmal: {
                                arbeidssituasjon: 'FRILANSER',
                                harForsikring: null,
                                harAnnetFravaer: null,
                            },
                        })];
                    const props = mapStateToProps(state, ownProps);
                    expect(props.initialValues).to.deep.equal({
                        ...initialValues,
                        valgtArbeidssituasjon: 'FRILANSER',
                    });
                });

                it("Skal returnere arbeidssituasjon når det ikke ligger lagret under sporsmal på sykmeldingen", () => {
                    state.dineSykmeldinger.data = [
                        getSykmelding({
                            id: ownProps.sykmelding.id,
                            valgtArbeidssituasjon: 'FRILANSER',
                        })];
                    const props = mapStateToProps(state, ownProps);
                    expect(props.initialValues).to.deep.equal({
                        ...initialValues,
                        valgtArbeidssituasjon: 'FRILANSER',
                    });
                });

                it("Skal returnere fravaersperioder", () => {
                    state.dineSykmeldinger.data = [
                        getSykmelding({
                            id: ownProps.sykmelding.id,
                            sporsmal: {
                                arbeidssituasjon: 'FRILANSER',
                                harForsikring: false,
                                harAnnetFravaer: true,
                                fravaersperioder: [{
                                    fom: '2018-08-22',
                                    tom: '2018-08-24',
                                }],
                            },
                        })];
                    const props = mapStateToProps(state, ownProps);
                    expect(props.initialValues).to.deep.equal({
                        ...initialValues,
                        valgtArbeidssituasjon: 'FRILANSER',
                        harForsikring: false,
                        harAnnetFravaer: true,
                        fravaersperioder: [{
                            fom: '22.08.2018',
                            tom: '24.08.2018',
                        }],
                    });
                });

                it("Skal returnere forsikring", () => {
                    state.dineSykmeldinger.data = [
                        getSykmelding({
                            id: ownProps.sykmelding.id,
                            sporsmal: {
                                arbeidssituasjon: 'FRILANSER',
                                harForsikring: true,
                                dekningsgrad: 75,
                                harAnnetFravaer: false,
                            },
                        })];
                    const props = mapStateToProps(state, ownProps);
                    expect(props.initialValues).to.deep.equal({
                        ...initialValues,
                        valgtArbeidssituasjon: 'FRILANSER',
                        harForsikring: true,
                        harAnnetFravaer: false,
                        dekningsgrad: 75,
                    });
                });
            });
        });
    });

    describe('getFeilaktigeOpplysninger', () => {
        let props;
        let brukersSvarverdier;

        beforeEach(() => {
            actions = {
                handleSubmit: sinon.spy(),
                utfyllingStartet: sinon.spy(),
                dispatch: sinon.spy(),
            };
            props = {
                modus: '',
                sykmelding: getSykmelding(),
            };
            brukersSvarverdier = {};
        });

        it('Skal returnere tomt objekt hvis opplysningeneErRiktige === true', () => {
            brukersSvarverdier = {
                feilaktigeOpplysninger: [...feilaktigeOpplysninger],
                opplysningeneErRiktige: true,
            };
            props.brukersSvarverdier = brukersSvarverdier;
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getFeilaktigeOpplysninger()).to.deep.equal({});
        });

        it('Skal returnere avkryssede opplysninger objekt hvis opplysningeneErRiktige === false', () => {
            const f = [...feilaktigeOpplysninger];
            f[0] = Object.assign({}, feilaktigeOpplysninger[0], {
                avkrysset: true,
            });
            f[1] = Object.assign({}, feilaktigeOpplysninger[1], {
                avkrysset: true,
            });
            f[2] = Object.assign({}, feilaktigeOpplysninger[2], {
                avkrysset: false,
            });
            props.brukersSvarverdier = {
                feilaktigeOpplysninger: f,
                opplysningeneErRiktige: false,
            };
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getFeilaktigeOpplysninger()).to.deep.equal({
                periode: true,
                sykmeldingsgrad: true,
            });
        });
    });

    describe('Frilansersvar', () => {
        let props;
        let brukersSvarverdier;

        beforeEach(() => {
            actions = {
                handleSubmit: sinon.spy(),
                dispatch: sinon.spy(),
            };
            props = {
                modus: '',
                sykmelding: getSykmelding(),
            };
            brukersSvarverdier = {};
        });

        it('Skal returnere et tomt objekt hvis valgt arbeidssituasjon er ARBEIDSTAKER', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                opplysningeneErRiktige: true,
                valgtArbeidsgiver: {
                    orgnummer: '123456789',
                },
            };
            props.brukersSvarverdier = brukersSvarverdier;
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getDekningsgrad()).to.equal(null);
            expect(component.instance().getEgenmeldingsperioder()).to.equal(null);
        });

        it('Skal returnere et tomt objekt hvis valgt arbeidssituasjon er ARBEIDSLEDIG', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'ARBEIDSLEDIG',
                opplysningeneErRiktige: true,
            };
            props.brukersSvarverdier = brukersSvarverdier;
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getDekningsgrad()).to.equal(null);
            expect(component.instance().getEgenmeldingsperioder()).to.equal(null);
        });

        it('Skal returnere et tomt objekt hvis valgt arbeidssituasjon er FRILANSER og tilleggsspørsmål for frilansere ikke er stilt', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'FRILANSER',
                opplysningeneErRiktige: true,
            };
            props.brukersSvarverdier = brukersSvarverdier;
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getDekningsgrad()).to.equal(null);
            expect(component.instance().getEgenmeldingsperioder()).to.equal(null);
        });

        it('Skal returnere perioder hvis valgt arbeidssituasjon er FRILANSER og det er svart JA på egenmeldingsspørsmål', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'FRILANSER',
                opplysningeneErRiktige: true,
                varSykmeldtEllerEgenmeldt: true,
                egenmeldingsperioder: [{
                    fom: '01.03.2018',
                    tom: '05.03.2018',
                }, {
                    fom: '07.03.2018',
                    tom: '12.03.2018',
                }],
                harForsikring: false,
            };
            props.brukersSvarverdier = brukersSvarverdier;
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getEgenmeldingsperioder()).to.deep.equal([{
                fom: new Date('2018-03-01'),
                tom: new Date('2018-03-05'),
            }, {
                fom: new Date('2018-03-07'),
                tom: new Date('2018-03-12'),
            }]);
        });

        it('Skal returnere tomme perioder hvis valgt arbeidssituasjon er FRILANSER og det er svart NEI på egenmeldingsspørsmål', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'FRILANSER',
                opplysningeneErRiktige: true,
                varSykmeldtEllerEgenmeldt: false,
                egenmeldingsperioder: [{}, {}],
                harForsikring: false,
            };
            props.brukersSvarverdier = brukersSvarverdier;
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getEgenmeldingsperioder()).to.equal(null);
        });

        it('Skal returnere tom dekningsgrad hvis arbeidssituasjon er FRILANSER og det er svart NEI på forsikringsspørsmålet', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'FRILANSER',
                opplysningeneErRiktige: true,
                varSykmeldtEllerEgenmeldt: false,
                harForsikring: false,
                dekningsgrad: '75',
            };
            props.brukersSvarverdier = brukersSvarverdier;
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getDekningsgrad()).to.equal(null);
        });

        it('Skal returnere oppgitt dekningsgrad hvis arbeidssituasjon er FRILANSER og det er svart JA på forsikringsspørsmålet', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'FRILANSER',
                opplysningeneErRiktige: true,
                varSykmeldtEllerEgenmeldt: false,
                harForsikring: true,
                dekningsgrad: '75',
            };
            props.brukersSvarverdier = brukersSvarverdier;
            component = shallow(<DinSykmeldingSkjemaComponent {...props} {...actions} />);
            expect(component.instance().getDekningsgrad()).to.equal('75');
        });
    });

    describe('handleSubmit', () => {
        beforeEach(() => {
            values = {
                feilaktigeOpplysninger: [...feilaktigeOpplysninger],
                opplysningeneErRiktige: false,
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                valgtArbeidsgiver: {
                    orgnummer: '123456789',
                },
            };
        });

        it('Sender feilaktigeOpplysninger til arbeidsgiver', () => {
            const f = [...feilaktigeOpplysninger];
            f[4] = Object.assign({}, f[4], {
                avkrysset: true,
            });
            values.feilaktigeOpplysninger = f;

            const sendSykmeldingTilArbeidsgiver = sinon.stub(dinSykmeldingActions, 'sendSykmeldingTilArbeidsgiver');

            component = getComponent(getStore(values));
            component.simulate('submit');

            expect(sendSykmeldingTilArbeidsgiver.callCount).to.equal(1);
            expect(sendSykmeldingTilArbeidsgiver.getCall(0).args).to.deep.equal([
                'sykmelding-id',
                '123456789', {
                    andre: true,
                },
                undefined]);
            sendSykmeldingTilArbeidsgiver.restore();
        });

        it('Sender feilaktigeOpplysninger og valgt arbeidssituasjon når sykmeldingen bekreftes', () => {
            const f = [...feilaktigeOpplysninger];
            f[4] = Object.assign({}, f[4], {
                avkrysset: true,
            });
            values.feilaktigeOpplysninger = f;
            values.valgtArbeidssituasjon = 'FRILANSER';
            values.harForsikring = false;
            values.harAnnetFravaer = false;
            values.fravaersperioder = null;

            const bekreftSykmelding = sinon.stub(dinSykmeldingActions, 'bekreftSykmelding');

            component = getComponent(getStore(values));
            component.simulate('submit');

            expect(bekreftSykmelding.callCount).to.equal(1);
            expect(bekreftSykmelding.getCall(0).args).to.deep.equal([
                'sykmelding-id',
                {
                    arbeidssituasjon: 'FRILANSER',
                    feilaktigeOpplysninger: {
                        andre: true,
                    },
                    harForsikring: false,
                    harAnnetFravaer: false,
                    egenmeldingsperioder: null,
                    dekningsgrad: null,
                },
            ]);
            bekreftSykmelding.restore();
        });
    });

    describe('Velg arbeidssituasjon', () => {
        beforeEach(() => {
            component = getComponent();
        });

        it('Viser en select', () => {
            expect(component.find('select')).to.have.length(1);
        });

        it("Setter dropdown til 'Velg' om arbeidssituasjon ikke er satt", () => {
            const dropdown = component.find('select');
            expect(dropdown.value).to.equal(undefined);
        });
    });


    describe('Logikk i skjemaet basert på svar i VelgArbeidsgiver', () => {
        beforeEach(() => {
            values = {};
            values.opplysningeneErRiktige = true;
            values.valgtArbeidssituasjon = 'ARBEIDSTAKER';
            /* eslint-disable max-len */
            setLedetekster({
                'starte-sykmelding.info.send-med-naermeste-leder': 'Sykmeldingen blir sendt til bedriftens innboks i Altinn. Din nærmeste leder vil også få se sykmeldingen ved å logge seg på nav.no. Lederen kan bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det.',
                'starte-sykmelding.knapp.SEND-MED-NAERMESTE-LEDER': 'Send sykmelding',
                'starte-sykmelding.info.send': 'Sykmeldingen blir sendt til bedriftens innboks i Altinn. Vi anbefaler at du tipser arbeidsgiveren din om at du har sendt sykmeldingen siden dette er nytt for dem også.',
                'starte-sykmelding.info.bekreft': 'Å bekrefte sykmeldingen betyr at du er enig i innholdet, og at du ønsker å ta den i bruk',
                'starte-sykmelding.knapp.SEND': 'Send sykmelding',
            });
            /* eslint-disable max-len */
        });

        it('Skal ikke vise infotekst tekst for innsending som arbeidstaker med NL', () => {
            values = {
                beOmNyNaermesteLeder: true,
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                valgtArbeidsgiver: {
                    orgnummer: '123456789',
                    navn: 'Mortens frukt og grønt',
                    naermesteLeder: {
                        navn: 'Ole sykmelding-id',
                        epost: 'ole.sykmelding-id@test.no',
                    },
                } };

            component = getComponent(getStore(values));
            expect(component.find('.dinSykmeldingSkjema__sendInfo')).to.have.length(0);
        });

        it('Skal ikke vise infotekst tekst for innsending som arbeidstaker uten NL', () => {
            values = {
                beOmNyNaermesteLeder: false,
                valgtArbeidssituasjon: '',
                valgtArbeidsgiver: {
                    orgnummer: '123456789',
                    navn: 'Mortens frukt og grønt',
                    naermesteLeder: {
                        navn: 'Ole sykmelding-id',
                        epost: 'ole.sykmelding-id@test.no',
                    },
                } };

            component = getComponent(getStore(values));
            expect(component.find('.dinSykmeldingSkjema__sendInfo')).to.have.length(0);
        });

        it('Skal vise infotekst tekst for innsending som NAERINGSDRIVENDE', () => {
            values = {
                valgtArbeidssituasjon: 'NAERINGSDRIVENDE',
            };

            component = getComponent(getStore(values));
            expect(component.find('.dinSykmeldingSkjema__sendInfo')).to.have.length(1);
            expect(component.find('.dinSykmeldingSkjema__sendInfo')).text().to.contain('Å bekrefte sykmeldingen betyr at du er enig i innholdet, og at du ønsker å ta den i bruk');
        });
    });
});
