import { connect } from 'react-redux';
import Serverfeilmelding from '../components/landingsside/Serverfeilmelding';

const mapStateToProps = (state) => {
    const feilliste = [];
    Object.keys(state).forEach((reducer) => {
        if (state[reducer].hentingFeilet) {
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
