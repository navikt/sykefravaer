/* eslint arrow-body-style: ["error", "as-needed"] */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { change as changeAction } from 'redux-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { jaEllerNeiAlternativer } from './jaEllerNeiHelpers';
import { fieldPropTypes } from '../../propTypes';

const RadioPanelGruppeComponent = ({
    meta, hjelpetekst, spoersmal, input, doChange,
}) => {
    const feil = meta.touched && meta.error
        ? { feilmelding: meta.error }
        : undefined;

    const legend = hjelpetekst
        ? (
            <div className="medHjelpetekst">
                <h3>{spoersmal}</h3>
                {hjelpetekst}
            </div>
        )
        : <h3>{spoersmal}</h3>;

    return (
        <RadioPanelGruppe
            className="inputPanelGruppe--horisontal"
            name={input.name}
            legend={legend}
            radios={jaEllerNeiAlternativer
                .map(alternativ => ({
                    ...alternativ,
                    id: `${input.name}-${alternativ.value}`,
                }))}
            checked={input.value}
            onChange={(event, value) => {
                doChange(meta.form, input.name, value);
            }}
            feil={feil}
        />
    );
};

RadioPanelGruppeComponent.propTypes = {
    doChange: PropTypes.func,
    meta: fieldPropTypes.meta,
    input: fieldPropTypes.input,
    spoersmal: PropTypes.string,
    hjelpetekst: PropTypes.node,
};

const actionCreators = {
    doChange: changeAction,
};

const JaEllerNeiRadiopanelgruppe = connect(null, actionCreators)(RadioPanelGruppeComponent);

export default JaEllerNeiRadiopanelgruppe;
