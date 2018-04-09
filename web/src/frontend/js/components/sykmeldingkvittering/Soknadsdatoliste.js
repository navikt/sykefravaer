import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknad as sykepengesoknadPt, getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';

const Soknadsdatoliste = ({ sykepengesoknader, visStatus = false }) => {
    return (<ul className="js-soknadsdatoliste">
        {
            [...sykepengesoknader]
                .sort((a, b) => {
                    return a.tom.getTime() - b.tom.getTime();
                })
                .map((s, index) => {
                    const nokkel = `sykepengesoknader.datoliste.status.${s.status}`;
                    return (<li key={index}>
                        <strong>{toDatePrettyPrint(s.tom)}</strong>
                        { visStatus ? ` – ${getLedetekst(nokkel)}` : null }
                    </li>);
                })
        }
    </ul>);
};

Soknadsdatoliste.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    visStatus: PropTypes.bool,
};

export default Soknadsdatoliste;
