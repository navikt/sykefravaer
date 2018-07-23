import React from 'react';
import PropTypes from 'prop-types';
import OppsummeringSporsmalstekst from "./OppsummeringSporsmalstekst";

const OppsummeringFritekst = ({ sporsmalstekst, id , overskriftsnivaa, svar}) => {
    console.log(sporsmalstekst);
    return (<div className="oppsummering__fritekst" id={id}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        <span>{svar[0].verdi}</span>
    </div>);
};

OppsummeringFritekst.propTypes = {
    tekst: PropTypes.string,
    id: PropTypes.string,
};

export default OppsummeringFritekst;