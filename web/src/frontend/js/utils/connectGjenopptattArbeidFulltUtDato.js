import { connect } from 'react-redux';
import { SYKEPENGER_SKJEMANAVN } from '../components/sykepengesoknad/setup';
import { fraInputdatoTilJSDato } from './index';

export const mapStateToProps = (state) => {
    const values = state.form[SYKEPENGER_SKJEMANAVN].values;
    let gjenopptattArbeidFulltUtDato = values.gjenopptattArbeidFulltUtDato;
    if (!values.harGjenopptattArbeidFulltUt) {
        gjenopptattArbeidFulltUtDato = null;
    } else {
        try {
            gjenopptattArbeidFulltUtDato = fraInputdatoTilJSDato(gjenopptattArbeidFulltUtDato);
        } catch (e) {
            gjenopptattArbeidFulltUtDato = null;
        }
        if (gjenopptattArbeidFulltUtDato && isNaN(gjenopptattArbeidFulltUtDato.getTime())) {
            gjenopptattArbeidFulltUtDato = null;
        }
    }
    return {
        gjenopptattArbeidFulltUtDato,
    };
};

const connectGjenopptattArbeidFulltUtDato = (component) => {
    return connect(mapStateToProps)(component);
};

export default connectGjenopptattArbeidFulltUtDato;
