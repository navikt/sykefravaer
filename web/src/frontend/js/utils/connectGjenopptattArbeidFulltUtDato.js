import { connect } from 'react-redux';
import { getGjenopptattArbeidFulltUtDato, SYKEPENGER_SKJEMANAVN } from '../utils/sykepengesoknadUtils';

export const mapStateToProps = (state) => {
    const values = state.form[SYKEPENGER_SKJEMANAVN].values;
    const gjenopptattArbeidFulltUtDato = getGjenopptattArbeidFulltUtDato(values);
    return {
        gjenopptattArbeidFulltUtDato,
    };
};

const connectGjenopptattArbeidFulltUtDato = (component) => {
    return connect(mapStateToProps)(component);
};

export default connectGjenopptattArbeidFulltUtDato;
