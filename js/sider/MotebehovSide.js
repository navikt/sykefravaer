import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLedetekst, hentToggles, keyValue } from '@navikt/digisyfo-npm';
import { brodsmule as brodsmulePt, motebehovReducerPt, motebehovSvarReducerPt } from '../propTypes';
import Side from './Side';
import MotebehovInnhold from '../components/moter/MotebehovInnhold';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { forsoektHentetDineSykmeldinger, forsoektHentetToggles, henterEllerHarHentetLedere, henterEllerHarHentetToggles } from '../utils/reducerUtils';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { hentLedere } from '../landingsside/data/ledere/ledereActions';
import { hentMotebehov, svarMotebehov } from '../actions/motebehov_actions';
import { hentOppfolgingsforlopsPerioder } from '../actions/oppfolgingsforlopsPerioder_actions';
import {
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
    forsoektHentetOppfolgingsPerioder,
    henterEllerHarForsoektHentetOppfolgingsPerioder,
    hentOppfolgingsPerioderFeilet,
} from '../utils/oppfolgingsforlopsperioderUtils';
import { finnVirksomhetnrListeMedSkalViseMotebehov, harSvarMotebehovFeilet, skalViseMotebehovMedOppfolgingsforlopListe } from '../utils/motebehovUtils';
import { selectLedeteksterData } from '../selectors/ledeteksterSelectors';

class Container extends Component {
    componentDidMount() {
        const {
            actions,
            skalHenteLedere,
            skalHenteToggles,
        } = this.props;

        actions.hentDineSykmeldinger();
        actions.hentMotebehov();
        finnOgHentManglendeOppfolgingsforlopsPerioder(this.props);

        if (skalHenteLedere) {
            actions.hentLedere();
        }
        if (skalHenteToggles) {
            actions.hentToggles();
        }
    }

    componentWillReceiveProps(nextProps) {
        finnOgHentManglendeOppfolgingsforlopsPerioder(nextProps);
    }

    render() {
        const {
            henter,
            hentingFeilet,
            sendingFeilet,
            skalViseMotebehov,
            brodsmuler,
        } = this.props;
        return (<Side
            tittel={getLedetekst('mote.behov.sidetittel')}
            brodsmuler={brodsmuler}
            laster={henter}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || sendingFeilet || !skalViseMotebehov) {
                        return <Feilmelding />;
                    }
                    return (<MotebehovInnhold
                        {...this.props}
                    />);
                })()
            }
        </Side>);
    }
}
Container.propTypes = {
    ledetekster: keyValue,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    skalHenteOppfolgingsPerioder: PropTypes.bool,
    skalHenteLedere: PropTypes.bool,
    skalHenteToggles: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    motebehovReducer: motebehovReducerPt,
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovSvarReducerPt),
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.shape({
        hentDineSykmeldinger: PropTypes.func,
        hentLedere: PropTypes.func,
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
        hentOppfolgingsforlopsPerioder: PropTypes.func,
        hentToggles: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentDineSykmeldinger,
        hentLedere,
        hentMotebehov,
        svarMotebehov,
        hentOppfolgingsforlopsPerioder,
        hentToggles,
    }, dispatch);

    return {
        actions,
    };
}

export function mapStateToProps(state) {
    const togglesReducer = state.toggles;
    const ledereReducer = state.ledere;
    const dineSykmeldingerReducer = state.dineSykmeldinger;
    const motebehovReducer = state.motebehov;

    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(dineSykmeldingerReducer.data, ledereReducer.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);
    const virksomhetnrMedMotebehovListe = finnVirksomhetnrListeMedSkalViseMotebehov(oppfolgingsforlopsPerioderReducerListe);

    const motebehovSvarReducerListe = [];
    virksomhetsnrListe.forEach((virksomhetsnr) => {
        const motebehovSvarReducer = state.motebehovSvar[virksomhetsnr] || {};
        motebehovSvarReducerListe.push(motebehovSvarReducer);
    });
    const skalViseMotebehov = skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, state.toggles, motebehovReducer);

    const skalHenteLedere = !henterEllerHarHentetLedere(ledereReducer);
    const skalHenteOppfolgingsPerioder = !henterEllerHarForsoektHentetOppfolgingsPerioder([state.oppfolgingsforlopsPerioder]);
    const skalHenteToggles = !henterEllerHarHentetToggles(togglesReducer);

    const hentOppfolgingsforlopsPerioderFeilet = hentOppfolgingsPerioderFeilet(oppfolgingsforlopsPerioderReducerListe);
    const harForsoektHentetAlt = forsoektHentetDineSykmeldinger(togglesReducer)
        && forsoektHentetToggles(togglesReducer)
        && forsoektHentetOppfolgingsPerioder(oppfolgingsforlopsPerioderReducerListe)
        && (!skalViseMotebehov || motebehovReducer.hentingForsokt);

    return {
        henter: !harForsoektHentetAlt,
        hentingFeilet: state.ledetekster.hentingFeilet
        || ledereReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || motebehovReducer.hentingFeilet
        || hentOppfolgingsforlopsPerioderFeilet
        || togglesReducer.hentingFeilet,
        sendingFeilet: harSvarMotebehovFeilet(motebehovSvarReducerListe),
        skalHenteLedere,
        skalHenteOppfolgingsPerioder,
        skalHenteToggles,
        skalViseMotebehov,
        ledetekster: selectLedeteksterData(state),
        motebehovReducer,
        motebehovSvarReducerListe,
        oppfolgingsforlopsPerioderReducerListe,
        virksomhetsnrListe,
        virksomhetnrMedMotebehovListe,
        brodsmuler: [{
            tittel: getLedetekst('containers.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('mote.sidetittel'),
        }],
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
