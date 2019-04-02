import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import TekstfeltMedEnhet from '../../../components/skjema/TekstfeltMedEnhet';
import Sporsmalstekst from './Sporsmalstekst';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import { lagDesimaltall } from '../../../utils/index';

const Tall = ({ sporsmalstekst, name, label, id }) => {
    const parse = genererParseForEnkeltverdi(id);
    return (<div>
        <Sporsmalstekst Tag="label" tekst={sporsmalstekst} htmlFor={name} />
        <Field
            component={TekstfeltMedEnhet}
            label={label}
            name={name}
            id={name}
            parse={(verdi) => {
                return parse(lagDesimaltall(verdi));
            }}
            format={formaterEnkeltverdi}
            className="input--s" />
    </div>);
};

Tall.propTypes = {
    sporsmalstekst: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
};

export default Tall;
