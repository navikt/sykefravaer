import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deltakerActions, Svarside, Kvittering, BekreftetKvittering } from 'moter-npm';
import { getLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import Side from '../sider/Side';
import { bindActionCreators } from 'redux';

export class Container extends Component {
    constructor(props) {
        super(props);
        props.actions.hentDeltaker();
    }

    render() {
        const { henter, fantIkkeDeltaker, deltaker, brodsmuler, ledetekster, hentingFeilet, harSvart, motetUtgaatt, erBekreftet } = this.props;
        return (<Side tittel={getLedetekst('mote.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (hentingFeilet) {
                    return <Feilmelding />;
                }
                if (motetUtgaatt || (deltaker && deltaker.status === 'AVBRUTT')) {
                    return (<Feilmelding tittel={getLedetekst('mote.feilmelding.utgaatt.tittel', ledetekster)}
                        melding={getLedetekst('mote.feilmelding.utgaatt.melding', ledetekster)} />);
                }
                if (fantIkkeDeltaker) {
                    return (<Feilmelding tittel={getLedetekst('mote.feilmelding.ingen-moter.tittel', ledetekster)}
                        melding={getLedetekst('mote.feilmelding.ingen-moter.melding', ledetekster)} />);
                }
                if (erBekreftet) {
                    return <BekreftetKvittering deltaker={deltaker} ledetekster={ledetekster} />;
                }
                if (harSvart) {
                    return <Kvittering deltaker={deltaker} ledetekster={ledetekster} />;
                }
                if (deltaker) {
                    return <Svarside deltaker={deltaker} ledetekster={ledetekster} deltakerId={deltaker.deltakerUuid} />;
                }
                return <Feilmelding />;
            })()
        }
        </Side>);
    }
}

Container.propTypes = {
    henter: PropTypes.bool,
    fantIkkeDeltaker: PropTypes.bool,
    deltaker: PropTypes.object,
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    actions: PropTypes.object,
    hentingFeilet: PropTypes.bool,
    harSvart: PropTypes.bool,
    motetUtgaatt: PropTypes.bool,
    erBekreftet: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(deltakerActions, dispatch),
    };
}

export const harTattStillingTilAlleAlternativer = (deltaker) => {
    return deltaker && deltaker.svarTidspunkt !== null && (deltaker.alternativer && deltaker.alternativer.filter((alternativ) => {
        return alternativ.created > deltaker.svarTidspunkt;
    }).length === 0);
};

export function mapStateToProps(state) {
    const ledetekster = state.ledetekster.data;
    const harSvart = state.svar.sendt || harTattStillingTilAlleAlternativer(state.deltaker.data) || false;

    return {
        ledetekster,
        harSvart,
        deltaker: state.deltaker.data,
        fantIkkeDeltaker: state.deltaker.fantIkkeDeltaker,
        henter: state.deltaker.henter,
        hentingFeilet: state.deltaker.hentingFeilet || state.ledetekster.hentingFeilet || false,
        motetUtgaatt: state.deltaker.motetUtgaatt || false,
        erBekreftet: state.deltaker && state.deltaker.data && state.deltaker.data.bekreftetAlternativ !== null,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', ledetekster),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('mote.sidetittel', ledetekster),
        }],
    };
}

const MoteContainer = connect(mapStateToProps, mapDispatchToProps)(Container);

export default MoteContainer;

