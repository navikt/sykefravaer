import React, { PropTypes } from 'react';
import Feilmelding from './Feilmelding';

const TekstfeltMedEnhet = ({ label, id, input, meta }) => {
    return (<div className="skjema__input">
        <div className="medEnhet">
            <input autoComplete="off" id={id} type="text" value={input.value} className={`${meta.touched && meta.error ? 'input--xs input--feil' : 'input--xs'}`} {...input} />
            <label htmlFor={id} className="medEnhet__enhet">{label}</label>
        </div>
        <Feilmelding {...meta} />
    </div>);
};

TekstfeltMedEnhet.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object,
};

export default TekstfeltMedEnhet;
