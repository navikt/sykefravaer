import { connect } from 'react-redux';
import GjenapneSoknad from '../../components/sykepengesoknad-felles/GjenapneSoknad';
import { gjenapneSoknad } from '../../actions/sykepengesoknader_actions';

export const soknadKanGjenapnes = (opprettetDato) => {
    const ETT_AAR_SIDEN = new Date();
    ETT_AAR_SIDEN.setYear(ETT_AAR_SIDEN.getFullYear() - 1);
    return opprettetDato >= ETT_AAR_SIDEN;
};

export const mapStateToProps = (state, ownProps) => {
    const sykepengesoknad = ownProps.sykepengesoknad;

    return {
        vis: soknadKanGjenapnes(sykepengesoknad.opprettetDato),
        gjenapner: state.sykepengesoknader.gjenapner,
        gjenapneFeilet: state.sykepengesoknader.gjenapneFeilet,
    };
};

const GjenapneSoknadContainer = connect(mapStateToProps, { gjenapneSoknad })(GjenapneSoknad);

export default GjenapneSoknadContainer;
