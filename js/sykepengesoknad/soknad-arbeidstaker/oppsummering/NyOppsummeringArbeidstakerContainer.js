import React from 'react';
import setup from '../../utils/soknadSetup';
import validerOppsummering from './validerOppsummering';
import validerAktiviteterISykmeldingsperioden from '../aktiviteter-i-sykmeldingsperioden/validerAktiviteterISykmeldingsperioden';
import Oppsummering from './Oppsummering';
import Soknadstatussjekker from '../../felleskomponenter/Soknadstatussjekker';

const OppsummeringContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={Oppsummering} valider={validerAktiviteterISykmeldingsperioden} />;
};

export default setup(validerOppsummering, OppsummeringContainer, true);
