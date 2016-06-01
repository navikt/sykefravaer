import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import UnderUtviklingVarselContainer from '../containers/UnderUtviklingVarselContainer.js';

const SykmeldingOgOppfolging = ({ ledetekster = {}, skjulVarsel = false }) => {
    return (<div>
        <h1 className="side-header typo-sidetittel js-sidetittel">
            {getLedetekst('sykmelding-og-oppfolging.sidetittel', ledetekster)}
        </h1>
        <article className="panel js-intro-banner side-innhold">
            <div className="dashboard-intro">
                <img src="/sykefravaer/img/svg/illustrasjon-landingsside.svg" alt="Samtale mellom deg, lege, arbeidsgiver og NAV" />
                <div className="dashboard-intro-innhold">
                    <h2 className="typo-undertittel">Sykefraværet har startet</h2>
                    <p>Det er noen milepæler i et sykefravær, men det er ingenting i veien for at du kommer i gang med aktiviteter tidligere. <a href="/sykefravaer/app/tidslinjen">Se alle milepælene</a></p>
                </div>
            </div>
        </article>
        <Link className="dashboard-lenke js-dashboard-lenke" to="/sykefravaer/app/sykmeldinger">
            <img src="/sykefravaer/img/svg/doctor-2.svg" alt="Lege" />
            <span>{getLedetekst('sykmelding-og-oppfolging.tilsykmeldinger.lenketekst', ledetekster)}</span>
        </Link>
        <div className="panel blokk side-innhold js-generell-informasjon">
            <h2 className="typo-undertittel">Sykmeldt &mdash; hva nå?</h2>
            <p dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding-og-oppfolging.generell.informasjon.tekst', ledetekster)} />
        </div>
        <article className="panel js-forklaring">
            <h2 className="sykmelding-og-oppfolging-forklaringstittel">
                {getLedetekst('sykmelding-og-oppfolging.informasjon.tittel', ledetekster)}
            </h2>
            <div className="redaksjonelt-innhold typo-infotekst side-innhold js-roller"
                dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding-og-oppfolging.informasjon.tekst', ledetekster)} />
        </article>
        {
            (!skjulVarsel ? <UnderUtviklingVarselContainer ledetekster={ledetekster} /> : null)
        }
    </div>);
};

SykmeldingOgOppfolging.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    skjulVarsel: PropTypes.bool.isRequired,
};

export default SykmeldingOgOppfolging;
