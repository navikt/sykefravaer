import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import history from '../../history';
import inntektskildetyper from '../../enums/inntektskildetyper';
import Feiloppsummering, { onSubmitFail } from '../../containers/FeiloppsummeringContainer';

const sendTilFoerDuBegynner = (sykepengesoknad) => {
    history.replace(`/sykefravaer/soknader/${sykepengesoknad.id}`);
};

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

export const SYKEPENGER_SKJEMANAVN = 'SYKEPENGERSKJEMA';

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: mapToInitialValues(ownProps.sykepengesoknad),
    };
};

const setup = (validate, Component, initialize = false) => {
    const Skjema = (props) => {
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
    })(Skjema);
    if (initialize) {
        return connect(mapStateToProps)(form);
    }
    return form;
};

export default setup;
