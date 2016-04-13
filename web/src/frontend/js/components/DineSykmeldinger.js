import React, { PropTypes } from 'react';
import SykmeldingTeasere from '../components/SykmeldingTeasere.js';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
const moment = require('moment');

const DineSykmeldinger = ({ sykmeldinger = [], ledetekster = {} }) => {
    return (<div>
        <h1 className="side-header typo-sidetittel">
            {getLedetekst('dine-sykmeldinger.tittel', ledetekster)}
        </h1>
        <div className="panel panel-transparent panel-stablet redaksjonelt-innhold side-innhold">
            <p dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst', ledetekster)} />
        </div>
        <SykmeldingTeasere
            sykmeldinger={sykmeldinger}
            tittel="Dine sykmeldinger"
            ingenSykmeldingerMelding="Du har ingen sykmeldinger."
            className="js-nye-sykmeldinger"
            ledetekster={ledetekster}
        />
        <article className="panel">
            <h2 className="typo-innholdstittel blokk-s">
                {getLedetekst('dine-sykmeldinger.informasjon.tittel', ledetekster)}
            </h2>
            <div className="redaksjonelt-innhold typo-infotekst side-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.informasjon.tekst', ledetekster)}></div>
        </article>
    </div>);
};

DineSykmeldinger.propTypes = {
    sykmeldinger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default DineSykmeldinger;
