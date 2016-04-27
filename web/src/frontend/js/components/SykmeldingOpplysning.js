import React, { PropTypes } from 'react';

const SykmeldingOpplysning = ({ tittel, children, Overskrift = 'H3', className }) => {
    return (<div className={'sykmelding-opplysning' + (className ? ' ' + className : '')}>
        <Overskrift>{tittel}</Overskrift>
        {children}
    </div>);
};

SykmeldingOpplysning.propTypes = {
    tittel: PropTypes.string.isRequired,
    children: PropTypes.object,
    Overskrift: PropTypes.string,
    className: PropTypes.string,
};

export default SykmeldingOpplysning;
