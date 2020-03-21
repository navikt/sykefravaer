import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ errors, errorKey }) => {
    if (!errors) {
        return null;
    }

    if (!errors[errorKey]) {
        return null;
    }

    return (
        <p style={{ color: '#BA3A26', fontWeight: '600' }}>
            {errors[errorKey]}
        </p>
    );
};

FormError.propTypes = {
    errorKey: PropTypes.string,
    errors: PropTypes.objectOf(PropTypes.string),
};

export default FormError;
