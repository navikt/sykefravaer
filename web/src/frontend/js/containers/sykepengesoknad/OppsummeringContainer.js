import React, { PropTypes } from 'react';
import Oppsummering from '../../components/sykepengesoknad/Oppsummering/Oppsummering';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import Feilmelding from '../../components/Feilmelding';
import Kvittering from '../../components/sykepengesoknad/Kvittering';

export const Controller = (props) => {
    if (props.sykepengesoknad.status === 'SENDT') {
        return <Kvittering />;
    }
    if (props.skjemasoknad) {
        return <Oppsummering {...props} />;
    }
    return <Feilmelding tittel="Du må starte på første side i søknaden" melding={null} />;
};

Controller.propTypes = {
    sykepengesoknad: PropTypes.shape({
        status: PropTypes.string.isRequired,
    }),
    skjemasoknad: PropTypes.object,
};

const OppsummeringContainer = ({ params }) => {
    const brodsmuler = [{
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknader om sykepenger',
        sti: '/soknader',
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
