import React from 'react';

const Feilmelding = ({ touched, error }) => {
    return <p className="skjema__feilmelding" aria-live="polite">{touched && error}</p>;
};

export default Feilmelding;
