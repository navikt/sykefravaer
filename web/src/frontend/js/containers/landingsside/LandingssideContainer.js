import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { moteActions } from 'moter-npm';
import { connect } from 'react-redux';
import { getLedetekst, hentToggles, keyValue } from 'digisyfo-npm';
import Landingsside from '../../components/landingsside/Landingsside';
import StrippetSide from '../../sider/StrippetSide';
import Side from '../../sider/Side';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { brodsmule as brodsmulePt, sykepengesoknad as sykepengesoknadPt, sykmelding as sykmeldingPt } from '../../propTypes';
import { hentSykepengesoknader } from '../../actions/sykepengesoknader_actions';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { hentLedere } from '../../actions/ledere_actions';
import { hentStartdato } from '../../actions/sykeforloep_actions';

export class LandingssideSide extends Component {
    componentWillMount() {
        const { mote, ledere, dineSykmeldinger, toggles, sykepengesoknader } = this.props.hentet;
        const { skalHenteStartdato } = this.props;
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
        if (skalHenteStartdato) {
            this.props.hentStartdato();
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
        const Sidetype = hentingFeilet ? Side : StrippetSide;
        const brodsmulerArg = hentingFeilet ? brodsmuler : [];

        return (<Sidetype brodsmuler={brodsmulerArg} tittel={getLedetekst('landingsside.sidetittel')} laster={henter || !altHentet}>
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
        </Sidetype>);
    }
}

LandingssideSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    henter: PropTypes.bool,
    toggles: keyValue,
    hentingFeilet: PropTypes.bool,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    harDialogmote: PropTypes.bool,
    hentMote: PropTypes.func,
    hentToggles: PropTypes.func,
    hentLedere: PropTypes.func,
    hentSykepengesoknader: PropTypes.func,
    dineSykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    hentDineSykmeldinger: PropTypes.func,
    hentingFeiletSykepengesoknader: PropTypes.bool,
    hentingFeiletSykmeldinger: PropTypes.bool,
    hentingFeiletLedere: PropTypes.bool,
    hentet: PropTypes.shape({
        ledere: PropTypes.bool,
        mote: PropTypes.bool,
        dineSykmeldinger: PropTypes.bool,
        toggles: PropTypes.bool,
        sykepengesoknader: PropTypes.bool,
    }),
    altHentet: PropTypes.bool,
    skalHenteStartdato: PropTypes.bool,
    hentStartdato: PropTypes.func,
};

export function mapStateToProps(state) {
    const hentet = {
        ledere: state.ledere.hentet === true,
        mote: state.mote.hentet === true,
        dineSykmeldinger: state.dineSykmeldinger.hentet === true,
        toggles: state.toggles.hentet === true,
        sykepengesoknader: state.sykepengesoknader.hentet === true,
        sykeforloep: state.sykeforloep.hentet === true,
    };
    const altHentet = Object.values(hentet).reduce((acc, bool) => {
        return bool && acc;
    });

    return {
        henter: state.ledetekster.henter || state.sykepengesoknader.henter || state.dineSykmeldinger.henter || state.toggles.henter || state.mote.henter || state.hendelser.henter || state.sykeforloep.henter,
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
        skalHenteStartdato: !state.sykeforloep.hentet && !state.sykeforloep.henter,
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
    hentStartdato,
})(LandingssideSide);

export default LandingssideContainer;
