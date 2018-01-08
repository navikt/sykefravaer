import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknadstatuser } from 'digisyfo-npm';
import FravaerOgFriskmelding from '../../components/sykepengesoknad/FravaerOgFriskmelding/FravaerOgFriskmelding';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import StartIgjen from '../../components/sykepengesoknad/StartIgjen';
import Kvittering from '../../components/sykepengesoknad/Kvittering';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

export const Controller = (props) => {
    if (props.sykepengesoknad.status === sykepengesoknadstatuser.SENDT || props.sykepengesoknad.status === sykepengesoknadstatuser.TIL_SENDING) {
        return <Kvittering sykepengesoknad={props.sykepengesoknad} />;
    }
    if (props.skjemasoknad) {
        return <FravaerOgFriskmelding {...props} />;
    }
    return <StartIgjen sykepengesoknad={props.sykepengesoknad} />;
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    skjemasoknad: PropTypes.shape(),
};

const FravaerOgFriskmeldingContainer = ({ params }) => {
    const brodsmuler = [{
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknader om sykepenger',
        sti: '/soknader/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknad',
    }];
    return <GenerellSoknadContainer Component={Controller} brodsmuler={brodsmuler} params={params} />;
};

FravaerOgFriskmeldingContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
};

export default FravaerOgFriskmeldingContainer;
