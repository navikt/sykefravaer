import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { moteActions } from 'moter-npm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getLedetekst,
    hentToggles,
} from 'digisyfo-npm';
import { hentOppfolgingsdialoger } from '../oppfolgingsdialogNpm/oppfolgingsdialoger_actions';
import Landingsside from '../components/landingsside/Landingsside';
import SideStrippet from './SideStrippet';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { brodsmule as brodsmulePt } from '../propTypes';
import { hentSykepengesoknader } from '../actions/sykepengesoknader_actions';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { hentLedere } from '../actions/ledere_actions';
import { hentMotebehov } from '../actions/motebehov_actions';
import { hentSykeforloep, hentSykeforloepMetadata } from '../actions/sykeforloep_actions';
import { skalViseOppfoelgingsdialogLenke } from '../utils/sykmeldingUtils';
import { skalViseMotebehovMedOppfolgingsforlopListe } from '../utils/motebehovUtils';
import { hentSoknader } from '../actions/soknader_actions';
import { hentOppfolgingsforlopsPerioder } from '../actions/oppfolgingsforlopsPerioder_actions';
import { hentSykmeldtinfodata, hentOppfolging } from '../actions/brukerinfo_actions';
import {
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
    forsoektHentetOppfolgingsPerioder,
} from '../utils/oppfolgingsforlopsperioderUtils';

export class Container extends Component {
    componentWillMount() {
        const {
            skalHenteLedere,
            skalHenteOppfolgingsdialoger,
            actions,
        } = this.props;

        if (skalHenteLedere) {
            actions.hentLedere();
        }

        if (skalHenteOppfolgingsdialoger) {
            actions.hentOppfolgingsdialoger();
        }
        actions.hentMote();
        actions.hentSykepengesoknader();
        actions.hentDineSykmeldinger();
        actions.hentSykeforloep();
        actions.hentSykeforloepMetadata();
        actions.hentSoknader();
        actions.hentOppfolging();
        actions.hentSykmeldtinfodata();
    }

    componentDidMount() {
        const {
            actions,
            skalHenteToggles,
        } = this.props;
        actions.hentMotebehov();
        if (skalHenteToggles) {
            actions.hentToggles();
        }
        finnOgHentManglendeOppfolgingsforlopsPerioder(this.props);
    }

    componentWillReceiveProps(nextProps) {
        finnOgHentManglendeOppfolgingsforlopsPerioder(nextProps);
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
            skalViseMotebehov,
            skalViseOppfolgingsdialog,
            skalViseAktivitetsplan,
        } = this.props;
        const Sidetype = hentingFeilet ? Side : SideStrippet;
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
                        skalViseMotebehov={skalViseMotebehov}
                        skalViseOppfolgingsdialog={skalViseOppfolgingsdialog}
                        skalViseAktivitetsplan={skalViseAktivitetsplan}
                    />);
                })()
            }
        </Sidetype>);
    }
}

Container.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    henter: PropTypes.bool,
    skalHenteNoe: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    harSykepengesoknader: PropTypes.bool,
    harDialogmote: PropTypes.bool,
    harSykmeldinger: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    skalViseOppfolgingsdialog: PropTypes.bool,
    skalViseAktivitetsplan: PropTypes.bool,
    skalHenteLedere: PropTypes.bool,
    skalHenteOppfolgingsdialoger: PropTypes.bool,
    skalHenteToggles: PropTypes.bool,
    actions: PropTypes.shape({
        hentMote: PropTypes.func,
        hentMotebehov: PropTypes.func,
        hentLedere: PropTypes.func,
        hentSykepengesoknader: PropTypes.func,
        hentDineSykmeldinger: PropTypes.func,
        hentSykeforloep: PropTypes.func,
        hentSykeforloepMetadata: PropTypes.func,
        hentOppfolgingsdialoger: PropTypes.func,
        hentOppfolgingsforlopsPerioder: PropTypes.func,
        hentSoknader: PropTypes.func,
        hentToggles: PropTypes.func,
    }),
};

export function mapStateToProps(state) {
    const skalHente = (reducer) => {
        const r = state[reducer];
        return !r.hentingForbudt && !r.hentingFeilet && !r.henter && !r.hentet;
    };

    const henter = (reducer) => {
        const r = state[reducer];
        return r.henter === true;
    };

    const reducere = [
        'mote',
        'motebehov',
        'sykepengesoknader',
        'ledere',
        'dineSykmeldinger',
        'sykeforloep',
        'sykeforloepMetadata',
        'oppfolgingsdialoger',
        'ledetekster',
        'soknader',
        'toggles',
    ];

    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(state.dineSykmeldinger.data, state.ledere.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);

    return {
        skalHenteLedere: skalHente('ledere'),
        skalHenteOppfolgingsdialoger: skalHente('oppfolgingsdialoger'),
        skalHenteToggles: skalHente('toggles'),
        skalHenteNoe: reducere.reduce((acc, val) => {
            return acc || skalHente(val);
        }, false),
        henter: reducere.reduce((acc, val) => {
            return acc || henter(val);
        }, false)
        || !forsoektHentetOppfolgingsPerioder(oppfolgingsforlopsPerioderReducerListe),
        harDialogmote: state.mote.data !== null,
        harSykepengesoknader: state.sykepengesoknader.data.length > 0 || state.soknader.data.length > 0,
        harSykmeldinger: state.dineSykmeldinger.data.length > 0,
        skalViseMotebehov: !state.dineSykmeldinger.hentingFeilet &&
            !state.ledere.hentingFeilet &&
            skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, state.toggles, state.motebehov),
        skalViseOppfolgingsdialog: !state.dineSykmeldinger.hentingFeilet &&
            !state.oppfolgingsdialoger.hentingFeilet &&
            !state.ledere.hentingFeilet &&
            skalViseOppfoelgingsdialogLenke(state.ledere, state.oppfolgingsdialoger),
        skalViseAktivitetsplan: state.brukerinfo.oppfolging.data.underOppfolging,
        hentingFeilet: state.ledetekster.hentingFeilet,
        oppfolgingsforlopsPerioderReducerListe,
        virksomhetsnrListe,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
        }],
    };
}

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators({
        hentMote: moteActions.hentMote,
        hentMotebehov,
        hentSykepengesoknader,
        hentLedere,
        hentDineSykmeldinger,
        hentOppfolgingsdialoger,
        hentOppfolgingsforlopsPerioder,
        hentSykeforloep,
        hentSykeforloepMetadata,
        hentSoknader,
        hentOppfolging,
        hentSykmeldtinfodata,
        hentToggles,
    }, dispatch);
    return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
