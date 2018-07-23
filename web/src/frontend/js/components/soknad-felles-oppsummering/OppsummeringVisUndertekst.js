import React from 'react';
import PropTypes from 'prop-types';
import OppsummeringSporsmalstekst from "./OppsummeringSporsmalstekst";
import OppsummeringUndersporsmal from "./OppsummeringUndersporsmal";
import {getLedetekst, toDatePrettyPrint} from "digisyfo-npm";
import {getKey} from "./Oppsummeringsvisning";

const OppsummeringVisUndertekst = ({ sporsmalstekst, id , overskriftsnivaa, undertekst, undersporsmal}) => {
    console.log(undertekst);
    console.log(((undertekst).replace("<ul>","")).replace("</li>","").replace("</ul>","").replace("\n","").split("<li>"));
    let undertekstList = undertekst.replace("<ul>","").replace("</ul>","").split("</li>").join("").split("<li>");
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
    tekst: PropTypes.string,
    id: PropTypes.string,
};

export default OppsummeringVisUndertekst;