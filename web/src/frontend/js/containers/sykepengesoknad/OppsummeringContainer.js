import React from 'react';
import Oppsummering from '../../components/sykepengesoknad/Oppsummering/Oppsummering';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import Feilmelding from '../../components/Feilmelding';

const OppsummeringWrap = (props) => {
    if (props.skjemasoknad) {
        return <Oppsummering {...props} />
    }
    return <Feilmelding tittel="Du må starte på første side i søknaden" melding={null} />
}

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
    return <GenerellSoknadContainer Component={OppsummeringWrap} brodsmuler={brodsmuler} params={params} />;
};

export default OppsummeringContainer;
