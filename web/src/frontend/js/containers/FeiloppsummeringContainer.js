import { connect } from 'react-redux';
import * as actions from '../actions/reduxFormMeta_actions';
import Feiloppsummering from '../components/skjema/Feiloppsummering';
import { touch } from 'redux-form';
import { SEND_SKJEMA_FEILET } from '../enums/reduxFormMetaEnums';
import { getObjectValueByString } from '../utils';

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
    return keys.reverse();
};

export const onSubmitFail = (errors, dispatch, skjemanavn) => {
    const errorFields = getNestedKeys(errors);
    dispatch(actions.sendSkjemaFeilet(skjemanavn));
    errorFields.forEach((field) => {
        dispatch(touch(skjemanavn, field));
    });
};

export const mapStateToProps = (state, ownProps) => {
    const skjemanavn = ownProps.skjemanavn;
    const meta = state.formMeta && state.formMeta[skjemanavn] && state.formMeta[skjemanavn] ? state.formMeta[skjemanavn] : {};
    const visFeilliste = meta.status === SEND_SKJEMA_FEILET;
    const settFokus = meta.status === SEND_SKJEMA_FEILET && meta.settFokus === true;
    const feltnavnMedFeil = getNestedKeys(state.form[skjemanavn].syncErrors);
    const reduxForm = state.form[skjemanavn];

    const feilmeldinger = feltnavnMedFeil.filter((feltnavn) => {
        try {
            return getObjectValueByString(reduxForm.fields, feltnavn).touched;
        } catch (e) {
            return false;
        }
    }).map((feltnavn) => {
        const feilmelding = getObjectValueByString(reduxForm.syncErrors, feltnavn);
        return {
            feltnavn,
            feilmelding: feilmelding._error || feilmelding,
        };
    });

    return {
        skjemanavn,
        settFokus,
        visFeilliste,
        feilmeldinger,
    };
};

const ConnectedFeiloppsummering = connect(mapStateToProps, actions)(Feiloppsummering);

export default ConnectedFeiloppsummering;
