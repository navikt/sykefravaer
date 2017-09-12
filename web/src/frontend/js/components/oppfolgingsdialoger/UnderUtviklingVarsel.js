import React from 'react';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';

const UnderUtviklingVarsel = () => {
    return (<div className="panel typo-infotekst blokk--l underUtvikling underUtvikling--erSynlig">
        <Varselstripe ikon={`${getContextRoot()}/img/svg/underUtviklingVarsel.svg`}>
            <p className="sist">{getLedetekst('under-utvikling.varsel.tekst')}</p>
        </Varselstripe>
    </div>);
};

export default UnderUtviklingVarsel;
