import React from 'react';
import setup from '../../utils/soknad-felles/soknadSetup';
import validerFravaerOgFriskmelding from '../../components/sykepengesoknad-arbeidstaker-ny/validering/validerFravaerOgFriskmelding';
import validerAktiviteterISykmeldingsperioden from '../../components/sykepengesoknad-arbeidstaker-ny/validering/validerAktiviteterISykmeldingsperioden';
import AktiviteterISykmeldingsperioden from '../../components/sykepengesoknad-arbeidstaker-ny/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import Soknadstatussjekker from '../../components/soknad-felles/Soknadstatussjekker';

const AktiviteterISykmeldingsperiodenContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={AktiviteterISykmeldingsperioden} valider={validerFravaerOgFriskmelding} />;
};

export default setup(validerAktiviteterISykmeldingsperioden, AktiviteterISykmeldingsperiodenContainer);
