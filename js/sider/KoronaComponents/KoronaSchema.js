/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Sidetittel, Systemtittel, Undertittel, Ingress, Element } from 'nav-frontend-typografi';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import {
    tilLesbarDatoUtenAarstall,
} from '@navikt/digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { arbeidsgiver as arbeidsgiverPt } from '../../propTypes';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import KoronaDatePicker from './KoronaDatePicker';
import { koronameldingSvg } from './koronameldingSvg';

const infoSvg = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBB
ZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9u
OiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBT
VkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzEx
LmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9Ik91dGluZV9WZXJzaW9uIiB4bWxucz0iaHR0
cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8x
OTk5L3hsaW5rIiB4PSIwcHgiDQoJIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIg
dmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1s
OnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNMTEuNSwxQzUuMTU5LDEsMCw2LjE1
OSwwLDEyLjVDMCwxOC44NDEsNS4xNTksMjQsMTEuNSwyNFMyMywxOC44NDEsMjMsMTIuNUMyMyw2
LjE1OSwxNy44NDEsMSwxMS41LDF6IE0xMS41LDIzDQoJCUM1LjcxLDIzLDEsMTguMjksMSwxMi41
QzEsNi43MSw1LjcxLDIsMTEuNSwyUzIyLDYuNzEsMjIsMTIuNUMyMiwxOC4yOSwxNy4yOSwyMywx
MS41LDIzeiIvPg0KCTxwYXRoIGQ9Ik0xNC41LDE5SDEydi04LjVjMC0wLjI3Ni0wLjIyNC0wLjUt
MC41LTAuNWgtMkM5LjIyNCwxMCw5LDEwLjIyNCw5LDEwLjVTOS4yMjQsMTEsOS41LDExSDExdjhI
OC41DQoJCUM4LjIyNCwxOSw4LDE5LjIyNCw4LDE5LjVTOC4yMjQsMjAsOC41LDIwaDZjMC4yNzYs
MCwwLjUtMC4yMjQsMC41LTAuNVMxNC43NzYsMTksMTQuNSwxOXoiLz4NCgk8Y2lyY2xlIGN4PSIx
MSIgY3k9IjYuNSIgcj0iMSIvPg0KPC9nPg0KPC9zdmc+DQo=`;

const correctDateOffset = (date) => {
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return date;
};

class KoronaSchema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arbeidsgivere: props.arbeidsgivere,
            valgtArbeidsgivere: [],
            valgtArbeidssituasjon: [],
            annetSituasjon: undefined,
            bekreftet: undefined,
            tidligereSyk: false,
            startDato: new Date(),
            korrigertStartDato: undefined,
            formHeight: 0,
            offsetLeft: 0,
            width: 0,
        };
        this.formElement = React.createRef();

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
        if (!this.formElement) {
            return null;
        }

        const formHeight = this.formElement.current.clientHeight;
        const offsetLeft = this.formElement.current.getBoundingClientRect().left;
        const width = this.formElement.current.getBoundingClientRect().left + this.formElement.current.getBoundingClientRect().right;

        this.setState({ formHeight, offsetLeft, width });
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

    submit() {
        const {
            valgtArbeidsgivere,
            arbeidssituasjon,
            startDato,
            korrigertStartDato,
        } = this.state;

        const sykmelding = {
            valgtArbeidsgivere,
            arbeidssituasjon,
            startDato: korrigertStartDato || startDato,
        };

        const { opprettSykmelding } = this.props;
        opprettSykmelding(sykmelding);
    }

    render() {
        const { arbeidsgivere, valgtArbeidsgivere,
            bekreftet, valgtArbeidssituasjon, annetSituasjon, tidligereSyk, startDato, korrigertStartDato, formHeight, offsetLeft, width } = this.state;

        const endDate = this.getEndDate();

        return (
            <div>
                <Sidetittel tag="h1" style={{ marginBottom: '2rem', textAlign: 'center' }}>Koronamelding</Sidetittel>
                <Undertittel>
                    Her kan du selv opprette 14-dagers egenmelding hvis du mistenker at du er smittet av koronaviruset.
                    Du trenger ikke kontakte fastlege eller legevakten.
                </Undertittel>
                <br />

                <Lenke href="#">Du kan lese mer om koronameldingen her.</Lenke>

                <div
                    style={{ marginTop: '4rem' }}>
                    <Bjorn
                        className="blokk"
                        hvit
                        stor>
                            Hei, vanligvis er det en behandler som sykmelder deg og sender den inn til oss.
                            I dette tilfellet blir du selv nødt til å opprette sykmeldingen før du kan bekrefte- og sende den inn.
                        <br />
                        <br />
                        <Knapp>Opprett nå</Knapp>
                    </Bjorn>
                </div>

                <div>
                    <div style={{ backgroundColor: 'white', height: formHeight, width, zIndex: '-1', marginLeft: offsetLeft * -1, position: 'absolute' }} />
                    <article style={{ marginTop: '6rem' }} ref={this.formElement}>
                        <div className="panel blokk">
                            <div style={{
                                height: '66px',
                                width: '66px',
                                position: 'absolute',
                                left: '50%',
                                marginLeft: '-33px',
                                marginTop: '-66px',
                            }}>
                                <img src={koronameldingSvg} alt="Ikon" />
                            </div>
                            <Systemtittel style={{ textAlign: 'center',
                                marginTop: '2rem' }}>
Opprettelse av koronamelding
                            </Systemtittel>
                            <hr style={{ width: '10rem', marginBottom: '2rem' }} />

                            <div style={{ marginBottom: '2rem' }}>
                                <img
                                    style={{ position: 'absolute', marginLeft: '-40px', width: '30px', marginTop: '-3px' }}
                                    src={infoSvg}
                                    alt="Info"
                                />
                                <Ingress>Vennligst fyll ut manglende informasjon</Ingress>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', right: '50px' }}>
                                    <Hjelpetekst>
                                            Du må velge dager du er- eller har vært sykmeldt. Husk at dette gjelder kun ved mistanke om sykdom grunnet koronavirus.
                                    </Hjelpetekst>
                                </div>
                                <Element>Sykmeldingsinformasjon</Element>
                                <hr />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h2 className="nokkelopplysning__tittel">Navn</h2>
                                <p>
                                    Fornavn Etternavn
                                </p>
                            </div>

                            <div style={{ display: 'flex', marginBottom: '2rem' }}>
                                <div>
                                    <h2 className="nokkelopplysning__tittel">Sykmeldingsperiode</h2>
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
                                    <h2 className="nokkelopplysning__tittel">Sykmeldingsgrad</h2>
                                    <p>
                                    100% sykmeldt
                                    </p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <Checkbox
                                    checked={tidligereSyk}
                                    label="Jeg ble syk på et tidligere tidspunkt"
                                    onChange={() => {
                                        this.setState((state) => {
                                            return {
                                                tidligereSyk: !state.tidligereSyk,
                                                korrigertStartDato: state.tidligereSyk ? undefined : state.korrigertStartDato,
                                            };
                                        });
                                    }}
                                    name="tidligereSyk" />
                            </div>

                            {tidligereSyk && (
                                <div style={{ marginLeft: '2rem' }}>
                                    <KoronaDatePicker
                                        label="Vennligst velg dato du ble syk"
                                        value={korrigertStartDato}
                                        onChange={(date) => {
                                            return this.setState({ korrigertStartDato: correctDateOffset(date) });
                                        }} />
                                </div>
                            )}

                            <div style={{ display: 'flex', marginTop: '3rem', marginBottom: '2rem' }}>
                                <div>
                                    <h2 className="nokkelopplysning__tittel">Diagnose</h2>
                                    <p>
                                    COVID-19
                                    </p>
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
                                    <p>
                                    R991
                                    </p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', right: '50px' }}>
                                    <Hjelpetekst>
                                            Du kan velge en eller flere arbeidssituasjoner.
                                    </Hjelpetekst>
                                </div>
                                <Element>Din arbeidssituasjon</Element>
                                <hr />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 className="skjema__sporsmal">Jeg er sykmeldt fra</h3>
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
                            </div>

                            <div style={{ marginBottom: '3rem' }}>
                                <h3 className="skjema__sporsmal">Annet</h3>
                                <Radio
                                    checked={annetSituasjon === 'annen'}
                                    label="Arbeidsgiver er ikke oppført"
                                    onClick={(e) => { return this.updateAnnet(e.target.name); }}
                                    name="annen" />
                                <Radio
                                    checked={annetSituasjon === 'arbeidsledig'}
                                    label="Jeg er arbeidsledig"
                                    onClick={(e) => { return this.updateAnnet(e.target.name); }}
                                    name="arbeidsledig" />
                                <Radio
                                    checked={annetSituasjon === 'ingenting'}
                                    label="Jeg finner ingenting som passer for meg"
                                    onClick={(e) => { return this.updateAnnet(e.target.name); }}
                                    name="ingenting" />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <Element>Bekreft og opprett</Element>
                                <hr />
                            </div>

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

                            <div style={{ marginBottom: '2rem' }}>
                                <Hovedknapp disabled={!bekreftet} onClick={() => { return this.submit(); }}>Opprett koronamelding</Hovedknapp>
                            </div>

                            <div>
                                <Knapp>Avbryt</Knapp>
                            </div>
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
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
};


export default KoronaSchema;
