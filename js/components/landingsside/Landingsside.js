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
import ArbeidsrettetOppfolgingContainer from '../../containers/landingsside/ArbeidsrettetOppfolgingContainer';
import IllustrertInnhold from '../IllustrertInnhold';
import { Vis } from '../../utils';
import { hentMoteLandingssideUrl } from '../../utils/motebehovUtils';
import OsloMetUndersokelse from './OsloMetUndersokelse';

const IngenSykmeldinger = () => {
    return (<div className="panel ingenSykmeldinger landingspanel">
        <IllustrertInnhold ikon="/sykefravaer/img/svg/landingsside/veileder.svg" ikonAlt="NAV-veileder">
            <p className="sist">{getLedetekst('landingsside.ingen-sykmelding')}</p>
        </IllustrertInnhold>
    </div>);
};

const Landingsside = ({ brodsmuler, harSykepengesoknader, harDialogmote, harSykmeldinger, skalViseMotebehov, skalViseOppfolgingsdialog }) => {
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
            <OsloMetUndersokelse />
            <Utdrag />
            <DinSituasjonContainer />
            <nav className="js-navigasjon landingssideNavigasjon">
                <Vis
                    hvis={harSykmeldinger}
                    render={() => {
                        return (<LandingssideLenke
                            to="/sykefravaer/sykmeldinger"
                            ikon="sykmeldinger"
                            ikonAlt="Sykmelding"
                            tittel="Sykmeldinger" />);
                    }} />
                <Vis
                    hvis={harSykepengesoknader}
                    render={() => {
                        return (<LandingssideLenke
                            to="/sykefravaer/soknader"
                            ikon="soknader"
                            ikonAlt="Søknader"
                            tittel="Søknader om sykepenger" />);
                    }} />
                <Vis
                    hvis={harDialogmote || skalViseMotebehov}
                    render={() => {
                        return (<LandingssideLenke
                            to={hentMoteLandingssideUrl(skalViseMotebehov)}
                            ikon="dialogmoter"
                            ikonAlt="Dialogmøter"
                            tittel="Dialogmøter" />);
                    }} />
                <Vis
                    hvis={skalViseOppfolgingsdialog}
                    render={() => {
                        return (<LandingssideLenke
                            ekstern
                            to={`${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`}
                            ikon="oppfolgingsplaner"
                            ikonAlt="Oppfølgingsplaner"
                            tittel="Oppfølgingsplaner" />);
                    }} />
                <LandingssideLenke
                    to="/sykefravaer/tidslinjen"
                    ikon="tidslinje"
                    ikonAlt="Tidslinjen"
                    tittel="Hva skjer under sykefraværet?" />
            </nav>
            <ArbeidsrettetOppfolgingContainer />
            <DetteHarSkjeddContainer />
            <div className="panel blokk-xl">
                <p className="sist">{getLedetekst('landingsside.gdpr.personopplysninger')}</p>
            </div>
        </div>
    </div>);
};

Landingsside.propTypes = {
    harSykepengesoknader: PropTypes.bool,
    harDialogmote: PropTypes.bool,
    harSykmeldinger: PropTypes.bool,
    skalViseOppfolgingsdialog: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default Landingsside;
