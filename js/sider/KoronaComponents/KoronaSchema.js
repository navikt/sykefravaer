/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Sidetittel, Systemtittel, Undertittel, Ingress, Element } from 'nav-frontend-typografi';
import {
    tilLesbarDatoUtenAarstall,
} from '@navikt/digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import EgenmeldingDatePicker from './EgenmeldingDatePicker';

import FormHeaderIcon from './FormComponents/FormHeaderIcon';
import FormSeparator from './FormComponents/FormSeparator';
import FormSection from './FormComponents/FormSection';
import CannotUseMelding from './FormComponents/CannotUseMelding';
import Bekreft from './FormComponents/Bekreft';
import history from '../../history';

import { checkmarkSvg } from './svg/checkmarkSvg';
import AvbrytRegistrering from './FormComponents/AvbrytRegistrering';
import HjemmefraInfo from './FormComponents/HjemmefraInfo';

const correctDateOffset = (date) => {
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return date;
};

const datePlus16Days = (date) => {
    const endDate = new Date();

    endDate.setDate(date.getDate() + 16);
    return endDate;
};

const hasErrors = (errors) => {
    return Object.values(errors).some((error) => { return error !== undefined; });
};

const CORONA_CODE = 'R991';

const INITIAL_ERRORS = {
    koronamistanke: undefined,
    koronamistankeHjemmefra: undefined,
    palagtKarantene: undefined,
    palagtKaranteneHjemmefra: undefined,
    husstandenSmittet: undefined,
    husstandenSmittetHjemmefra: undefined,
};

const INITIAL_TOUCHED = {
    koronamistanke: undefined,
    koronamistankeHjemmefra: undefined,
    palagtKarantene: undefined,
    palagtKaranteneHjemmefra: undefined,
    husstandenSmittet: undefined,
    husstandenSmittetHjemmefra: undefined,
};

class KoronaSchema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: {
                koronamistanke: undefined,
                koronamistankeHjemmefra: undefined,
                palagtKarantene: undefined,
                palagtKaranteneHjemmefra: undefined,
                husstandenSmittet: undefined,
                husstandenSmittetHjemmefra: undefined,
            },
            bekreftet: false,
            showAvbryt: false,
            tidligereSyk: false,
            periode: {
                fom: new Date(),
                correctedFom: undefined,
                tom: datePlus16Days(new Date()),
            },
            boxSize: {
                formHeight: 0,
                offsetLeft: 0,
                width: 0,
            },
            errors: INITIAL_ERRORS,
            touched: INITIAL_TOUCHED,
        };
        this.formContainerRef = React.createRef();
        this.errorRef = {
            koronamistanke: React.createRef(),
            koronamistankeHjemmefra: React.createRef(),
            palagtKarantene: React.createRef(),
        };

        this.redrawBox = this.redrawBox.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.redrawBox);
        this.redrawBox();
    }

    componentDidUpdate(_, nextState) {
        // eslint-disable-next-line react/destructuring-assignment
        if (this.state.tidligereSyk !== nextState.tidligereSyk) {
            this.redrawBox();
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (this.state.showAvbryt !== nextState.showAvbryt) {
            this.redrawBox();
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (JSON.stringify(this.state.errors) !== JSON.stringify(nextState.errors)) {
            this.redrawBox();
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (JSON.stringify(this.state.questions) !== JSON.stringify(nextState.questions)) {
            this.redrawBox();
            this.validateAll();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.redrawBox);
    }

    redrawBox() {
        if (!this.formContainerRef) {
            return null;
        }

        const formHeight = this.formContainerRef.current.clientHeight;
        const offsetLeft = this.formContainerRef.current.getBoundingClientRect().left;
        const width = this.formContainerRef.current.getBoundingClientRect().left + this.formContainerRef.current.getBoundingClientRect().right;

        this.setState({ boxSize: { formHeight, offsetLeft, width } });
        return null;
    }

    validateAll(submitting = false) {
        const updatedErrors = { ...INITIAL_ERRORS };

        const { questions, touched } = this.state;

        // If we are submitting, validate all fields ignoring touched status
        if (submitting || touched.koronamistanke) {
            if (questions.koronamistanke === undefined) {
                updatedErrors.koronamistanke = 'Du må bekrefte om du mistenker at du er smittet av korona';
            }
        }

        if (submitting || touched.koronamistankeHjemmefra) {
            if (questions.koronamistanke === true && questions.koronamistankeHjemmefra === undefined) {
                updatedErrors.koronamistankeHjemmefra = 'Du må bekrefte om du jobber hjemmefra';
            }
        }

        if (submitting || touched.palagtKarantene) {
            if (questions.koronamistanke === false && questions.palagtKarantene === undefined) {
                updatedErrors.palagtKarantene = 'Du må bekrefte om du er i pålagt karantene';
            }
        }

        if (submitting || touched.palagtKaranteneHjemmefra) {
            if (questions.palagtKarantene === true && questions.palagtKaranteneHjemmefra === undefined) {
                updatedErrors.palagtKaranteneHjemmefra = 'Du må bekrefte om du jobber hjemmefra';
            }
        }

        if (submitting || touched.husstandenSmittet) {
            if (questions.palagtKarantene === false && questions.husstandenSmittet === undefined) {
                updatedErrors.husstandenSmittet = 'Du må bekrefte om noen i husstanden er smittet';
            }
        }

        if (submitting || touched.husstandenSmittetHjemmefra) {
            if (questions.husstandenSmittet === true && questions.husstandenSmittetHjemmefra === undefined) {
                updatedErrors.husstandenSmittetHjemmefra = 'Du må bekrefte om noen i husstanden er smittet';
            }
        }

        if (!hasErrors(updatedErrors)) {
            this.setState({ errors: INITIAL_ERRORS });
            return updatedErrors;
        }

        this.setState({ errors: updatedErrors });
        return updatedErrors;
    }

    touchAll() {
        this.setState({ touched: {
            koronamistanke: true,
        } });
    }

    submit() {
        this.touchAll();
        const errors = this.validateAll(true);
        if (hasErrors(errors)) {
            return;
        }

        const {
            periode,
        } = this.state;

        const submitPeriod = {
            fom: (periode.correctedFom || periode.fom).toISOString().split('T')[0],
            tom: periode.tom.toISOString().split('T')[0],
        };

        const { opprettSykmelding } = this.props;
        opprettSykmelding(submitPeriod);
    }

    canUseEgenmelding() {
        const { questions: { koronamistankeHjemmefra, palagtKaranteneHjemmefra, husstandenSmittet, husstandenSmittetHjemmefra } } = this.state;

        if (koronamistankeHjemmefra === true || palagtKaranteneHjemmefra === true || husstandenSmittetHjemmefra === true) {
            return false;
        }

        if (husstandenSmittet === false) {
            return false;
        }

        return true;
    }

    showDiagnose() {
        const { questions: { husstandenSmittet, koronamistankeHjemmefra, palagtKaranteneHjemmefra, husstandenSmittetHjemmefra } } = this.state;

        if (husstandenSmittet === false) {
            return false;
        }

        if (koronamistankeHjemmefra === false || palagtKaranteneHjemmefra === false || husstandenSmittetHjemmefra === false) {
            return true;
        }

        return false;
    }

    render() {
        const {
            questions,
            bekreftet,
            showAvbryt,
            tidligereSyk,
            periode,
            boxSize,
            errors } = this.state;

        const mappedErrors = Object.entries(errors).reduce((acc, errorEntry) => {
            if (errorEntry[1]) {
                return [...acc, errorEntry];
            }
            return acc;
        }, []);

        const canUseEgenmelding = this.canUseEgenmelding();
        const showDiagnose = this.showDiagnose();
        const workFromHomeQuestionVisible = (questions.koronamistanke || questions.palagtKarantene || questions.husstandenSmittet);

        return (
            <div>
                <Sidetittel tag="h1" style={{ marginBottom: '1rem', textAlign: 'center' }}>Egenmelding</Sidetittel>
                <Undertittel style={{ marginBottom: '2rem', textAlign: 'center' }}>for selvstendig næringsdrivende og frilansere</Undertittel>

                <Ingress>
                    Du kan bruke egenmelding i inntil 16 dager hvis du er smittet av koronaviruset, er mistenkt smittet, eller i pålagt karantene.
                </Ingress>
                <br />
                <Ingress>
                    Vanligvis er det en behandler som sykmelder deg og sender den inn til oss. I dette tilfellet blir du nødt til å opprette egenmeldingen før du kan sende den inn.
                </Ingress>
                <br />

                <div>
                    <div style={{
                        backgroundColor: 'white',
                        height: boxSize.formHeight,
                        width: boxSize.width,
                        zIndex: '-1',
                        marginLeft: boxSize.offsetLeft * -1,
                        position: 'absolute' }} />
                    <article style={{ marginTop: '2rem' }} ref={this.formContainerRef}>
                        <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                            <FormHeaderIcon />
                            <Systemtittel style={{ textAlign: 'center',
                                marginTop: '2rem' }}>
                                Opprett egenmelding
                            </Systemtittel>
                            <hr style={{ width: '10rem', marginBottom: '2rem' }} />

                            <FormSeparator
                                helptext="Vi oppretter en periode på 16 dager når du har valgt startdato.
                                Senere, når du skal fylle ut sykepengesøknaden vi sender deg, oppgir du hvor mange dager du brukte."
                                title="Dine opplysninger"
                            />

                            <div style={{ marginBottom: '2rem' }}>
                                <h2 className="nokkelopplysning__tittel">Navn</h2>
                                <p>
                                    Fornavn Etternavn
                                </p>
                            </div>

                            <div style={{ display: 'flex', marginBottom: '2rem' }}>
                                <div>
                                    <h2 className="nokkelopplysning__tittel">Periode</h2>
                                    <p className="js-periode blokk-xxs">
                                        <span>
                                            {tilLesbarDatoUtenAarstall(periode.correctedFom || periode.fom)}
                                            {' '}
                                -
                                            {' '}
                                            {tilLesbarDatoMedArstall(periode.tom)}
                                        </span>
                                        {' '}
                            •
                                        {' '}
                                        <span>16 dager</span>
                                    </p>
                                </div>
                                <div style={{ marginLeft: '4rem' }}>
                                    <h2 className="nokkelopplysning__tittel">Sykmeldingsgrad</h2>
                                    <p>
                                    100%
                                    </p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '3rem' }}>
                                <Checkbox
                                    checked={tidligereSyk}
                                    label="Jeg ble syk på et tidligere tidspunkt"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                tidligereSyk: !state.tidligereSyk,
                                                periode: {
                                                    ...state.periode,
                                                    correctedFom: state.tidligereSyk ? undefined : state.periode.correctedFom,
                                                },
                                            };
                                        });
                                    }}
                                    name="tidligereSyk" />
                                {tidligereSyk && (
                                    <div style={{ marginLeft: '2rem' }}>
                                        <EgenmeldingDatePicker
                                            label="Vennligst velg dato du ble syk"
                                            value={periode.correctedFom}
                                            onChange={(date) => {
                                                if (!date) { return; }
                                                this.setState((state) => {
                                                    return { periode: {
                                                        ...state.periode,
                                                        correctedFom: correctDateOffset(date),
                                                        tom: datePlus16Days(date),
                                                    } };
                                                });
                                            }} />
                                    </div>
                                )}
                            </div>

                            <FormSection
                                title="Har du mistanke om at du er smittet av korona?"
                                errorKey="koronamistanke"
                                errors={errors}
                                errorRef={this.errorRef.koronamistanke}>
                                <Radio
                                    checked={questions.koronamistanke}
                                    label="Ja"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    koronamistanke: true,
                                                    koronamistankeHjemmefra: undefined,
                                                    palagtKarantene: undefined,
                                                    palagtKaranteneHjemmefra: undefined,
                                                    husstandenSmittet: undefined,
                                                    husstandenSmittetHjemmefra: undefined,
                                                },
                                                questions: {
                                                    koronamistanke: true,
                                                    koronamistankeHjemmefra: undefined,
                                                    palagtKarantene: undefined,
                                                    palagtKaranteneHjemmefra: undefined,
                                                    husstandenSmittet: undefined,
                                                    husstandenSmittetHjemmefra: undefined,
                                                },
                                            };
                                        });
                                    }}
                                    name="koronamistankeJa" />
                                <Radio
                                    checked={questions.koronamistanke === false}
                                    label="Nei"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    koronamistanke: true,
                                                },
                                                questions: {
                                                    koronamistanke: false,
                                                    koronamistankeHjemmefra: undefined,
                                                    palagtKarantene: undefined,
                                                    palagtKaranteneHjemmefra: undefined,
                                                    husstandenSmittet: undefined,
                                                    husstandenSmittetHjemmefra: undefined,
                                                },
                                            };
                                        });
                                    }}
                                    name="koronamistankeNei" />
                            </FormSection>

                            <FormSection
                                title="Jobber du hjemmefra på fulltid?"
                                show={questions.koronamistanke === true}
                                errorKey="koronamistankeHjemmefra"
                                errors={errors}
                                errorRef={this.errorRef.koronamistankeHjemmefra}>
                                <Radio
                                    checked={questions.koronamistankeHjemmefra}
                                    label="Ja"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    koronamistankeHjemmefra: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    koronamistankeHjemmefra: true,
                                                },
                                            };
                                        });
                                    }}
                                    name="koronamistankeHjemmefraJa" />
                                <Radio
                                    checked={questions.koronamistankeHjemmefra === false}
                                    label="Nei"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    koronamistankeHjemmefra: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    koronamistankeHjemmefra: false,
                                                },
                                            };
                                        });
                                    }}
                                    name="koronamistankeHjemmefraNei" />
                            </FormSection>

                            <FormSection
                                title="Er du i pålagt karantene?"
                                show={questions.koronamistanke === false}
                                errorKey="palagtKarantene"
                                errors={errors}
                                errorRef={this.errorRef.palagtKarantene}>
                                <Radio
                                    checked={questions.palagtKarantene}
                                    label="Ja"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    palagtKarantene: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    palagtKarantene: true,
                                                    palagtKaranteneHjemmefra: undefined,
                                                    husstandenSmittet: undefined,
                                                },
                                            };
                                        });
                                    }}
                                    name="palagtKaranteneJa" />
                                <Radio
                                    checked={questions.palagtKarantene === false}
                                    label="Nei"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    palagtKarantene: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    palagtKarantene: false,
                                                    palagtKaranteneHjemmefra: undefined,
                                                    husstandenSmittet: undefined,
                                                },
                                            };
                                        });
                                    }}
                                    name="palagtKaranteneNei" />
                            </FormSection>

                            <FormSection
                                title="Jobber du hjemmefra på fulltid?"
                                show={questions.palagtKarantene === true}
                                errorKey="palagtKaranteneHjemmefra"
                                errors={errors}
                                errorRef={this.errorRef.palagtKaranteneHjemmefra}>
                                <Radio
                                    checked={questions.palagtKaranteneHjemmefra}
                                    label="Ja"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    palagtKaranteneHjemmefra: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    palagtKaranteneHjemmefra: true,
                                                },
                                            };
                                        });
                                    }}
                                    name="palagtKaranteneHjemmefraJa" />
                                <Radio
                                    checked={questions.palagtKaranteneHjemmefra === false}
                                    label="Nei"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    palagtKaranteneHjemmefra: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    palagtKaranteneHjemmefra: false,
                                                },
                                            };
                                        });
                                    }}
                                    name="palagtKaranteneHjemmefraNei" />
                            </FormSection>

                            <FormSection
                                title="Er noen i husstanden din smittet?"
                                show={questions.palagtKarantene === false}
                                errorKey="husstandenSmittet"
                                errors={errors}
                                errorRef={this.errorRef.husstandenSmittet}>
                                <Radio
                                    checked={questions.husstandenSmittet}
                                    label="Ja"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    husstandenSmittet: true,
                                                    husstandenSmittetHjemmefra: undefined,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    husstandenSmittet: true,
                                                    husstandenSmittetHjemmefra: undefined,
                                                },
                                            };
                                        });
                                    }}
                                    name="husstandenSmittetJa" />
                                <Radio
                                    checked={questions.husstandenSmittet === false}
                                    label="Nei"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    husstandenSmittet: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    husstandenSmittet: false,
                                                },
                                            };
                                        });
                                    }}
                                    name="husstandenSmittetNei" />
                            </FormSection>

                            <FormSection
                                title="Jobber du hjemmefra på fulltid?"
                                show={questions.husstandenSmittet === true}
                                errorKey="husstandenSmittetHjemmefra"
                                errors={errors}
                                errorRef={this.errorRef.husstandenSmittetHjemmefra}>
                                <Radio
                                    checked={questions.husstandenSmittetHjemmefra}
                                    label="Ja"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    husstandenSmittetHjemmefra: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    husstandenSmittetHjemmefra: true,
                                                },
                                            };
                                        });
                                    }}
                                    name="husstandenSmittetHjemmefraJa" />
                                <Radio
                                    checked={questions.husstandenSmittetHjemmefra === false}
                                    label="Nei"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    husstandenSmittetHjemmefra: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    husstandenSmittetHjemmefra: false,
                                                },
                                            };
                                        });
                                    }}
                                    name="husstandenSmittetHjemmefraNei" />
                            </FormSection>

                            <HjemmefraInfo show={workFromHomeQuestionVisible} />

                            <div style={{ display: 'flex', marginTop: '3rem', marginBottom: '2rem' }}>
                                <div>
                                    <h2 className="nokkelopplysning__tittel">Diagnose</h2>
                                    {showDiagnose && <p>COVID-19</p>}
                                    {!showDiagnose && <p>-</p>}
                                </div>
                                <div style={{ marginLeft: '8rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <h2 className="nokkelopplysning__tittel">Diagnosekode</h2>
                                        <div style={{ marginBottom: '-1rem' }}>
                                            <Hjelpetekst>
                                            Diagnosekoden henviser til de internasjonale kodeverkene som klassifiserer sykdom og symptomer.
                                            De ulike diagnosekodene brukes for å gi en mest mulig presis diagnose.
                                            </Hjelpetekst>
                                        </div>
                                    </div>
                                    {showDiagnose && <p>{CORONA_CODE}</p>}
                                    {!showDiagnose && <p>-</p>}
                                </div>
                            </div>

                            {!canUseEgenmelding && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <CannotUseMelding text="Du kan ikke bruke egenmelding" />
                                    <br />

                                    <Lenke href="https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/nyheter/sykepenger-for-selvstendig-naeringsdrivende-og-frilansere-under-koronapandemien">
                                        Les mer om hvem som kan bruke tjenesten her.
                                    </Lenke>
                                </div>
                            )}

                            <Element>Din arbeidssituasjon</Element>
                            <div style={{ display: 'flex', marginTop: '1rem', marginBottom: '3rem', marginLeft: '2rem' }}>
                                <img width={28} src={checkmarkSvg} alt="Hake" />
                                <div style={{ lineHeight: '30px', marginLeft: '1rem' }}>Jobb som selvstendig næringsdrivende eller frilanser</div>
                            </div>

                            <FormSeparator
                                title="Bekreft og opprett"
                            />

                            <Bekreft
                                onChange={() => { this.setState((state) => { return { bekreftet: !state.bekreftet }; }); }}
                                value={!!bekreftet}
                            />

                            <div style={{ marginBottom: '2rem' }}>
                                <Hovedknapp
                                    disabled={!canUseEgenmelding || mappedErrors.length > 0 || !bekreftet}
                                    onClick={() => { return this.submit(); }}>
                                Opprett egenmeldingen
                                </Hovedknapp>
                            </div>

                            <Knapp
                                onClick={() => { this.setState({ showAvbryt: true }); }}>
                                Avbryt
                            </Knapp>

                            {showAvbryt
                                && (
                                    <AvbrytRegistrering
                                        onAvbryt={() => { history.push('/sykefravaer'); }}
                                        onAngre={() => { this.setState({ showAvbryt: false }); }}
                                    />
                                )
                            }
                        </div>
                    </article>
                </div>

                <p style={{ marginTop: '4rem' }} className="ikke-print blokk navigasjonsstripe">
                    <a className="tilbakelenke" href="/sykefravaer/">
TILBAKE
                    </a>
                </p>
            </div>

        );
    }
}

KoronaSchema.propTypes = {
    opprettSykmelding: PropTypes.func,
};


export default KoronaSchema;
