import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import UnderUtviklingVarselContainer from '../containers/UnderUtviklingVarselContainer.js';

const SykmeldingOgOppfolging = ({ ledetekster = {}, skjulVarsel = false }) => {
    return (<div>
        {
            (!skjulVarsel ? <UnderUtviklingVarselContainer /> : '')
        }
        <h1 className="side-header typo-sidetittel">
            {getLedetekst('sykmeldingOgOppfolging.sidetittel', ledetekster)}
        </h1>
        <Link className="dashboard-lenke" to="/sykefravaer/app/sykmeldinger">
            <img src="/sykefravaer/img/svg/doctor-2.svg" alt="Lege" />
            <span>{getLedetekst('sykmeldingOgOppfolging.lenkeTilSykmelding.tekst', ledetekster)}</span>
        </Link>
        <div className="panel blokk side-innhold js-generell-informasjon">
            <h2 className="typo-undertittel">Sykmeldt &mdash; hva nå?</h2>
            <p dangerouslySetInnerHTML={getHtmlLedetekst('sykmeldingOgOppfolging.generell.informasjon.tekst', ledetekster)} />
        </div>
    </div>);
};

SykmeldingOgOppfolging.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    skjulVarsel: PropTypes.bool.isRequired,
};

export default SykmeldingOgOppfolging;
