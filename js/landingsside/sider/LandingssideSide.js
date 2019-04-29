import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import {
    getLedetekst,
    hentToggles,
} from '@navikt/digisyfo-npm';
import { hentMote } from '../../actions/moter_actions';
import { hentOppfolgingsdialoger } from '../../oppfolgingsdialogNpm/oppfolgingsdialoger_actions';
import Landingsside from '../landingsside/Landingsside';
import SideStrippet from '../../sider/SideStrippet';
import Side from '../../sider/Side';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { brodsmule as brodsmulePt } from '../../propTypes/index';
import { hentSykepengesoknader } from '../../sykepengesoknad-gammel-plattform/data/sykepengesoknader/sykepengesoknader_actions';
import { hentDineSykmeldinger } from '../../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentLedere } from '../data/ledere/ledereActions';
import { hentMotebehov } from '../../actions/motebehov_actions';
import { hentSykeforloep, hentSykeforloepMetadata } from '../../actions/sykeforloep_actions';
import { skalViseOppfoelgingsdialogLenke } from '../../utils/sykmeldingUtils';
import { skalViseMotebehovMedOppfolgingsforlopListe } from '../../utils/motebehovUtils';
import { hentSoknader } from '../../sykepengesoknad/data/soknader/soknaderActions';
import { hentOppfolgingsforlopsPerioder } from '../../actions/oppfolgingsforlopsPerioder_actions';
import { hentSykmeldtinfodata, hentOppfolging } from '../../actions/brukerinfo_actions';
import {
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
    forsoektHentetOppfolgingsPerioder,
} from '../../utils/oppfolgingsforlopsperioderUtils';
import { REDIRECT_ETTER_LOGIN } from '../../gateway-api/gatewayApi';
import { hentSmSykmeldinger } from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerActions';

export class Container extends Component {
    componentWillMount() {
        const redirect = window.localStorage.getItem(REDIRECT_ETTER_LOGIN);

        if (redirect && redirect.indexOf(`${window.location.origin}/sykefravaer`) > -1) {
            window.localStorage.removeItem(REDIRECT_ETTER_LOGIN);
            browserHistory.push(redirect);
        }

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
        actions.hentSmSykmeldinger();
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
        'smSykmeldinger',
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
            skalViseOppfoelgingsdialogLenke(state.dineSykmeldinger.data, state.oppfolgingsdialoger),
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
        hentMote,
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
        hentSmSykmeldinger,
    }, dispatch);
    return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
