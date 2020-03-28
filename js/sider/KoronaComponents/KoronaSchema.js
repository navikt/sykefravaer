/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Sidetittel, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import {
    tilLesbarDatoUtenAarstall,
} from '@navikt/digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import EgenmeldingDatePicker from './EgenmeldingDatePicker';

import FormErrorSummary from './FormComponents/FormErrorSummary';
import FormHeaderIcon from './FormComponents/FormHeaderIcon';
import FormVeileder from './FormComponents/FormVeileder';
import FormSeparator from './FormComponents/FormSeparator';
import FormSection from './FormComponents/FormSection';

const correctDateOffset = (date) => {
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return date;
};

const datePlus14Days = (date) => {
    const endDate = new Date();

    endDate.setDate(date.getDate() + 14);
    return endDate;
};

const hasErrors = (errors) => {
    return Object.values(errors).some((error) => { return error !== undefined; });
};

const CORONA_CODE = 'R991';
const OTHER_CODE = '4NN37';

const INITIAL_ERRORS = {
    koronamistanke: undefined,
    karantene: undefined,
    hjemmefra: undefined,
    husstandenSmittet: undefined,
    husstandenSmittetHjemmefra: undefined,
};

const INITIAL_TOUCHED = {
    koronamistanke: undefined,
    karantene: undefined,
    hjemmefra: undefined,
    husstandenSmittet: undefined,
    husstandenSmittetHjemmefra: undefined,
};

class KoronaSchema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: {
                koronamistanke: undefined,
                karantene: undefined,
                hjemmefra: undefined,
                husstandenSmittet: undefined,
                husstandenSmittetHjemmefra: undefined,
            },
            bekreftet: undefined,
            tidligereSyk: false,
            periode: {
                fom: new Date(),
                correctedFom: undefined,
                tom: datePlus14Days(new Date()),
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
            karantene: React.createRef(),
            hjemmefra: React.createRef(),
            husstandenSmittet: React.createRef(),
            husstandenSmittetHjemmefra: React.createRef(),
        };
        this.errorSummaryRef = React.createRef();

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
            this.errorSummaryRef.current.focus();
            return;
        }

        const {
            periode,
        } = this.state;

        const sykmelding = {
            periode: {
                fom: periode.correctedFom || periode.fom,
                tom: periode.tom,
            },
        };

        const { opprettSykmelding } = this.props;
        opprettSykmelding(sykmelding);
    }

    render() {
        const {
            questions,
            bekreftet,
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

        const canUseEgenmelding = !(
            (questions.hjemmefra === true)
            || (questions.husstandenSmittetHjemmefra === true)
            || (questions.husstandenSmittet === false));

        return (
            <div>
                <Sidetittel tag="h1" style={{ marginBottom: '2rem', textAlign: 'center' }}>16-dagers koronamelding</Sidetittel>
                <Undertittel>
                    NAV har laget en 16-dagers sykmeldingstjeneste for selvstendig næringsdrivende og frilansere. Dette gjelder kun for sykefravær som skyldes covid-19 pandemien.
                </Undertittel>
                <br />
                <Undertittel>
                    Du kan selv opprette og sende inn koronameldingen i skjemaet under, uten å kontakte fastlegen eller legevakten.
                </Undertittel>
                <br />

                <FormVeileder formContainerRef={this.formContainerRef} />

                <div>
                    <div style={{
                        backgroundColor: 'white',
                        height: boxSize.formHeight,
                        width: boxSize.width,
                        zIndex: '-1',
                        marginLeft: boxSize.offsetLeft * -1,
                        position: 'absolute' }} />
                    <article style={{ marginTop: '6rem' }} ref={this.formContainerRef}>
                        <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                            <FormHeaderIcon />
                            <Systemtittel style={{ textAlign: 'center',
                                marginTop: '2rem' }}>
                                Opprett koronamelding
                            </Systemtittel>
                            <hr style={{ width: '10rem', marginBottom: '2rem' }} />

                            <FormSeparator
                                helptext="Vi har foreslått dagens dato for deg, men du kan endre på datoene. Lengden kan være maksimalt 14 dager."
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
                                        <span>14 dager</span>
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
                                    label="Jeg ble syk eller måtte i karantene på et tidligere tidspunkt"
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
                                                return this.setState((state) => {
                                                    return { periode: {
                                                        ...state.periode,
                                                        correctedFom: correctDateOffset(date),
                                                        tom: datePlus14Days(date),
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
                                                },
                                                questions: {
                                                    koronamistanke: true,
                                                    karantene: undefined,
                                                    hjemmefra: undefined,
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
                                                questions: { koronamistanke: false,
                                                    karantene: undefined,
                                                    hjemmefra: undefined,
                                                    husstandenSmittet: undefined,
                                                    husstandenSmittetHjemmefra: undefined,
                                                },
                                            };
                                        });
                                    }}
                                    name="koronamistankeNei" />
                            </FormSection>

                            <FormSection
                                title="Er du i pålagt karantene?"
                                errorKey="karantene"
                                errors={errors}
                                show={questions.koronamistanke === false}
                                errorRef={this.errorRef.karantene}>
                                <Radio
                                    checked={questions.karantene}
                                    label="Ja"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    karantene: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    karantene: true,
                                                    hjemmefra: undefined,
                                                    husstandenSmittet: undefined,
                                                    husstandenSmittetHjemmefra: undefined,
                                                },
                                            };
                                        });
                                    }}
                                    name="karanteneJa" />
                                <Radio
                                    checked={questions.karantene === false}
                                    label="Nei"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    karantene: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    karantene: false,
                                                    hjemmefra: undefined,
                                                    husstandenSmittet: undefined,
                                                    husstandenSmittetHjemmefra: undefined,
                                                },
                                            };
                                        });
                                    }}
                                    name="karanteneNei" />
                            </FormSection>

                            <FormSection
                                title="Jobber du hjemmefra?"
                                errorKey="hjemmefra"
                                errors={errors}
                                show={questions.karantene === true}
                                errorRef={this.errorRef.hjemmefra}>
                                <Radio
                                    checked={questions.hjemmefra}
                                    label="Ja"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    hjemmefra: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    hjemmefra: true,
                                                },
                                            };
                                        });
                                    }}
                                    name="hjemmefraJa" />
                                <Radio
                                    checked={questions.hjemmefra === false}
                                    label="Nei"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    hjemmefra: true,
                                                },
                                                questions: {
                                                    ...state.questions,
                                                    hjemmefra: false,
                                                },
                                            };
                                        });
                                    }}
                                    name="hjemmefraNei" />
                            </FormSection>

                            <FormSection
                                title="Er noen i husstanden din smittet?"
                                errorKey="husstandenSmittet"
                                errors={errors}
                                show={questions.karantene === false}
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
                                                    husstandenSmittetHjemmefra: undefined,
                                                },
                                            };
                                        });
                                    }}
                                    name="husstandenSmittetNei" />
                            </FormSection>

                            <FormSection
                                title="Jobber du hjemmefra?"
                                errorKey="husstandenSmittetHjemmefra"
                                errors={errors}
                                show={questions.husstandenSmittet === true}
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

                            {!canUseEgenmelding && (
                                <div>
                                    <AlertStripeFeil>Du kan ikke bruke egenmelding</AlertStripeFeil>
                                    <Lenke href="#">Les mer om hvem som kan bruke den her TODO: href</Lenke>
                                </div>
                            )}


                            <div style={{ display: 'flex', marginTop: '3rem', marginBottom: '2rem' }}>
                                <div>
                                    <h2 className="nokkelopplysning__tittel">Diagnose</h2>
                                    {questions.koronamistanke && <p>COVID-19</p>}
                                    {questions.koronamistanke === false && <p>Annet</p>}
                                    {questions.koronamistanke === undefined && <p>-</p>}
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
                                    {questions.koronamistanke && <p>{CORONA_CODE}</p>}
                                    {questions.koronamistanke === false && <p>{OTHER_CODE}</p>}
                                    {questions.koronamistanke === undefined && <p>-</p>}
                                </div>
                            </div>

                            <FormSeparator
                                helptext="Du kan velge en eller flere arbeidssituasjoner."
                                title="Din arbeidssituasjon"
                            />

                            <Radio
                                checked
                                name="selvstendig"
                                label="Jobb som selvstendig næringsdrivende" />

                            <FormSeparator
                                title="Bekreft og opprett"
                            />

                            <div style={{ marginBottom: '3rem' }}>
                                <h3 className="skjema__sporsmal">Er opplysningene du har oppgitt riktige?</h3>
                                <Radio
                                    checked={bekreftet}
                                    label="Ja"
                                    onChange={() => { this.setState({ bekreftet: true }); }}
                                    name="ja" />
                                <Radio
                                    checked={bekreftet === false}
                                    label="Nei"
                                    onChange={() => { this.setState({ bekreftet: false }); }}
                                    name="nei" />
                            </div>

                            <FormErrorSummary
                                mappedErrors={mappedErrors}
                                errorSummaryRef={this.errorSummaryRef}
                                refs={{ koronamistanke: this.errorRef.koronamistanke }} />

                            <div style={{ marginBottom: '2rem' }}>
                                <Hovedknapp
                                    disabled={!canUseEgenmelding || mappedErrors.length > 0 || !bekreftet}
                                    onClick={() => { return this.submit(); }}>
                                Opprett koronamelding
                                </Hovedknapp>
                            </div>

                            <a href="/sykefravaer/" className="knapp">Avbryt</a>
                        </div>
                    </article>
                </div>

                <p style={{ marginTop: '4rem' }} className="ikke-print blokk navigasjonsstripe">
                    <a className="tilbakelenke" href="/sykefravaer/">
TILBAKE TIL DITT SYKEFRAVÆR
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
