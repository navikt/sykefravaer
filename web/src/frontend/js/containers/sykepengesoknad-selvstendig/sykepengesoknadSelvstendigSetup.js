import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { onSubmitFail } from '../FeiloppsummeringContainer';
import { sendSoknad } from '../../actions/soknader_actions';
import { getSykepengesoknadSelvstendigSkjemanavn } from '../../enums/skjemanavn';

export const finnSoknad = (state, ownProps) => {
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
    const soknad = finnSoknad(state, ownProps);
    return {
        soknad,
        sykmelding: finnSykmelding(state, ownProps),
        skjemasvar: getFormValues(getSykepengesoknadSelvstendigSkjemanavn(ownProps.params.sykepengesoknadId))(state),
        sender: state.soknader.sender,
        sendingFeilet: state.soknader.sendingFeilet,
        key: soknad.id,
        form: getSykepengesoknadSelvstendigSkjemanavn(soknad.id),
    };
};

const mapStateToPropsMedInitialValues = (state, ownProps) => {
    const soknad = finnSoknad(state, ownProps);

    return {
        initialValues: {
            id: soknad.id,
        },
        ...mapStateToProps(state, ownProps),
    };
};

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators({
        sendSoknad,
    }, dispatch);

    return {
        actions,
    };
};

export default (validate, Component, initialize = false) => {
    const connected = initialize
        ? connect(mapStateToPropsMedInitialValues)
        : connect(mapStateToProps, mapDispatchToProps);

    return compose(
        connected,
        reduxForm({
            validate,
            destroyOnUnmount: false,
            forceUnregisterOnUnmount: true,
            onSubmitFail: (errors, dispatch, submitError, props) => {
                onSubmitFail(errors, dispatch, getSykepengesoknadSelvstendigSkjemanavn(props.soknad.id));
            },
        }),
    )(Component);
};
