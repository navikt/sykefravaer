import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import Sporsmalstekst from './Sporsmalstekst';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import Tekstfelt from '../skjema/Tekstfelt';

const Tekstinput = ({ sporsmalstekst, name, id, max }) => {
    const parse = genererParseForEnkeltverdi(id);
    return (<div>
        <Sporsmalstekst Tag="label" tekst={sporsmalstekst} htmlFor={name} />
        <Field
            component={Tekstfelt}
            name={name}
            id={name}
            parse={(verdi) => {
                return max
                    ? parse(verdi.substr(0, max))
                    : parse(verdi);
            }}
            format={formaterEnkeltverdi}
            className="input--s" />
    </div>);
};

Tekstinput.propTypes = {
    sporsmalstekst: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    max: PropTypes.number,
};

export default Tekstinput;
