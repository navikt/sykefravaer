import React from 'react';
import PropTypes from 'prop-types';
import { Vis } from '../../utils';

const Feilmelding = ({ touched, error }) => {
    return (<p className="skjema__feilmelding" aria-live="polite">
        <Vis hvis={touched}>
            {error}
        </Vis>
    </p>);
};

Feilmelding.propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.string,
};

export default Feilmelding;
