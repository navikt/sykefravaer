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
    hentMotebehov,
    henterEllerHarForsoektHentetMotebehov,
    forsoektHentetMotebehov,
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
import { hentOppfolgingsforlopsPerioder } from '../actions/oppfolgingsforlopsPerioder_actions';
import {
    henterEllerHarHentetLedere,
    henterEllerHarHentetToggles,
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

export const hentRessurser = (props) => {
    const {
        actions,
        oppfolgingsforlopsPerioderReducerListe,
        skalHenteLedere,
        skalHenteMote,
        skalHenteMotebehov,
        skalHenteToggles,
        virksomhetsnrListe,
    } = props;
    actions.hentDineSykmeldinger();
    if (skalHenteLedere) {
        actions.hentLedere();
    }
    if (skalHenteMote) {
        actions.hentMote();
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
        const {
            togglesReducer,
            harForsoektHentetAlt,
            skalViseMotebehov,
        } = this.props;

        hentRessurser(this.props);

        if (togglesReducer.hentet && harForsoektHentetAlt && skalViseMotebehov === false) {
            history.push(`${getContextRoot()}/dialogmoter/mote`);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { togglesReducer } = this.props;
        const { harForsoektHentetAlt } = nextProps;

        hentRessurser(nextProps);

        if (togglesReducer.henter && !nextProps.togglesReducer.henter && harForsoektHentetAlt && nextProps.skalViseMotebehov === false) {
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
    const motebehovReducer = state.motebehov;
    const oppfolgingsforlopsPerioderReducer = state.oppfolgingsforlopsPerioder || {};

    const harMote = getMote(state);

    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(dineSykmeldingerReducer.data, ledereReducer.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(oppfolgingsforlopsPerioderReducer, virksomhetsnrListe);
    const virksomhetnrMedMotebehovListe = finnVirksomhetnrListeMedSkalViseMotebehov(oppfolgingsforlopsPerioderReducerListe);

    const skalHenteLedere = !henterEllerHarHentetLedere(ledereReducer);
    const skalHenteMote = !henterEllerHarForsoektHentetMotebehov(motebehovReducer);
    const skalHenteMotebehov = !henterEllerHarForsoektHentetMotebehov(motebehovReducer);
    const skalHenteToggles = !henterEllerHarHentetToggles(togglesReducer);
    const skalViseMotebehov = skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, state.toggles, motebehovReducer);

    const hentOppfolgingsforlopsPerioderFeilet = hentOppfolgingsPerioderFeilet(oppfolgingsforlopsPerioderReducerListe);
    const harForsoektHentetAlt = forsoektHentetToggles(togglesReducer)
        && forsoektHentetDineSykmeldinger(dineSykmeldingerReducer)
        && forsoektHentetLedere(ledereReducer)
        && forsoektHentetToggles(togglesReducer)
        && forsoektHentetOppfolgingsPerioder(oppfolgingsforlopsPerioderReducerListe)
        && (!skalViseMotebehov || forsoektHentetMotebehov(motebehovReducer));

    return {
        henter: !harForsoektHentetAlt,
        hentingFeilet: state.ledetekster.hentingFeilet
        || ledereReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || togglesReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || hentOppfolgingsforlopsPerioderFeilet
        || (skalViseMotebehov && motebehovReducer.hentingFeilet),
        ledetekster: state.ledetekster.data,
        togglesReducer,
        motebehovReducer,
        oppfolgingsforlopsPerioderReducerListe,
        harMote,
        harForsoektHentetAlt,
        skalHenteLedere,
        skalHenteMote,
        skalHenteMotebehov,
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
