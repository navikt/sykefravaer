import React from 'react';
import { parseDato, erGyldigDato } from '../../utils';
import { Field } from 'redux-form';
import Tekstfelt from './Tekstfelt';

const Datovelger = (props) => {
    return (<Field
        parse={parseDato}
        component={Tekstfelt}
        placeholder="dd.mm.åååå"
        className="input--s"
        validate={(input) => {
            if (!input) {
                return undefined;
            } else if (!erGyldigDato(input)) {
                return 'Datoen må være på formatet dd.mm.åååå';
            }
            return undefined;
        }}
        {...props} />);
};

export default Datovelger;
