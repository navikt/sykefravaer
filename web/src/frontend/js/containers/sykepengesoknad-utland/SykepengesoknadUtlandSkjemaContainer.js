import React from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import {skjemasvar as skjemasvarPt, soknad as soknadPt} from '../../propTypes';
import { NY } from '../../enums/soknadstatuser';
import { NY, SENDT, TIL_SENDING } from '../../enums/soknadstatuser';
import UtlandsSkjema from '../../components/sykepengesoknad-utland/UtlandsSkjema/UtlandsSkjema';
import Kvittering from '../../components/sykepengesoknad-utland/Kvittering/Kvittering';
import Feilmelding from '../../components/Feilmelding';
import { sendSoknad as sendSoknadAction } from '../../actions/soknader_actions';
import { sendSoknad } from '../../actions/soknader_actions';
import PropTypes from 'prop-types';
import OppsummeringUtlandContainer from "./OppsummeringUtlandContainer";



export const SykepengesoknadUtlandSkjemaContainer = (props) => {
    const {soknad, sendSoknad, sender, sti, skjemasvar, sendingFailet} = props;
    if (soknad) {
        return (<UtlandsSkjema
            soknad={soknad}
            sendSoknad={sendSoknad}
            sender={sender}
        />);
    }
    return (<OppsummeringUtlandContainer {...props}> </OppsummeringUtlandContainer>); // redirect til fremside
};
    /* const SykepengesoknadUtlandSkjemaContainer = ({ soknad, sendSoknad, sender }) => {
    if (soknad && soknad.status === NY) {
        return (<UtlandsSkjema
            soknad={soknad}
            sendSoknad={sendSoknad}
            sender={sender}
        />);
    }
    if (soknad && (soknad.status === TIL_SENDING || soknad.status === SENDT)) {
        return <Kvittering />;
    }
    return <Feilmelding />;
};
*/

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
