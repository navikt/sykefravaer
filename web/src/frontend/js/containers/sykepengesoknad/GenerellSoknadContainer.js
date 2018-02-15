import React, { Component as Komponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Side from '../../sider/Side';
import * as soknadActions from '../../actions/sykepengesoknader_actions';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { SYKEPENGER_SKJEMANAVN } from '../../components/sykepengesoknad/setup';
import { sykepengesoknad as sykepengesoknadPt, brodsmule as brodsmulePt } from '../../propTypes';

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
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    sykepengesoknad: sykepengesoknadPt,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    Component: PropTypes.func.isRequired,
    sykepengesoknaderHentet: PropTypes.bool,
    actions: PropTypes.shape({
        hentSykepengesoknader: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(soknadActions, dispatch),
    };
}

const dekorerSkjemasoknad = (skjemasoknad, sykepengesoknad) => {
    if (!skjemasoknad) {
        return skjemasoknad;
    }
    let s = { ...skjemasoknad };
    if (skjemasoknad && sykepengesoknad.forrigeSykeforloepTom) {
        s = {
            ...skjemasoknad,
            forrigeSykeforloepTom: sykepengesoknad.forrigeSykeforloepTom,
        };
    }
    return s;
};

export const mapStateToProps = (state, ownProps) => {
    const sykepengesoknad = state.sykepengesoknader.data.filter((soknad) => {
        return soknad.id === ownProps.params.sykepengesoknadId;
    })[0];
    let skjemasoknad = state.form && state.form[SYKEPENGER_SKJEMANAVN] ? state.form[SYKEPENGER_SKJEMANAVN].values : undefined;

    skjemasoknad = dekorerSkjemasoknad(skjemasoknad, sykepengesoknad);

    return {
        sykepengesoknad,
        henter: state.sykepengesoknader.henter || state.ledetekster.henter,
        hentingFeilet: state.sykepengesoknader.hentingFeilet || state.sykepengesoknader.hentingFeilet || state.sykepengesoknader.henterBerikelseFeilet,
        sykepengesoknaderHentet: state.sykepengesoknader.hentet === true,
        skjemasoknad,
        sender: state.sykepengesoknader.sender,
        sendingFeilet: state.sykepengesoknader.sendingFeilet,
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(GenerellSoknad);

export default Container;
