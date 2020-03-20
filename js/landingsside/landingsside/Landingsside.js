import React from 'react';
import PropTypes from 'prop-types';
import AlertStripe from 'nav-frontend-alertstriper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { visInfotekst } from '../../utils/landingssideInfotekstUtils';
import Peker from './Peker';
import { brodsmule as brodsmulePt } from '../../propTypes/index';
import DineOppgaverContainer from '../dine-oppgaver/DineOppgaverContainer';
import DinSituasjonContainer from '../din-situasjon/DinSituasjonContainer';
import ServerfeilContainer from '../ai-ai-ai/AiAiAiContainer';
import DetteHarSkjeddContainer from '../dette-har-skjedd/DetteHarSkjeddContainer';
import Utdrag from '../tidslinje-utdrag/TidslinjeutdragContainer';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { Vis } from '../../utils/index';
import { hentMoteLandingssideUrl } from '../../utils/motebehovUtils';
import Sidebanner from '../../components/Sidebanner';
import { getOppfolgingsplanerUrl, getSykepengesoknaderUrl } from '../../utils/urlUtils';
import AvvistSykmeldingKvittering from '../avvist-sykmelding-kvittering/AvvistSykmeldingKvittering';
import ForlengetEgenmeldingLink from '../../sider/KoronaComponents/ForlengetEgenmeldingLink';

const IngenSykmeldinger = () => {
    return (
        <div className="panel ingenSykmeldinger landingspanel">
            <IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/landingsside/veileder.svg`} ikonAlt="NAV-veileder">
                <p className="sist">{getLedetekst('landingsside.ingen-sykmelding')}</p>
            </IllustrertInnhold>
        </div>
    );
};

const Landingsside = ({
    brodsmuler, harSykepengesoknader, harDialogmote, harSykmeldinger,
    skalViseMotebehov, skalViseOppfolgingsdialog, skalViseAktivitetsplan,
}) => {
    return (
        <React.Fragment>
            <Sidebanner brodsmuler={brodsmuler} />
            <div className="begrensning blokk">
                <ServerfeilContainer />

                <ForlengetEgenmeldingLink />

                <AvvistSykmeldingKvittering />
                {
                    !harSykmeldinger && <IngenSykmeldinger />
                }
                {
                    visInfotekst(getLedetekst('landingsside.infoboks.tekst')) && (
                        <AlertStripe type="info" style={{ marginBottom: '2rem' }}>
                            {getLedetekst('landingsside.infoboks.tekst')}
                        </AlertStripe>
                    )
                }

                <DineOppgaverContainer />
                <Utdrag />
                <DinSituasjonContainer />
                <nav className="js-navigasjon landingssideNavigasjon">
                    <Vis
                        hvis={harSykmeldinger}
                        render={() => {
                            return (
                                <Peker
                                    to={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`}
                                    ikon="sykmeldinger"
                                    ikonAlt="Sykmelding"
                                    tittel="Sykmeldinger" />
                            );
                        }} />
                    <Vis
                        hvis={harSykepengesoknader}
                        render={() => {
                            return (
                                <Peker
                                    ekstern
                                    to={getSykepengesoknaderUrl()}
                                    ikon="soknader"
                                    ikonAlt="Søknader"
                                    tittel="Søknader om sykepenger" />
                            );
                        }} />
                    <Vis
                        hvis={harDialogmote || skalViseMotebehov}
                        render={() => {
                            return (
                                <Peker
                                    ekstern
                                    to={hentMoteLandingssideUrl(skalViseMotebehov)}
                                    ikon="dialogmoter"
                                    ikonAlt="Dialogmøter"
                                    tittel="Dialogmøter" />
                            );
                        }} />
                    <Vis
                        hvis={skalViseOppfolgingsdialog}
                        render={() => {
                            return (
                                <Peker
                                    ekstern
                                    to={getOppfolgingsplanerUrl()}
                                    ikon="oppfolgingsplaner"
                                    ikonAlt="Oppfølgingsplaner"
                                    tittel="Oppfølgingsplaner"
                                    undertittel="For deg og arbeidsgiveren din" />
                            );
                        }} />
                    <Vis
                        hvis={skalViseAktivitetsplan}
                        render={() => {
                            return (
                                <Peker
                                    ekstern
                                    to="/aktivitetsplan"
                                    ikon="aktivitetsplan"
                                    ikonAlt="Aktivitetsplan"
                                    tittel="Aktivitetsplan"
                                    undertittel="For deg og NAV" />
                            );
                        }} />
                    <Peker
                        to={`${process.env.REACT_APP_CONTEXT_ROOT}/tidslinjen`}
                        ikon="tidslinje"
                        ikonAlt="Tidslinjen"
                        tittel="Hva skjer under sykefraværet?" />
                </nav>
                <DetteHarSkjeddContainer />
                <div className="panel blokk-xl">
                    <p className="sist">{getLedetekst('landingsside.gdpr.personopplysninger')}</p>
                </div>
            </div>
        </React.Fragment>
    );
};

Landingsside.propTypes = {
    harSykepengesoknader: PropTypes.bool,
    harDialogmote: PropTypes.bool,
    harSykmeldinger: PropTypes.bool,
    skalViseOppfolgingsdialog: PropTypes.bool,
    skalViseAktivitetsplan: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default Landingsside;
