import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import history from '../../history';
import inntektskildetyper from '../../enums/inntektskildetyper';
import { touch } from 'redux-form';

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

const getKeys = (key, errors, prefix) => {
    if (typeof errors[key] === 'string') {
        if (prefix) {
            return [`${prefix}.${key}`];
        }
        return [key];
    }
    let keys = [];
    let newPrefix = key;
    if (prefix) {
        if (isNaN(parseInt(key, 10))) {
            newPrefix = `${prefix}.${key}`;
        } else {
            newPrefix = `${prefix}[${key}]`;
        }
    }
    for (const nKey in errors[key]) {
        if (errors[key][nKey]) {
            keys = [...getKeys(nKey, errors[key], newPrefix), ...keys];
        }
    }
    keys = keys.map((k) => {
        if (k.indexOf('_error') > -1) {
            return k.replace('._error', '');
        }
        return k;
    });
    return keys;
};

export const getNestedKeys = (errors) => {
    let keys = [];
    for (const key in errors) {
        if (errors[key]) {
            const keysToAdd = getKeys(key, errors);
            if (keysToAdd) {
                keys = [...keysToAdd, ...keys];
            }
        }
    }
    return keys;
};

const setup = (validate, Component, initialize = false) => {
    const form = reduxForm({
        form: SYKEPENGER_SKJEMANAVN,
        validate,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true,
        sendTilFoerDuBegynner,
        onSubmitFail: (errors, dispatch) => {
            const errorFields = getNestedKeys(errors);
            errorFields.forEach((field) => {
                dispatch(touch(SYKEPENGER_SKJEMANAVN, field));
            });
        },
    })(Component);
    if (initialize) {
        return connect(mapStateToProps)(form);
    }
    return form;
};

export default setup;
