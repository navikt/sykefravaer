import React, { PropTypes } from 'react';
import SykmeldingTeasere from '../components/SykmeldingTeasere.js';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import Dropdown from './DropDown.js';

const DineSykmeldinger = ({ sykmeldinger = [], ledetekster = {}, onSorteringChange } ) => {

    let sorteringsalternativer = [{
        tekst: 'Startdato',
        verdi: 'fom',
    }, {
        tekst: 'Arbeidsgiver',
        verdi: 'arbeidsgiver',
    }];

    return (<div>
        <h1 className="side-header typo-sidetittel">
            {getLedetekst('dine-sykmeldinger.tittel', ledetekster)}
        </h1>
        <div className="dine-sykmeldinger-intro redaksjonelt-innhold side-innhold">
            <p dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst', ledetekster)} />
        </div>
        <div className="blokk-s">
            <label htmlFor="sortering-dropdown">Velg sortering</label>
            <Dropdown alternativer={sorteringsalternativer} onChange={onSorteringChange} valgtAlternativ='fom' ariaControls="sykmelding-teasere" id="sortering-dropdown" />
        </div>
        <SykmeldingTeasere
            sykmeldinger={sykmeldinger}
            tittel="Dine sykmeldinger"
            ingenSykmeldingerMelding="Du har ingen sykmeldinger."
            className="js-nye-sykmeldinger"
            ledetekster={ledetekster}
            id="sykmelding-teasere"
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
};

export default DineSykmeldinger;
