import React, { Component, PropTypes } from 'react';
import Landingsside from '../components/landingsside/Landingsside';
import { connect } from 'react-redux';
import StrippetSide from '../sider/StrippetSide';
import Side from '../sider/Side';
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
        this.props.hentMote();
        this.props.hentToggles();
        if (!this.props.sykepengesoknaderHentet) {
            this.props.hentSykepengesoknader();
        }
        if (!this.props.ledereHentet) {
            this.props.hentLedere();
        }
        if (!this.props.dineSykmeldingerHentet) {
            this.props.hentDineSykmeldinger();
        }
    }

    render() {
        const {
            brodsmuler,
            skjulVarsel,
            henter,
            hentingFeilet,
            sykepengesoknader,
            harDialogmote,
            dineSykmeldinger,
            toggles,
        } = this.props;

        if (henter || hentingFeilet) {
            return (<Side tittel={getLedetekst('landingsside.sidetittel')} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    return <Feilmelding />;
                })()
            }
            </Side>);
        }
        return (<StrippetSide tittel={getLedetekst('landingsside.sidetittel')}>
            <Landingsside
                brodsmuler={brodsmuler}
                skjulVarsel={skjulVarsel}
                sykepengesoknader={sykepengesoknader}
                toggles={toggles}
                harDialogmote={harDialogmote}
                dineSykmeldinger={dineSykmeldinger}
            />
        </StrippetSide>);
    }
}

LandingssideSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    skjulVarsel: PropTypes.bool,
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
};

export function mapStateToProps(state) {
    return {
        henter: state.ledetekster.henter || state.sykepengesoknader.henter || state.dineSykmeldinger.henter || state.toggles.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.sykepengesoknader.hentingFeilet,
        skjulVarsel: (state.brukerinfo && state.brukerinfo.innstillinger) ? (state.brukerinfo.innstillinger.skjulUnderUtviklingVarsel === true) : false,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
        }],
        sykepengesoknader: state.sykepengesoknader.data,
        sykepengesoknaderHentet: state.sykepengesoknader.hentet === true,
        ledereHentet: state.ledere.hentet === true,
        toggles: state.toggles.data,
        harDialogmote: state.mote.data !== null,
        dineSykmeldinger: state.dineSykmeldinger.data,
        dineSykmeldingerHentet: state.dineSykmeldinger.hentet === true,
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
