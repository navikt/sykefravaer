import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';

const Motested = ({ sted }) => {
    return (<div className="motested">
        <h4 className="motested__tittel">{getLedetekst('mote.skjema.motested.tittel')}</h4>
        <p className="motested__sted">{sted}</p>
    </div>);
};

Motested.propTypes = {
    sted: PropTypes.string.isRequired,
};

export default Motested;
