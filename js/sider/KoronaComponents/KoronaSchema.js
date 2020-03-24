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
import { arbeidsgiver as arbeidsgiverPt } from '../../propTypes';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import EgenmeldingDatePicker from './EgenmeldingDatePicker';

import { infoSvg } from './svg/infoSvg';

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

const CORONA_CODE = 'R991';
const OTHER_CODE = '4NN37';

const INITIAL_ERRORS = {
    koronamistanke: undefined,
    arbeidssituasjon: undefined,
};

const INITIAL_TOUCHED = {
    koronamistanke: undefined,
    arbeidssituasjon: undefined,
};

class KoronaSchema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arbeidsgivere: props.arbeidsgivere,
            valgtArbeidsgivere: [],
            valgtArbeidssituasjon: [],
            koronamistanke: undefined,
            annetSituasjon: undefined,
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
            valgtArbeidssituasjon: React.createRef(),
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
        if (this.state.koronamistanke !== nextState.koronamistanke) {
            this.validateAll();
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (this.state.valgtArbeidsgivere !== nextState.valgtArbeidsgivere) {
            this.validateAll();
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (this.state.valgtArbeidssituasjon !== nextState.valgtArbeidssituasjon) {
            this.validateAll();
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (this.state.annetSituasjon !== nextState.annetSituasjon) {
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

    updateArbeidssituasjon(name) {
        const { valgtArbeidssituasjon } = this.state;

        if (valgtArbeidssituasjon.includes(name)) {
            this.setState((state) => {
                return {
                    touched: { ...state.touched, arbeidssituasjon: true },
                    valgtArbeidssituasjon: valgtArbeidssituasjon.filter((a) => {
                        return a !== name;
                    }),
                };
            });
        } else {
            this.setState((state) => {
                return {
                    touched: { ...state.touched, arbeidssituasjon: true },
                    valgtArbeidssituasjon: [...valgtArbeidssituasjon, name],
                };
            });
        }
    }

    updateAnnet(annetSituasjon) {
        // eslint-disable-next-line react/destructuring-assignment
        if (this.state.annetSituasjon === annetSituasjon) {
            this.setState((state) => {
                return {
                    touched: { ...state.touched, arbeidssituasjon: true },
                    annetSituasjon: undefined,
                };
            });
        } else {
            this.setState((state) => {
                return {
                    touched: { ...state.touched, arbeidssituasjon: true },
                    annetSituasjon,
                };
            });
        }
    }

    updateArbeidsgivere(arbeidsgiver) {
        const { valgtArbeidsgivere } = this.state;

        const alreadySelected = valgtArbeidsgivere.find((a) => {
            return a.orgnummer === arbeidsgiver.orgnummer;
        });

        if (alreadySelected) {
            this.setState((state) => {
                return {
                    touched: { ...state.touched, arbeidssituasjon: true },
                    valgtArbeidsgivere: valgtArbeidsgivere.filter((a) => {
                        return a.orgnummer !== arbeidsgiver.orgnummer;
                    }),
                };
            });
        } else {
            this.setState((state) => {
                return {
                    touched: { ...state.touched, arbeidssituasjon: true },
                    valgtArbeidsgivere: [...valgtArbeidsgivere, arbeidsgiver],
                };
            });
        }
    }

    validateAll(submitting = false) {
        const updatedErrors = { ...INITIAL_ERRORS };

        const { koronamistanke, valgtArbeidsgivere, valgtArbeidssituasjon, annetSituasjon, touched } = this.state;

        // If we are submitting, validate all fields ignoring touched status
        if (submitting || touched.koronamistanke) {
            if (koronamistanke === undefined) {
                updatedErrors.koronamistanke = 'Du må bekrefte om du mistenker at du er smittet av korona';
            }
        }

        if (submitting || touched.arbeidssituasjon) {
            if ((valgtArbeidsgivere.length === 0 && valgtArbeidssituasjon.length === 0) && annetSituasjon === undefined) {
                updatedErrors.arbeidssituasjon = 'Du må velge en arbeidssituasjon';
            }
        }

        if (Object.keys(updatedErrors).length === 0) {
            this.setState({ errors: INITIAL_ERRORS });
            return undefined;
        }

        this.setState({ errors: updatedErrors });
        return updatedErrors;
    }

    touchAll() {
        this.setState({ touched: {
            koronamistanke: true,
            arbeidssituasjon: true,
        } });
    }

    submit() {
        this.touchAll();
        const errors = this.validateAll(true);
        if (errors.length > 0) {
            this.errorSummaryRef.current.focus();
            return;
        }

        const {
            valgtArbeidsgivere,
            annetSituasjon,
            periode,
            koronamistanke,
        } = this.state;

        const sykmelding = {
            arbeidsforhold: valgtArbeidsgivere,
            annetSituasjon,
            periode: {
                fom: periode.correctedFom || periode.fom,
                tom: periode.tom,
            },
            diagnose: koronamistanke ? CORONA_CODE : OTHER_CODE,
        };

        const { opprettSykmelding } = this.props;
        opprettSykmelding(sykmelding);
    }

    render() {
        const { arbeidsgivere, valgtArbeidsgivere, koronamistanke,
            bekreftet, valgtArbeidssituasjon, annetSituasjon, tidligereSyk, periode, boxSize, errors } = this.state;

        console.log(valgtArbeidsgivere);

        const mappedErrors = Object.entries(errors).reduce((acc, errorEntry) => {
            if (errorEntry[1]) {
                return [...acc, errorEntry];
            }
            return acc;
        }, []);

        return (
            <div>
                <Sidetittel tag="h1" style={{ marginBottom: '2rem', textAlign: 'center' }}>Forlenget egenmelding</Sidetittel>
                <Undertittel>
                    Grunnet stor pågang hos helsevesenet og kontaktsentre har NAV laget en midlertidig egenmeldingstjeneste du kan benytte deg av om du er blitt syk.
                </Undertittel>
                <br />
                <Undertittel>
                    Du kan opprette egenmeldingen via. skjemaet under uten å kontakte fastlegen eller legevakten.
                </Undertittel>
                <br />

                <Lenke href="#">Du kan lese mer om forlenget egenmelding her. (TODO: MANGLER LENKE)</Lenke>

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
                                Opprettelse av forlenget egenmelding
                            </Systemtittel>
                            <hr style={{ width: '10rem', marginBottom: '2rem' }} />

                            <FormSeparator
                                helptext="Vi har foreslått dagens dato for deg, men du kan endre på datoene. Lengden kan være maksimalt 14 dager."
                                title="Sykmeldingsinfo"
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
                                    checked={koronamistanke}
                                    label="Ja"
                                    onChange={() => {}}
                                    onClick={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    koronamistanke: true,
                                                },
                                                koronamistanke: true,
                                            };
                                        });
                                    }}
                                    name="koronamistankeJa" />
                                <Radio
                                    checked={koronamistanke === false}
                                    label="Nei"
                                    onChange={() => {}}
                                    onClick={() => {
                                        this.setState((state) => {
                                            return {
                                                touched: {
                                                    ...state.touched,
                                                    koronamistanke: true,
                                                },
                                                koronamistanke: false,
                                            };
                                        });
                                    }}
                                    name="koronamistankeNei" />
                            </FormSection>

                            <div style={{ display: 'flex', marginTop: '3rem', marginBottom: '2rem' }}>
                                <div>
                                    <h2 className="nokkelopplysning__tittel">Diagnose</h2>
                                    {koronamistanke && <p>COVID-19</p>}
                                    {koronamistanke === false && <p>Annet</p>}
                                    {koronamistanke === undefined && <p>-</p>}
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
                                    {koronamistanke && <p>{CORONA_CODE}</p>}
                                    {koronamistanke === false && <p>{OTHER_CODE}</p>}
                                    {koronamistanke === undefined && <p>-</p>}
                                </div>
                            </div>

                            <FormSeparator
                                helptext="Du kan velge en eller flere arbeidssituasjoner."
                                title="Din arbeidssituasjon"
                            />

                            <FormSection
                                title="Jeg er sykmeldt fra"
                                errorKey="arbeidssituasjon"
                                errors={errors}
                                errorRef={this.errorRef.valgtArbeidssituasjon}>
                                {arbeidsgivere.map((arbeidsgiver) => {
                                    return (
                                        <div key={arbeidsgiver.orgnummer}>
                                            <Checkbox
                                                checked={valgtArbeidsgivere.find((a) => { return a.orgnummer === arbeidsgiver.orgnummer; })}
                                                name={arbeidsgiver.orgnummer}
                                                onChange={() => { return this.updateArbeidsgivere(arbeidsgiver); }}
                                                label={arbeidsgiver.navn} />
                                            <span
                                                style={{ marginTop: '-1rem',
                                                    marginLeft: '2rem',
                                                    marginBottom: '1rem' }}
                                                className="sekundaerLabel">
    (Org. nummer:
                                                {arbeidsgiver.orgnummer}
    )
                                            </span>
                                        </div>
                                    );
                                })}
                                <Checkbox
                                    checked={valgtArbeidssituasjon.includes('selvstendig')}
                                    name="selvstendig"
                                    onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                                    label="Jobb som selvstendig næringsdrivende" />
                                <Checkbox
                                    checked={valgtArbeidssituasjon.includes('frilanser')}
                                    name="frilanser"
                                    onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                                    label="Jobb som frilanser" />

                                {[...valgtArbeidssituasjon, ...valgtArbeidsgivere].length >= 2 && (
                                    <div style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex' }}>
                                        <img
                                            style={{ marginRight: '15px', marginTop: '-2px' }}
                                            src={infoSvg}
                                            alt="Info"
                                        />
                                            Det opprettes en sykmelding for hvert arbeidssituasjon.
                                        <br />
                                            Husk at du må sende sykmeldinger hver for seg.
                                    </div>
                                )
                                }

                                <h3 className="skjema__sporsmal">Annet</h3>
                                <Radio
                                    checked={annetSituasjon === 'annen'}
                                    label="Arbeidsgiver er ikke oppført"
                                    onClick={(e) => { return this.updateAnnet(e.target.name); }}
                                    onChange={() => {}}
                                    name="annen" />
                                <Radio
                                    checked={annetSituasjon === 'arbeidsledig'}
                                    label="Jeg er arbeidsledig"
                                    onClick={(e) => { return this.updateAnnet(e.target.name); }}
                                    onChange={() => {}}
                                    name="arbeidsledig" />
                                <Radio
                                    checked={annetSituasjon === 'ingenting'}
                                    label="Jeg finner ingenting som passer for meg"
                                    onClick={(e) => { return this.updateAnnet(e.target.name); }}
                                    onChange={() => {}}
                                    name="ingenting" />
                            </FormSection>

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
                                refs={{ valgtArbeidssituasjon: this.errorRef.valgtArbeidssituasjon, koronamistanke: this.errorRef.koronamistanke }} />

                            <div style={{ marginBottom: '2rem' }}>
                                <Hovedknapp disabled={mappedErrors.length > 0 || !bekreftet} onClick={() => { return this.submit(); }}>Opprett egenmelding</Hovedknapp>
                            </div>

                            <a href="/sykefravaer/" className="knapp">Avbryt</a>
                        </div>
                    </article>
                </div>

                <p style={{ marginTop: '4rem' }} className="ikke-print blokk navigasjonsstripe">
                    <a className="tilbakelenke" href="/sykefravaer/">
TILBAKE DITT SYKEFRAVÆR
                    </a>
                </p>
            </div>

        );
    }
}

KoronaSchema.propTypes = {
    opprettSykmelding: PropTypes.func,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
};


export default KoronaSchema;
