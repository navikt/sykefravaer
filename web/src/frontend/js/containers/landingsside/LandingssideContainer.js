import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { moteActions } from 'moter-npm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst } from 'digisyfo-npm';
import { hentOppfolgingsdialogerAt as hentOppfolgingsdialoger } from 'oppfolgingsdialog-npm';
import Landingsside from '../../components/landingsside/Landingsside';
import StrippetSide from '../../sider/StrippetSide';
import Side from '../../sider/Side';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { brodsmule as brodsmulePt } from '../../propTypes';
import { hentSykepengesoknader } from '../../actions/sykepengesoknader_actions';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { hentLedere } from '../../actions/ledere_actions';
import { hentSykeforloep } from '../../actions/sykeforloep_actions';
import { skalViseOppfoelgingsdialogLenke } from '../../utils/sykmeldingUtils';

export class LandingssideSide extends Component {
    componentWillMount() {
        const {
            skalHenteMote,
            skalHenteSykepengesoknader,
            skalHenteLedere,
            skalHenteDineSykmeldinger,
            skalHenteSykeforloep,
            skalHenteOppfolgingsdialoger,
            actions,
        } = this.props;

        if (skalHenteMote) {
            actions.hentMote();
        }

        if (skalHenteSykepengesoknader) {
            actions.hentSykepengesoknader();
        }

        if (skalHenteDineSykmeldinger) {
            actions.hentDineSykmeldinger();
        }

        if (skalHenteLedere) {
            actions.hentLedere();
        }

        if (skalHenteSykeforloep) {
            actions.hentSykeforloep();
        }

        if (skalHenteOppfolgingsdialoger) {
            actions.hentOppfolgingsdialoger();
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            skalHenteNoe,
            hentingFeilet,
            harSykepengesoknader,
            harDialogmote,
            harSykmeldinger,
            skalViseOppfolgingsdialog,
        } = this.props;
        const Sidetype = hentingFeilet ? Side : StrippetSide;
        const brodsmulerArg = hentingFeilet ? brodsmuler : [];

        return (<Sidetype brodsmuler={brodsmulerArg} tittel={getLedetekst('landingsside.sidetittel')} laster={henter || skalHenteNoe}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<Landingsside
                        brodsmuler={brodsmuler}
                        harSykepengesoknader={harSykepengesoknader}
                        harDialogmote={harDialogmote}
                        harSykmeldinger={harSykmeldinger}
                        skalViseOppfolgingsdialog={skalViseOppfolgingsdialog}
                    />);
                })()
            }
        </Sidetype>);
    }
}

LandingssideSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    henter: PropTypes.bool,
    skalHenteNoe: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    harSykepengesoknader: PropTypes.bool,
    harDialogmote: PropTypes.bool,
    harSykmeldinger: PropTypes.bool,
    skalViseOppfolgingsdialog: PropTypes.bool,
    skalHenteMote: PropTypes.bool,
    skalHenteLedere: PropTypes.bool,
    skalHenteSykepengesoknader: PropTypes.bool,
    skalHenteDineSykmeldinger: PropTypes.bool,
    skalHenteSykeforloep: PropTypes.bool,
    skalHenteOppfolgingsdialoger: PropTypes.bool,
    actions: PropTypes.shape({
        hentMote: PropTypes.func,
        hentLedere: PropTypes.func,
        hentSykepengesoknader: PropTypes.func,
        hentDineSykmeldinger: PropTypes.func,
        hentSykeforloep: PropTypes.func,
        hentOppfolgingsdialoger: PropTypes.func,
    }),
};

export function mapStateToProps(state) {
    const skalHente = (reducer) => {
        const r = state[reducer];
        return !r.hentingFeilet && !r.henter && !r.hentet;
    };

    const henter = (reducer) => {
        const r = state[reducer];
        return r.henter === true;
    };

    const reducere = ['mote', 'sykepengesoknader', 'ledere', 'dineSykmeldinger', 'sykeforloep', 'oppfolgingsdialoger', 'ledetekster'];

    return {
        skalHenteMote: skalHente('mote'),
        skalHenteSykepengesoknader: skalHente('sykepengesoknader'),
        skalHenteLedere: skalHente('ledere'),
        skalHenteDineSykmeldinger: skalHente('dineSykmeldinger'),
        skalHenteSykeforloep: skalHente('sykeforloep'),
        skalHenteOppfolgingsdialoger: skalHente('oppfolgingsdialoger'),
        skalHenteNoe: reducere.reduce((acc, val) => {
            return acc || skalHente(val);
        }, false),
        henter: reducere.reduce((acc, val) => {
            return acc || henter(val);
        }, false),
        harDialogmote: state.mote.data !== null,
        harSykepengesoknader: state.sykepengesoknader.data.length > 0,
        harSykmeldinger: state.dineSykmeldinger.data.length > 0,
        skalViseOppfolgingsdialog: !state.dineSykmeldinger.hentingFeilet &&
            !state.oppfolgingsdialoger.hentingFeilet &&
            skalViseOppfoelgingsdialogLenke(state.dineSykmeldinger.data, state.oppfolgingsdialoger),
        hentingFeilet: state.ledetekster.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
        }],
    };
}

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators({
        hentMote: moteActions.hentMote,
        hentSykepengesoknader,
        hentLedere,
        hentDineSykmeldinger,
        hentOppfolgingsdialoger,
        hentSykeforloep,
    }, dispatch);
    return { actions };
};

const LandingssideContainer = connect(mapStateToProps, mapDispatchToProps)(LandingssideSide);

export default LandingssideContainer;
