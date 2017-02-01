import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../../sider/Side';
import * as soknadActions from '../../actions/sykepengesoknader_actions';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';

export const GenerellSoknad = (props) => {
    const { Component, brodsmuler, sykepengesoknad, henter, hentingFeilet, ledetekster } = props;
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
    sykepengesoknad: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ledetekster: PropTypes.object,
    Component: PropTypes.object,
};

export const mapStateToProps = (state, ownProps) => {
    return {
        sykepengesoknad: state.sykepengesoknader.data.filter((soknad) => {
            return soknad.id === ownProps.params.sykepengesoknadId;
        })[0],
        henter: state.sykepengesoknader.henter || state.ledetekster.henter,
        hentingFeilet: state.sykepengesoknader.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        ledetekster: state.ledetekster.data,
    };
};

const Container = connect(mapStateToProps, {
    actions: soknadActions
})(GenerellSoknad);

export default Container;
