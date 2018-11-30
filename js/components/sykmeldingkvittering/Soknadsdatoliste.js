import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknad as sykepengesoknadPt, getLedetekst, tilLesbarDatoMedArstall } from 'digisyfo-npm';

export const sorterSoknaderEtterDatoTilgjengelig = (sykepengesoknader) => {
    return [...sykepengesoknader]
        .sort((a, b) => {
            return a.tom.getTime() - b.tom.getTime();
        });
};

const Soknadsdatoliste = ({ sykepengesoknader, visStatus = false }) => {
    return (<ul className="js-soknadsdatoliste">
        {
            sorterSoknaderEtterDatoTilgjengelig(sykepengesoknader)
                .map((s, index) => {
                    const nokkel = `sykepengesoknader.datoliste.status.${s.status}`;
                    return (<li key={index}>
                        <strong>{tilLesbarDatoMedArstall(s.tom)}</strong>
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
    const datoStrenger = liste.map((s) => {
        return `<strong>${tilLesbarDatoMedArstall(s.tom)}</strong>`;
    });
    return datoStrenger.length <= 2
        ? datoStrenger.join(' og ')
        : erstattSiste(datoStrenger.join(', '), ', ', ' og ');
};

export const soknadsdatoremseUtenForsteDato = (sykepengesoknader) => {
    const datoer = [...sorterSoknaderEtterDatoTilgjengelig(sykepengesoknader)];
    datoer.shift();
    return datoer.length > 0 ? tilKommaliste(datoer) : null;
};

export const soknadsdatoremse = (sykepengesoknader) => {
    const datoer = sorterSoknaderEtterDatoTilgjengelig(sykepengesoknader);
    return tilKommaliste(datoer);
};

export default Soknadsdatoliste;
