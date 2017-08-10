import { connect } from 'react-redux';
import AvbruttSoknad from '../../components/sykepengesoknad/AvbruttSoknad';
import { gjenapneSoknad } from '../../actions/sykepengesoknader_actions';

const mapStateToProps = (state) => {
    return {
        gjenapner: state.sykepengesoknader.gjenapner,
        gjenapneFeilet: state.sykepengesoknader.gjenapneFeilet,
    };
};

const AvbruttSoknadContainer = connect(mapStateToProps, { gjenapneSoknad })(AvbruttSoknad);

export default AvbruttSoknadContainer;
