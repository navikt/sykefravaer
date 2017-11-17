import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sykepengesoknad as sykepengesoknadPt } from 'digisyfo-npm';
import Sykepengesoknadstatus from '../../components/sykmelding/Sykepengesoknadstatus';
import AppSpinner from '../../components/AppSpinner';
import * as actions from '../../actions/sykepengesoknader_actions';

export class Container extends Component {
    componentDidMount() {
        const { skalHenteSykepengesoknader, hentSykepengesoknader } = this.props;
        if (skalHenteSykepengesoknader) {
            hentSykepengesoknader();
        }
    }

    render() {
        const { sykepengesoknader, henter } = this.props;

        if (henter) {
            return <AppSpinner />;
        }

        return <Sykepengesoknadstatus sykepengesoknader={sykepengesoknader} />;
    }
}

Container.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    henter: PropTypes.bool,
    skalHenteSykepengesoknader: PropTypes.bool,
    hentSykepengesoknader: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    const skalHenteSykepengesoknader = !state.sykepengesoknader.hentet && !state.sykepengesoknader.henter;
    const sykepengesoknader = state.sykepengesoknader.data.filter((s) => {
        return s.sykmeldingId === ownProps.sykmeldingId;
    });
    const henter = !state.sykepengesoknader.hentet || state.sykepengesoknader.henter;

    return {
        henter,
        skalHenteSykepengesoknader,
        sykepengesoknader,
    };
};

const SykepengesoknadstatusContainer = connect(mapStateToProps, {
    hentSykepengesoknader: actions.hentSykepengesoknader,
})(Container);

export default SykepengesoknadstatusContainer;
