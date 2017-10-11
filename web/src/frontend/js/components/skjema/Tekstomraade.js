import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../propTypes';
import Feilmelding from './Feilmelding';

const Tekstomraade = (props) => {
    const { meta, className, input, id } = props;
    return (<div>
        <textarea
            autoComplete="off"
            placeholder={props.placeholder}
            id={id}
            className={`${className}${meta.touched && meta.error ? ' input--feil' : ''}`}
            {...input}
            value={input.value} />
        <Feilmelding {...meta} />
    </div>);
};

Tekstomraade.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string,
    input: fieldPropTypes.input,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Tekstomraade;
