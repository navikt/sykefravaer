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
} from 'moter-npm';
import {
    brodsmule as brodsmulePt,
} from '../propTypes';
import Side from './Side';
import MotebehovInnhold from '../components/moter/MotebehovInnhold';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import {
    henterEllerHarHentetToggles,
    forsoektHentetToggles,
    forsoektHentetDineSykmeldinger,
} from '../utils/reducerUtils';
import { hentOppfolgingsforlopsPerioder } from '../actions/oppfolgingsforlopsPerioder_actions';
import {
    forsoektHentetOppfolgingsPerioder,
    henterEllerHarForsoektHentetOppfolgingsPerioder,
} from '../utils/oppfolgingsforlopsperioderUtils';
import { skalViseMotebehovMedOppfolgingsforlopListe } from '../utils/motebehovUtils';


export const hentRessurser = (props) => {
    const actions = props.actions;
    if (props.skalHenteMotebehov) {
        actions.hentMotebehov();
    }
    if (props.skalHenteOppfolgingsPerioder) {
        actions.hentOppfolgingsforlopsPerioder(props.virksomhetsnr);
    }
    if (props.skalHenteToggles) {
        actions.hentToggles();
    }
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
            sender,
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
                    if (henter || sender) {
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
    sender: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    skalHenteMotebehov: PropTypes.bool,
    skalHenteOppfolgingsPerioder: PropTypes.bool,
    skalHenteToggles: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    motebehovReducer: motebehovProptypes.motebehovReducerATPt,
    motebehovSvarReducer: motebehovProptypes.motebehovSvarReducerPt,
    virksomhetsnr: PropTypes.string,
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
        hentOppfolgingsforlopsPerioder: PropTypes.func,
        hentToggles: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentMotebehov,
        svarMotebehov,
        hentOppfolgingsforlopsPerioder,
        hentToggles,
    }, dispatch);

    return {
        actions,
    };
}

export function mapStateToProps(state, ownProps) {
    const virksomhetsnr = ownProps.params.virksomhetsnr;

    const togglesReducer = state.toggles;
    const motebehovReducer = state.motebehov;
    let motebehovSvarReducer = {};
    motebehovSvarReducer = state.motebehovSvar[virksomhetsnr] || motebehovSvarReducer;
    const oppfolgingsforlopsPerioderReducer = state.oppfolgingsforlopsPerioder[virksomhetsnr] || { data: [] };

    const skalHenteMotebehov = !henterEllerHarForsoektHentetMotebehov(motebehovReducer);
    const skalHenteOppfolgingsPerioder = !henterEllerHarForsoektHentetOppfolgingsPerioder([oppfolgingsforlopsPerioderReducer]);
    const skalHenteToggles = !henterEllerHarHentetToggles(togglesReducer);
    const skalViseMotebehov = skalViseMotebehovMedOppfolgingsforlopListe([oppfolgingsforlopsPerioderReducer], state.toggles, motebehovReducer);
    const harForsoektHentetAlt = forsoektHentetDineSykmeldinger(togglesReducer)
        && forsoektHentetToggles(togglesReducer)
        && forsoektHentetOppfolgingsPerioder([oppfolgingsforlopsPerioderReducer])
        && (!skalViseMotebehov || forsoektHentetMotebehov(motebehovReducer));

    return {
        henter: !harForsoektHentetAlt,
        sender: (skalViseMotebehov && motebehovSvarReducer.sender),
        hentingFeilet:
        state.ledetekster.hentingFeilet
        || motebehovReducer.hentingFeilet
        || oppfolgingsforlopsPerioderReducer.hentingFeilet
        || togglesReducer.hentingFeilet,
        sendingFeilet: motebehovSvarReducer.sendingFeilet,
        skalHenteMotebehov,
        skalHenteOppfolgingsPerioder,
        skalHenteToggles,
        skalViseMotebehov,
        ledetekster: state.ledetekster.data,
        motebehovReducer,
        motebehovSvarReducer,
        virksomhetsnr,
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
