import React from 'react';
import { connect } from 'react-redux';
import { soknad as soknadPt } from '../../propTypes';
import { NY, TIL_SENDING } from '../../enums/soknadstatuser';
import UtlandsSkjema from '../../components/sykepengesoknad-utland/UtlandsSkjema/UtlandsSkjema';
import { sendSoknad } from '../../actions/soknader_actions';
import PropTypes from 'prop-types';
import Kvittering from '../../components/sykepengesoknad-utland/Kvittering/Kvittering';
import Feilmelding from '../../components/Feilmelding';


export const SykepengesoknadUtlandSkjemaContainer = ({ soknad, sendSoknad, sender }) => {
    if (soknad && soknad.status === NY) {
        return (<UtlandsSkjema
            soknad={soknad}
            sendSoknad={sendSoknad}
            sender={sender}
        />);
    }
    if (soknad && soknad.status === TIL_SENDING) {
        return <Kvittering />;
    }
    return <Feilmelding />;
};

SykepengesoknadUtlandSkjemaContainer.propTypes = {
    soknad: soknadPt,
    sendSoknad: PropTypes.func,
    sender: PropTypes.bool,
};

export const finnSoknad = (state, ownProps) => {
    return state.soknader.data.find((s) => {
        return s.id === ownProps.params.sykepengesoknadId && s.status === NY
            || s.id === ownProps.params.sykepengesoknadId && s.status === TIL_SENDING;
    });
};

export function mapStateToProps(state, ownProps) {
    const soknad = finnSoknad(state, ownProps);
    return {
        soknad,
        sendSoknad: state.soknader.senderSoknad,
        sender: state.soknader.sender,
    };
}

export default connect(mapStateToProps, { sendSoknad })(SykepengesoknadUtlandSkjemaContainer);
