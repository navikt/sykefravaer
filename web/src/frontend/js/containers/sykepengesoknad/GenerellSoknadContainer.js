import React, { PropTypes, Component as Komponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Side from '../../sider/Side';
import * as soknadActions from '../../actions/sykepengesoknader_actions';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { SYKEPENGER_SKJEMANAVN } from '../../components/sykepengesoknad/setup';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

export class GenerellSoknad extends Komponent {
    componentWillMount() {
        if (!this.props.sykepengesoknaderHentet) {
            this.props.actions.hentSykepengesoknader();
        }
    }

    render() {
        const { Component, brodsmuler, sykepengesoknad, henter, hentingFeilet, sykepengesoknaderHentet } = this.props;
        return (<Side tittel="Søknad om sykepenger" brodsmuler={brodsmuler} laster={henter || !sykepengesoknaderHentet}>
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
                return <Component {...this.props} />;
            })()
        }
        </Side>);
    }
}

GenerellSoknad.propTypes = {
    brodsmuler: PropTypes.array,
    sykepengesoknad: sykepengesoknadPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    Component: PropTypes.func.isRequired,
    sykepengesoknaderHentet: PropTypes.bool,
    actions: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(soknadActions, dispatch),
    };
}

export const mapStateToProps = (state, ownProps) => {
    const sykepengesoknad = state.sykepengesoknader.data.filter((soknad) => {
        return soknad.id === ownProps.params.sykepengesoknadId;
    })[0];
    let skjemasoknad = state.form && state.form[SYKEPENGER_SKJEMANAVN] ? state.form[SYKEPENGER_SKJEMANAVN].values : undefined;
    if (skjemasoknad && sykepengesoknad.forrigeSykeforloepTom) {
        skjemasoknad = Object.assign({}, skjemasoknad, {
            forrigeSykeforloepTom: sykepengesoknad.forrigeSykeforloepTom,
        });
    }
    return {
        sykepengesoknad,
        henter: state.sykepengesoknader.henter || state.ledetekster.henter,
        hentingFeilet: state.sykepengesoknader.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        sykepengesoknaderHentet: state.sykepengesoknader.hentet === true,
        skjemasoknad,
        sender: state.sykepengesoknader.sender,
        sendingFeilet: state.sykepengesoknader.sendingFeilet,
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(GenerellSoknad);

export default Container;
