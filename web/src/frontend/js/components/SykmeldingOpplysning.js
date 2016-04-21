import React, { PropTypes } from 'react';

const SykmeldingOpplysning = ({ tittel, children, Overskrift = 'H3' }) => {
    return (<div className="sykmelding-opplysning">
        <Overskrift>{tittel}</Overskrift>
        {children}
    </div>);
};

SykmeldingOpplysning.propTypes = {
    tittel: PropTypes.string.isRequired,
    children: PropTypes.object,
    Overskrift: PropTypes.string,
};

export default SykmeldingOpplysning;
