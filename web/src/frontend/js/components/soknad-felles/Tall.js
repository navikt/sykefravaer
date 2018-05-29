import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import TekstfeltMedEnhet from '../skjema/TekstfeltMedEnhet';
import Sporsmalstekst from './Sporsmalstekst';
import { fjernIndexFraTag, formaterEnkeltverdi, genererParseForEnkeltverdi } from './fieldUtils';
import { lagDesimaltall } from '../../utils';
import { getLedetekstFraTag } from '../sykepengesoknad-selvstendig/validering/valideringUtils';
import { svar as svarPt } from '../../propTypes';

export const genererValiderTall = (min, max, blankfeilmelding = 'Vennligst fyll ut dette feltet') => {
    return (verdi) => {
        const formatertVerdi = formaterEnkeltverdi(verdi);
        const parsetVerdi = parseInt(formatertVerdi, 10);
        if (parsetVerdi > max || parsetVerdi < min) {
            return `Vennligst fyll ut et tall mellom ${min} og ${max}`;
        }
        if (!parsetVerdi || isNaN(parsetVerdi)) {
            return blankfeilmelding;
        }
        return undefined;
    };
};

const Tall = ({ sporsmalstekst, name, id, label, svar }) => {
    const parse = genererParseForEnkeltverdi(id);
    const tag = fjernIndexFraTag(name);
    const valider = genererValiderTall(svar.min, svar.max, getLedetekstFraTag(tag));
    return (<div>
        <Sporsmalstekst Tag="label" tekst={sporsmalstekst} htmlFor={name} />
        <Field
            component={TekstfeltMedEnhet}
            label={label}
            name={name}
            id={name}
            validate={valider}
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
    id: PropTypes.string,
    label: PropTypes.string,
    svar: svarPt,
};

export default Tall;
