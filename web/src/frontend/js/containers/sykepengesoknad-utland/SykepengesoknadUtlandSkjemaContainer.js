import React from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import { soknad as soknadPt } from '../../propTypes';
import { NY } from '../../enums/soknadstatuser';
import UtlandsSkjema from '../../components/sykepengesoknad-utland/UtlandsSkjema/UtlandsSkjema';
import { sendSoknad } from '../../actions/soknader_actions';
import PropTypes from 'prop-types';



export const SykepengesoknadUtlandSkjemaContainer = ({ soknad, sendSoknad, sender }) => {
            if (soknad) {
                return (<UtlandsSkjema
                    soknad = {soknad}
                    sendSoknad = {sendSoknad}
                    sender = {sender}
                />);
            }
            return (<p className="panel begrensning">
                    Lat som om vi redirecter til fremsiden!
    </p>); // redirect til fremside
};

SykepengesoknadUtlandSkjemaContainer.propTypes = {
    soknad: soknadPt,
    sendSoknad: PropTypes.func,
    sender: PropTypes.bool,
};

export const finnSoknad = (state, ownProps) => {
    return state.soknader.data.find((s) => {
        return s.id === ownProps.params.sykepengesoknadId && s.status === NY;
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
