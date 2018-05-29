import React from 'react';
import PropTypes from 'prop-types';
import Datovelger from '../skjema/datovelger/Datovelger';
import { svar as svarPt } from '../../propTypes';
import Sporsmalstekst from './Sporsmalstekst';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';

const Dato = ({ sporsmalstekst, svar, name, id }) => {
    const parse = genererParseForEnkeltverdi(id);
    return (<div>
        <Sporsmalstekst tekst={sporsmalstekst} Tag="label" htmlFor={name} />
        <Datovelger
            format={formaterEnkeltverdi}
            parse={parse}
            parseVerdi={parse}
            name={name}
            id={name}
            tidligsteFom={svar.min}
            senesteTom={svar.max} />
    </div>);
};

Dato.propTypes = {
    sporsmalstekst: PropTypes.string,
    svar: svarPt,
    name: PropTypes.string,
    id: PropTypes.string,
};

export default Dato;
