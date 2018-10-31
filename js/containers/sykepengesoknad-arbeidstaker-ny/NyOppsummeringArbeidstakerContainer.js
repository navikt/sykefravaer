import React from 'react';
import setup from '../../utils/soknad-felles/soknadSetup';
import validerOppsummering from '../../components/sykepengesoknad-arbeidstaker-ny/validering/validerOppsummering';
import validerAktiviteterISykmeldingsperioden from '../../components/sykepengesoknad-arbeidstaker-ny/validering/validerAktiviteterISykmeldingsperioden';
import Oppsummering from '../../components/sykepengesoknad-arbeidstaker-ny/Oppsummering/Oppsummering';
import Soknadstatussjekker from '../../components/soknad-felles/Soknadstatussjekker';

const OppsummeringContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={Oppsummering} valider={validerAktiviteterISykmeldingsperioden} />;
};

export default setup(validerOppsummering, OppsummeringContainer);
