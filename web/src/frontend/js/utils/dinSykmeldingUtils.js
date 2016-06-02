import React from 'react';
import { SykmeldingOpplysning } from '../components/SykmeldingOpplysning.js';
import { SykmeldingCheckbox } from '../components/SykmeldingCheckbox.js';

export const getSykmeldingCheckbox = (sykmeldingBolk, felt, tekst, className) => {
    if (sykmeldingBolk[felt]) {
        return (<SykmeldingCheckbox tekst={tekst} jsClassName={felt} className={className} />);
    }
    return null;
};

export const getSykmeldingOpplysning = (sykmeldingBolk, felt, tittel, opplysning) => {
    if (sykmeldingBolk[felt]) {
        return (<SykmeldingOpplysning tittel={tittel} Overskrift="H5">
            <p className={`sykmelding-opplysning-verdi js-${felt}`}>{opplysning || sykmeldingBolk[felt]}</p>
        </SykmeldingOpplysning>);
    }
    return null;
};
