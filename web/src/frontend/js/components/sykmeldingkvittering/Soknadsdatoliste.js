import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknad as sykepengesoknadPt, getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';

const sorterSoknader = (sykepengesoknader) => {
    return [...sykepengesoknader]
        .sort((a, b) => {
            return a.tom.getTime() - b.tom.getTime();
        });
};

const Soknadsdatoliste = ({ sykepengesoknader, visStatus = false }) => {
    return (<ul className="js-soknadsdatoliste">
        {
            sorterSoknader(sykepengesoknader)
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

const erstattSiste = (streng, finn, erstatning) => {
    const index = streng.lastIndexOf(finn);
    return `${streng.substr(0, index)}${erstatning}${streng.substr(index + finn.length, streng.length)}`;
};

const tilKommaliste = (liste) => {
    return liste.length <= 2
        ? liste.join(' og ')
        : erstattSiste(liste.join(', '), ', ', ' og ');
};

export const soknadsdatoremse = (sykepengesoknader) => {
    const datoer = sorterSoknader(sykepengesoknader)
        .map((s) => {
            return `<strong>${toDatePrettyPrint(s.tom)}</strong>`;
        });
    return tilKommaliste(datoer);
};

export default Soknadsdatoliste;
