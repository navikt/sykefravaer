import React from 'react';
import AktiviteterISykmeldingsperioden from '../../components/sykepengesoknad/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import GenerellSoknadContainer from './GenerellSoknadContainer';

const AktiviteterISykmeldingsperiodenContainer = ({ params }) => {
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
    return <GenerellSoknadContainer Component={AktiviteterISykmeldingsperioden} brodsmuler={brodsmuler} params={params} />;
};

export default AktiviteterISykmeldingsperiodenContainer;
