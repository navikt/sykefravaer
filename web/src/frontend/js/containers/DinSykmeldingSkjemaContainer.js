import React, { Component } from 'react';
import { getSykmelding } from '../utils';
import * as actionCreators from '../actions/dinSykmelding_actions';
import DinSykmeldingSkjema from '../components/sykmelding/DinSykmeldingSkjema';
import { getLedetekst } from '../ledetekster';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

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
    };
};

const DinSykmeldingSkjemaContainer = connect(mapStateToProps, actionCreators)(DinSykmeldingSkjema);

export default DinSykmeldingSkjemaContainer;
