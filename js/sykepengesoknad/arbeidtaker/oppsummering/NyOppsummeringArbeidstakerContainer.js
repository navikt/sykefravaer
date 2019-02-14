import React from 'react';
import setup from '../../../utils/soknad-felles/soknadSetup';
import validerOppsummering from './validerOppsummering';
import validerAktiviteterISykmeldingsperioden from '../aktiviteter-i-sykmeldingsperioden/validerAktiviteterISykmeldingsperioden';
import Oppsummering from './Oppsummering';
import Soknadstatussjekker from '../../../components/soknad-felles/Soknadstatussjekker';

const OppsummeringContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={Oppsummering} valider={validerAktiviteterISykmeldingsperioden} />;
};

export default setup(validerOppsummering, OppsummeringContainer, true);
