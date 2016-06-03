import { connect } from 'react-redux';
import * as actionCreators from '../actions/dinSykmelding_actions.js';
import DinSykmeldingBrukerInput from '../components/DinSykmeldingBrukerInput.js';

function mapStateToProps(state, ownProps) {
    return {
        sykmelding: ownProps.sykmelding,
        arbeidssituasjoner: ownProps.arbeidssituasjoner,
        ledetekster: state.ledetekster,
    };
}

const DinSykmeldingBrukerInputContainer = connect(mapStateToProps, actionCreators)(DinSykmeldingBrukerInput);

export default DinSykmeldingBrukerInputContainer;

