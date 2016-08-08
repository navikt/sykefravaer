import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import Side from '../sider/Side';
import Feilmelding from './Feilmelding';

const SideIkkeFunnet = ({ ledetekster }) => {
    return (<Side tittel={getLedetekst('404.tittel', ledetekster)}>
        <Feilmelding tittel={getLedetekst('404.tittel', ledetekster)} melding={getLedetekst('404.tekst', ledetekster)} />
    </Side>);
};

SideIkkeFunnet.propTypes = {
    ledetekster: PropTypes.object,
};

export default SideIkkeFunnet;
