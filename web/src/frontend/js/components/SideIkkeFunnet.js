import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import Side from '../sider/Side.js';

const SideIkkeFunnet = ({ ledetekster }) => {
    return (<Side>
        <div className="panel panel-stablet">
            <div className="container">
                <h2 className="typo-sidetittel">{getLedetekst('404.tittel', ledetekster)}</h2>
                <div className="typo-infotekst">
                    <p>{getLedetekst('404.tekst', ledetekster)}</p>
                </div>
            </div>
        </div>
    </Side>);
};

SideIkkeFunnet.propTypes = {
    ledetekster: PropTypes.object,
};

export default SideIkkeFunnet;
