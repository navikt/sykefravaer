import { connect } from 'react-redux';
import VelgArbeidssituasjon from './VelgArbeidssituasjon';

export const mapStateToProps = (state) => {
    const arbeidsgivere = state.arbeidsgivere.data;

    return {
        arbeidsgivere,
        henter: state.arbeidsgivere.henter,
    };
};

const VelgArbeidssituasjonContainer = connect(mapStateToProps)(VelgArbeidssituasjon);

export default VelgArbeidssituasjonContainer;
