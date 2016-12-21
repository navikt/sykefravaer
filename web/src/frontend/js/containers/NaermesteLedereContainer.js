import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Naermesteledere from '../components/Naermesteledere';
import * as actions from '../actions/ledere_actions';

export class Container extends Component {
    componentWillMount() {
        const { hentLedere } = this.props;
        hentLedere();
    }
    
    render() {
        const { henter, ledere, hentingFeilet } = this.props;
        if (henter || !ledere || ledere.length === 0 || hentingFeilet) {
            return null;
        }
        return <Naermesteledere ledere={ledere} />;        
    }
}

Container.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ledere: PropTypes.array,
};

export function mapStateToProps(state) {
    return {
        ledere: state.ledere.data,
        henter: state.ledere.henter,
        hentingFeilet: state.ledere.hentingFeilet,
    };
}

const NaermesteLedereContainer = connect(mapStateToProps)(Container);

export default NaermesteLedereContainer;
