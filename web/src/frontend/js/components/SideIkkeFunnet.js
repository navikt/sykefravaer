import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Feilmelding from './Feilmelding';

const SideIkkeFunnet = () => {
    return (<Side tittel={getLedetekst('404.tittel')}>
        <Feilmelding tittel={getLedetekst('404.tittel')} melding={getLedetekst('404.tekst')} />
    </Side>);
};

export default SideIkkeFunnet;
