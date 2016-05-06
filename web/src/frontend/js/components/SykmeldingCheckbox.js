import React from 'react';

export const SykmeldingCheckbox = ({ tekst, jsClassName, className }) => {
    return <p className={'sykmelding-checkbox' + ( className ? ' ' + className : '' ) + ' js-' + jsClassName}>	
                <img src="/sykefravaer/img/svg/check-box-1.png" className="ikon" alt="Huket av" />
                <img src="/sykefravaer/img/svg/check-box-1-highcontrast.png" className="ikon-hoykontrast" alt="Huket av" />
                <span className="label">
                	{tekst}
                </span>
            </p>
}

export const SykmeldingCheckboxSelvstendig = ({ tekst, jsClassName }) => {
	return (<SykmeldingCheckbox tekst={tekst} jsClassName={jsClassName} className="typo-element" />);
};

