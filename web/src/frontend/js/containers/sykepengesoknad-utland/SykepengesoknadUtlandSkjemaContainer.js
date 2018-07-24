import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { skjemasvar as skjemasvarPt, soknad as soknadPt } from '../../propTypes';
import { NY, SENDT, TIL_SENDING } from '../../enums/soknadstatuser';
import UtlandsSkjema from '../../components/sykepengesoknad-utland/UtlandsSkjema/UtlandsSkjema';
import Feilmelding from '../../components/Feilmelding';
import { sendSoknad as sendSoknadAction } from '../../actions/soknader_actions';
import OppsummeringUtland from '../../components/sykepengesoknad-utland/Oppsummering/OppsummeringUtland';
import Kvittering from '../../components/sykepengesoknad-utland/Kvittering/Kvittering';


export const SykepengesoknadUtlandSkjemaContainer = (props) => {
    const { soknad, sendSoknad, sender, sti } = props;

    if (soknad && soknad.status === NY) {
        return (<UtlandsSkjema
            soknad={soknad}
            sendSoknad={sendSoknad}
            sender={sender}
        />);
    }
    if (soknad && [SENDT, TIL_SENDING].indexOf(soknad.status) > -1) {
        if (sti.indexOf('kvittering') > -1) {
            return <Kvittering />;
        }
        return <OppsummeringUtland {...props} />;
    }
    return <Feilmelding />;
};

SykepengesoknadUtlandSkjemaContainer.propTypes = {
    soknad: soknadPt,
    actions: PropTypes.shape({
        sendSoknad: PropTypes.func,
    }),
    sendingFailet: PropTypes.bool,
    skjemasvar: skjemasvarPt,
    sendSoknad: PropTypes.func,
    sender: PropTypes.bool,
    sti: PropTypes.string,
};

export const finnSoknad = (state, ownProps) => {
    return state.soknader.data.find((s) => {
        return (s.id === ownProps.params.sykepengesoknadId) && (s.status === NY || s.status === TIL_SENDING || s.status === SENDT);
    });
};

export function mapStateToProps(state, ownProps) {
    const soknad = finnSoknad(state, ownProps);
    return {
        soknad,
        sti: ownProps.location.pathname,
        sendSoknad: state.soknader.senderSoknad,
        sender: state.soknader.sender,
    };
}

export default connect(mapStateToProps, { sendSoknad: sendSoknadAction })(SykepengesoknadUtlandSkjemaContainer);
