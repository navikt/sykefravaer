import React from 'react';
import FravaerOgFriskmelding from '../../components/sykepengesoknad/FravaerOgFriskmelding/FravaerOgFriskmelding';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import Feilmelding from '../../components/Feilmelding';
import Kvittering from '../../components/sykepengesoknad/Kvittering';

export const Controller = (props) => {
    if (props.sykepengesoknad.status === 'SENDT') {
        return <Kvittering />
    }
    if (props.skjemasoknad) {
        return <FravaerOgFriskmelding {...props} />
    }
    return <Feilmelding tittel="Du må starte på første side i søknaden" melding={null} />
}

const FravaerOgFriskmeldingContainer = ({ params }) => {
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

export default FravaerOgFriskmeldingContainer;
