import React, { PropTypes } from 'react';

const Tekstfelt = (props) => {
    const { meta, className, input, id } = props;
    return (<div>
        <input autoComplete="off" placeholder={props.placeholder} type={props.type || 'text'} id={id}
            className={`${className}${meta.touched && meta.error ? ' input--feil' : ''}`} {...input} value={input.value} />
        <p className="skjema__feilmelding" aria-live="polite">{meta.touched && meta.error}</p>
    </div>);
};

Tekstfelt.propTypes = {
    meta: PropTypes.object,
    id: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    className: PropTypes.string,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
};

export default Tekstfelt;
