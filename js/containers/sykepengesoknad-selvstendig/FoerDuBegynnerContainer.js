import React from 'react';
import setup from '../../utils/soknad-felles/soknadSetup';
import validerFoerDuBegynner from '../../components/sykepengesoknad-selvstendig/validering/validerFoerDuBegynner';
import FoerDuBegynner from '../../components/sykepengesoknad-selvstendig/FoerDuBegynner/FoerDuBegynner';
import Soknadstatussjekker from '../../components/soknad-felles/Soknadstatussjekker';

const FoerDuBegynnerContainer = (props) => {
    return <Soknadstatussjekker {...props} Component={FoerDuBegynner} />;
};

export default setup(validerFoerDuBegynner, FoerDuBegynnerContainer, true);
