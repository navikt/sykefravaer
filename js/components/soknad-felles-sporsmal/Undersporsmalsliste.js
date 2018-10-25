import React from 'react';
import Undersporsmal from './Undersporsmal';

const Undersporsmalsliste = ({ undersporsmal, soknad }) => {
    return undersporsmal.map((underspm) => {
        return underspm.svar !== null
            ? <Undersporsmal sporsmal={underspm} key={underspm.tag} soknad={soknad} />
            : null;
    });
};

export default Undersporsmalsliste;
