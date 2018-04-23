import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import LandingssideLenke from './LandingssideLenke';
import { brodsmule as brodsmulePt } from '../../propTypes';
import Brodsmuler from '../Brodsmuler';
import DineOppgaverContainer from '../../containers/landingsside/DineOppgaverContainer';
import DinSituasjonContainer from '../../containers/landingsside/DinSituasjonContainer';
import ServerfeilContainer from '../../containers/landingsside/ServerfeilContainer';
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

const Landingsside = ({ brodsmuler, harSykepengesoknader, harDialogmote, harSykmeldinger, skalViseOppfolgingsdialog }) => {
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
                !harSykmeldinger && <IngenSykmeldinger />
            }
            <DineOppgaverContainer />
            <Utdrag />
            <DinSituasjonContainer />
            <nav className="js-navigasjon">
                <LandingssideLenke
                    to="/sykefravaer/tidslinjen"
                    ikon="tidslinje"
                    ikonAlt="Tidslinjen"
                    tittel="Hva skjer under sykefraværet?" />
                {
                    harSykmeldinger && <LandingssideLenke
                        to="/sykefravaer/sykmeldinger"
                        ikon="sykmeldinger"
                        ikonAlt="Sykmelding"
                        tittel="Sykmeldinger" />
                }
                {
                    harSykepengesoknader &&
                        <LandingssideLenke
                            to="/sykefravaer/soknader"
                            ikon="soknader"
                            ikonAlt="Søknader"
                            tittel="Søknader om sykepenger" />
                }
                {
                    harDialogmote &&
                        <LandingssideLenke
                            to="/sykefravaer/dialogmote"
                            ikon="dialogmoter"
                            ikonAlt="Dialogmøter"
                            tittel="Dialogmøter" />
                }
                {
                    skalViseOppfolgingsdialog &&
                        <LandingssideLenke
                            to="/sykefravaer/oppfolgingsplaner"
                            ikon="oppfolgingsplaner"
                            ikonAlt="Oppfølgingsplaner"
                            tittel="Oppfølgingsplaner" />
                }
            </nav>
            <DetteHarSkjeddContainer />
        </div>
    </div>);
};

Landingsside.propTypes = {
    harSykepengesoknader: PropTypes.bool,
    harDialogmote: PropTypes.bool,
    harSykmeldinger: PropTypes.bool,
    skalViseOppfolgingsdialog: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default Landingsside;
