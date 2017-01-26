import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { history } from '../../history';

const sendTilFoerDuBegynner = (sykepengesoknad) => {
    console.log("olsen")

    // history.replace(`/sykefravaer/soknader/${sykepengesoknad.id}`);
};

const setup = (validate, Component, initialValues) => {
    const form = reduxForm({
        form: 'sykepengerSkjema',
        validate,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true,
        sendTilFoerDuBegynner,
    })(Component);
    if (initialValues) {
        return connect(() => {
            return {
                initialValues,
            };
        })(form);
    }
    return form;
};

export default setup;
