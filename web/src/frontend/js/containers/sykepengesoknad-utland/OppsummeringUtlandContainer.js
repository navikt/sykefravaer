import React from 'react';
import setup from '../sykepengesoknad-selvstendig/sykepengesoknadSelvstendigSetup';
import OppsummeringUtland from '../../components/sykepengesoknad-utland/Oppsummering/OppsummeringUtland';
import Soknadstatussjekker from '../../components/sykepengesoknad-selvstendig/Soknadstatussjekker';
import validerOppsummering from '../../components/sykepengesoknad-selvstendig/validering/validerOppsummering';
import SoknadstatussjekkerUtland from "../../components/sykepengesoknad-utland/SoknadstatussjekkerUtland";

const OppsummeringUtlandContainer = (props) => {
    return <SoknadstatussjekkerUtland {...props} Component={OppsummeringUtland}/>;
};

export default setup(validerOppsummering, OppsummeringUtlandContainer, false);
