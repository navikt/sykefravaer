import React from 'react';
import FoerDuBegynner from '../../components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import GenerellSoknadContainer from './GenerellSoknadContainer';

const FoerDuBegynnerContainer = () => {
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
    return <GenerellSoknadContainer Component={FoerDuBegynner} brodsmuler={brodsmuler} />;
};

export default FoerDuBegynnerContainer;
