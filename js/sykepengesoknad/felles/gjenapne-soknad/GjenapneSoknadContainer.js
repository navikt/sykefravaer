import { connect } from 'react-redux';
import GjenapneSoknad from '../../../components/soknad-felles/GjenapneSoknad';
import { soknadKanGjenapnes } from '../../../containers/sykepengesoknad-arbeidstaker/GjenapneSoknadContainer';
import { gjenapneSoknad } from '../../../actions/soknader_actions';

const mapStateToProps = (state, ownProps) => {
    return {
        gjenapner: state.soknader.gjenapner,
        gjenapneFeilet: state.soknader.gjenapneFeilet,
        vis: soknadKanGjenapnes(ownProps.sykepengesoknad.opprettetDato),
    };
};

export default connect(mapStateToProps, { gjenapneSoknad })(GjenapneSoknad);
