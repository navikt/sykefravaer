import React from 'react';
import PropTypes from 'prop-types';
import OppsummeringSporsmalstekst from './OppsummeringSporsmalstekst';
import OppsummeringUndersporsmal from './OppsummeringUndersporsmal';
import { getKey } from './Oppsummeringsvisning';
import { sporsmal as sporsmalPt } from '../../propTypes';

const OppsummeringVisUndertekst = ({ sporsmalstekst, id, overskriftsnivaa, undertekst, undersporsmal }) => {
    const undertekstList = undertekst.replace('<ul>', '').replace('</ul>', '').split('</li>').join('')
        .split('<li>');
    undertekstList.shift();

    return (<div className="oppsummering__VisUndertekst" id={id}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        {
            undertekstList.map((undertekstList, index) => {
                return <p className="oppsummering__dato" key={getKey(undertekstList, index)}>{undertekstList}</p>;
            })
        }
        <OppsummeringUndersporsmal sporsmalsliste={undersporsmal} overskriftsnivaa={overskriftsnivaa} />
    </div>);
};

OppsummeringVisUndertekst.propTypes = {
    undersporsmal: sporsmalPt,
    undertekst: PropTypes.string,
    overskriftsnivaa: PropTypes.number,
    sporsmalstekst: PropTypes.string,
    id: PropTypes.string,
};

export default OppsummeringVisUndertekst;
