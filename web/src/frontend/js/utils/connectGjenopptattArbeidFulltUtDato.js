import { connect } from 'react-redux';
import { getGjenopptattArbeidFulltUtDato } from '../utils/sykepengesoknadUtils';
import { SYKEPENGER_SKJEMANAVN } from '../enums/skjemanavn';

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
