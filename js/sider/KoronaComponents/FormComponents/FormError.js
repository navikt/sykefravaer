import React from 'react';
import PropTypes from 'prop-types';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

const FormError = ({ errors, errorKey }) => {
    if (!errors) {
        return null;
    }

    if (!errors[errorKey]) {
        return null;
    }

    return (
        <AlertStripeFeil>
            {errors[errorKey]}
        </AlertStripeFeil>
    );
};

FormError.propTypes = {
    errorKey: PropTypes.string,
    errors: PropTypes.objectOf(PropTypes.string),
};

export default FormError;
