import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { bindActionCreators } from 'redux';
import {
    brodsmule as brodsmulePt,
    moteplanleggerDeltakerPt,
    motePt,
} from '../propTypes';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import AvbruttMote from '../components/moter/moteplanlegger/AvbruttMote';
import BekreftetKvittering from '../components/moter/moteplanlegger/BekreftetKvittering';
import Kvittering from '../components/moter/moteplanlegger/Kvittering';
import MotePassert from '../components/moter/moteplanlegger/MotePassert';
import Svarside from '../components/moter/moteplanlegger/Svarside';
import {
    hentMote,
    sendSvar,
} from '../actions/moter_actions';
import {
    AVBRUTT,
    BEKREFTET,
    MOTESTATUS,
    erMotePassert,
    getSvarsideModus,
} from '../utils/moteUtils';
import { BRUKER } from '../enums/moteplanleggerDeltakerTyper';

export class Container extends Component {
    componentWillMount() {
        this.props.actions.hentMote();
    }

    render() {
        const {
            henter,
            hentet,
            mote,
            brodsmuler,
            hentingFeilet,
            moteIkkeFunnet,
            actions,
        } = this.props;
        const modus = getSvarsideModus(mote);
        return (<Side
            tittel={getLedetekst('mote.sidetittel')}
            brodsmuler={brodsmuler}
            laster={henter || !hentet}
        >
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (moteIkkeFunnet) {
                        return (<Feilmelding
                            tittel="Du har ingen møteforespørsel for øyeblikket"
                            melding="Er du sikker på at du er på riktig side?"
                        />);
                    }
                    if (erMotePassert(mote)) {
                        return <MotePassert deltakertype={BRUKER} />;
                    }
                    if (modus === BEKREFTET) {
                        return (<BekreftetKvittering
                            mote={mote}
                            deltakertype={BRUKER}
                        />);
                    }
                    if (modus === MOTESTATUS) {
                        return (<Kvittering
                            mote={mote}
                            deltakertype={BRUKER}
                        />);
                    }
                    if (modus === AVBRUTT) {
                        return (<AvbruttMote
                            mote={mote}
                            deltakertype={BRUKER}
                        />);
                    }
                    if (mote) {
                        return (<Svarside
                            {...this.props}
                            deltakertype={BRUKER}
                            sendSvar={actions.sendSvar}
                        />);
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
    deltaker: moteplanleggerDeltakerPt,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    actions: PropTypes.shape({
        hentMote: PropTypes.func,
        sendSvar: PropTypes.func,
    }),
    hentingFeilet: PropTypes.bool,
    moteIkkeFunnet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    mote: motePt,
    hentet: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentMote,
        sendSvar,
    }, dispatch);
    return {
        actions,
    };
}

export function mapStateToProps(state) {
    return {
        mote: state.mote.data,
        moteIkkeFunnet: state.mote.moteIkkeFunnet === true,
        henter: state.mote.henter,
        hentet: state.mote.hentet === true,
        hentingFeilet: state.mote.hentingFeilet
        || state.ledetekster.hentingFeilet
        || false,
        sender: state.svar.sender,
        sendingFeilet: state.svar.sendingFeilet,
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
