import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-maskedinput';
import cn from 'classnames';
import { fieldPropTypes } from '../../../propTypes';
import Feilmelding from '../Feilmelding';
import { Vis } from '../../../utils';

export const Datoinput = ({ meta, input, id, onDoubleClick }) => {
    const classNames = cn({
        datovelger__input: true,
        'datovelger__input--fom': input.name.indexOf('fom') > -1,
        'datovelger__input--tom': input.name.indexOf('tom') > -1,
        'input--feil': meta.touched && meta.error,
    });

    return (<MaskedInput
        type="tel"
        mask="11.11.1111"
        autoComplete="off"
        placeholder="dd.mm.åååå"
        id={id}
        className={classNames}
        onDoubleClick={onDoubleClick}
        {...input} />);
};

Datoinput.propTypes = {
    meta: fieldPropTypes.meta,
    input: fieldPropTypes.input,
    id: PropTypes.string,
};

const FomField = ({ meta, input, id, kalenderVises, onDoubleClick }) => {
    return (<div className="datovelger">
        <div className="datovelger__inner">
            <div className="datovelger__inputContainer">
                <Datoinput meta={meta} id={id} input={input} onDoubleClick={onDoubleClick} />
            </div>
            <Vis hvis={!kalenderVises}>
                <Feilmelding {...meta} />
            </Vis>
        </div>
    </div>);
};

FomField.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string.isRequired,
    input: fieldPropTypes.input,
    kalenderVises: PropTypes.bool,
    toggle: PropTypes.func,
    onDoubleClick: PropTypes.func,
};

export default FomField;
