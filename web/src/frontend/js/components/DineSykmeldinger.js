import React, { PropTypes } from 'react';
import SykmeldingTeasere from '../components/SykmeldingTeasere.js';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import UnderUtviklingVarselContainer from '../containers/UnderUtviklingVarselContainer.js';

const DineSykmeldinger = ({ sykmeldinger = [], ledetekster = {}, skjulVarsel = false }) => {
    return (<div>
        {
            (!skjulVarsel ? <UnderUtviklingVarselContainer /> : '')
        }
        <h1 className="side-header typo-sidetittel">
            {getLedetekst('dine-sykmeldinger.tittel', ledetekster)}
        </h1>
        <div className="dine-sykmeldinger-intro redaksjonelt-innhold side-innhold">
            <p dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst', ledetekster)} />
        </div>
        <SykmeldingTeasere
            sykmeldinger={sykmeldinger}
            tittel="Dine sykmeldinger"
            ingenSykmeldingerMelding="Du har ingen sykmeldinger."
            className="js-nye-sykmeldinger"
            ledetekster={ledetekster}
            id="sykmelding-liste"
        />
        <article className="panel">
            <h2 className="dine-sykmeldinger-forklaringstittel">
                {getLedetekst('dine-sykmeldinger.informasjon.tittel', ledetekster)}
            </h2>
            <div className="redaksjonelt-innhold typo-infotekst side-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.informasjon.tekst', ledetekster)}></div>
        </article>
    </div>);
};

DineSykmeldinger.propTypes = {
    sykmeldinger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
    skjulVarsel: PropTypes.bool.isRequired,
};

export default DineSykmeldinger;
