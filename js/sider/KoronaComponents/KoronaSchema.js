/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Sidetittel, Element, Innholdstittel } from 'nav-frontend-typografi';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import {
    tilLesbarDatoUtenAarstall,
} from '@navikt/digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { arbeidsgiver as arbeidsgiverPt } from '../../propTypes';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import KoronaDatePicker from './KoronaDatePicker';


class KoronaSchema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periode: undefined,
            arbeidsgivere: props.arbeidsgivere,
            arbeidssituasjon: undefined,
            tidligereSyk: true,
            startDato: new Date(),
            korrigertStartDato: undefined,
        };
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


    updateArbeidssituasjon(arbeidssituasjon) {
        this.setState({ arbeidssituasjon });
    }

    updateArbeidsgivere(arbeidsgiver) {
        const { arbeidsgivere } = this.state;

        if (arbeidsgivere.includes(arbeidsgiver)) {
            this.setState({ arbeidsgivere: arbeidsgivere.filter((a) => {
                return a !== arbeidsgiver;
            }) });
        } else {
            this.setState({ arbeidsgivere: [...arbeidsgivere, arbeidsgiver] });
        }
    }

    render() {
        const { arbeidssituasjon, arbeidsgivere, periode, tidligereSyk, startDato, korrigertStartDato } = this.state;
        const { sendSykmelding } = this.props;
        console.log(arbeidssituasjon, arbeidsgivere, periode);

        const endDate = this.getEndDate();

        return (
            <div>
                <Sidetittel tag="h1" style={{ marginBottom: '2rem', textAlign: 'center' }}>14-dagers egenmelding</Sidetittel>
                <Element>
                    NAV har nå opprettet coronamelding for de som mistenker at de er smittet av coronavirus.
                    Du kan selv fylle ut og sende egenmeldingen uten å kontakte fastlege eller legevakten.
                </Element>
                <br />

                <Lenke href="#">Du kan lese mer om egenmeldingsordningen her.</Lenke>

                <div
                    style={{ marginTop: '2rem' }}>
                    <Bjorn
                        className="blokk"
                        hvit
                        stor>
                            Hei, nedenfor kan du fylle ut og sende inn egenmeldingen om du mistenker at du er syk grunnet coronaviruset.
                        <br />
                        <br />
                        <Knapp>Gå til utfyllingen</Knapp>
                    </Bjorn>
                </div>

                <article>
                    <header className="panelHeader panelHeader--lysebla">
                        <img className="panelHeader__ikon" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/person.svg`} alt="Du" />
                        <h2 className="panelHeader__tittel">
                            Navn Etternavn
                        </h2>
                    </header>
                    <div className="panel blokk">
                        <Innholdstittel>14-dagers egenmelding</Innholdstittel>
                        <br />
                        <Element>Vennligst fyll ut felter som mangler informasjon.</Element>


                        <h2 style={{ marginTop: '2rem' }} className="nokkelopplysning__tittel">Periode</h2>
                        <strong className="js-periode blokk-xxs">
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
                        </strong>
                        <p className="js-grad">100 % sykmeldt</p>


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

                        {tidligereSyk && (
                            <KoronaDatePicker
                                label="Vennligst velg dato du ble syk"
                                value={korrigertStartDato}
                                onChange={(date) => { return this.setState({ korrigertStartDato: date }); }} />
                        )}

                        <div style={{ display: 'flex' }}>
                            <div style={{ marginTop: '1rem' }}>
                                <h2 className="nokkelopplysning__tittel">Diagnose</h2>
                                <p>
                                    COVID-19
                                </p>
                            </div>
                            <div style={{ marginTop: '1rem', marginLeft: '4rem' }}>
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

                    </div>
                </article>

                <article>
                    <div className="panel blokk">
                        <h3>Jeg er sykmeldt fra</h3>
                        <Checkbox
                            checked={false}
                            name="arbeidsgiver1"
                            onChange={(e) => { return this.updateArbeidsgivere(e.target.name); }}
                            label="Arbeidsgiver 1" />
                        <Checkbox
                            checked={false}
                            name="arbeidsgiver2"
                            onChange={(e) => { return this.updateArbeidsgivere(e.target.name); }}
                            label="Arbeidsgiver 2" />
                    </div>
                </article>


                <div>
                    <h3>Velg perioden du er syk (?)</h3>
                    Periodevalg
                </div>
                <div>
                    hvis arbeidsgiver, vis denne:
                    <h3>Velg arbeidsgivere vi skal sende sykmeldingen til</h3>
                    <Checkbox
                        checked={false}
                        name="arbeidsgiver1"
                        onChange={(e) => { return this.updateArbeidsgivere(e.target.name); }}
                        label="Arbeidsgiver 1" />
                    <Checkbox
                        checked={false}
                        name="arbeidsgiver2"
                        onChange={(e) => { return this.updateArbeidsgivere(e.target.name); }}
                        label="Arbeidsgiver 2" />

                    hvis ingen arbeidsgiver, vis denne:
                    <h3>Velg det som passer for deg</h3>
                    <Radio
                        checked={arbeidssituasjon === 'selvstendig'}
                        label="jobb som selvstendig næringsdrivende"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="selvstendig" />
                    <Radio
                        checked={arbeidssituasjon === 'frilanser'}
                        label="jobb som frilanser"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="frilanser" />
                    <Radio
                        checked={arbeidssituasjon === 'annen'}
                        label="jobb hos en annen arbeidsgiver (bortgår?)"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="annen" />
                    <Radio
                        checked={arbeidssituasjon === 'arbeidsledig'}
                        label="Jeg er arbeidsledig"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="arbeidsledig" />
                    <Radio
                        checked={arbeidssituasjon === 'ingenting'}
                        label="Jeg finner ingenting som passer for meg"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="ingenting" />
                </div>
                <Hovedknapp onClick={() => { return sendSykmelding({ prop1: 'test1', prop2: 'test2' }); }}>Send sykmelding</Hovedknapp>
            </div>

        );
    }
}

KoronaSchema.propTypes = {
    sendSykmelding: PropTypes.func,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
};


export default KoronaSchema;
