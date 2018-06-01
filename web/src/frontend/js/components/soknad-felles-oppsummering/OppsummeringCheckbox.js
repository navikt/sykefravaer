import React from 'react';
import { CHECKED } from '../../enums/svarEnums';
import OppsummeringAvkrysset from './OppsummeringAvkrysset';
import OppsummeringUndersporsmal from './OppsummeringUndersporsmal';
import { oppsummeringSporsmal } from '../../propTypes';

const OppsummeringCheckbox = ({ svar, sporsmalstekst, overskriftsnivaa = 3 }) => {
    return svar.svarverdi[0] && svar.svarverdi[0].verdi === CHECKED ? (<div>
        <OppsummeringAvkrysset tekst={sporsmalstekst} />
        <OppsummeringUndersporsmal sporsmalsliste={svar.undersporsmal} overskriftsnivaa={overskriftsnivaa} />
    </div>) : null;
};


OppsummeringCheckbox.propTypes = oppsummeringSporsmal;

export default OppsummeringCheckbox;
