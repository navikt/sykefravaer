import React, { PropTypes } from 'react';
import { getSykmelding } from '../utils';
import * as actionCreators from '../actions/dinSykmelding_actions';
import DinSykmeldingSkjema from '../components/sykmelding/DinSykmeldingSkjema';
import { getLedetekst } from '../ledetekster';
import { connect } from 'react-redux';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';

const Skjema = (props) => {
    const { henter, hentingFeilet } = props;
    if (henter) {
        return <AppSpinner />;
    } else if (hentingFeilet) {
        return <Feilmelding />;
    }
    return <DinSykmeldingSkjema {...props} />;
};

Skjema.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
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
        avbryter: state.dineSykmeldinger.avbryter,
        harStrengtFortroligAdresse,
        arbeidsgivere: arbeidsgivere.data,
        hentingFeilet: state.arbeidsgivere.hentingFeilet,
        henter: state.arbeidsgivere.henter,
    };
};

const DinSykmeldingSkjemaContainer = connect(mapStateToProps, actionCreators)(Skjema);

export default DinSykmeldingSkjemaContainer;
