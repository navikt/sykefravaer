import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { change as changeAction } from 'redux-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { jaEllerNeiAlternativer } from './JaEllerNei';
import { genererParseForEnkeltverdi } from './fieldUtils';
import { fieldPropTypes } from '../../../propTypes';

const RadioPanelGruppeComponent = (props) => {
    const feil = props.meta.touched && props.meta.error
        ? { feilmelding: props.meta.error }
        : undefined;

    return (<RadioPanelGruppe
        className="inputPanelGruppe--horisontal"
        name={props.input.name}
        legend={props.sporsmalstekst}
        radios={jaEllerNeiAlternativer.map((alternativ) => {
            return {
                label: getLedetekst(`soknad.${alternativ.toLowerCase()}`),
                value: alternativ,
                id: `${props.input.name}-${getLedetekst(`soknad.${alternativ.toLowerCase()}`)}`,
            };
        })}
        checked={props.input.value}
        onChange={(event, value) => {
            const parsedValue = genererParseForEnkeltverdi(props.id)(value);
            props.doChange(props.meta.form, props.input.name, parsedValue);
        }}
        feil={feil}
    />);
};

RadioPanelGruppeComponent.propTypes = {
    doChange: PropTypes.func,
    meta: fieldPropTypes.meta,
    input: fieldPropTypes.input,
    id: PropTypes.string,
    sporsmalstekst: PropTypes.string,
};

const JaEllerNeiRadiopanelgruppe = connect(null, { doChange: changeAction })(RadioPanelGruppeComponent);

export default JaEllerNeiRadiopanelgruppe;
