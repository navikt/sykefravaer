/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { hentMote } from '../../data/moter/mote_actions';
import { hentOppfolgingsdialoger } from '../../oppfolgingsdialogNpm/oppfolgingsdialoger_actions';
import Landingsside from '../landingsside/Landingsside';
import SideStrippet from '../../sider/SideStrippet';
import Side from '../../sider/Side';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { brodsmule as brodsmulePt } from '../../propTypes/index';
import { hentSykepengesoknader } from '../../data/sykepengesoknader/sykepengesoknader_actions';
import { hentDineSykmeldinger } from '../../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentLedere } from '../data/ledere/ledereActions';
import { hentMotebehov } from '../../data/motebehov/motebehov_actions';
import { hentSykeforloep } from '../../data/sykeforloep/sykeforloep_actions';
import { skalViseOppfoelgingsdialogLenke } from '../../utils/sykmeldingUtils';
import { skalViseMotebehovMedOppfolgingsforlopListe } from '../../utils/motebehovUtils';
import { hentSoknader } from '../../data/soknader/soknaderActions';
import { hentOppfolgingsforlopsPerioder } from '../../data/oppfolgingsforlopsperioder/oppfolgingsforlopsPerioder_actions';
import { hentOppfolging, hentSykmeldtinfodata } from '../../data/brukerinfo/brukerinfo_actions';
import {
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
    forsoektHentetOppfolgingsPerioder,
} from '../../utils/oppfolgingsforlopsperioderUtils';
import { REDIRECT_ETTER_LOGIN } from '../../data/gateway-api/gatewayApi';
import { hentSmSykmeldinger } from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerActions';
import { avvisteSmSykmeldingerDataSelector } from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerSelectors';
import { hentSykeforloepMetadata } from '../../data/sykeforloep-metadata/sykeforloepMetadata_actions';

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
            doHentMote,
            doHentSykepengesoknader,
            doHentDineSykmeldinger,
            doHentSykeforloep,
            doHentSykeforloepMetadata,
            doHentSoknader,
            doHentOppfolging,
            doHentSykmeldtinfodata,
            doHentSmSykmeldinger,
            doHentLedere,
            doHentOppfolgingsdialoger,
        } = this.props;

        if (skalHenteLedere) {
            doHentLedere();
        }

        if (skalHenteOppfolgingsdialoger) {
            doHentOppfolgingsdialoger();
        }
        doHentMote();
        doHentSykepengesoknader();
        doHentDineSykmeldinger();
        doHentSykeforloep();
        doHentSykeforloepMetadata();
        doHentSoknader();
        doHentOppfolging();
        doHentSykmeldtinfodata();
        doHentSmSykmeldinger();
    }

    componentDidMount() {
        const {
            doHentMotebehov,
            doHentOppfolgingsforlopsPerioder,
            oppfolgingsforlopsPerioderReducerListe,
            virksomhetsnrListe,
        } = this.props;
        doHentMotebehov();
        finnOgHentManglendeOppfolgingsforlopsPerioder(doHentOppfolgingsforlopsPerioder, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe);
    }

    componentWillReceiveProps(nextProps) {
        const { doHentOppfolgingsforlopsPerioder, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe } = nextProps;
        finnOgHentManglendeOppfolgingsforlopsPerioder(doHentOppfolgingsforlopsPerioder, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe);
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

        return (
            <Sidetype brodsmuler={brodsmulerArg} tittel={getLedetekst('landingsside.sidetittel')} laster={henter || skalHenteNoe}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        }
                        if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        return (
                            <Landingsside
                                brodsmuler={brodsmuler}
                                harSykepengesoknader={harSykepengesoknader}
                                harDialogmote={harDialogmote}
                                harSykmeldinger={harSykmeldinger}
                                skalViseMotebehov={skalViseMotebehov}
                                skalViseOppfolgingsdialog={skalViseOppfolgingsdialog}
                                skalViseAktivitetsplan={skalViseAktivitetsplan}
                            />
                        );
                    })()
                }
            </Sidetype>
        );
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
    oppfolgingsforlopsPerioderReducerListe: PropTypes.arrayOf(PropTypes.shape()),
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    doHentMote: PropTypes.func,
    doHentMotebehov: PropTypes.func,
    doHentLedere: PropTypes.func,
    doHentSykepengesoknader: PropTypes.func,
    doHentDineSykmeldinger: PropTypes.func,
    doHentSykeforloep: PropTypes.func,
    doHentSykeforloepMetadata: PropTypes.func,
    doHentOppfolgingsdialoger: PropTypes.func,
    doHentOppfolgingsforlopsPerioder: PropTypes.func,
    doHentSoknader: PropTypes.func,
    doHentOppfolging: PropTypes.func,
    doHentSykmeldtinfodata: PropTypes.func,
    doHentSmSykmeldinger: PropTypes.func,
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
        'smSykmeldinger',
    ];

    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(state.dineSykmeldinger.data, state.ledere.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);

    return {
        skalHenteLedere: skalHente('ledere'),
        skalHenteOppfolgingsdialoger: skalHente('oppfolgingsdialoger'),
        skalHenteNoe: reducere.reduce((acc, val) => acc || skalHente(val), false),
        henter: reducere.reduce((acc, val) => acc || henter(val), false)
            || !forsoektHentetOppfolgingsPerioder(oppfolgingsforlopsPerioderReducerListe),
        harDialogmote: state.mote.data !== null,
        harSykepengesoknader: state.sykepengesoknader.data.length > 0 || state.soknader.data.length > 0,
        harSykmeldinger: state.dineSykmeldinger.data.length > 0 || avvisteSmSykmeldingerDataSelector(state).length > 0,
        skalViseMotebehov: !state.dineSykmeldinger.hentingFeilet
            && !state.ledere.hentingFeilet
            && skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, state.motebehov, state.mote),
        skalViseOppfolgingsdialog: !state.dineSykmeldinger.hentingFeilet
            && !state.oppfolgingsdialoger.hentingFeilet
            && !state.ledere.hentingFeilet
            && skalViseOppfoelgingsdialogLenke(state.dineSykmeldinger.data, state.oppfolgingsdialoger),
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

const actionCreators = {
    doHentMote: hentMote,
    doHentMotebehov: hentMotebehov,
    doHentSykepengesoknader: hentSykepengesoknader,
    doHentLedere: hentLedere,
    doHentDineSykmeldinger: hentDineSykmeldinger,
    doHentOppfolgingsdialoger: hentOppfolgingsdialoger,
    doHentOppfolgingsforlopsPerioder: hentOppfolgingsforlopsPerioder,
    doHentSykeforloep: hentSykeforloep,
    doHentSykeforloepMetadata: hentSykeforloepMetadata,
    doHentSoknader: hentSoknader,
    doHentOppfolging: hentOppfolging,
    doHentSykmeldtinfodata: hentSykmeldtinfodata,
    doHentSmSykmeldinger: hentSmSykmeldinger,
};

export default connect(mapStateToProps, actionCreators)(Container);
