import React, { PropTypes } from 'react';
import Soknader from '../components/soknader/Soknader';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import { getLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { destroy } from 'redux-form';
import { bindActionCreators } from 'redux';
import { SYKEPENGER_SKJEMANAVN } from '../components/sykepengesoknad/setup';

export const SoknaderSide = ({ ledetekster, brodsmuler, henter, hentingFeilet, sykepengesoknader, actions }) => {
    actions.destroy(SYKEPENGER_SKJEMANAVN);
    return (
        <Side tittel={getLedetekst('soknader.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<Soknader ledetekster={ledetekster} soknader={sykepengesoknader} />);
                })()
            }
        </Side>
    );
};

SoknaderSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sykepengesoknader: PropTypes.array,
    actions: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ destroy }, dispatch),
    };
}

export function mapStateToProps(state) {
    const ledetekster = state.ledetekster.data;
    const sykepengesoknader = state.sykepengesoknader.data;

    return {
        ledetekster,
        sykepengesoknader,
        henter: state.ledetekster.henter || state.sykepengesoknader.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', ledetekster),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('soknader.sidetittel', ledetekster),
        }],
    };
}

const SoknaderContainer = connect(mapStateToProps, mapDispatchToProps)(SoknaderSide);

export default SoknaderContainer;
