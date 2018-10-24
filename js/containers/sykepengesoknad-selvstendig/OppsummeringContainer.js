import React from 'react';
import setup from '../../components/soknad-felles/soknadSetup';
import Oppsummering from '../../components/sykepengesoknad-selvstendig/Oppsummering/Oppsummering';
import Soknadstatussjekker from '../../components/soknad-felles/Soknadstatussjekker';
import validerOppsummering from '../../components/sykepengesoknad-selvstendig/validering/validerOppsummering';
import validerAktiviteterISykmeldingsperioden from '../../components/sykepengesoknad-selvstendig/validering/validerAktiviteterISykmeldingsperioden';

const OppsummeringContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={Oppsummering} valider={validerAktiviteterISykmeldingsperioden} />;
};

export default setup(validerOppsummering, OppsummeringContainer, false);
