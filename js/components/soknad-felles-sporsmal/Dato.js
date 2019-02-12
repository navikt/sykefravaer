import React from 'react';
import PropTypes from 'prop-types';
import Datovelger from '../skjema/datovelger/Datovelger';
import Sporsmalstekst from './Sporsmalstekst';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import { getOnChangeForDato } from '../../utils/soknad-felles/getOnChange';

const Dato = (props) => {
    const { sporsmalstekst, min, max, name, id } = props;
    const parse = genererParseForEnkeltverdi(id);
    return (<div>
        <Sporsmalstekst tekst={sporsmalstekst} Tag="label" htmlFor={name} />
        <Datovelger
            onChange={getOnChangeForDato(props)}
            format={formaterEnkeltverdi}
            parse={parse}
            parseVerdi={parse}
            name={name}
            id={name}
            tidligsteFom={min}
            senesteTom={max}
            {...props}
        />
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
