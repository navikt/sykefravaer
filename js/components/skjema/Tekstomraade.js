import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../propTypes';
import Feilmelding from './Feilmelding';

const Tekstomraade = (props) => {
    const {
        meta, className, input, id, placeholder, rows,
    } = props;
    return (
        <div className="skjemaelement">
            <textarea
                className={`skjemaelement__input ${className}${meta.touched && meta.error ? ' skjemaelement__input--harFeil' : ''}`}
                {...input}
                value={input.value}
                autoComplete="off"
                placeholder={placeholder}
                id={id}
                rows={rows}
            />
            <Feilmelding {...meta} />
        </div>
    );
};

Tekstomraade.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string,
    rows: PropTypes.string,
    input: fieldPropTypes.input,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Tekstomraade;
