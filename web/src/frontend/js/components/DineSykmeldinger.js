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
            sykmeldinger={sykmeldinger.filter((sykmld) => {
                const fomDato = moment(sykmld.fom);
                const tomDato = moment(sykmld.tom);
                const dagensDato = moment();
                return dagensDato.isBetween(fomDato, tomDato);
            })}
            tittel="Aktive sykmeldinger"
            ingenSykmeldingerMelding="Du har ingen aktive sykmeldinger."
            className="js-nye-sykmeldinger"
            ledetekster={ledetekster}
        />
        <SykmeldingTeasere
            sykmeldinger={sykmeldinger.filter((sykmld) => {
                const fomDato = moment(sykmld.fom);
                const tomDato = moment(sykmld.tom);
                const dagensDato = moment();
                return !dagensDato.isBetween(fomDato, tomDato);
            })}
            tittel="Tidligere sykmeldinger"
            ingenSykmeldingerMelding="Du har ingen tidligere sykmeldinger."
            className="js-tidligere-sykmeldinger"
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
