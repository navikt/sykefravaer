import React from 'react';
import { SykmeldingOpplysning } from '../components/SykmeldingOpplysning.js';

export const getSykmeldingCheckbox = (sykmelding, felt, tekst, className) => {
    if(sykmelding[felt]) { 
        return (<p className={'sykmelding-checkbox js-' + (className || felt)}>
                <img src="/sykefravaer/img/svg/check-box-1.svg" alt="Avkrysset" />
                {tekst}
            </p>);
    }
    return '';
}

export const getSykmeldingOpplysning = (sykmelding, felt, tittel, opplysning) => {
    if (sykmelding[felt]) {
        return (<SykmeldingOpplysning tittel={tittel} Overskrift="H5">
            <p className={'js-' + felt}>{opplysning || sykmelding[felt]}</p>
        </SykmeldingOpplysning>);
    }
    return '';
};
