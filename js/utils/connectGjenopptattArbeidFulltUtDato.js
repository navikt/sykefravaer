import { connect } from 'react-redux';
import { getGjenopptattArbeidFulltUtDato } from '../utils/sykepengesoknadUtils';
import { getSoknadSkjemanavn } from '../enums/skjemanavn';

export const mapStateToProps = (state, ownProps) => {
    const values = state.form[getSoknadSkjemanavn(ownProps.sykepengesoknad.id)].values;
    const gjenopptattArbeidFulltUtDato = getGjenopptattArbeidFulltUtDato(values);
    return {
        gjenopptattArbeidFulltUtDato,
    };
};

const connectGjenopptattArbeidFulltUtDato = (component) => {
    return connect(mapStateToProps)(component);
};

export default connectGjenopptattArbeidFulltUtDato;
