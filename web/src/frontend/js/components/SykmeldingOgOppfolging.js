import React, { PropTypes } from 'react';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import UnderUtviklingVarselContainer from '../containers/UnderUtviklingVarselContainer.js';

const DineSykmeldinger = ({ ledetekster = {}, skjulVarsel = false }) => {
    return (<div>
        {
            (!skjulVarsel ? <UnderUtviklingVarselContainer/> : '')
        }
        <h1 className="side-header typo-sidetittel">
            {getLedetekst('sykmeldingOgOppfolging.sidetittel', ledetekster)}
        </h1>
    </div>);
};

DineSykmeldinger.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    skjulVarsel: PropTypes.bool.isRequired
};

export default DineSykmeldinger;