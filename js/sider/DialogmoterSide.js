import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLedetekst, keyValue } from '@navikt/digisyfo-npm';
import getContextRoot from '../utils/getContextRoot';
import history from '../history';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import DialogmoterInnhold from '../components/moter/DialogmoterInnhold';
import { brodsmule as brodsmulePt, motebehovReducerPt } from '../propTypes';
import { hentDineSykmeldinger } from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentLedere } from '../landingsside/data/ledere/ledereActions';
import { hentMote } from '../actions/moter_actions';
import { hentMotebehov } from '../actions/motebehov_actions';
import { hentOppfolgingsforlopsPerioder } from '../actions/oppfolgingsforlopsPerioder_actions';
import {
    forsoektHentetDineSykmeldinger,
    forsoektHentetLedere,
    forsoktHentetMote,
    henterEllerHarHentetLedere,
} from '../utils/reducerUtils';
import { getMote } from '../utils/moteUtils';
import { finnVirksomhetnrListeMedSkalViseMotebehov, skalViseMotebehovMedOppfolgingsforlopListe } from '../utils/motebehovUtils';
import {
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
    forsoektHentetOppfolgingsPerioder,
    hentOppfolgingsPerioderFeilet,
} from '../utils/oppfolgingsforlopsperioderUtils';
import { selectLedeteksterData } from '../selectors/ledeteksterSelectors';

class Container extends Component {
    componentDidMount() {
        const {
            actions,
            skalHenteLedere,
            skalViseMotebehov,
            harForsoektHentetAlt,
        } = this.props;

        actions.hentDineSykmeldinger();
        actions.hentMote();
        actions.hentMotebehov();
        finnOgHentManglendeOppfolgingsforlopsPerioder(this.props);

        if (skalHenteLedere) {
            actions.hentLedere();
        }

        if (harForsoektHentetAlt && skalViseMotebehov === false) {
            history.push(`${getContextRoot()}/dialogmoter/mote`);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            harForsoektHentetAlt,
            skalViseMotebehov,
        } = nextProps;

        finnOgHentManglendeOppfolgingsforlopsPerioder(nextProps);

        if (harForsoektHentetAlt && skalViseMotebehov === false) {
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
    motebehovReducer: motebehovReducerPt,
    harMote: PropTypes.bool,
    harForsoektHentetAlt: PropTypes.bool,
    skalHenteLedere: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.shape({
        hentDineSykmeldinger: PropTypes.func,
        hentLedere: PropTypes.func,
        hentMote: PropTypes.func,
        hentMotebehov: PropTypes.func,
        hentOppfolgingsforlopsPerioder: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentDineSykmeldinger,
        hentLedere,
        hentMote,
        hentMotebehov,
        hentOppfolgingsforlopsPerioder,
    }, dispatch);

    return {
        actions,
    };
}

export function mapStateToProps(state) {
    const ledereReducer = state.ledere;
    const dineSykmeldingerReducer = state.dineSykmeldinger;
    const moteReducer = state.mote;
    const motebehovReducer = state.motebehov;

    const harMote = !!getMote(state);

    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(dineSykmeldingerReducer.data, ledereReducer.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);
    const virksomhetnrMedMotebehovListe = finnVirksomhetnrListeMedSkalViseMotebehov(oppfolgingsforlopsPerioderReducerListe);
    const skalViseMotebehov = skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, motebehovReducer);

    const skalHenteLedere = !henterEllerHarHentetLedere(ledereReducer);

    const hentOppfolgingsforlopsPerioderFeilet = hentOppfolgingsPerioderFeilet(oppfolgingsforlopsPerioderReducerListe);
    const harForsoektHentetAlt = forsoektHentetDineSykmeldinger(dineSykmeldingerReducer)
        && forsoektHentetLedere(ledereReducer)
        && forsoktHentetMote(moteReducer)
        && forsoektHentetOppfolgingsPerioder(oppfolgingsforlopsPerioderReducerListe)
        && (!skalViseMotebehov || motebehovReducer.hentingForsokt);

    return {
        henter: !harForsoektHentetAlt,
        hentingFeilet: state.ledetekster.hentingFeilet
        || ledereReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || hentOppfolgingsforlopsPerioderFeilet
        || motebehovReducer.hentingForbudt
        || (skalViseMotebehov && motebehovReducer.hentingFeilet),
        ledetekster: selectLedeteksterData(state),
        motebehovReducer,
        oppfolgingsforlopsPerioderReducerListe,
        harMote,
        harForsoektHentetAlt,
        skalHenteLedere,
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
