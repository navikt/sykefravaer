import { connect } from 'react-redux';
import { getGjenopptattArbeidFulltUtDato } from '../utils/sykepengesoknadUtils';
import { getSykepengesoknadSkjemanavn } from '../enums/skjemanavn';

export const mapStateToProps = (state, ownProps) => {
    const values = state.form[getSykepengesoknadSkjemanavn(ownProps.sykepengesoknad.id)].values;
    const gjenopptattArbeidFulltUtDato = getGjenopptattArbeidFulltUtDato(values);
    return {
        gjenopptattArbeidFulltUtDato,
    };
};

const connectGjenopptattArbeidFulltUtDato = (component) => {
    return connect(mapStateToProps)(component);
};

export default connectGjenopptattArbeidFulltUtDato;
