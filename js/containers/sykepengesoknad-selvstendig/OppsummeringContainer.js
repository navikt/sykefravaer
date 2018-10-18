import React from 'react';
import setup from './sykepengesoknadSelvstendigSetup';
import Oppsummering from '../../components/sykepengesoknad-selvstendig/Oppsummering/Oppsummering';
import Soknadstatussjekker from '../../components/sykepengesoknad-selvstendig/Soknadstatussjekker';
import validerOppsummering from '../../components/sykepengesoknad-selvstendig/validering/validerOppsummering';
import validerAktiviteterISykmeldingsperioden from '../../components/sykepengesoknad-selvstendig/validering/validerAktiviteterISykmeldingsperioden';

const OppsummeringContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={Oppsummering} valider={validerAktiviteterISykmeldingsperioden} />;
};

export default setup(validerOppsummering, OppsummeringContainer, false);
