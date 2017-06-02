import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NaermesteLedere from '../components/landingsside/NaermesteLedere';
import * as actions from '../actions/ledere_actions';
import { naermesteLeder as naermesteLederPt } from '../propTypes';

export class Container extends Component {
    componentWillMount() {
        const { hentLedere, forsoktHentet } = this.props;
        if (!forsoktHentet) {
            hentLedere();
        }
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
    ledere: PropTypes.arrayOf(naermesteLederPt),
    hentLedere: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        ledere: state.ledere.data,
        henter: state.ledere.henter,
        hentingFeilet: state.ledere.hentingFeilet,
        forsoktHentet: state.ledere.hentet === true,
    };
}

const NaermesteLedereContainer = connect(mapStateToProps, actions)(Container);

export default NaermesteLedereContainer;
