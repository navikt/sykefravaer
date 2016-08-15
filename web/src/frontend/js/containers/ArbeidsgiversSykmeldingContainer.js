import { connect } from 'react-redux';
import { getSykmelding } from '../utils';
import ArbeidsgiversSykmelding from '../components/sykmelding/ArbeidsgiversSykmelding';

export const mapStateToProps = (state, ownProps) => {
    let sykmelding;

    if (ownProps.sykmeldingId) {
        const _sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, ownProps.sykmeldingId);
        if (_sykmelding) {
            sykmelding = _sykmelding;
        }
    }

    return {
        sykmelding,
        ledetekster: state.ledetekster.data,
        Overskrift: ownProps.Overskrift,
    };
};

const ArbeidsgiversSykmeldingContainer = connect(mapStateToProps)(ArbeidsgiversSykmelding);

export default ArbeidsgiversSykmeldingContainer;
