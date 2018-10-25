import React from 'react';
import setup from '../../utils/soknad-felles/soknadSetup';
import validerFravaerOgFriskmelding from '../../components/sykepengesoknad-arbeidstaker-ny/validering/validerFravaerOgFriskmelding';
import validerFoerDuBegynner from '../../components/sykepengesoknad-arbeidstaker-ny/validering/validerFoerDuBegynner';
import FravaerOgFriskmelding from '../../components/sykepengesoknad-arbeidstaker-ny/FravaerOgFriskmelding/FravaerOgFriskmelding';
import Soknadstatussjekker from '../../components/soknad-felles/Soknadstatussjekker';

const FravaerOgFriskmeldingContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={FravaerOgFriskmelding} valider={validerFoerDuBegynner} />;
};

export default setup(validerFravaerOgFriskmelding, FravaerOgFriskmeldingContainer);
