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
                    <h2 className="typo-undertittel">Sykefraværet har startet</h2>
                    <p>Det er noen milepæler i et sykefravær, men det er
                    ingenting i veien for at du kommer i gang med aktiviteter
                    tidligere. <Link to ="/sykefravaer/app/tidslinjen">Se alle milepælene</Link></p>
                </div>
            </div>
        </article>
        <Link className="landingsside-lenke js-dine-sykmeldinger-lenke" to="/sykefravaer/app/sykmeldinger">
            <img src="/sykefravaer/img/svg/doctor-2.svg" alt="Lege" />
            <span>{getLedetekst('landingsside.tilsykmeldinger.lenketekst', ledetekster)}</span>
        </Link>
        <article className="panel blokk side-innhold js-generell-informasjon">
            <h2 className="typo-undertittel" dangerouslySetInnerHTML={getHtmlLedetekst('landingsside.generell.informasjon.tittel', ledetekster)} />
            <p dangerouslySetInnerHTML={getHtmlLedetekst('landingsside.generell.informasjon.tekst', ledetekster)} />
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
