import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NaermesteLedere from '../components/NaermesteLedere';
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
        return <NaermesteLedere ledere={ledere} />;
    }
}

Container.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ledere: PropTypes.array,
    hentLedere: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        ledere: state.ledere.data,
        henter: state.ledere.henter,
        hentingFeilet: state.ledere.hentingFeilet,
    };
}

const NaermesteLedereContainer = connect(mapStateToProps, actions)(Container);

export default NaermesteLedereContainer;
