import { connect } from 'react-redux';
import * as actionCreators from '../actions/dinSykmelding_actions';
import VelgArbeidssituasjon from '../components/sykmelding/VelgArbeidssituasjon';
import arbeidssituasjoner from '../arbeidssituasjonData';
import { getSykmelding } from '../utils';

export function mapStateToProps(state, ownProps) {
    const sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, ownProps.sykmeldingId);
    return {
        ledetekster: state.ledetekster,
        arbeidssituasjoner,
        sykmelding,
    };
}

const VelgArbeidssituasjonContainer = connect(mapStateToProps, actionCreators)(VelgArbeidssituasjon);

export default VelgArbeidssituasjonContainer;
