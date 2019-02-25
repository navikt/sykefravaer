import React from 'react';
import setup from '../../utils/soknadSetup';
import Oppsummering from './Oppsummering';
import Soknadstatussjekker from '../../felles/Soknadstatussjekker';
import validerOppsummering from './validerOppsummering';
import validerAktiviteterISykmeldingsperioden from '../aktiviteter-i-sykmeldingsperioden/validerAktiviteterISykmeldingsperioden';

const OppsummeringContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={Oppsummering} valider={validerAktiviteterISykmeldingsperioden} />;
};

export default setup(validerOppsummering, OppsummeringContainer, false);
