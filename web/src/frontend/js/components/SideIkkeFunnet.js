import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import Side from '../sider/Side.js';
import Feilmelding from './Feilmelding.js'

const SideIkkeFunnet = ({ ledetekster }) => {
    return (<Side>
        <Feilmelding tittel={getLedetekst('404.tittel', ledetekster)} melding={getLedetekst('404.tekst', ledetekster)} />
    </Side>);
};

SideIkkeFunnet.propTypes = {
    ledetekster: PropTypes.object,
};

export default SideIkkeFunnet;
