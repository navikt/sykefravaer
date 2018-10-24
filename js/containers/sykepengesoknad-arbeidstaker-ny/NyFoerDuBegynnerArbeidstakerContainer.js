import React from 'react';
import setup from '../../components/soknad-felles/soknadSetup';
import validerFoerDuBegynner from '../../components/sykepengesoknad-arbeidstaker-ny/validering/validerFoerDuBegynner';
import FoerDuBegynner from '../../components/sykepengesoknad-arbeidstaker-ny/FoerDuBegynner/FoerDuBegynner';
import Soknadstatussjekker from '../../components/soknad-felles/Soknadstatussjekker';

const FoerDuBegynnerContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={FoerDuBegynner} />;
};

export default setup(validerFoerDuBegynner, FoerDuBegynnerContainer, true);
