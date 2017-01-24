import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

const setup = (validate, Component, initialValues) => {
    const form = reduxForm({
        form: 'sykepengerSkjema',
        validate,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true,
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
