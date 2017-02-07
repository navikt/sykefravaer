import React, { PropTypes } from 'react';
import { parseDato, erGyldigDato, erGyldigDatoformat } from '../../utils';
import { Field } from 'redux-form';
import Feilmelding from './Feilmelding';
import MaskedInput from 'react-maskedinput';

const Datofelt = (props) => {
    const { meta, className, input, id } = props;
    return (<div>
        <MaskedInput
            type="tel"
            mask="11.11.1111"
            autoComplete="off" 
            placeholder={props.placeholder} type={props.type || 'text'} id={id}
            className={`input--s ${meta.touched && meta.error ? ' input--feil' : ''}`} {...input} value={input.value} />
        <Feilmelding {...meta} />
    </div>);
};

Datofelt.propTypes = {
    meta: PropTypes.object,
    id: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    className: PropTypes.string,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    mask: PropTypes.string,
};

const Datovelger = (props) => {
    return (<Field
        placeholder="dd.mm.åååå"
        component={Datofelt}
        validate={(input) => {
            if (!input) {
                return undefined;
            } else if (!erGyldigDatoformat(input)) {
                return 'Datoen må være på formatet dd.mm.åååå';
            } else if (!erGyldigDato(input)) {
                return 'Datoen er ikke gyldig';
            }
            return undefined;
        }}
        {...props} />);
};

export default Datovelger;
