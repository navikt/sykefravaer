import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import {
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import LandingssideLenke from './LandingssideLenke';
import { sykepengesoknad as sykepengesoknadPt, sykmelding as sykmeldingPt, brodsmule as brodsmulePt } from '../../propTypes';
import Brodsmuler from '../Brodsmuler';
import DineOppgaverContainer from '../../containers/landingsside/DineOppgaverContainer';
import DinSituasjonContainer from '../../containers/landingsside/DinSituasjonContainer';
import ServerfeilContainer from '../../containers/landingsside/ServerfeilContainer';
import { skalViseOppfoelgingsdialogLenke } from '../../utils/sykmeldingUtils';
import DetteHarSkjeddContainer from '../../containers/landingsside/DetteHarSkjeddContainer';
import Utdrag from '../../containers/landingsside/TidslinjeutdragContainer';
import IllustrertInnhold from '../IllustrertInnhold';

const IngenSykmeldinger = () => {
    return (<div className="panel ingenSykmeldinger landingspanel">
        <IllustrertInnhold ikon="/sykefravaer/img/svg/landingsside/veileder.svg" ikonAlt="NAV-veileder">
            <p className="sist">{getLedetekst('landingsside.ingen-sykmelding')}</p>
        </IllustrertInnhold>
    </div>);
};

const Landingsside = ({ sykepengesoknader = [], harDialogmote = false, brodsmuler, dineSykmeldinger = [], oppfolgingsdialoger }) => {
    return (<div>
        <div className="sidebanner">
            <div className="sidebanner__innhold">
                <Brodsmuler brodsmuler={brodsmuler} />
                <h1 className="js-sidetittel sidebanner__tittel">{getLedetekst('landingsside.sidetittel')}</h1>
                <img className="sidebanner__illustrasjon" src="/sykefravaer/img/svg/landingsside/konsultasjon.svg" alt="Konsultasjon" />
            </div>
        </div>
        <div className="begrensning blokk">
            <ServerfeilContainer />
            {
                dineSykmeldinger.length === 0 && <IngenSykmeldinger />
            }
            <DineOppgaverContainer />
            <Utdrag />
            <DinSituasjonContainer />
            <nav className="js-navigasjon">
                <LandingssideLenke
                    to="/sykefravaer/tidslinjen"
                    ikon="tidslinje"
                    ikonAlt="Tidslinjen"
                    tittel="Tidslinjen"
                    undertittel="Informasjon og oversikt over aktiviteter"
                    variant="fersken" />
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
                    skalViseOppfoelgingsdialogLenke(dineSykmeldinger, oppfolgingsdialoger) &&
                        <LandingssideLenke to="/sykefravaer/oppfolgingsplaner" ikon="oppfolgingsplaner" ikonAlt="Oppfølgingsplaner" tittel="Oppfølgingsplaner" variant="koromiko" />
                }
            </nav>
            <DetteHarSkjeddContainer />
        </div>
    </div>);
};

Landingsside.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    dineSykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    harDialogmote: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    oppfolgingsdialoger: oppfolgingProptypes.oppfolgingsdialogerAtPt,
};

export default Landingsside;
