import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import OppsummeringSporsmalscontainer from './OppsummeringSporsmalscontainer';
import OppsummeringSporsmalstekst from './OppsummeringSporsmalstekst';
import OppsummeringAvkrysset from './OppsummeringAvkrysset';
import OppsummeringUndersporsmal from './OppsummeringUndersporsmal';
import { oppsummeringSporsmal } from '../../propTypes';

const getLedetekstFraSvar = (svar) => {
    return getLedetekst(`soknad.${svar.toLowerCase()}`);
};

const erUndersporsmalStilt = (svar) => {
    return svar.svarverdi.map((s) => {
        return s.verdi;
    }).indexOf(svar.kriterieForVisningAvUndersporsmal) > -1;
};

const OppsummeringJaEllerNei = ({ svar, sporsmalstekst, tag, overskriftsnivaa = 3 }) => {
    const svartekst = getLedetekstFraSvar(svar.svarverdi[0].verdi);
    return (<OppsummeringSporsmalscontainer tag={tag}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        <OppsummeringAvkrysset tekst={svartekst} />
        { erUndersporsmalStilt(svar) && <OppsummeringUndersporsmal sporsmalsliste={svar.undersporsmal} overskriftsnivaa={overskriftsnivaa + 1} /> }
    </OppsummeringSporsmalscontainer>);
};

OppsummeringJaEllerNei.propTypes = oppsummeringSporsmal;

export default OppsummeringJaEllerNei;
