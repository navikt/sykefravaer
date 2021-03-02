import React from 'react';
import PropTypes from 'prop-types';

export const SykmeldingOpplysning = ({ tittel, children, Overskrift = 'h5', className = '' }) => {
    return (
        <div className={`opplysning ${className}`}>
            {tittel ? <Overskrift className="opplysning__tittel" dangerouslySetInnerHTML={{ __html: tittel }} /> : null}
            {children}
        </div>
    );
};

SykmeldingOpplysning.propTypes = {
    tittel: PropTypes.string.isRequired,
    children: PropTypes.element,
    Overskrift: PropTypes.string,
    className: PropTypes.string,
};

export const SykmeldingNokkelOpplysning = ({ tittel, children, Overskrift = 'h3', className = '' }) => {
    return (
        <div className={`nokkelopplysning ${className}`}>
            {tittel ? <Overskrift className="nokkelopplysning__tittel" dangerouslySetInnerHTML={{ __html: tittel }} /> : null}
            {children}
        </div>
    );
};

SykmeldingNokkelOpplysning.propTypes = {
    tittel: PropTypes.string.isRequired,
    children: PropTypes.element,
    Overskrift: PropTypes.string,
    className: PropTypes.string,
};
