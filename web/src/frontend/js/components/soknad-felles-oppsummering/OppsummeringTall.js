import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { TIMER } from '../../enums/svartyper';
import OppsummeringSporsmalscontainer from './OppsummeringSporsmalscontainer';
import OppsummeringSporsmalstekst from './OppsummeringSporsmalstekst';
import { oppsummeringSporsmal } from '../../propTypes';

const OppsummeringTall = ({ svar, sporsmalstekst, tag, overskriftsnivaa }) => {
    const labelnokkel = svar.svartype === TIMER ? 'soknad.timer-totalt' : 'soknad.prosent';
    const label = getLedetekst(labelnokkel);
    return (<OppsummeringSporsmalscontainer tag={tag}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        <div className="oppsummering__tekstsvar">
            {
                svar.svarverdi.map((svarverdi) => {
                    return <p className="oppsummering__tekst">{svarverdi.verdi} {label}</p>;
                })
            }
        </div>
    </OppsummeringSporsmalscontainer>);
};

OppsummeringTall.propTypes = oppsummeringSporsmal;

export default OppsummeringTall;
