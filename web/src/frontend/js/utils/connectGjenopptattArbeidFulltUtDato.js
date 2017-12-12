import { connect } from 'react-redux';
import { SYKEPENGER_SKJEMANAVN } from '../components/sykepengesoknad/setup';
import { fraInputdatoTilJSDato, erGyldigDatoformat } from './datoUtils';

export const getGjenopptattArbeidFulltUtDato = (skjemasoknad) => {
    let gjenopptattArbeidFulltUtDato = skjemasoknad.gjenopptattArbeidFulltUtDato;
    if (!skjemasoknad.harGjenopptattArbeidFulltUt || !gjenopptattArbeidFulltUtDato || !erGyldigDatoformat(gjenopptattArbeidFulltUtDato)) {
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
    return gjenopptattArbeidFulltUtDato;
};

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
