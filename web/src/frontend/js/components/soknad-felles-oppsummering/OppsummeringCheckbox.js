import React from 'react';
import { CHECKED } from '../../enums/svarEnums';
import OppsummeringAvkrysset from './OppsummeringAvkrysset';
import OppsummeringUndersporsmal from './OppsummeringUndersporsmal';
import { oppsummeringSporsmal } from '../../propTypes';

const OppsummeringCheckbox = ({ undersporsmal, svar, sporsmalstekst, overskriftsnivaa = 3 }) => {
    return svar[0] && svar[0].verdi === CHECKED ? (<div>
        <OppsummeringAvkrysset tekst={sporsmalstekst} />
        <OppsummeringUndersporsmal sporsmalsliste={undersporsmal} overskriftsnivaa={overskriftsnivaa} />
    </div>) : null;
};


OppsummeringCheckbox.propTypes = oppsummeringSporsmal;

export default OppsummeringCheckbox;
