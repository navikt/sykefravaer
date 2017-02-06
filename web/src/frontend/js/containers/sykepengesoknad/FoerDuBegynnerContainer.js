import React, { PropTypes } from 'react';
import FoerDuBegynner from '../../components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import SendtSoknad from '../../components/sykepengesoknad/SendtSoknad';
import Feilmelding from '../../components/Feilmelding';

export const Controller = (props) => {
    const { sykepengesoknad, ledetekster } = props;
    if (sykepengesoknad.status === 'NY') {
        return <FoerDuBegynner {...props} />;
    }
    if (sykepengesoknad.status === 'SENDT') {
        return <SendtSoknad sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />;
    }
    return <Feilmelding tittel="Søknaden har ukjent status" />;
};

Controller.propTypes = {
    sykepengesoknad: PropTypes.shape({
        status: PropTypes.string.isRequired,
    }),
    skjemasoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

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
    return <GenerellSoknadContainer Component={Controller} brodsmuler={brodsmuler} params={params} />;
};


FoerDuBegynnerContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
};

export default FoerDuBegynnerContainer;
