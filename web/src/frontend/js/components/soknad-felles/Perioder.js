import React from 'react';
import PropTypes from 'prop-types';
import { svar as svarPt } from '../../propTypes';
import Periodevelger from '../skjema/datovelger/Periodevelger';

const Perioder = ({ svar, name }) => {
    return (<Periodevelger
        name={name}
        tidligsteFom={svar.min}
        senesteTom={svar.max} />);
};

Perioder.propTypes = {
    svar: svarPt,
    name: PropTypes.string,
};

export default Perioder;
