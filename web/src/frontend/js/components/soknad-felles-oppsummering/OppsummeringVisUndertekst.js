import React from 'react';
import PropTypes from 'prop-types';
import OppsummeringSporsmalstekst from './OppsummeringSporsmalstekst';
import OppsummeringUndersporsmal from './OppsummeringUndersporsmal';
import { sporsmal as sporsmalPt } from '../../propTypes';

const OppsummeringVisUndertekst = ({ sporsmalstekst, id, overskriftsnivaa, undertekst, undersporsmal }) => {
    return (<div className="oppsummering__VisUndertekst" id={id}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={{ __html: undertekst }} />
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
