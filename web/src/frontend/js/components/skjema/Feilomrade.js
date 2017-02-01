import React, { PropTypes } from 'react';
import Feilmelding from './Feilmelding';

const Feilomrade = ({ touched, error, children }) => {
    return (<div className={touched && error ? 'skjema__feilomrade skjema__feilomrade--feil' : 'skjema__feilomrade'}>
        {children}
        <Feilmelding touched={touched} error={error} />
    </div>);
};

Feilomrade.propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
};

export default Feilomrade;
