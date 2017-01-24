import React, { PropTypes } from 'react';

const Tallvelger = ({ label, id, input, meta }) => {
    return (<div className="skjema__input">
        <div className="medEnhet">
            <input id={id} type="text" value={input.value} className={`${meta.touched && meta.error ? 'input--xs input--feil' : 'input--xs'}`} {...input} />
            <label htmlFor={id} className="medEnhet__enhet">{label}</label>
        </div>
        <p className="skjema__feilmelding" aria-live="polite" role="alert">{meta.touched && meta.error}</p>
    </div>);
};

Tallvelger.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object,
};

export default Tallvelger;
