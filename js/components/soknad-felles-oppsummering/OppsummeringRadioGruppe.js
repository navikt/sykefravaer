import React from 'react';
import PropTypes from 'prop-types';
import { svar as svarPt, sporsmal as sporsmalPt } from '../../propTypes';
import OppsummeringSporsmalscontainer from './OppsummeringSporsmalscontainer';
import OppsummeringSporsmalstekst from './OppsummeringSporsmalstekst';
import OppsummeringUndersporsmalsliste from './OppsummeringUndersporsmalsliste';
import OppsummeringAvkrysset from './OppsummeringAvkrysset';

const OppsummeringRadiogruppe = ({ svar, sporsmalstekst, tag, overskriftsnivaa, undersporsmal, id }) => {
    return (<OppsummeringSporsmalscontainer tag={tag}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        <OppsummeringAvkrysset id={id} tekst={svar[0].verdi} />
        <OppsummeringUndersporsmalsliste sporsmalsliste={undersporsmal} />
    </OppsummeringSporsmalscontainer>);
};

OppsummeringRadiogruppe.propTypes = {
    svar: svarPt,
    sporsmalstekst: PropTypes.string,
    tag: PropTypes.string,
    overskriftsnivaa: PropTypes.number,
    undersporsmal: sporsmalPt,
    id: PropTypes.string,
};

export default OppsummeringRadiogruppe;
