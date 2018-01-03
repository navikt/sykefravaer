import { connect } from 'react-redux';
import { getGjenopptattArbeidFulltUtDato } from 'digisyfo-npm';
import { SYKEPENGER_SKJEMANAVN } from '../components/sykepengesoknad/setup';

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
