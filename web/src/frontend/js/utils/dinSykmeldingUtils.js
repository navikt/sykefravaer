import React from 'react';
import { SykmeldingOpplysning } from '../components/SykmeldingOpplysning.js';
import { SykmeldingCheckbox, SykmeldingCheckboxSelvstendig } from '../components/SykmeldingCheckbox.js';

export const getSykmeldingCheckbox = (sykmelding, felt, tekst, className) => {
    if(sykmelding[felt]) { 
        return (<SykmeldingCheckbox tekst={tekst} jsClassName={felt} className={className} />);
    }
    return null;
}

export const getSykmeldingOpplysning = (sykmelding, felt, tittel, opplysning) => {
    if (sykmelding[felt]) {
        return (<SykmeldingOpplysning tittel={tittel} Overskrift="H5">
            <p className={'sykmelding-opplysning-verdi js-' + felt}>{opplysning || sykmelding[felt]}</p>
        </SykmeldingOpplysning>);
    }
    return null
};