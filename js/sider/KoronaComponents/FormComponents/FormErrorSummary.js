import React, { Element } from 'react';
import PropTypes from 'prop-types';

const FormErrorSummary = ({ errors, refs, errorSummaryRef }) => {
    if (!errors) {
        return null;
    }

    return (
        <div
            ref={errorSummaryRef}
            className="feiloppsummering blokk"
            tabIndex="-1">
            <h3 className="feiloppsummering__tittel">
                {`Det er ${Object.values(errors).length} feil i skjemaet`}
            </h3>
            <ul className="feiloppsummering__liste">
                {Object.entries(errors).map((errorObj, index) => {
                    return (
                        <li key={index} className="feiloppsummering__feil">
                            <button
                                className="lenke"
                                style={{ color: '#FFF' }}
                                type="button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    const ref = refs[errorObj[0]];
                                    if (ref && ref.current) {
                                        ref.current.focus();
                                    }
                                }}>
                                {errorObj[1]}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

FormErrorSummary.propTypes = {
    errors: PropTypes.objectOf(PropTypes.string),
    refs: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ])),
    errorSummaryRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
};

export default FormErrorSummary;
