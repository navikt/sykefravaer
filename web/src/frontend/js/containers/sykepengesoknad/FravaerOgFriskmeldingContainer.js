import React from 'react';
import FravaerOgFriskmelding from '../../components/sykepengesoknad/FravaerOgFriskmelding/FravaerOgFriskmelding';
import GenerellSoknadContainer from './GenerellSoknadContainer';

const FravaerOgFriskmeldingContainer = () => {
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
    return <GenerellSoknadContainer Component={FravaerOgFriskmelding} brodsmuler={brodsmuler} />;
};

export default FravaerOgFriskmeldingContainer;
