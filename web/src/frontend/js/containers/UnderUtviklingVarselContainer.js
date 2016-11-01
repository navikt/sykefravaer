import { connect } from 'react-redux';
import * as actionCreators from '../actions/brukerinfo_actions.js';
import UnderUtviklingVarsel from '../components/UnderUtviklingVarsel';

function mapStateToProps() {
    return {};
}

const UnderUtviklingVarselContainer = connect(mapStateToProps, actionCreators)(UnderUtviklingVarsel);

export default UnderUtviklingVarselContainer;
