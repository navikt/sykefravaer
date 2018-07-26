import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import { soknad as soknadPt } from '../../propTypes';
import { NY, SENDT, TIL_SENDING } from '../../enums/soknadstatuser';
import UtlandsSkjema from '../../components/sykepengesoknad-utland/UtlandsSkjema/UtlandsSkjema';
import Kvittering from '../../components/sykepengesoknad-utland/Kvittering/Kvittering';
import Feilmelding from '../../components/Feilmelding';
import { sendSoknad as sendSoknadAction } from '../../actions/soknader_actions';
import { OPPHOLD_UTLAND_SKJEMA } from '../../enums/skjemanavn';
import { formaterEnkeltverdi } from '../../components/soknad-felles/fieldUtils';
import { JA } from '../../enums/svarEnums';

const SykepengesoknadUtlandSkjemaContainer = ({ soknad, sendSoknad, sender, ferie }) => {
    if (soknad && soknad.status === NY) {
        return (<UtlandsSkjema
            soknad={soknad}
            sendSoknad={sendSoknad}
            sender={sender}
            ferie={ferie}
        />);
    }
    if (soknad && (soknad.status === TIL_SENDING || soknad.status === SENDT)) {
        return <Kvittering />;
    }
    return <Feilmelding />;
};

SykepengesoknadUtlandSkjemaContainer.propTypes = {
    soknad: soknadPt,
    sendSoknad: PropTypes.func,
    sender: PropTypes.bool,
    ferie: PropTypes.bool,
};

export const finnSoknad = (state, ownProps) => {
    return state.soknader.data.find((s) => {
        return (s.id === ownProps.params.sykepengesoknadId) && (s.status === NY || s.status === TIL_SENDING || s.status === SENDT);
    });
};

export function mapStateToProps(state, ownProps) {
    const soknad = finnSoknad(state, ownProps);
    const selector = formValueSelector(OPPHOLD_UTLAND_SKJEMA);
    const feltVerdi = selector(state, 'FERIE');
    const ferie = JA === formaterEnkeltverdi(feltVerdi);
    return {
        soknad,
        sendSoknad: state.soknader.senderSoknad,
        sender: state.soknader.sender,
        ferie,
    };
}

export default connect(mapStateToProps, { sendSoknad: sendSoknadAction })(SykepengesoknadUtlandSkjemaContainer);
