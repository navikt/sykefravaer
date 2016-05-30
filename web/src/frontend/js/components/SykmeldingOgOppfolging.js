import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import UnderUtviklingVarselContainer from '../containers/UnderUtviklingVarselContainer.js';
import TidslinjeUtsnittContainer from '../containers/TidslinjeUtsnittContainer.js'

const SykmeldingOgOppfolging = ({ ledetekster = {}, skjulVarsel = false }) => {
    return (<div>
        {
            (!skjulVarsel ? <UnderUtviklingVarselContainer ledetekster={ledetekster} /> : '')
        }
        <h1 className="side-header typo-sidetittel">
            {getLedetekst('sykmelding-og-oppfolging.sidetittel', ledetekster)}
        </h1>
        <TidslinjeUtsnittContainer />
        <Link className="dashboard-lenke" to="/sykefravaer/app/sykmeldinger">
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
            <div className="redaksjonelt-innhold typo-infotekst side-innhold"
                dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding-og-oppfolging.informasjon.tekst', ledetekster)} />
        </article>
    </div>);
};

SykmeldingOgOppfolging.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    skjulVarsel: PropTypes.bool.isRequired,
};

export default SykmeldingOgOppfolging;
