import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Side from '../../sider/Side';
import * as soknadActions from '../../actions/sykepengesoknader_actions';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { SYKEPENGER_SKJEMANAVN } from '../../components/sykepengesoknad/setup';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

export const GenerellSoknad = (props) => {
    const { Component, brodsmuler, sykepengesoknad, henter, hentingFeilet } = props;
    return (<Side tittel="Søknad om sykepenger" brodsmuler={brodsmuler}>
    {
        (() => {
            if (henter) {
                return <AppSpinner />;
            }
            if (hentingFeilet) {
                return <Feilmelding />;
            }
            if (sykepengesoknad === undefined) {
                return (<Feilmelding
                    tittel="Beklager, vi finner ikke søknaden du ser etter"
                    melding="Er du sikker på at du er på riktig adresse?" />);
            }
            return <Component {...props} />;
        })()
    }
    </Side>);
};

GenerellSoknad.propTypes = {
    brodsmuler: PropTypes.array,
    sykepengesoknad: sykepengesoknadPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ledetekster: PropTypes.object,
    Component: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(soknadActions, dispatch),
    };
}

export const mapStateToProps = (state, ownProps) => {
    const skjemasoknad = state.form && state.form[SYKEPENGER_SKJEMANAVN] ? state.form[SYKEPENGER_SKJEMANAVN].values : undefined;
    return {
        sykepengesoknad: state.sykepengesoknader.data.filter((soknad) => {
            return soknad.id === ownProps.params.sykepengesoknadId;
        })[0],
        henter: state.sykepengesoknader.henter || state.ledetekster.henter,
        hentingFeilet: state.sykepengesoknader.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        ledetekster: state.ledetekster.data,
        skjemasoknad,
        sender: state.sykepengesoknader.sender,
        sendingFeilet: state.sykepengesoknader.sendingFeilet,
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(GenerellSoknad);

export default Container;
