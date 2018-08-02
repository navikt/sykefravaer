import { connect } from 'react-redux';
import GjenapneSoknad from '../../components/sykepengesoknad-arbeidstaker/GjenapneSoknad';
import { gjenapneSoknad } from '../../actions/sykepengesoknader_actions';

export const mapStateToProps = (state, ownProps) => {
    const sykepengesoknad = ownProps.sykepengesoknad;
    const ETT_AAR_SIDEN = new Date();
    ETT_AAR_SIDEN.setYear(ETT_AAR_SIDEN.getFullYear() - 1);
    const vis = sykepengesoknad.opprettetDato >= ETT_AAR_SIDEN;
    return {
        vis,
        gjenapner: state.sykepengesoknader.gjenapner,
        gjenapneFeilet: state.sykepengesoknader.gjenapneFeilet,
    };
};

const GjenapneSoknadContainer = connect(mapStateToProps, { gjenapneSoknad })(GjenapneSoknad);

export default GjenapneSoknadContainer;
