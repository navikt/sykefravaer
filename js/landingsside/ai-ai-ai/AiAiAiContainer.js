import { connect } from 'react-redux';
import { log } from '../../digisyfoNpm';
import AiAiAiFeilmelding from './AiAiAiFeilmelding';

const mapStateToProps = (state) => {
    const feilliste = [];
    Object.keys(state).forEach((reducer) => {
        if (
            state[reducer].hentingFeilet
                && reducer !== 'unleashToggles'
                && (
                    !Array.isArray(state[reducer].hentingFeilet)
                    || state[reducer].hentingFeilet.length > 0)
        ) {
            feilliste.push(reducer);
        }
    });
    const noeErFeil = feilliste.length > 0;

    if (noeErFeil) {
        log(`Det er feil i følgende reducere: ${feilliste.join(', ')}`);
    }

    return {
        feilliste,
        noeErFeil,
    };
};

const Container = connect(mapStateToProps)(AiAiAiFeilmelding);

export default Container;
