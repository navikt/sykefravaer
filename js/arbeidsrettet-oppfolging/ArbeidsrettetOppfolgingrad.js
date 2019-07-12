import React from 'react';
import PropTypes from 'prop-types';

const ArbeidsrettetOppfolgingRad = ({ tittel, children }) => (
    <div className="arbeidsrettetOppfolgingRad">
        { tittel && <h2 className="panel__tittel">{tittel}</h2> }
        {children}
    </div>
);

ArbeidsrettetOppfolgingRad.propTypes = {
    tittel: PropTypes.string,
    children: PropTypes.node,
};

export default ArbeidsrettetOppfolgingRad;
