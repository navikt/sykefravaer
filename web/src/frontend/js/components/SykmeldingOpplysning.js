import React, { PropTypes } from 'react';

export const SykmeldingOpplysning = ({ tittel, children, Overskrift = 'H5', className }) => {
    return (<div className={'sykmelding-opplysning' + (className ? ' ' + className : '')}>
        {tittel ? <Overskrift>{tittel}</Overskrift> : ''}
        {children}
    </div>);
};

export const SykmeldingNokkelOpplysning = ({ tittel, children, Overskrift = 'H3', className }) => {
    return (<div className={'sykmelding-nokkelopplysning' + (className ? ' ' + className : '')}>
        {tittel ? <Overskrift>{tittel}</Overskrift> : ''}
        {children}
    </div>);
};

SykmeldingOpplysning.propTypes = {
    tittel: PropTypes.string.isRequired,
    children: PropTypes.object,
    Overskrift: PropTypes.string,
    className: PropTypes.string,
};