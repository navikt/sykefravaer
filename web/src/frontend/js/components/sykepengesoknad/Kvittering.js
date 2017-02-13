import React, { PropTypes } from 'react';
import Sidetopp from '../Sidetopp';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';

const Kvittering = ({ ledetekster }) => {
    return (<div>
        <Sidetopp tittel="Kvittering" />
        <div className="panel">
            <h2 className="hode hode-suksess hode-dekorert">{getLedetekst('sykepengesoknad.kvittering.tittel', ledetekster)}</h2>
            <div dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.kvittering.tekst', ledetekster)} />
        </div>
    </div>);
};

Kvittering.propTypes = {
    ledetekster: PropTypes.object,
};

export default Kvittering;
