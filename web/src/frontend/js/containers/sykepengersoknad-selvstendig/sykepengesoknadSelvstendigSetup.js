import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { onSubmitFail } from '../FeiloppsummeringContainer';
import { SYKEPENGER_SKJEMANAVN } from '../../utils/sykepengesoknadUtils';

const finnSoknad = (state, ownProps) => {
    const soknader = state.soknader.data.filter((s) => {
        return s.id === ownProps.params.sykepengesoknadId;
    });
    return soknader.length === 1 ? soknader[0] : undefined;
};

const finnSykmelding = (state, ownProps) => {
    const soknad = finnSoknad(state, ownProps);
    const sykmeldinger = state.dineSykmeldinger.data.filter((s) => {
        return s.id === soknad.sykmeldingId;
    });
    return sykmeldinger.length === 1 ? sykmeldinger[0] : undefined;
};

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: {},
        soknad: finnSoknad(state, ownProps),
        sykmelding: finnSykmelding(state, ownProps),
        ledetekster: state.ledetekster.data,
    };
};

const mapStateToPropsMedInitialValues = mapStateToProps;

export default (validate, Component, initialize = false) => {
    const form = reduxForm({
        form: SYKEPENGER_SKJEMANAVN,
        validate,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true,
        onSubmitFail: (errors, dispatch) => {
            onSubmitFail(errors, dispatch, SYKEPENGER_SKJEMANAVN);
        },
    })(Component);
    if (initialize) {
        return connect(mapStateToPropsMedInitialValues)(form);
    }
    return connect(mapStateToProps)(form);
};
