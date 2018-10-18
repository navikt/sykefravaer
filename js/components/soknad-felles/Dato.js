import React from 'react';
import PropTypes from 'prop-types';
import Datovelger from '../skjema/datovelger/Datovelger';
import Sporsmalstekst from './Sporsmalstekst';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';

const Dato = ({ sporsmalstekst, min, max, name, id }) => {
    const parse = genererParseForEnkeltverdi(id);
    return (<div>
        <Sporsmalstekst tekst={sporsmalstekst} Tag="label" htmlFor={name} />
        <Datovelger
            format={formaterEnkeltverdi}
            parse={parse}
            parseVerdi={parse}
            name={name}
            id={name}
            tidligsteFom={min}
            senesteTom={max} />
    </div>);
};

Dato.propTypes = {
    sporsmalstekst: PropTypes.string,
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    name: PropTypes.string,
    id: PropTypes.string,
};

export default Dato;
