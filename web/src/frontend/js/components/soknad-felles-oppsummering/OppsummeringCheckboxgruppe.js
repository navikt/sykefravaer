import React from 'react';
import OppsummeringSporsmalscontainer from './OppsummeringSporsmalscontainer';
import OppsummeringSporsmalstekst from './OppsummeringSporsmalstekst';
import OppsummeringSporsmal from './OppsummeringSporsmal';
import { oppsummeringSporsmal } from '../../propTypes';
import { getKey } from './Oppsummeringsvisning';

const OppsummeringCheckboxgruppe = ({ tag, sporsmalstekst, svar, overskriftsnivaa }) => {
    return (<OppsummeringSporsmalscontainer tag={tag}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        {
            svar.undersporsmal.map((s) => {
                return <OppsummeringSporsmal {...s} overskriftsnivaa={overskriftsnivaa + 1} key={getKey(s.tag, s.id)} />;
            })
        }
    </OppsummeringSporsmalscontainer>);
};

OppsummeringCheckboxgruppe.propTypes = oppsummeringSporsmal;

export default OppsummeringCheckboxgruppe;
