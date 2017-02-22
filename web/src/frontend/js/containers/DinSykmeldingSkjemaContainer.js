import React, { PropTypes } from 'react';
import { getSykmelding, getLedetekst } from 'digisyfo-npm';
import * as actionCreators from '../actions/dinSykmelding_actions';
import DinSykmeldingSkjema from '../components/sykmeldingskjema/DinSykmeldingSkjema';
import { connect } from 'react-redux';
import { datoMedKlokkeslett } from '../utils/datoUtils';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';

export const Skjema = (props) => {
    const { henter, hentingFeilet, vedlikehold, ledetekster } = props;
    if (henter) {
        return <AppSpinner />;
    } else if (hentingFeilet) {
        return <Feilmelding />;
    } else if (vedlikehold.datospennMedTid) {
        return (<Feilmelding tittel={getLedetekst('under-vedlikehold.varsel.tittel', ledetekster)} melding={getLedetekst('under-vedlikehold.varsel.tekst', ledetekster, {
            '%FRA%': datoMedKlokkeslett(vedlikehold.datospennMedTid.fom),
            '%TIL%': datoMedKlokkeslett(vedlikehold.datospennMedTid.tom),
        })} />);
    }
    return <DinSykmeldingSkjema {...props} />;
};

Skjema.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    vedlikehold: PropTypes.shape({
        datospennMedTid: PropTypes.object,
    }),
    ledetekster: PropTypes.object,
};

export const mapStateToProps = (state, ownProps) => {
    let sykmelding = {};

    if (ownProps.sykmeldingId) {
        const _sykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, ownProps.sykmeldingId);
        if (_sykmelding) {
            sykmelding = _sykmelding;
        }
    }

    const arbeidsgivereData = state.arbeidsgivere.data.concat([{
        orgnummer: '0',
        navn: getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.label', state.ledetekster.data),
    }]);

    const arbeidsgivere = Object.assign({}, state.arbeidsgivere, {
        data: arbeidsgivereData,
    });
    const harStrengtFortroligAdresse = state.brukerinfo.bruker.data.strengtFortroligAdresse;

    return {
        skjemaData: state.form.dinSykmeldingSkjema,
        initialValues: sykmelding,
        sykmelding,
        ledetekster: state.ledetekster.data,
        sender: state.arbeidsgiversSykmeldinger.sender,
        sendingFeilet: state.dineSykmeldinger.sendingFeilet,
        avbryter: state.dineSykmeldinger.avbryter,
        avbrytFeilet: state.dineSykmeldinger.avbrytFeilet,
        harStrengtFortroligAdresse,
        arbeidsgivere: arbeidsgivere.data,
        hentingFeilet: state.arbeidsgivere.hentingFeilet,
        henter: state.arbeidsgivere.henter || state.vedlikehold.henter,
        pilotSykepenger: state.pilot.data.pilotSykepenger,
        vedlikehold: state.vedlikehold.data.vedlikehold,
    };
};

const DinSykmeldingSkjemaContainer = connect(mapStateToProps, actionCreators)(Skjema);

export default DinSykmeldingSkjemaContainer;
