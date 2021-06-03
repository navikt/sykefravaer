/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getLedetekst } from '../../digisyfoNpm';
import { hentMote } from '../../data/moter/mote_actions';
import { hentOppfolgingsdialoger } from '../../oppfolgingsdialogNpm/oppfolgingsdialoger_actions';
import Landingsside from '../landingsside/Landingsside';
import SideStrippet from '../../sider/SideStrippet';
import Side from '../../sider/Side';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { brodsmule as brodsmulePt, sykeforloepMetadataPt } from '../../propTypes/index';
import { hentDineSykmeldinger } from '../../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentLedere } from '../data/ledere/ledereActions';
import { hentMotebehov } from '../../data/motebehov/motebehov_actions';
import { hentSykeforloep } from '../../data/sykeforloep/sykeforloep_actions';
import { hentSykeforloepSyfosoknad } from '../../data/sykeforloep-syfosoknad/sykeforloepSyfosoknad_actions';
import { skalViseOppfoelgingsdialogLenke } from '../../utils/sykmeldingUtils';
import { erMotebehovTilgjengelig } from '../../utils/motebehovUtils';
import { hentSoknader } from '../../data/soknader/soknaderActions';
import { hentAlleVedtak } from '../../data/vedtak/vedtak_actions';
import { hentOppfolging, hentSykmeldtinfodata } from '../../data/brukerinfo/brukerinfo_actions';
import { REDIRECT_ETTER_LOGIN } from '../../data/gateway-api/gatewayApi';
import { hentSmSykmeldinger } from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerActions';
import { avvisteSmSykmeldingerDataSelector } from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldingerSelectors';
import { hentSykeforloepMetadata } from '../../data/sykeforloep-metadata/sykeforloepMetadata_actions';
import { toggleSykmeldingerFrontend } from '../../data/unleash-toggles/unleashTogglesSelectors';

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
            doHentDineSykmeldinger,
            doHentSykeforloep,
            doHentSykeforloepSyfosoknad,
            doHentSykeforloepMetadata,
            doHentSoknader,
            dohentAlleVedtak,
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
        doHentDineSykmeldinger();
        doHentSykeforloep();
        doHentSykeforloepSyfosoknad();
        doHentSykeforloepMetadata();
        doHentSoknader();
        dohentAlleVedtak();
        doHentOppfolging();
        doHentSykmeldtinfodata();
        doHentSmSykmeldinger();
    }

    componentDidMount() {
        const {
            doHentMotebehov,
        } = this.props;
        doHentMotebehov();
    }

    render() {
        const {
            brodsmuler,
            henter,
            skalHenteNoe,
            hentingFeilet,
            harSykepengesoknader,
            harVedtak,
            harDialogmote,
            harSykmeldinger,
            skalViseMotebehov,
            skalViseOppfolgingsdialog,
            skalViseAktivitetsplan,
            sykeforloepMetadata,
            toggleSmFrontend,
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
                                harVedtak={harVedtak}
                                harDialogmote={harDialogmote}
                                harSykmeldinger={harSykmeldinger}
                                skalViseMotebehov={skalViseMotebehov}
                                skalViseOppfolgingsdialog={skalViseOppfolgingsdialog}
                                skalViseAktivitetsplan={skalViseAktivitetsplan}
                                sykeforloepMetadata={sykeforloepMetadata}
                                toggleSmFrontend={toggleSmFrontend}
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
    harVedtak: PropTypes.bool,
    harDialogmote: PropTypes.bool,
    harSykmeldinger: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    skalViseOppfolgingsdialog: PropTypes.bool,
    skalViseAktivitetsplan: PropTypes.bool,
    skalHenteLedere: PropTypes.bool,
    skalHenteOppfolgingsdialoger: PropTypes.bool,
    doHentMote: PropTypes.func,
    doHentMotebehov: PropTypes.func,
    doHentLedere: PropTypes.func,
    doHentDineSykmeldinger: PropTypes.func,
    doHentSykeforloep: PropTypes.func,
    doHentSykeforloepSyfosoknad: PropTypes.func,
    doHentSykeforloepMetadata: PropTypes.func,
    doHentOppfolgingsdialoger: PropTypes.func,
    doHentSoknader: PropTypes.func,
    dohentAlleVedtak: PropTypes.func,
    doHentOppfolging: PropTypes.func,
    doHentSykmeldtinfodata: PropTypes.func,
    doHentSmSykmeldinger: PropTypes.func,
    sykeforloepMetadata: sykeforloepMetadataPt,
    toggleSmFrontend: PropTypes.bool,
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
        'ledere',
        'dineSykmeldinger',
        'sykeforloep',
        'sykeforloepSyfosoknad',
        'sykeforloepMetadata',
        'oppfolgingsdialoger',
        'ledetekster',
        'soknader',
        'vedtak',
        'smSykmeldinger',
    ];
    return {
        skalHenteLedere: skalHente('ledere'),
        skalHenteOppfolgingsdialoger: skalHente('oppfolgingsdialoger'),
        skalHenteNoe: reducere.reduce((acc, val) => acc || skalHente(val), false),
        henter: reducere.reduce((acc, val) => acc || henter(val), false),
        harDialogmote: state.mote.data !== null,
        harSykepengesoknader: state.soknader.data.length > 0,
        harVedtak: state.vedtak.data.length > 0,
        harSykmeldinger: state.dineSykmeldinger.data.length > 0 || avvisteSmSykmeldingerDataSelector(state).length > 0,
        skalViseMotebehov: erMotebehovTilgjengelig(state.motebehov),
        skalViseOppfolgingsdialog: !state.dineSykmeldinger.hentingFeilet
            && !state.oppfolgingsdialoger.hentingFeilet
            && !state.ledere.hentingFeilet
            && skalViseOppfoelgingsdialogLenke(state.dineSykmeldinger.data, state.oppfolgingsdialoger),
        skalViseAktivitetsplan: state.brukerinfo.oppfolging.data.underOppfolging,
        hentingFeilet: state.ledetekster.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
        }],
        sykeforloepMetadata: state.sykeforloepMetadata,
        toggleSmFrontend: toggleSykmeldingerFrontend(state),
    };
}

const actionCreators = {
    doHentMote: hentMote,
    doHentMotebehov: hentMotebehov,
    doHentLedere: hentLedere,
    doHentDineSykmeldinger: hentDineSykmeldinger,
    doHentOppfolgingsdialoger: hentOppfolgingsdialoger,
    doHentSykeforloep: hentSykeforloep,
    doHentSykeforloepSyfosoknad: hentSykeforloepSyfosoknad,
    doHentSykeforloepMetadata: hentSykeforloepMetadata,
    doHentSoknader: hentSoknader,
    dohentAlleVedtak: hentAlleVedtak,
    doHentOppfolging: hentOppfolging,
    doHentSykmeldtinfodata: hentSykmeldtinfodata,
    doHentSmSykmeldinger: hentSmSykmeldinger,
};

export default connect(mapStateToProps, actionCreators)(Container);
