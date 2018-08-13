import React from 'react';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { getKey } from './Oppsummeringsvisning';
import OppsummeringSporsmalscontainer from './OppsummeringSporsmalscontainer';
import OppsummeringSporsmalstekst from './OppsummeringSporsmalstekst';
import { oppsummeringSporsmal } from '../../propTypes';

const OppsummeringPerioder = ({ svar, sporsmalstekst, tag, overskriftsnivaa }) => {
    return (<OppsummeringSporsmalscontainer tag={tag}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        <div className="oppsummering__tekstsvar">
            {
                svar.map((p, i) => {
                    return (<p key={getKey(tag, i)} className="oppsummering__dato">{getLedetekst('soknad.periode', {
                        '%FOM%': toDatePrettyPrint(p.verdi.fom),
                        '%TOM%': toDatePrettyPrint(p.verdi.tom),
                    })}</p>);
                })
            }
        </div>
    </OppsummeringSporsmalscontainer>);
};

OppsummeringPerioder.propTypes = oppsummeringSporsmal;

export default OppsummeringPerioder;
