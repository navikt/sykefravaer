import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import LandingssideLenke from './LandingssideLenke';
import { sykepengesoknad as sykepengesoknadPt, sykmelding as sykmeldingPt } from '../../propTypes';
import Brodsmuler from '../Brodsmuler';
import DineOppgaverContainer from '../../containers/DineOppgaverContainer';
import DinSituasjonContainer from '../../containers/DinSituasjonContainer';
import ServerfeilContainer from '../../containers/ServerfeilContainer';
import { skalViseOppfoelgingsdialogLenke } from '../../utils/sykmeldingUtils';
import DetteHarSkjeddContainer from '../../containers/DetteHarSkjeddContainer';

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

const IngenSykmeldinger = () => {
    return (<div className="panel ingenSykmeldinger landingspanel">
        <div className="ingenSykmelding__illustrasjon">
            <img src="/sykefravaer/img/svg/landingsside/veileder.svg" alt="NAV-veileder" />
        </div>
        <p className="sist">{getLedetekst('landingsside.ingen-sykmelding')}</p>
    </div>);
};

const Landingsside = ({ toggles, sykepengesoknader = [], harDialogmote = false, brodsmuler, dineSykmeldinger = [] }) => {
    return (<div>
        <div className="sidebanner">
            <div className="sidebanner__innhold">
                <Brodsmuler brodsmuler={brodsmuler} />
                <h1 className="js-sidetittel sidebanner__tittel">{getLedetekst('landingsside.sidetittel')}</h1>
                <img className="sidebanner__illustrasjon" src="/sykefravaer/img/svg/landingsside/konsultasjon.svg" alt="Konsultasjon" />
            </div>
        </div>
        <div className="begrensning">
            <ServerfeilContainer />
            {
                dineSykmeldinger.length === 0 && <IngenSykmeldinger />
            }
            <DineOppgaverContainer />
            <DinSituasjonContainer />
            <nav role="navigation" className="js-navigasjon">
                <LandingssideLenke to="/sykefravaer/tidslinjen" ikon="tidslinje" ikonAlt="Tidslinjen" tittel="Tidslinjen"
                    undertittel="Informasjon og oversikt over aktiviteter" variant="fersken" />
                {
                    dineSykmeldinger.length > 0 && <LandingssideLenke to="/sykefravaer/sykmeldinger" ikon="sykmeldinger" ikonAlt="Sykmelding" tittel="Sykmeldinger" variant="lysblaa" />
                }
                {
                    sykepengesoknader.length > 0 &&
                        <LandingssideLenke to="/sykefravaer/soknader" ikon="soknader" ikonAlt="Søknader" tittel="Søknader om sykepenger" variant="lysgronn" />

                }
                {
                    harDialogmote &&
                        <LandingssideLenke to="/sykefravaer/dialogmote" ikon="dialogmoter" ikonAlt="Dialogmøter" tittel="Dialogmøter" variant="ceil" />
                }
                {
                    skalViseOppfoelgingsdialogLenke(dineSykmeldinger, toggles) &&
                        <LandingssideLenke to="/sykefravaer/oppfolgingsplaner" ikon="oppfolgingsplaner" ikonAlt="Oppfølgingsplaner" tittel="Oppfølgingsplaner" variant="koromiko" />
                }
            </nav>
            <DetteHarSkjeddContainer />
            <GenerellInfo />
        </div>
    </div>);
};

Landingsside.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    dineSykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    harDialogmote: PropTypes.bool,
    toggles: PropTypes.object,
    brodsmuler: PropTypes.array,
};

export default Landingsside;
