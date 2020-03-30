import React, { Element } from 'react';
import PropTypes from 'prop-types';

import './FormSection.less';

import FormError from './FormError';

const FormSection = ({ title, errors, errorKey, show = true, children }) => {
    if (show === false) {
        return null;
    }

    const hasError = errors && errors[errorKey];

    const className = hasError ? 'formsection formsection-error' : 'formsection';

    return (
        <div tabIndex="-1" className={className} style={{ marginBottom: '3rem' }}>
            <h3 className="skjema__sporsmal">{title}</h3>

            {children}

            <FormError errors={errors} errorKey={errorKey} />
        </div>
    );
};

FormSection.propTypes = {
    title: PropTypes.string,
    errors: PropTypes.objectOf(PropTypes.string),
    errorKey: PropTypes.string,
    show: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.instanceOf(Element)),
};

export default FormSection;
