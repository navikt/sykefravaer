import React from 'react';
import setup from '../../utils/soknadSetup';
import AktiviteterISykmeldingsperioden from './AktiviteterISykmeldingsperioden';
import validerAktiviteterISykmeldingsperioden from './validerAktiviteterISykmeldingsperioden';
import validerFravaerOgFriskmelding from '../fravar-og-friskmelding/validerFravaerOgFriskmelding';
import Soknadstatussjekker from '../../felleskomponenter/Soknadstatussjekker';

const FravaerOgFriskmeldingContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={AktiviteterISykmeldingsperioden} valider={validerFravaerOgFriskmelding} />;
};

export default setup(validerAktiviteterISykmeldingsperioden, FravaerOgFriskmeldingContainer, false);
