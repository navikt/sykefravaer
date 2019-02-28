import React from 'react';
import setup from '../../utils/soknadSetup';
import validerFravaerOgFriskmelding from './validerFravaerOgFriskmelding';
import validerFoerDuBegynner from '../for-du-begynner/validerFoerDuBegynner';
import FravaerOgFriskmelding from './FravaerOgFriskmelding';
import Soknadstatussjekker from '../../felleskomponenter/Soknadstatussjekker';

const FravaerOgFriskmeldingContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={FravaerOgFriskmelding} valider={validerFoerDuBegynner} />;
};

export default setup(validerFravaerOgFriskmelding, FravaerOgFriskmeldingContainer, true);
