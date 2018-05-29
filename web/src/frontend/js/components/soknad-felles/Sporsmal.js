import React from 'react';
import PropTypes from 'prop-types';
import JaEllerNei from './JaEllerNei';
import Undersporsmal from './Undersporsmal';
import { sporsmal as sporsmalPt } from '../../propTypes';

const Sporsmal = ({ sporsmal, name }) => {
    return (<JaEllerNei {...sporsmal} name={name}>
        {
            sporsmal.svar.undersporsmal.map((underspm) => {
                return underspm.svar === null
                    ? null
                    : <Undersporsmal sporsmal={underspm} key={underspm.tag} />;
            })
        }
    </JaEllerNei>);
};

Sporsmal.propTypes = {
    sporsmal: sporsmalPt,
    name: PropTypes.string,
};

export default Sporsmal;
