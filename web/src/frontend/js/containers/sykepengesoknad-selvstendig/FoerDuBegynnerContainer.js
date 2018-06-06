import React from 'react';
import setup from './sykepengesoknadSelvstendigSetup';
import validerFoerDuBegynner from '../../components/sykepengesoknad-selvstendig/validering/validerFoerDuBegynner';
import FoerDuBegynner from '../../components/sykepengesoknad-selvstendig/FoerDuBegynner/FoerDuBegynner';
import Soknadstatussjekker from '../../components/sykepengesoknad-selvstendig/Soknadstatussjekker';

const FoerDuBegynnerContainer = (props) => {
    const valider = () => {
        return {};
    };
    return <Soknadstatussjekker {...props} Component={FoerDuBegynner} valider={valider} />;
}

export default setup(validerFoerDuBegynner, FoerDuBegynnerContainer, true);
