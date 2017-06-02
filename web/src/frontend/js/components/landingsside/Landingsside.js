import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import UnderUtviklingVarselContainer from '../../containers/UnderUtviklingVarselContainer';
import NaermesteLedereContainer from '../../containers/NaermesteLedereContainer';
import LandingssideLenke from './LandingssideLenke';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import Brodsmuler from '../Brodsmuler';
import DineOppgaverContainer from '../../containers/DineOppgaverContainer';
import DinSituasjonContainer from '../../containers/DinSituasjonContainer';

export class GenerellInfo extends Component {
    componentDidMount() {
        window.setTimeout(() => {
            document.body.focus();
        }, 200);
    }

    render() {
        return (<article className="panel blokk js-generell-informasjon">
            <h2 className="typo-undertittel">Sykmeldt &mdash; hva nå?</h2>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('landingsside.generell.informasjon.tekst')} />
            <p>
                <a className="lenke" href={getLedetekst('landingsside.generell.informasjon.lenke1.url')}>
                    {getLedetekst('landingsside.generell.informasjon.lenke1.tittel')}
                </a>
            </p>
            <p>
                <Link className="lenke" to={getLedetekst('landingsside.generell.informasjon.lenke2.url')}>
                    {getLedetekst('landingsside.generell.informasjon.lenke2.tittel')}
                </Link>
            </p>
        </article>);
    }
}

const Landingsside = ({ skjulVarsel = false, sykepengesoknader = [], harDialogmote = false, brodsmuler, visOppfoelgingsdialog = false }) => {
    return (<div>
        <div className="sidebanner">
            <div className="sidebanner__innhold">
                <Brodsmuler brodsmuler={brodsmuler} />
                <h1 className="js-sidetittel sidebanner__tittel">{getLedetekst('landingsside.sidetittel')}</h1>
                <img className="sidebanner__illustrasjon" src="/sykefravaer/img/svg/landingsside/konsultasjon.svg" alt="Konsultasjon" />
            </div>
        </div>
        <div className="begrensning">
            {
                (!skjulVarsel ? <UnderUtviklingVarselContainer /> : null)
            }

            <DineOppgaverContainer />
            <DinSituasjonContainer />
            <nav role="navigation">
                <LandingssideLenke to="/sykefravaer/tidslinjen" ikon="tidslinje" ikonAlt="Tidslinjen" tittel="Tidslinjen"
                    undertittel="Informasjon og oversikt over aktiviteter" variant="fersken" />
                <LandingssideLenke to="/sykefravaer/sykmeldinger" ikon="sykmeldinger" ikonAlt="Sykmelding" tittel="Sykmeldinger"
                    variant="lysblaa" />
                {
                    sykepengesoknader.length > 0 &&
                        <LandingssideLenke to="/sykefravaer/soknader" ikon="soknader" ikonAlt="Søknader" tittel="Søknader om sykepenger" variant="lysgronn" />

                }
                {
                    harDialogmote &&
                        <LandingssideLenke to="/sykefravaer/dialogmote" ikon="dialogmoter" ikonAlt="Dialogmøter" tittel="Dialogmøter" variant="ceil" />
                }
                {
                    visOppfoelgingsdialog &&
                    <LandingssideLenke to="/sykefravaer/oppfolgingsplaner" ikon="oppfolgingsplaner" ikonAlt="Oppfølgingsplaner" tittel="Oppfølgingsplaner" variant="koromiko" />
                }
            </nav>
            <GenerellInfo />
        </div>
    </div>);
};

Landingsside.propTypes = {
    visOppfoelgingsdialog: PropTypes.bool.isRequired,
    skjulVarsel: PropTypes.bool.isRequired,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    harDialogmote: PropTypes.bool,
    brodsmuler: PropTypes.array,
};

export default Landingsside;
