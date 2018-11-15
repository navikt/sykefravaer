import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { onSubmitFail } from '../../containers/skjema/FeiloppsummeringContainer';
import { sendSoknad } from '../../actions/soknader_actions';
import { getSoknadSkjemanavn } from '../../enums/skjemanavn';
import { erForsteSoknad } from '../../selectors/soknaderSelectors';
import { utfyllingStartet } from '../../actions/metrikker_actions';
import fraBackendsoknadTilInitiellSoknad from './fraBackendsoknadTilInitiellSoknad';

export const finnSoknad = (state, ownProps) => {
    const soknader = state.soknader.data.filter((s) => {
        return s.id === ownProps.params.sykepengesoknadId;
    });
    return soknader.length === 1 ? soknader[0] : undefined;
};

export const finnSykmelding = (state, ownProps) => {
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
        soknadMeta: state.soknadMeta[soknad.id] || {},
        sykmelding: finnSykmelding(state, ownProps),
        skjemasvar: getFormValues(getSoknadSkjemanavn(ownProps.params.sykepengesoknadId))(state),
        sender: state.soknader.sender,
        sendingFeilet: state.soknader.sendingFeilet,
        key: soknad.id,
        form: getSoknadSkjemanavn(soknad.id),
    };
};

const mapStateToPropsMedInitialValues = (state, ownProps) => {
    const soknad = finnSoknad(state, ownProps);
    return {
        initialValues: fraBackendsoknadTilInitiellSoknad(soknad),
        erForsteSoknad: erForsteSoknad(state),
        ...mapStateToProps(state, ownProps),
    };
};

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators({
        sendSoknad,
        utfyllingStartet,
    }, dispatch);

    return {
        actions,
    };
};

export default (validate, Component, initialize = false) => {
    const connected = initialize
        ? connect(mapStateToPropsMedInitialValues, mapDispatchToProps)
        : connect(mapStateToProps, mapDispatchToProps);

    return compose(
        connected,
        reduxForm({
            validate,
            destroyOnUnmount: false,
            forceUnregisterOnUnmount: true,
            onSubmitFail: (errors, dispatch, submitError, props) => {
                onSubmitFail(errors, dispatch, getSoknadSkjemanavn(props.soknad.id));
            },
        }),
    )(Component);
};
