import React from 'react';
import PropTypes from 'prop-types';
import OppsummeringSporsmalstekst from "./OppsummeringSporsmalstekst";
import OppsummeringUndersporsmal from "./OppsummeringUndersporsmal";
import {getLedetekst, toDatePrettyPrint} from "digisyfo-npm";
import {getKey} from "./Oppsummeringsvisning";

const OppsummeringVisUndertekst = ({ sporsmalstekst, id , overskriftsnivaa, undertekst, undersporsmal}) => {
    console.log(undertekst);
    console.log((undertekst).replace("<ul>","").split("<li>"));

    return (<div className="oppsummering__VisUndertekst" id={id}>
        <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>{sporsmalstekst}</OppsummeringSporsmalstekst>
        <p className="oppsummering__dato">{undertekst}</p>

        <OppsummeringUndersporsmal sporsmalsliste={undersporsmal} overskriftsnivaa={overskriftsnivaa} />
    </div>);
};

OppsummeringVisUndertekst.propTypes = {
    tekst: PropTypes.string,
    id: PropTypes.string,
};

export default OppsummeringVisUndertekst;