import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sykepengesoknad as sykepengesoknadPt } from '@navikt/digisyfo-npm';
import SykmeldingSoknadsinfo from '../soknadsinfo/SykmeldingSoknadsinfo';
import * as sykepengesoknaderActions from '../../sykepengesoknad/data/sykepengesoknader/sykepengesoknader_actions';
import { skalHenteSykepengesoknader as skalHenteSykepengesoknaderSelector } from '../../sykepengesoknad/data/sykepengesoknader/sykepengesoknaderSelectors';

export class Container extends Component {
    componentDidMount() {
        const {
            skalHenteSykepengesoknader,
            hentSykepengesoknader,
        } = this.props;
        if (skalHenteSykepengesoknader) {
            hentSykepengesoknader();
        }
    }

    render() {
        const { sykepengesoknader, henter } = this.props;

        return henter
            ? null
            : <SykmeldingSoknadsinfo sykepengesoknader={sykepengesoknader} />;
    }
}

Container.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    henter: PropTypes.bool,
    skalHenteSykepengesoknader: PropTypes.bool,
    hentSykepengesoknader: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    const sykepengesoknader = state.sykepengesoknader.data
        .filter((soknad) => {
            return !soknad.korrigerer
                && soknad.sykmeldingId === ownProps.sykmelding.id;
        });
    const henter = !state.sykepengesoknader.hentet || state.sykepengesoknader.henter;

    return {
        henter,
        skalHenteSykepengesoknader: skalHenteSykepengesoknaderSelector(state),
        sykepengesoknader,
    };
};

const SendtSykmeldingSoknadstatusContainer = connect(mapStateToProps, {
    hentSykepengesoknader: sykepengesoknaderActions.hentSykepengesoknader,
})(Container);

export default SendtSykmeldingSoknadstatusContainer;
