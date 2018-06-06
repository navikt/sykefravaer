import React from 'react';
import PropTypes from 'prop-types';
import { SENDT, TIL_SENDING } from '../../enums/soknadstatuser';
import Kvittering from './Kvittering/Kvittering';
import StartIgjen from '../sykepengesoknad-felles/StartIgjen';
import { skjemasvar as skjemasvarPt, soknad as soknadPt } from '../../propTypes';

const soknadErSendt = (soknad) => {
    return [SENDT, TIL_SENDING].indexOf(soknad.status) > -1;
};

const Soknadstatussjekker = (props) => {
    const { soknad, skjemasvar, valider, Component } = props;
    const feilmeldinger = skjemasvar ? valider(skjemasvar, { soknad }) : {};
    if (soknadErSendt(soknad)) {
        return <Kvittering />;
    }

    if (!skjemasvar || Object.keys(feilmeldinger).length > 0) {
        return <StartIgjen soknad={soknad} />;
    }

    return <Component {...props} />;
};

Soknadstatussjekker.propTypes = {
    soknad: soknadPt,
    skjemasvar: skjemasvarPt,
    valider: PropTypes.func,
    Component: PropTypes.func,
};

export default Soknadstatussjekker;
