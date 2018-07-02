import React from 'react';
import PropTypes from 'prop-types';
import Periodevelger from '../skjema/datovelger/Periodevelger';

const Perioder = ({ min, max, name }) => {
    return (<Periodevelger
        name={name}
        tidligsteFom={min}
        senesteTom={max} />);
};

Perioder.propTypes = {
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    name: PropTypes.string,
};

export default Perioder;
