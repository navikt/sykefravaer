import React from 'react';

export const SykmeldingCheckbox = ({ tekst, jsClassName, className }) => {
    return <p className={'sykmelding-checkbox' + ( className ? ' ' + className : '' ) + ' js-' + jsClassName}>	
                <img src="/sykefravaer/img/svg/check-box-1.svg" className="ikon" alt="Avkrysset" />
                <img src="/sykefravaer/img/svg/check-box-1-highcontrast.svg" className="ikon-hoykontrast" alt="Avkrysset" />
                <span className="label">
                	{tekst}
                </span>
            </p>
}

export const SykmeldingCheckboxSelvstendig = ({ tekst, jsClassName }) => {
	return (<SykmeldingCheckbox tekst={tekst} jsClassName={jsClassName} className="typo-element" />);
};

