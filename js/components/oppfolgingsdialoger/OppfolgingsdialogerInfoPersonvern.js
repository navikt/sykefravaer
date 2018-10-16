import React from 'react';
import {
    getHtmlLedetekst,
    keyValue,
} from 'digisyfo-npm';

const OppfolgingsdialogerInfoPersonvern = (
    {
        ledetekster,
    }) => {
    return (<div
        className="oppfolgingsdialogerInfoPersonvern"
        dangerouslySetInnerHTML={getHtmlLedetekst('oppfolgingsdialog.oppfolgingsdialogerInfoPersonvern.at', ledetekster)}
    />);
};
OppfolgingsdialogerInfoPersonvern.propTypes = {
    ledetekster: keyValue,
};

export default OppfolgingsdialogerInfoPersonvern;
