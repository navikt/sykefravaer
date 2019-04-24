import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import TekstfeltMedEnhet from '../../../components/skjema/TekstfeltMedEnhet';
import Sporsmalstekst from './Sporsmalstekst';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import { lagDesimaltall, lagHeltall } from '../../../utils/index';

const Tall = ({ sporsmalstekst, name, label, undertekst }) => {
    const parse = genererParseForEnkeltverdi();
    return (<div>
        <Sporsmalstekst Tag="label" tekst={sporsmalstekst} htmlFor={name} />
        <Field
            component={TekstfeltMedEnhet}
            label={label}
            name={name}
            id={name}
            parse={(verdi) => {
                const parsetVerdi = undertekst === 'prosent'
                    ? lagHeltall(verdi)
                    : lagDesimaltall(verdi);
                return parse(parsetVerdi);
            }}
            format={formaterEnkeltverdi}
            undertekst={undertekst}
            className="input--s" />
    </div>);
};

Tall.propTypes = {
    sporsmalstekst: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    undertekst: PropTypes.string,
};

export default Tall;
