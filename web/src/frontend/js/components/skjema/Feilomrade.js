import React, { PropTypes } from 'react';

const Feilomrade = ({ touched, error, children }) => {
    return (<div className={touched && error ? 'skjema__feilomrade skjema__feilomrade--feil' : 'skjema__feilomrade'}>
        {children}
        <p className="skjema__feilmelding" aria-live="polite" role="alert">{touched && error}</p>
    </div>);
};

Feilomrade.propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.oneOfType(
        React.PropTypes.array,
        React.PropTypes.object,
    ),
};

export default Feilomrade;
