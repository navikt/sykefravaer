import React from 'react';
import PropTypes from 'prop-types';
import Feilmelding from './Feilmelding';

const Tekstfelt = (props) => {
    const { meta, className, input, id } = props;
    return (<div>
        <input autoComplete="off" placeholder={props.placeholder} type={props.type || 'text'} id={id}
            className={`${className}${meta.touched && meta.error ? ' input--feil' : ''}`} {...input} value={input.value} />
        <Feilmelding {...meta} />
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
