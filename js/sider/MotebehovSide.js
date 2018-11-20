import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getLedetekst,
    keyValue,
    hentToggles,
} from 'digisyfo-npm';
import {
    proptypes as motebehovProptypes,
    hentMotebehov,
    svarMotebehov,
    henterEllerHarForsoektHentetMotebehov,
    forsoektHentetMotebehov,
    svarMotebehovFeilet,
} from 'moter-npm';
import {
    brodsmule as brodsmulePt,
} from '../propTypes';
import Side from './Side';
import MotebehovInnhold from '../components/moter/MotebehovInnhold';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import {
    henterEllerHarHentetLedere,
    henterEllerHarHentetToggles,
    forsoektHentetToggles,
    forsoektHentetDineSykmeldinger,
} from '../utils/reducerUtils';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { hentLedere } from '../actions/ledere_actions';
import { hentOppfolgingsforlopsPerioder } from '../actions/oppfolgingsforlopsPerioder_actions';
import {
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger, finnVirksomheterMedAktivSykmelding,
    forsoektHentetOppfolgingsPerioder,
    henterEllerHarForsoektHentetOppfolgingsPerioder, hentOppfolgingsPerioderFeilet,
} from '../utils/oppfolgingsforlopsperioderUtils';
import {
    finnVirksomhetnrListeMedSkalViseMotebehov,
    skalViseMotebehovMedOppfolgingsforlopListe,
} from '../utils/motebehovUtils';


export const hentRessurser = (props) => {
    const {
        actions,
        oppfolgingsforlopsPerioderReducerListe,
        skalHenteLedere,
        skalHenteMotebehov,
        skalHenteToggles,
        virksomhetsnrListe,
    } = props;

    actions.hentDineSykmeldinger();

    if (skalHenteLedere) {
        actions.hentLedere();
    }
    if (skalHenteMotebehov) {
        actions.hentMotebehov();
    }
    if (skalHenteToggles) {
        actions.hentToggles();
    }
    finnOgHentManglendeOppfolgingsforlopsPerioder(oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe, actions.hentOppfolgingsforlopsPerioder);
};

class Container extends Component {
    componentDidMount() {
        hentRessurser(this.props);
    }

    componentWillReceiveProps(nextProps) {
        hentRessurser(nextProps);
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
    skalHenteMotebehov: PropTypes.bool,
    skalHenteOppfolgingsPerioder: PropTypes.bool,
    skalHenteToggles: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    motebehovReducer: motebehovProptypes.motebehovReducerATPt,
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovProptypes.motebehovSvarReducerPt),
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
    const oppfolgingsforlopsPerioderReducer = state.oppfolgingsforlopsPerioder || {};

    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(dineSykmeldingerReducer.data, ledereReducer.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(oppfolgingsforlopsPerioderReducer, virksomhetsnrListe);
    const virksomhetnrMedMotebehovListe = finnVirksomhetnrListeMedSkalViseMotebehov(oppfolgingsforlopsPerioderReducerListe);

    const motebehovSvarReducerListe = [];
    virksomhetsnrListe.forEach((virksomhetsnr) => {
        const motebehovSvarReducer = state.motebehovSvar[virksomhetsnr] || {};
        motebehovSvarReducerListe.push(motebehovSvarReducer);
    });

    const skalHenteLedere = !henterEllerHarHentetLedere(ledereReducer);
    const skalHenteMotebehov = !henterEllerHarForsoektHentetMotebehov(motebehovReducer);
    const skalHenteOppfolgingsPerioder = !henterEllerHarForsoektHentetOppfolgingsPerioder([oppfolgingsforlopsPerioderReducer]);
    const skalHenteToggles = !henterEllerHarHentetToggles(togglesReducer);
    const skalViseMotebehov = skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, state.toggles, motebehovReducer);

    const hentOppfolgingsforlopsPerioderFeilet = hentOppfolgingsPerioderFeilet(oppfolgingsforlopsPerioderReducerListe);
    const harForsoektHentetAlt = forsoektHentetDineSykmeldinger(togglesReducer)
        && forsoektHentetToggles(togglesReducer)
        && forsoektHentetOppfolgingsPerioder(oppfolgingsforlopsPerioderReducerListe)
        && (!skalViseMotebehov || forsoektHentetMotebehov(motebehovReducer));

    return {
        henter: !harForsoektHentetAlt,
        hentingFeilet: state.ledetekster.hentingFeilet
        || ledereReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || motebehovReducer.hentingFeilet
        || hentOppfolgingsforlopsPerioderFeilet
        || togglesReducer.hentingFeilet,
        sendingFeilet: svarMotebehovFeilet(motebehovSvarReducerListe),
        skalHenteLedere,
        skalHenteMotebehov,
        skalHenteOppfolgingsPerioder,
        skalHenteToggles,
        skalViseMotebehov,
        ledetekster: state.ledetekster.data,
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
