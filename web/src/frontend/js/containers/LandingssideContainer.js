import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Landingsside from '../components/landingsside/Landingsside';
import { connect } from 'react-redux';
import StrippetSide from '../sider/StrippetSide';
import { getLedetekst, hentToggles } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { brodsmule as brodsmulePt, sykepengesoknad as sykepengesoknadPt } from '../propTypes';
import { proptypes as motePropTypes } from 'moter-npm';
import { moteActions } from 'moter-npm';
import { hentSykepengesoknader } from '../actions/sykepengesoknader_actions';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { hentLedere } from '../actions/ledere_actions';

export class LandingssideSide extends Component {
    componentWillMount() {
        const { mote, ledere, dineSykmeldinger, toggles, sykepengesoknader } = this.props.hentet;
        if (!mote) {
            this.props.hentMote();
        }
        if (!toggles) {
            this.props.hentToggles();
        }
        if (!sykepengesoknader && !this.props.hentingFeiletSykepengesoknader) {
            this.props.hentSykepengesoknader();
        }
        if (!ledere && !this.props.hentingFeiletLedere) {
            this.props.hentLedere();
        }
        if (!dineSykmeldinger && !this.props.hentingFeiletSykmeldinger) {
            this.props.hentDineSykmeldinger();
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
            sykepengesoknader,
            harDialogmote,
            dineSykmeldinger,
            toggles,
            altHentet,
        } = this.props;
        return (<StrippetSide tittel={getLedetekst('landingsside.sidetittel')} laster={henter || !altHentet}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<Landingsside
                        brodsmuler={brodsmuler}
                        sykepengesoknader={sykepengesoknader}
                        toggles={toggles}
                        harDialogmote={harDialogmote}
                        dineSykmeldinger={dineSykmeldinger}
                    />);
                })()
            }
        </StrippetSide>);
    }
}

LandingssideSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    henter: PropTypes.bool,
    toggles: PropTypes.object,
    hentingFeilet: PropTypes.bool,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    dialogmoter: PropTypes.arrayOf(motePropTypes.mote),
    harDialogmote: PropTypes.bool,
    hentMote: PropTypes.func,
    hentToggles: PropTypes.func,
    sykepengesoknaderHentet: PropTypes.bool,
    ledereHentet: PropTypes.bool,
    hentLedere: PropTypes.func,
    hentSykepengesoknader: PropTypes.func,
    dineSykmeldinger: PropTypes.array,
    dineSykmeldingerHentet: PropTypes.bool,
    hentDineSykmeldinger: PropTypes.func,
    hentingFeiletSykepengesoknader: PropTypes.bool,
    hentingFeiletSykmeldinger: PropTypes.bool,
    hentingFeiletLedere: PropTypes.bool,
    hentet: PropTypes.object,
    altHentet: PropTypes.bool,
};

export function mapStateToProps(state) {
    const hentet = {
        ledere: state.ledere.hentet === true,
        mote: state.mote.hentet === true,
        dineSykmeldinger: state.dineSykmeldinger.hentet === true,
        toggles: state.toggles.hentet === true,
        sykepengesoknader: state.sykepengesoknader.hentet === true,
    };
    const altHentet = (() => {
        for (const i in hentet) {
            if (!hentet[i]) {
                return false;
            }
        }
        return true;
    })();

    return {
        henter: state.ledetekster.henter || state.sykepengesoknader.henter || state.dineSykmeldinger.henter || state.toggles.henter || state.mote.henter || state.hendelser.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
        }],
        sykepengesoknader: state.sykepengesoknader.data,
        toggles: state.toggles.data,
        harDialogmote: state.mote.data !== null,
        dineSykmeldinger: state.dineSykmeldinger.data,
        hentingFeiletSykepengesoknader: state.sykepengesoknader.hentingFeilet,
        hentingFeiletSykmeldinger: state.dineSykmeldinger.hentingFeilet,
        hentingFeiletLedere: state.ledere.hentingFeilet,
        hentet,
        altHentet,
    };
}

const LandingssideContainer = connect(mapStateToProps, {
    hentMote: moteActions.hentMote,
    hentSykepengesoknader,
    hentLedere,
    hentToggles,
    hentDineSykmeldinger,
})(LandingssideSide);

export default LandingssideContainer;
