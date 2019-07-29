import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLedetekst, keyValue } from '@navikt/digisyfo-npm';
import {
    brodsmule as brodsmulePt,
    motebehovReducerPt,
    motebehovSvarReducerPt,
} from '../propTypes';
import Side from './Side';
import MotebehovInnhold from '../components/moter/MotebehovInnhold';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import {
    forsoektHentetDineSykmeldinger,
    henterEllerHarHentetLedere,
} from '../utils/reducerUtils';
import { hentDineSykmeldinger } from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentLedere } from '../landingsside/data/ledere/ledereActions';
import { hentMote } from '../data/moter/mote_actions';
import {
    hentMotebehov,
    svarMotebehov,
} from '../data/motebehov/motebehov_actions';
import { hentOppfolgingsforlopsPerioder } from '../data/oppfolgingsforlopsperioder/oppfolgingsforlopsPerioder_actions';
import {
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
    forsoektHentetOppfolgingsPerioder,
    henterEllerHarForsoektHentetOppfolgingsPerioder,
    hentOppfolgingsPerioderFeilet,
} from '../utils/oppfolgingsforlopsperioderUtils';
import {
    finnVirksomhetnrListeMedSkalViseMotebehov,
    harSvarMotebehovFeilet,
    skalViseMotebehovMedOppfolgingsforlopListe,
} from '../utils/motebehovUtils';
import { selectLedeteksterData } from '../data/ledetekster/ledeteksterSelectors';

class Container extends Component {
    componentDidMount() {
        const {
            actions,
            skalHenteLedere,
            oppfolgingsforlopsPerioderReducerListe,
            virksomhetsnrListe,
        } = this.props;

        actions.hentDineSykmeldinger();
        actions.hentMotebehov();
        actions.hentMote();
        finnOgHentManglendeOppfolgingsforlopsPerioder(actions.hentOppfolgingsforlopsPerioder, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe);

        if (skalHenteLedere) {
            actions.hentLedere();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { actions, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe } = nextProps;
        finnOgHentManglendeOppfolgingsforlopsPerioder(actions.hentOppfolgingsforlopsPerioder, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe);
    }

    render() {
        const {
            henter,
            hentingFeilet,
            sendingFeilet,
            skalViseMotebehov,
            brodsmuler,
        } = this.props;
        return (
            <Side
                tittel={getLedetekst('mote.behov.sidetittel')}
                brodsmuler={brodsmuler}
                laster={henter}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        } if (hentingFeilet || sendingFeilet) {
                            return <Feilmelding />;
                        } if (!skalViseMotebehov) {
                            return (
                                <Feilmelding
                                    tittel="Møtebehovsiden er ikke tilgjengelig nå."
                                    melding="Dette kan være fordi veilederen din allerede har forespurt et møte, hvis ikke, prøv igjen senere."
                                />
                            );
                        }
                        return (
                            <MotebehovInnhold
                                {...this.props}
                            />
                        );
                    })()
                }
            </Side>
        );
    }
}
Container.propTypes = {
    ledetekster: keyValue,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    skalHenteOppfolgingsPerioder: PropTypes.bool,
    skalHenteLedere: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    motebehovReducer: motebehovReducerPt,
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovSvarReducerPt),
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
    oppfolgingsforlopsPerioderReducerListe: PropTypes.arrayOf(PropTypes.shape()),
    actions: PropTypes.shape({
        hentDineSykmeldinger: PropTypes.func,
        hentLedere: PropTypes.func,
        hentMote: PropTypes.func,
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
        hentOppfolgingsforlopsPerioder: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentDineSykmeldinger,
        hentLedere,
        hentMote,
        hentMotebehov,
        svarMotebehov,
        hentOppfolgingsforlopsPerioder,
    }, dispatch);

    return {
        actions,
    };
}

export function mapStateToProps(state) {
    const ledereReducer = state.ledere;
    const dineSykmeldingerReducer = state.dineSykmeldinger;
    const motebehovReducer = state.motebehov;
    const moteReducer = state.mote;

    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(dineSykmeldingerReducer.data, ledereReducer.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);
    const virksomhetnrMedMotebehovListe = finnVirksomhetnrListeMedSkalViseMotebehov(oppfolgingsforlopsPerioderReducerListe);

    const motebehovSvarReducerListe = [];
    virksomhetsnrListe.forEach((virksomhetsnr) => {
        const motebehovSvarReducer = state.motebehovSvar[virksomhetsnr] || {};
        motebehovSvarReducerListe.push(motebehovSvarReducer);
    });
    const skalViseMotebehov = skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, motebehovReducer, moteReducer);

    const skalHenteLedere = !henterEllerHarHentetLedere(ledereReducer);
    const skalHenteOppfolgingsPerioder = !henterEllerHarForsoektHentetOppfolgingsPerioder([state.oppfolgingsforlopsPerioder]);

    const hentOppfolgingsforlopsPerioderFeilet = hentOppfolgingsPerioderFeilet(oppfolgingsforlopsPerioderReducerListe);
    const harForsoektHentetAlt = forsoektHentetDineSykmeldinger(dineSykmeldingerReducer)
        && forsoektHentetOppfolgingsPerioder(oppfolgingsforlopsPerioderReducerListe)
        && (!skalViseMotebehov || motebehovReducer.hentingForsokt);

    return {
        henter: !harForsoektHentetAlt,
        hentingFeilet: state.ledetekster.hentingFeilet
        || ledereReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || motebehovReducer.hentingFeilet
        || hentOppfolgingsforlopsPerioderFeilet,
        sendingFeilet: harSvarMotebehovFeilet(motebehovSvarReducerListe),
        skalHenteLedere,
        skalHenteOppfolgingsPerioder,
        skalViseMotebehov,
        ledetekster: selectLedeteksterData(state),
        motebehovReducer,
        motebehovSvarReducerListe,
        oppfolgingsforlopsPerioderReducerListe,
        virksomhetsnrListe,
        virksomhetnrMedMotebehovListe,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('mote.sidetittel'),
        }],
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
