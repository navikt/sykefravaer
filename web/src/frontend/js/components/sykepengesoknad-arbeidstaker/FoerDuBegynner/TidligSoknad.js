import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import IllustrertInnhold from '../../IllustrertInnhold';

const TidligSoknad = () => {
    return (<div className="panel panel--komprimert blokk">
        <IllustrertInnhold ikon="/sykefravaer/img/svg/snomannen.svg" ikonAlt="Tidlig søknad">
            <p className="sykepenger__tidligSoknad">{getLedetekst('sykepengesoknad.tidlig-soknad')}</p>
        </IllustrertInnhold>
    </div>);
};

export default TidligSoknad;
