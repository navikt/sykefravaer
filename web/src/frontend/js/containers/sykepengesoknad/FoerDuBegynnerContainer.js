import React, { PropTypes } from 'react';
import FoerDuBegynner from '../../components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import GenerellSoknadContainer from './GenerellSoknadContainer';

const FoerDuBegynnerContainer = ({ params }) => {
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
    return <GenerellSoknadContainer Component={FoerDuBegynner} brodsmuler={brodsmuler} params={params} />;
};

FoerDuBegynnerContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
};

export default FoerDuBegynnerContainer;
