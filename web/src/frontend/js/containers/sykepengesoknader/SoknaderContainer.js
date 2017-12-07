import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import { destroy } from 'redux-form';
import { bindActionCreators } from 'redux';
import Soknader from '../../components/sykepengesoknader/Soknader';
import Side from '../../sider/Side';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { sykepengesoknad as sykepengesoknadPt, brodsmule as brodsmulePt } from '../../propTypes';
import { hentSykepengesoknader } from '../../actions/sykepengesoknader_actions';

export class SoknaderSide extends Component {
    componentWillMount() {
        if (!this.props.soknaderHentet) {
            this.props.actions.hentSykepengesoknader();
        }
    }

    render() {
        const { brodsmuler, henter, hentingFeilet, sykepengesoknader, soknaderHentet } = this.props;

        return (
            <Side tittel={getLedetekst('soknader.sidetittel')} brodsmuler={brodsmuler} laster={henter || !soknaderHentet}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        }
                        if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        return (<Soknader soknader={sykepengesoknader} />);
                    })()
                }
            </Side>
        );
    }
}

SoknaderSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    actions: PropTypes.shape({
        destroy: PropTypes.func,
        hentSykepengesoknader: PropTypes.func,
    }),
    soknaderHentet: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ destroy, hentSykepengesoknader }, dispatch),
    };
}

export function mapStateToProps(state) {
    const sykepengesoknader = state.sykepengesoknader.data;

    return {
        sykepengesoknader,
        soknaderHentet: state.sykepengesoknader.hentet === true,
        henter: state.ledetekster.henter || state.sykepengesoknader.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('soknader.sidetittel'),
        }],
    };
}

const SoknaderContainer = connect(mapStateToProps, mapDispatchToProps)(SoknaderSide);

export default SoknaderContainer;
