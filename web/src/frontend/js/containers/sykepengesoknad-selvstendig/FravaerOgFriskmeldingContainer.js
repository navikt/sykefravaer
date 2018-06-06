import React from 'react';
import setup from './sykepengesoknadSelvstendigSetup';
import FravaerOgFriskmelding from '../../components/sykepengesoknad-selvstendig/FravaerOgFriskmelding/FravaerOgFriskmelding';
import validerFravaerOgFriskmelding from '../../components/sykepengesoknad-selvstendig/validering/validerFravaerOgFriskmelding';
import validerFoerDuBegynner from '../../components/sykepengesoknad-selvstendig/validering/validerFoerDuBegynner';
import Soknadstatussjekker from '../../components/sykepengesoknad-selvstendig/Soknadstatussjekker';

const FravaerOgFriskmeldingContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={FravaerOgFriskmelding} valider={validerFoerDuBegynner} />;
}

export default setup(validerFravaerOgFriskmelding, FravaerOgFriskmeldingContainer, false);
