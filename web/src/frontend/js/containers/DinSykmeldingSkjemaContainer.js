import { connect } from 'react-redux';
import { getSykmelding } from '../utils';
import * as actionCreators from '../actions/dinSykmelding_actions';
import DinSykmeldingSkjema from '../components/sykmelding/DinSykmeldingSkjema';

export const mapStateToProps = (state, ownProps) => {
    let sykmelding = {};
    if (ownProps.sykmeldingId) {
        const _sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, ownProps.sykmeldingId);
        if (_sykmelding) {
            sykmelding = _sykmelding;
        }
    }

    return {
        sykmelding,
        ledetekster: state.ledetekster.data,
        sender: state.arbeidsgiversSykmeldinger.sender,
    };
};

const DinSykmeldingSkjemaContainer = connect(mapStateToProps, actionCreators)(DinSykmeldingSkjema);

export default DinSykmeldingSkjemaContainer;
