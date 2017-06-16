import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import history from '../../history';
import Feiloppsummering, { onSubmitFail } from '../../containers/FeiloppsummeringContainer';
import mapBackendsoknadToSkjemasoknad from './mapBackendsoknadToSkjemasoknad';
import inntektskildetyper from '../../enums/inntektskildetyper';
import { UTKAST_TIL_KORRIGERING } from '../../enums/sykepengesoknadstatuser';

const sendTilFoerDuBegynner = (sykepengesoknad) => {
    history.replace(`/sykefravaer/soknader/${sykepengesoknad.id}`);
};

export const SYKEPENGER_SKJEMANAVN = 'SYKEPENGERSKJEMA';

export const mapToInitialValues = (soknad) => {
    return Object.assign({}, soknad, {
        aktiviteter: soknad.aktiviteter.map((aktivitet) => {
            return Object.assign({}, aktivitet, {
                avvik: {},
            });
        }),
        utdanning: {},
        andreInntektskilder: inntektskildetyper,
        utenlandsopphold: {
            perioder: [],
        },
    });
};

export const mapStateToProps = (state, ownProps) => {
    const { sykepengesoknad } = ownProps;
    return {
        initialValues: sykepengesoknad.status === UTKAST_TIL_KORRIGERING ? mapBackendsoknadToSkjemasoknad(sykepengesoknad) : mapToInitialValues(sykepengesoknad),
    };
};

const setup = (validate, Component, initialize = false) => {
    const ComponentMedOppsummering = (props) => {
        return (<div>
            <Feiloppsummering skjemanavn={SYKEPENGER_SKJEMANAVN} />
            <Component {...props} />
        </div>);
    };
    const form = reduxForm({
        form: SYKEPENGER_SKJEMANAVN,
        validate,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true,
        sendTilFoerDuBegynner,
        onSubmitFail: (errors, dispatch) => {
            onSubmitFail(errors, dispatch, SYKEPENGER_SKJEMANAVN);
        },
    })(ComponentMedOppsummering);
    if (initialize) {
        return connect(mapStateToProps)(form);
    }
    return form;
};

export default setup;
