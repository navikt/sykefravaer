import React, { PropTypes, Component } from 'react';
import Soknader from '../components/sykepengesoknader/Soknader';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import { getLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { destroy } from 'redux-form';
import { bindActionCreators } from 'redux';
import { SYKEPENGER_SKJEMANAVN } from '../components/sykepengesoknad/setup';
import { sykepengesoknad as sykepengesoknadPt, brodsmule as brodsmulePt } from '../propTypes';
import { hentSykepengesoknader } from '../actions/sykepengesoknader_actions';

export class SoknaderSide extends Component {
    componentWillMount() {
        if (!this.props.soknaderHentet) {
            this.props.actions.hentSykepengesoknader();
        }
    }

    render() {
        const { brodsmuler, henter, hentingFeilet, sykepengesoknader, actions } = this.props;
        actions.destroy(SYKEPENGER_SKJEMANAVN);
        return (
            <Side tittel={getLedetekst('soknader.sidetittel')} brodsmuler={brodsmuler}>
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
    actions: PropTypes.object.isRequired,
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
