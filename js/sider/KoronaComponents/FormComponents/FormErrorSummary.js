import React from 'react';
import PropTypes from 'prop-types';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

const FormErrorSummary = ({ errors }) => {
    if (!errors) {
        return null;
    }

    return (
        <AlertStripeFeil>
            {Object.values(errors).map((error) => { return <p>{error}</p>; })}
        </AlertStripeFeil>
    );
};

FormErrorSummary.propTypes = {
    errors: PropTypes.objectOf(PropTypes.string),
};

export default FormErrorSummary;
