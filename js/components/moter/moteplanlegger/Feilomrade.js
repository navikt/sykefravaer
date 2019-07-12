import React from 'react';
import PropTypes from 'prop-types';

const Feilmelding = (
    {
        submitFailed,
        error,
    },
) => (
    <p className="skjema__feilmelding" aria-live="polite">
        {submitFailed && error}
    </p>
);

Feilmelding.propTypes = {
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
};

const Feilomrade = (
    {
        submitFailed,
        error,
        children,
    },
) => (
    <div className={submitFailed && error ? 'skjema__feilomrade skjema__feilomrade--feil' : 'skjema__feilomrade'}>
        {children}
        <Feilmelding submitFailed={submitFailed} error={error} />
    </div>
);

Feilomrade.propTypes = {
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};

export default Feilomrade;
