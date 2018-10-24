import React from 'react';
import PropTypes from 'prop-types';
import { SENDT } from '../../enums/soknadstatuser';
import { SELVSTENDIGE_OG_FRILANSERE } from '../../enums/soknadtyper';
import Kvittering from '../sykepengesoknad-selvstendig/Kvittering/Kvittering';
import StartIgjen from '../sykepengesoknad-felles/StartIgjen';
import { skjemasvar as skjemasvarPt, soknad as soknadPt } from '../../propTypes/index';
import { getSoknadSkjemanavn } from '../../enums/skjemanavn';

const soknadErSendt = (soknad) => {
    return [SENDT].indexOf(soknad.status) > -1;
};

const Soknadstatussjekker = (props) => {
    const { soknad, skjemasvar, valider, Component } = props;
    const feilmeldinger = valider ? valider(skjemasvar, { soknad }) : {};
    if (soknadErSendt(soknad) && soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE) {
        return <Kvittering />;
    }
    if (Object.keys(feilmeldinger).length > 0) {
        return <StartIgjen soknad={soknad} />;
    }
    return <Component {...props} form={getSoknadSkjemanavn(soknad.id)} />;
};

Soknadstatussjekker.propTypes = {
    soknad: soknadPt,
    skjemasvar: skjemasvarPt,
    valider: PropTypes.func,
    Component: PropTypes.func,
};

export default Soknadstatussjekker;
