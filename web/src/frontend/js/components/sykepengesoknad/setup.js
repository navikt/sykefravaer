import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { mapAktiviteter, mapBackendsoknadToSkjemasoknad } from 'digisyfo-npm';
import history from '../../history';
import Feiloppsummering, { onSubmitFail } from '../../containers/FeiloppsummeringContainer';
import inntektskildetyper from '../../enums/inntektskildetyper';
import { UTKAST_TIL_KORRIGERING } from '../../enums/sykepengesoknadstatuser';

const sendTilFoerDuBegynner = (sykepengesoknad) => {
    history.replace(`/sykefravaer/soknader/${sykepengesoknad.id}`);
};

export const SYKEPENGER_SKJEMANAVN = 'SYKEPENGERSKJEMA';

export const mapToInitialValues = (soknad) => {
    const aktiviteter = mapAktiviteter(soknad).aktiviteter;
    return {
        ...soknad,
        aktiviteter: aktiviteter.map((aktivitet) => {
            return {
                ...aktivitet,
                avvik: {},
            };
        }),
        utdanning: {},
        andreInntektskilder: inntektskildetyper,
        utenlandsopphold: {
            perioder: [],
        },
    };
};

export const mapStateToPropsMedInitialValues = (state, ownProps) => {
    const { sykepengesoknad } = ownProps;
    const initialValues = sykepengesoknad.status === UTKAST_TIL_KORRIGERING ? mapBackendsoknadToSkjemasoknad(sykepengesoknad) : mapToInitialValues(sykepengesoknad);
    return {
        initialValues,
        sykepengesoknad: mapAktiviteter(sykepengesoknad),
    };
};

export const mapStateToProps = (state, ownProps) => {
    const { sykepengesoknad } = ownProps;
    return {
        sykepengesoknad: mapAktiviteter(sykepengesoknad),
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
        return connect(mapStateToPropsMedInitialValues)(form);
    }
    return connect(mapStateToProps)(form);
};

export default setup;
