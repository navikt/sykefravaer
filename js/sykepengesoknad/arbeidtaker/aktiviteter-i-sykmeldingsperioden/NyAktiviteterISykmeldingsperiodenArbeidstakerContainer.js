import React from 'react';
import setup from '../../utils/soknadSetup';
import validerFravaerOgFriskmelding from '../fravar-og-friskmelding/validerFravaerOgFriskmelding';
import validerAktiviteterISykmeldingsperioden from './validerAktiviteterISykmeldingsperioden';
import AktiviteterISykmeldingsperioden from './AktiviteterISykmeldingsperioden';
import Soknadstatussjekker from '../../felles/Soknadstatussjekker';

const AktiviteterISykmeldingsperiodenContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={AktiviteterISykmeldingsperioden} valider={validerFravaerOgFriskmelding} />;
};

export default setup(validerAktiviteterISykmeldingsperioden, AktiviteterISykmeldingsperiodenContainer, true);
