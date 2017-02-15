import React, { PropTypes } from 'react';
import OppsummeringSkjema from '../../components/sykepengesoknad/Oppsummering/OppsummeringSkjema';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import StartIgjen from '../../components/sykepengesoknad/StartIgjen';
import Kvittering from '../../components/sykepengesoknad/Kvittering';

export const Controller = (props) => {
    if (props.sykepengesoknad.status === 'SENDT') {
        return <Kvittering ledetekster={props.ledetekster} />;
    }
    if (props.skjemasoknad) {
        return <OppsummeringSkjema {...props} />;
    }
    return <StartIgjen sykepengesoknad={props.sykepengesoknad} />;
};

Controller.propTypes = {
    sykepengesoknad: PropTypes.shape({
        status: PropTypes.string.isRequired,
    }),
    skjemasoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

const OppsummeringContainer = ({ params }) => {
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

OppsummeringContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
};

export default OppsummeringContainer;
