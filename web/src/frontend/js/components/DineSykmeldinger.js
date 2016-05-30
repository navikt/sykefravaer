import React, { PropTypes } from 'react';
import SykmeldingTeasere from '../components/SykmeldingTeasere.js';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import UnderUtviklingVarselContainer from '../containers/UnderUtviklingVarselContainer.js';

const DineSykmeldinger = ({ sykmeldinger = [], ledetekster = {} }) => {
    return (<div>
        <h1 className="side-header typo-sidetittel">
            {getLedetekst('dine-sykmeldinger.tittel', ledetekster)}
        </h1>
        <div className="dine-sykmeldinger-intro redaksjonelt-innhold side-innhold js-intro">
            <p dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst', ledetekster)} />
        </div>
        <SykmeldingTeasere
            sykmeldinger={sykmeldinger}
            tittel={getLedetekst('dine-sykmeldinger.tittel', ledetekster)}
            ingenSykmeldingerMelding={getLedetekst('dine-sykmeldinger.ingen-sykmeldinger.melding', ledetekster)}
            className="js-nye-sykmeldinger"
            ledetekster={ledetekster}
            id="sykmelding-liste"
        />
    </div>);
};

DineSykmeldinger.propTypes = {
    sykmeldinger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default DineSykmeldinger;
