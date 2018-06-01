import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { FOM } from '../../enums/svarverdityper';
import { getKey } from './Oppsummeringsvisning';
import OppsummeringSporsmalscontainer from './OppsummeringSporsmalscontainer';
import OppsummeringSporsmalstekst from './OppsummeringSporsmalstekst';
import { oppsummeringSporsmal } from '../../propTypes';

const OppsummeringPerioder = ({ svar, sporsmalstekst, tag, overskriftsnivaa }) => {
    const perioder = [];
    let periode;
    svar.svarverdi.forEach((s) => {
        if (s.svarverdiType === FOM) {
            periode = {
                fom: s.verdi,
            };
        } else {
            periode.tom = s.verdi;
            perioder.push(periode);
        }
    });
    return (<OppsummeringSporsmalscontainer tag={tag}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        <div className="oppsummering__tekstsvar">
            {
                perioder.map((p, i) => {
                    return (<p key={getKey(tag, i)} className="oppsummering__dato">{getLedetekst('soknad.periode', {
                        '%FOM%': p.fom,
                        '%TOM%': p.tom,
                    })}</p>);
                })
            }
        </div>
    </OppsummeringSporsmalscontainer>);
};

OppsummeringPerioder.propTypes = oppsummeringSporsmal;

export default OppsummeringPerioder;
