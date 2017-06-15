import React from 'react';
import NaermesteLedereContainer from '../../containers/NaermesteLedereContainer';
import { getLedetekst } from 'digisyfo-npm';

const DinSituasjon = () => {
    return (<div className="landingspanel landingspanel--dinSituasjon">
        <header className="landingspanel__header">
            <img className="landingspanel__ikon" src="/sykefravaer/img/svg/landingsside/hjerte.svg" alt="Hjerte" />
            <h2 className="landingspanel__tittel">{getLedetekst('din-situasjon.tittel')}</h2>
        </header>
        <div className="panel">
            <NaermesteLedereContainer />
        </div>
    </div>);
};

export default DinSituasjon;
