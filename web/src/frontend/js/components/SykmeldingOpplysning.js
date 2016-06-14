import React, { PropTypes } from 'react';

export const SykmeldingOpplysning = ({ tittel, children, Overskrift = 'H5', className = '' }) => {
    return (
        <div className={`sykmelding-opplysning ${className}`}>
            {tittel ? <Overskrift dangerouslySetInnerHTML={{ __html: tittel }} /> : <noscript />}
            {children}
        </div>
    );
};

SykmeldingOpplysning.propTypes = {
    tittel: PropTypes.string.isRequired,
    children: PropTypes.object,
    Overskrift: PropTypes.string,
    className: PropTypes.string,
};

export const SykmeldingNokkelOpplysning = ({ tittel, children, Overskrift = 'H3', className = '' }) => {
    return (
        <div className={`sykmelding-nokkelopplysning ${className}`}>
            {tittel ? <Overskrift dangerouslySetInnerHTML={{ __html: tittel }} /> : <noscript />}
            {children}
        </div>
    );
};

SykmeldingNokkelOpplysning.propTypes = {
    tittel: PropTypes.string.isRequired,
    children: PropTypes.object,
    Overskrift: PropTypes.string,
    className: PropTypes.string,
};
