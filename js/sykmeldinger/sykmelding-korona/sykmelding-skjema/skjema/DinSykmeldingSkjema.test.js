import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster, feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from '@navikt/digisyfo-npm';
import deepFreeze from 'deep-freeze';
import DinSykmeldingSkjema, { DinSykmeldingSkjemaComponent, mapStateToProps } from './DinSykmeldingSkjema';
import StrengtFortroligInfo from '../strengt-fortroliginfo/StrengtFortroligInfo';
import VelgArbeidssituasjon from '../velg-arbeidssituasjon/VelgArbeidssituasjon';
import * as dinSykmeldingActions from '../../../data/din-sykmelding/dinSykmeldingActions';
import ledetekster from '../../../../../test/mock/mockLedetekster';
import getSykmelding from '../../../../../test/mock/mockSykmeldinger';
import { getSykmeldingSkjemanavn } from '../../../../enums/skjemanavn';
import mountWithStore from '../../../../../test/mountWithStore';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('DinSykmeldingSkjema -', () => {
    let component;

    let values;
    let state;
    let getState;

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

        getState = (_values = {}, _state = state) => {
            return {
                ..._state,
                form: {
                    [getSykmeldingSkjemanavn('sykmelding-id')]: {
                        values: _values,
                    },
                },
            };
        };

        ownProps = {
            sykmelding: getSykmelding({
                id: 'sykmelding-id',
            }),
        };
        actions = {};
        getComponent = (s = getState()) => {
            return mountWithStore(<DinSykmeldingSkjema {...ownProps} />, s);
        };
    });

    it('Skal vise VelgArbeidssituasjon', () => {
        component = getComponent(getState());
        expect(component.find(VelgArbeidssituasjon)).to.have.length(1);
    });

    it('Skal vise info om utskrift dersom harStrengtFortroligAdresseSelector = true', () => {
        state.brukerinfo.bruker.data.strengtFortroligAdresse = true;
        component = getComponent(getState({
            valgtArbeidssituasjon: 'ARBEIDSTAKER',
        }));
        expect(component.find(StrengtFortroligInfo)).to.have.length(1);
    });

    it('Skal ikke vise info om utskrift dersom harStrengtFortroligAdresseSelector = true', () => {
        state.brukerinfo.bruker.data.strengtFortroligAdresse = false;
        component = getComponent(getState({
            valgtArbeidssituasjon: 'ARBEIDSTAKER',
        }));
        expect(component.find(StrengtFortroligInfo)).to.have.length(0);
    });

    describe('mapStateToProps', () => {
        describe('initialValues', () => {
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
                valgtArbeidssituasjon: null,
                valgtArbeidssituasjonShadow: null,
            };

            it('Skal returnere initialValues', () => {
                const props = mapStateToProps(state, ownProps);
                expect(props.initialValues).to.deep.equal(initialValues);
            });

            it('Skal returnere arbeidsgivere', () => {
                const props = mapStateToProps(state, ownProps);
                expect(props.arbeidsgivere).to.deep.equal([]);
            });

            describe('Når det finnes en sykmelding med spørsmal besvart', () => {
                it('Skal returnere svar på spørsmål når de er besvart med nei', () => {
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
                        valgtArbeidssituasjonShadow: 'FRILANSER',
                        harForsikring: false,
                        harAnnetFravaer: false,
                    });
                });

                it('Skal ikke returnere svar på spørsmål når de ikke er besvart', () => {
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
                        valgtArbeidssituasjonShadow: 'FRILANSER',
                    });
                });

                it('Skal returnere arbeidssituasjon når det ikke ligger lagret under sporsmal på sykmeldingen', () => {
                    state.dineSykmeldinger.data = [
                        getSykmelding({
                            id: ownProps.sykmelding.id,
                            valgtArbeidssituasjon: 'FRILANSER',
                        })];
                    const props = mapStateToProps(state, ownProps);
                    expect(props.initialValues).to.deep.equal({
                        ...initialValues,
                        valgtArbeidssituasjon: 'FRILANSER',
                        valgtArbeidssituasjonShadow: 'FRILANSER',
                    });
                });

                it('Skal returnere fravaersperioder', () => {
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
                        valgtArbeidssituasjonShadow: 'FRILANSER',
                        harForsikring: false,
                        harAnnetFravaer: true,
                        fravaersperioder: [{
                            fom: '22.08.2018',
                            tom: '24.08.2018',
                        }],
                    });
                });

                it('Skal returnere forsikring', () => {
                    state.dineSykmeldinger.data = [
                        getSykmelding({
                            id: ownProps.sykmelding.id,
                            sporsmal: {
                                arbeidssituasjon: 'FRILANSER',
                                harForsikring: true,
                                harAnnetFravaer: false,
                            },
                        })];
                    const props = mapStateToProps(state, ownProps);
                    expect(props.initialValues).to.deep.equal({
                        ...initialValues,
                        valgtArbeidssituasjon: 'FRILANSER',
                        valgtArbeidssituasjonShadow: 'FRILANSER',
                        harForsikring: true,
                        harAnnetFravaer: false,
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
        let brukersSvarverdier;

        beforeEach(() => {
            actions = {
                handleSubmit: sinon.spy(),
                dispatch: sinon.spy(),
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
            component = getComponent(getState(brukersSvarverdier));
            expect(component.find(DinSykmeldingSkjemaComponent).instance().getEgenmeldingsperioder()).to.equal(null);
        });

        it('Skal returnere et tomt objekt hvis valgt arbeidssituasjon er ARBEIDSLEDIG', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'ARBEIDSLEDIG',
                opplysningeneErRiktige: true,
            };
            component = getComponent(getState(brukersSvarverdier));
            expect(component.find(DinSykmeldingSkjemaComponent).instance().getEgenmeldingsperioder()).to.equal(null);
        });

        it('Skal returnere et tomt objekt hvis valgt arbeidssituasjon er FRILANSER og tilleggsspørsmål for frilansere ikke er stilt', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'FRILANSER',
                opplysningeneErRiktige: true,
            };
            component = getComponent(getState(brukersSvarverdier));
            expect(component.find(DinSykmeldingSkjemaComponent).instance().getEgenmeldingsperioder()).to.equal(null);
        });

        it('Skal returnere perioder hvis valgt arbeidssituasjon er FRILANSER og det er svart JA på egenmeldingsspørsmål', () => {
            brukersSvarverdier = {
                valgtArbeidssituasjon: 'FRILANSER',
                opplysningeneErRiktige: true,
                harAnnetFravaer: true,
                fravaersperioder: [{
                    fom: '01.03.2018',
                    tom: '05.03.2018',
                }, {
                    fom: '07.03.2018',
                    tom: '12.03.2018',
                }],
                harForsikring: false,
            };
            component = getComponent(getState(brukersSvarverdier));
            expect(component.find(DinSykmeldingSkjemaComponent).instance().getEgenmeldingsperioder()).to.deep.equal([{
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
                harAnnetFravaer: false,
                fravaersperioder: [{}, {}],
                harForsikring: false,
            };
            component = getComponent(getState(brukersSvarverdier));
            expect(component.find(DinSykmeldingSkjemaComponent).instance().getEgenmeldingsperioder()).to.equal(null);
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

            component = getComponent(getState(values));
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

            component = getComponent(getState(values));
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
                },
            ]);
            bekreftSykmelding.restore();
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
            /* eslint-enable max-len */
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
                },
            };

            component = getComponent(getState(values));
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
                },
            };

            component = getComponent(getState(values));
            expect(component.find('.dinSykmeldingSkjema__sendInfo')).to.have.length(0);
        });

        it('Skal vise infotekst tekst for innsending som NAERINGSDRIVENDE', () => {
            values = {
                valgtArbeidssituasjon: 'NAERINGSDRIVENDE',
            };

            component = getComponent(getState(values));
            expect(component.find('.dinSykmeldingSkjema__sendInfo')).to.have.length(1);
            expect(component.find('.dinSykmeldingSkjema__sendInfo')).text().to.contain('Å bekrefte sykmeldingen betyr at du er enig i innholdet, og at du ønsker å ta den i bruk');
        });
    });
});
