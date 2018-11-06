import React from 'react';
import PropTypes from 'prop-types';
import { svar as svarPt, sporsmal as sporsmalPt } from '../../propTypes';
import OppsummeringSporsmalscontainer from './OppsummeringSporsmalscontainer';
import OppsummeringSporsmalstekst from './OppsummeringSporsmalstekst';
import OppsummeringUndersporsmalsliste from './OppsummeringUndersporsmalsliste';
import OppsummeringAvkrysset from './OppsummeringAvkrysset';
import { CHECKED } from '../../enums/svarEnums';

const OppsummeringRadiogruppe = ({ sporsmalstekst, tag, overskriftsnivaa, undersporsmal, id }) => {
    const besvartUndersporsmal = undersporsmal.find((s) => {
        return s.svar.length > 0 && s.svar[0].verdi === CHECKED;
    });
    return besvartUndersporsmal
        ? (<OppsummeringSporsmalscontainer tag={tag}>
            <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
            <OppsummeringAvkrysset id={id} tekst={besvartUndersporsmal.sporsmalstekst} />
            <OppsummeringUndersporsmalsliste sporsmalsliste={besvartUndersporsmal.undersporsmal} overskriftsnivaa={overskriftsnivaa + 1} />
        </OppsummeringSporsmalscontainer>)
        : null;
};

OppsummeringRadiogruppe.propTypes = {
    svar: svarPt,
    sporsmalstekst: PropTypes.string,
    tag: PropTypes.string,
    overskriftsnivaa: PropTypes.number,
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    id: PropTypes.string,
};

export default OppsummeringRadiogruppe;
