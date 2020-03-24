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

const CORONA_CODE = 'R991';
const OTHER_CODE = '4NN37';

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
            startDato: new Date(),
            korrigertStartDato: undefined,
            boxSize: {
                formHeight: 0,
                offsetLeft: 0,
                width: 0,
            },
            errors: undefined,
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
        if (this.state.errors !== nextState.errors) {
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

    getEndDate() {
        const { startDato, korrigertStartDato } = this.state;

        const endDate = new Date();

        if (korrigertStartDato) {
            endDate.setDate(korrigertStartDato.getDate() + 14);
            return endDate;
        }

        endDate.setDate(startDato.getDate() + 14);
        return endDate;
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
            this.setState({ valgtArbeidssituasjon: valgtArbeidssituasjon.filter((a) => {
                return a !== name;
            }) });
        } else {
            this.setState({ valgtArbeidssituasjon: [...valgtArbeidssituasjon, name] });
        }
    }

    updateAnnet(annetSituasjon) {
        // eslint-disable-next-line react/destructuring-assignment
        if (this.state.annetSituasjon === annetSituasjon) {
            this.setState({ annetSituasjon: undefined });
        } else {
            this.setState({ annetSituasjon });
        }
    }

    updateArbeidsgivere(orgnummer) {
        const { valgtArbeidsgivere } = this.state;

        if (valgtArbeidsgivere.includes(orgnummer)) {
            this.setState({ valgtArbeidsgivere: valgtArbeidsgivere.filter((a) => {
                return a !== orgnummer;
            }) });
        } else {
            this.setState({ valgtArbeidsgivere: [...valgtArbeidsgivere, orgnummer] });
        }
    }

    validateAll() {
        const errors = {};

        const { koronamistanke, valgtArbeidsgivere, valgtArbeidssituasjon, annetSituasjon } = this.state;

        if (koronamistanke === undefined) {
            errors.koronamistanke = 'Du må bekrefte om du mistenker at du er smittet av korona';
        }

        if ((valgtArbeidsgivere.length === 0 && valgtArbeidssituasjon.length === 0) && annetSituasjon === undefined) {
            errors.valgtArbeidssituasjon = 'Du må velge en arbeidssituasjon';
        }

        if (Object.keys(errors).length === 0) {
            this.setState({ errors: undefined });
            return undefined;
        }

        this.setState({ errors });
        return errors;
    }

    submit() {
        const errors = this.validateAll();
        if (errors) {
            this.errorSummaryRef.current.focus();
            return;
        }

        const {
            valgtArbeidsgivere,
            annetSituasjon,
            startDato,
            korrigertStartDato,
            koronamistanke,
        } = this.state;

        const sykmelding = {
            valgtArbeidsgivere,
            annetSituasjon,
            startDato: korrigertStartDato || startDato,
            diagnose: koronamistanke ? CORONA_CODE : OTHER_CODE,
        };

        const { opprettSykmelding } = this.props;
        opprettSykmelding(sykmelding);
    }

    render() {
        const { arbeidsgivere, valgtArbeidsgivere, koronamistanke,
            bekreftet, valgtArbeidssituasjon, annetSituasjon, tidligereSyk, startDato, korrigertStartDato, boxSize, errors } = this.state;

        const endDate = this.getEndDate();

        console.log(errors);

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
                                    <h2 className="nokkelopplysning__tittel">Egenmeldingsperiode</h2>
                                    <p className="js-periode blokk-xxs">
                                        <span>
                                            {tilLesbarDatoUtenAarstall(korrigertStartDato || startDato)}
                                            {' '}
                                -
                                            {' '}
                                            {tilLesbarDatoMedArstall(endDate)}
                                        </span>
                                        {' '}
                            •
                                        {' '}
                                        <span>14 dager</span>
                                    </p>
                                </div>
                                <div style={{ marginLeft: '4rem' }}>
                                    <h2 className="nokkelopplysning__tittel">Sykefraværsgrad</h2>
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
                                                korrigertStartDato: state.tidligereSyk ? undefined : state.korrigertStartDato,
                                            };
                                        });
                                    }}
                                    name="tidligereSyk" />
                                {tidligereSyk && (
                                    <div style={{ marginLeft: '2rem' }}>
                                        <EgenmeldingDatePicker
                                            label="Vennligst velg dato du ble syk"
                                            value={korrigertStartDato}
                                            onChange={(date) => {
                                                return this.setState({ korrigertStartDato: correctDateOffset(date) });
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
                                    onClick={() => { this.setState({ koronamistanke: true }); }}
                                    name="koronamistankeJa" />
                                <Radio
                                    checked={koronamistanke === false}
                                    label="Nei"
                                    onChange={() => {}}
                                    onClick={() => { this.setState({ koronamistanke: false }); }}
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
                                errorKey="valgtArbeidssituasjon"
                                errors={errors}
                                errorRef={this.errorRef.valgtArbeidssituasjon}>
                                {arbeidsgivere.map((arbeidsgiver) => {
                                    return (
                                        <div key={arbeidsgiver.orgnummer}>
                                            <Checkbox
                                                checked={valgtArbeidsgivere.includes(arbeidsgiver.orgnummer)}
                                                name={arbeidsgiver.orgnummer}
                                                onChange={() => { return this.updateArbeidsgivere(arbeidsgiver.orgnummer); }}
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

                                {valgtArbeidssituasjon.length >= 2 && (
                                    <div style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex' }}>
                                        <img
                                            style={{ marginRight: '10px', marginTop: '-2px' }}
                                            src={infoSvg}
                                            alt="Info"
                                        />
                                            Er du sykmeldt fra flere jobber, opprettes det en sykmelding for hver av dem.
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
                                <h3 className="skjema__sporsmal">Er opplysningene du har gitt riktige?</h3>
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
                                errors={errors}
                                errorSummaryRef={this.errorSummaryRef}
                                refs={{ valgtArbeidssituasjon: this.errorRef.valgtArbeidssituasjon, koronamistanke: this.errorRef.koronamistanke }} />

                            <div style={{ marginBottom: '2rem' }}>
                                <Hovedknapp disabled={errors || !bekreftet} onClick={() => { return this.submit(); }}>Opprett egenmelding</Hovedknapp>
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
