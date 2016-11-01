import SideIkkeFunnet from '../components/SideIkkeFunnet';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster.data,
    };
}

const FeilContainer = connect(mapStateToProps)(SideIkkeFunnet);

export default FeilContainer;
