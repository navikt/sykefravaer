import { connect } from 'react-redux';
import Serverfeilmelding from '../../components/landingsside/Serverfeilmelding';

const mapStateToProps = (state) => {
    const feilliste = [];
    Object.keys(state).forEach((reducer) => {
        if (state[reducer].hentingFeilet && (!Array.isArray(state[reducer].hentingFeilet) || state[reducer].hentingFeilet.length > 0)) {
            feilliste.push(reducer);
        }
    });
    return {
        feilliste,
        noeErFeil: feilliste.length > 0,
    };
};

const Container = connect(mapStateToProps)(Serverfeilmelding);

export default Container;
