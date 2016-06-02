import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import UnderUtviklingVarselContainer from '../containers/UnderUtviklingVarselContainer.js';

const Landingsside = ({ ledetekster = {}, skjulVarsel = false }) => {
    return (<div>
        <h1 className="side-header typo-sidetittel js-sidetittel">
            {getLedetekst('landingsside.sidetittel', ledetekster)}
        </h1>
        <article className="panel js-intro-banner blokk side-innhold">
            <div className="landingsside-intro">
                <img src="/sykefravaer/img/svg/illustrasjon-landingsside.svg" alt="Samtale mellom deg, lege, arbeidsgiver og NAV" />
                <div className="landingsside-intro-innhold">
                    <h2 className="typo-undertittel">Dine oppgaver som sykmeldt</h2>
                    <p>Her får du en oversikt over aktiviteter du har ansvar for i løpet av sykefraværet. </p>
                    <p className="ustilet"><Link to ="/sykefravaer/app/tidslinjen">Se oppgavene dine</Link></p>
                </div>
            </div>
        </article>
        <Link className="landingsside-lenke js-dine-sykmeldinger-lenke" to="/sykefravaer/app/sykmeldinger">
            <img src="/sykefravaer/img/svg/doctor-2.svg" alt="Lege" />
            <span>{getLedetekst('landingsside.tilsykmeldinger.lenketekst', ledetekster)}</span>
        </Link>
        <article className="panel blokk side-innhold js-generell-informasjon">
            <h2 className="typo-undertittel">Sykmeldt &mdash; hva nå?</h2>
            <div dangerouslySetInnerHTML={getHtmlLedetekst('landingsside.generell.informasjon.tekst', ledetekster)} />
            <p>
                <a href={getLedetekst('landingsside.generell.informasjon.lenke1.url', ledetekster)}>
                    {getLedetekst('landingsside.generell.informasjon.lenke1.tittel', ledetekster)}
                </a>
            </p>
            <p>
                <Link to={getLedetekst('landingsside.generell.informasjon.lenke2.url', ledetekster)}>
                    {getLedetekst('landingsside.generell.informasjon.lenke2.tittel', ledetekster)}
                </Link>
            </p>
        </article>
        {
            (!skjulVarsel ? <UnderUtviklingVarselContainer ledetekster={ledetekster} /> : null)
        }
    </div>);
};

Landingsside.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    skjulVarsel: PropTypes.bool.isRequired,
};

export default Landingsside;
