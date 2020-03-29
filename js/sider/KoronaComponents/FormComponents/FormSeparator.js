import React from 'react';
import PropTypes from 'prop-types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Element } from 'nav-frontend-typografi';

const FormSeparator = ({ helptext, title }) => {
    return (
        <div style={{ marginBottom: '2rem' }}>
            {helptext && (
                <div style={{ position: 'absolute', right: '20px' }}>
                    <Hjelpetekst>
                        {helptext}
                    </Hjelpetekst>
                </div>
            )}

            <Element>{title}</Element>
            <hr />
        </div>
    );
};

FormSeparator.propTypes = {
    helptext: PropTypes.string,
    title: PropTypes.string,
};

export default FormSeparator;
