import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deltakerActions, Svarside } from 'moter-npm';
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
        const { henter, fantIkkeDeltaker, deltaker, brodsmuler, ledetekster } = this.props;
        return (<Side tittel="Møteforespørsel" brodsmuler={brodsmuler}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />
                }
                if (fantIkkeDeltaker) {
                    return <Feilmelding tittel="Du har ingen møteforespørsler fra NAV" melding="Så vi lurer litt på hvordan du havnet her!" />
                }
                if (deltaker) {
                    return <Svarside deltaker={deltaker} ledetekster={ledetekster} deltakerId="123" />;
                }
                return <Feilmelding />
            })()
        }
        </Side>)
    }
}

Container.propTypes = {
    henter: PropTypes.bool,
    fantIkkeDeltaker: PropTypes.bool,
    deltaker: PropTypes.object,
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(deltakerActions, dispatch),
    };
};

export function mapStateToProps(state) {
    const ledetekster = state.ledetekster.data;
    return {
        ledetekster,
        deltaker: state.deltaker.data,
        fantIkkeDeltaker: state.deltaker.fantIkkeDeltaker,
        henter: state.deltaker.henter,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', ledetekster),
            sti: "/",
            erKlikkbar: true,
        }, {
            tittel: "Dialogmøte"
        }]
    };
}

const MoteContainer = connect(mapStateToProps, mapDispatchToProps)(Container);

export default MoteContainer;
