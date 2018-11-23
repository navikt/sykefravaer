import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getLedetekst,
    keyValue,
    togglesPt,
    hentToggles,
} from 'digisyfo-npm';
import {
    proptypes as motebehovProptypes,
    moteActions,
} from 'moter-npm';
import getContextRoot from '../utils/getContextRoot';
import history from '../history';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import DialogmoterInnhold from '../components/moter/DialogmoterInnhold';
import { brodsmule as brodsmulePt } from '../propTypes';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { hentLedere } from '../actions/ledere_actions';
import { hentMotebehov } from '../actions/motebehov_actions';
import { hentOppfolgingsforlopsPerioder } from '../actions/oppfolgingsforlopsPerioder_actions';
import {
    henterEllerHarHentetLedere,
    henterEllerHarHentetToggles,
    forsoktHentetMote,
    forsoektHentetDineSykmeldinger,
    forsoektHentetToggles,
    forsoektHentetLedere,
} from '../utils/reducerUtils';
import { getMote } from '../utils/moteUtils';
import {
    finnVirksomhetnrListeMedSkalViseMotebehov,
    skalViseMotebehovMedOppfolgingsforlopListe,
} from '../utils/motebehovUtils';
import {
    hentOppfolgingsPerioderFeilet,
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    forsoektHentetOppfolgingsPerioder,
    finnVirksomheterMedAktivSykmelding,
} from '../utils/oppfolgingsforlopsperioderUtils';

class Container extends Component {
    componentDidMount() {
        const {
            actions,
            skalHenteLedere,
            skalHenteToggles,
            skalViseMotebehov,
            togglesReducer,
            harForsoektHentetAlt,
        } = this.props;

        actions.hentDineSykmeldinger();
        actions.hentMote();
        actions.hentMotebehov();
        finnOgHentManglendeOppfolgingsforlopsPerioder(this.props);

        if (skalHenteLedere) {
            actions.hentLedere();
        }
        if (skalHenteToggles) {
            actions.hentToggles();
        }

        if (togglesReducer.hentet && harForsoektHentetAlt && skalViseMotebehov === false) {
            history.push(`${getContextRoot()}/dialogmoter/mote`);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { togglesReducer } = this.props;
        const {
            harForsoektHentetAlt,
            skalViseMotebehov,
        } = nextProps;

        finnOgHentManglendeOppfolgingsforlopsPerioder(nextProps);

        if (togglesReducer.henter && !nextProps.togglesReducer.henter && harForsoektHentetAlt && skalViseMotebehov === false) {
            history.push(`${getContextRoot()}/dialogmoter/mote`);
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
        } = this.props;
        return (<Side
            tittel={getLedetekst('mote.moter.sidetittel')}
            brodsmuler={brodsmuler}
            laster={henter}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<DialogmoterInnhold
                        {...this.props}
                    />);
                })()
            }
        </Side>);
    }
}

Container.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ledetekster: keyValue,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    koblingId: PropTypes.string,
    motebehovReducer: motebehovProptypes.motebehovReducerATPt,
    togglesReducer: togglesPt,
    harMote: PropTypes.bool,
    harForsoektHentetAlt: PropTypes.bool,
    skalHenteLedere: PropTypes.bool,
    skalHenteToggles: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.shape({
        hentDineSykmeldinger: PropTypes.func,
        hentLedere: PropTypes.func,
        hentMote: PropTypes.func,
        hentMotebehov: PropTypes.func,
        hentOppfolgingsforlopsPerioder: PropTypes.func,
        hentToggles: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentDineSykmeldinger,
        hentLedere,
        hentMote: moteActions.hentMote,
        hentMotebehov,
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
    const moteReducer = state.mote;
    const motebehovReducer = state.motebehov;

    const harMote = !!getMote(state);

    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(dineSykmeldingerReducer.data, ledereReducer.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);
    const virksomhetnrMedMotebehovListe = finnVirksomhetnrListeMedSkalViseMotebehov(oppfolgingsforlopsPerioderReducerListe);
    const skalViseMotebehov = skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, state.toggles, motebehovReducer);

    const skalHenteLedere = !henterEllerHarHentetLedere(ledereReducer);
    const skalHenteToggles = !henterEllerHarHentetToggles(togglesReducer);

    const hentOppfolgingsforlopsPerioderFeilet = hentOppfolgingsPerioderFeilet(oppfolgingsforlopsPerioderReducerListe);
    const harForsoektHentetAlt = forsoektHentetToggles(togglesReducer)
        && forsoektHentetDineSykmeldinger(dineSykmeldingerReducer)
        && forsoektHentetLedere(ledereReducer)
        && forsoktHentetMote(moteReducer)
        && forsoektHentetToggles(togglesReducer)
        && forsoektHentetOppfolgingsPerioder(oppfolgingsforlopsPerioderReducerListe)
        && (!skalViseMotebehov || motebehovReducer.hentingForsokt);

    return {
        henter: !harForsoektHentetAlt,
        hentingFeilet: state.ledetekster.hentingFeilet
        || ledereReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || togglesReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || hentOppfolgingsforlopsPerioderFeilet
        || motebehovReducer.hentingForbudt
        || (skalViseMotebehov && motebehovReducer.hentingFeilet),
        ledetekster: state.ledetekster.data,
        togglesReducer,
        motebehovReducer,
        oppfolgingsforlopsPerioderReducerListe,
        harMote,
        harForsoektHentetAlt,
        skalHenteLedere,
        skalHenteToggles,
        skalViseMotebehov,
        virksomhetsnrListe,
        virksomhetnrMedMotebehovListe,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('mote.moter.sidetittel'),
        }],
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
