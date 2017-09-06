import React from 'react';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';

const UnderUtviklingVarsel = () => {
    return (<div className="panel typo-infotekst blokk--l underUtvikling underUtvikling--erSynlig">
        <Varselstripe>
            <p className="sist">{getLedetekst('under-utvikling.varsel.tekst')}</p>
        </Varselstripe>
    </div>);
};

export default UnderUtviklingVarsel;
