import React, { PropTypes } from 'react';

const Feilmelding = ({ touched, error }) => {
    return <p className="skjema__feilmelding" aria-live="polite">{touched && error}</p>;
};

Feilmelding.propTypes = {
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default Feilmelding;
