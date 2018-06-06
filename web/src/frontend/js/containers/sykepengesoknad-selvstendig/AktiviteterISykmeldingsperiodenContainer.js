import React from 'react';
import setup from './sykepengesoknadSelvstendigSetup';
import AktiviteterISykmeldingsperioden from '../../components/sykepengesoknad-selvstendig/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import validerAktiviteterISykmeldingsperioden from '../../components/sykepengesoknad-selvstendig/validering/validerAktiviteterISykmeldingsperioden';
import validerFravaerOgFriskmelding from '../../components/sykepengesoknad-selvstendig/validering/validerFravaerOgFriskmelding';
import Soknadstatussjekker from '../../components/sykepengesoknad-selvstendig/Soknadstatussjekker';

const FravaerOgFriskmeldingContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={AktiviteterISykmeldingsperioden} valider={validerFravaerOgFriskmelding} />;
}

export default setup(validerAktiviteterISykmeldingsperioden, FravaerOgFriskmeldingContainer, false);
