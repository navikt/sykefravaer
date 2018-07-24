import { connect } from 'react-redux';
import GjenapneSoknad from '../../components/sykepengesoknad-arbeidstaker/GjenapneSoknad';
import { gjenapneSoknad } from '../../actions/sykepengesoknader_actions';

const mapStateToProps = (state) => {
    return {
        gjenapner: state.sykepengesoknader.gjenapner,
        gjenapneFeilet: state.sykepengesoknader.gjenapneFeilet,
    };
};

const GjenapneSoknadContainer = connect(mapStateToProps, { gjenapneSoknad })(GjenapneSoknad);

export default GjenapneSoknadContainer;
