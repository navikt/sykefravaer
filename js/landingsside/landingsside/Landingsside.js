import React from 'react';
import PropTypes from 'prop-types';
import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { getLedetekst } from '../../digisyfoNpm';
import { visInfotekst } from '../../utils/landingssideInfotekstUtils';
import Peker from './Peker';
import { brodsmule as brodsmulePt, sykeforloepMetadataPt } from '../../propTypes/index';
import DineOppgaverContainer from '../dine-oppgaver/DineOppgaverContainer';
import DinSituasjonContainer from '../din-situasjon/DinSituasjonContainer';
import ServerfeilContainer from '../ai-ai-ai/AiAiAiContainer';
import DetteHarSkjeddContainer from '../dette-har-skjedd/DetteHarSkjeddContainer';
import Utdrag from '../tidslinje-utdrag/TidslinjeutdragContainer';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { Vis } from '../../utils/index';
import { hentMoteLandingssideUrl } from '../../utils/motebehovUtils';
import Sidebanner from '../../components/Sidebanner';
import { getOppfolgingsplanerUrl, getSykepengesoknaderUrl, getBehandledeSoknaderUrl } from '../../utils/urlUtils';
import AvvistSykmeldingKvittering from '../avvist-sykmelding-kvittering/AvvistSykmeldingKvittering';
import { countClickAktivitetsplan } from '../../data/metrikker/countClickAction';

const IngenSykmeldinger = () => {
    return (
        <div className="panel ingenSykmeldinger landingspanel">
            <IllustrertInnhold
                ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/landingsside/veileder.svg`}
                ikonAlt="NAV-veileder"
            >
                <p className="sist">
          Du har ingen digital sykmelding. Har du fått sykmeldingen på papir,
          kan du vente noen dager, så vil du finne den her.
                    {' '}
                    <Lenke href="https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/papirsykmelding">
            Les mer om papirsykmeldingen.
                    </Lenke>
                </p>
            </IllustrertInnhold>
        </div>
    );
};

const finnAntallSykedager = (erSykmeldt, dato) => {
    if (!erSykmeldt || !dato) return -1;

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const difference = (new Date() - new Date(dato)) / MS_PER_DAY;
    return Math.round(difference);
};

const logAndRedirect = (e, sykeforloepMetadata) => {
    e.preventDefault();

    const { erSykmeldt, sykmeldtFraDato } = sykeforloepMetadata.data;
    const antallSykedager = finnAntallSykedager(erSykmeldt, sykmeldtFraDato);

    const { href } = e.target;
    new Promise((resolve) => { return resolve(countClickAktivitetsplan(antallSykedager).next()); })
        // eslint-disable-next-line no-unused-vars
        .then((_) => { window.location.href = href; });
};

const Landingsside = ({
    brodsmuler, harSykepengesoknader, harVedtak, harDialogmote, harSykmeldinger,
    skalViseMotebehov, skalViseOppfolgingsdialog, skalViseAktivitetsplan,
    sykeforloepMetadata,
}) => {
    return (
        <React.Fragment>
            <Sidebanner brodsmuler={brodsmuler} />
            <div className="begrensning blokk">
                <ServerfeilContainer />

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
                                    tittel="Søknader" />
                            );
                        }} />
                    <Vis
                        hvis={harVedtak}
                        render={() => {
                            return (
                                <Peker
                                    ekstern
                                    to={getBehandledeSoknaderUrl()}
                                    ikon="coin"
                                    ikonAlt="coin"
                                    tittel="Utbetaling av sykepenger" />
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
                                    undertittel="For deg og NAV"
                                    onClick={(e) => { logAndRedirect(e, sykeforloepMetadata); }} />
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
    harVedtak: PropTypes.bool,
    harDialogmote: PropTypes.bool,
    harSykmeldinger: PropTypes.bool,
    skalViseOppfolgingsdialog: PropTypes.bool,
    skalViseAktivitetsplan: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    sykeforloepMetadata: sykeforloepMetadataPt,
};

export default Landingsside;
