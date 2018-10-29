import React from 'react';
import PropTypes from 'prop-types';
import Undersporsmal from './Undersporsmal';
import { sporsmal as sporsmalPt, soknad as soknadPt } from '../../propTypes';

const Undersporsmalsliste = ({ undersporsmal, soknad }) => {
    const sporsmalsliste = undersporsmal
        .filter((underspm) => {
            return underspm.svar !== null;
        })
        .map((underspm) => {
            return <Undersporsmal sporsmal={underspm} key={underspm.tag} soknad={soknad} />;
        });

    return sporsmalsliste.length > 0
        ? <div>{sporsmalsliste}</div>
        : null;
};

Undersporsmalsliste.propTypes = {
    undersporsmal: PropTypes.arrayOf(sporsmalPt),
    soknad: soknadPt,
};

export default Undersporsmalsliste;
