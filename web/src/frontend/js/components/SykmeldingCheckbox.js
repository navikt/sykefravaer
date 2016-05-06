import React from 'react';

export const SykmeldingCheckbox = ({ tekst, jsClassName, className }) => {
    return <p className={'sykmelding-checkbox' + ( className ? ' ' + className : '' ) + ' js-' + jsClassName}>
                <img src="/sykefravaer/img/svg/check-box-1.svg" alt="Avkrysset" />
                {tekst}
            </p>
}

export const SykmeldingCheckboxSelvstendig = ({ tekst, jsClassName }) => {
	return (<SykmeldingCheckbox tekst={tekst} jsClassName={jsClassName} selvstendig={true} />);
};
