import React from 'react';
import { SykmeldingOpplysning } from '../components/sykmeldingOpplysninger/SykmeldingOpplysning';
import { SykmeldingCheckbox } from '../components/sykmeldingOpplysninger/SykmeldingCheckbox';

export const getSykmeldingCheckbox = (sykmeldingBolk, felt, tekst, className) => {
    if (sykmeldingBolk[felt]) {
        return (<SykmeldingCheckbox tekst={tekst} jsClassName={felt} className={className} />);
    }
    return null;
};

export const getSykmeldingOpplysning = (sykmeldingBolk, felt, tittel, opplysning, Overskrift = 'H5') => {
    if (sykmeldingBolk[felt]) {
        return (<SykmeldingOpplysning tittel={tittel} Overskrift={Overskrift}>
            <p className={`sykmelding-opplysning-verdi js-${felt}`}>{opplysning || sykmeldingBolk[felt]}</p>
        </SykmeldingOpplysning>);
    }
    return null;
};
