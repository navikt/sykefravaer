import React, { Element } from 'react';
import PropTypes from 'prop-types';

const FormErrorSummary = ({ mappedErrors, refs, errorSummaryRef }) => {
    if (mappedErrors.length === 0) {
        return <div ref={errorSummaryRef} />;
    }

    return (
        <div
            ref={errorSummaryRef}
            className="feiloppsummering blokk"
            tabIndex="-1">
            <h3 className="feiloppsummering__tittel">
                {`Det er ${mappedErrors.length} feil i skjemaet`}
            </h3>
            <ul className="feiloppsummering__liste">
                {mappedErrors.map((errorObj, index) => {
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
    mappedErrors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
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
