import React from 'react';
import PropTypes from 'prop-types';
import { SENDT, TIL_SENDING } from '../../enums/soknadstatuser';
import Kvittering from '../sykepengesoknad-selvstendig/Kvittering/Kvittering';
import StartIgjen from '../sykepengesoknad-felles/StartIgjen';
import { skjemasvar as skjemasvarPt, soknad as soknadPt } from '../../propTypes';
import {OPPHOLD_UTLAND} from "../../enums/soknadtyper";

const soknadErSendt = (soknad) => {
    return [SENDT, TIL_SENDING].indexOf(soknad.status) > -1;
};

const SoknadstatussjekkerUtland = (props) => {
    const { soknad, skjemasvar, valider, Component, sti } = props;
    const feilmeldinger = valider ? valider(skjemasvar, { soknad }) : {};
    if (soknadErSendt(soknad) && (sti.indexOf("kvittering") > -1)){
        return <Kvittering />;
    }
    if (Object.keys(feilmeldinger).length > 0) {
        return <StartIgjen soknad={soknad} />;
    }
    return <Component {...props} />;
};

SoknadstatussjekkerUtland.propTypes = {
    sti: PropTypes.string,
    soknad: soknadPt,
    skjemasvar: skjemasvarPt,
    valider: PropTypes.func,
    Component: PropTypes.func,
};

export default SoknadstatussjekkerUtland;
