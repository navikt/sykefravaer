import React from 'react';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import IllustrertInnhold from '../../IllustrertInnhold';

const ForsteSoknadIntro = () => {
    return (<div className="panel blokk">
        <div className="blokk--s">
            <IllustrertInnhold
                ikon="/sykefravaer/img/svg/foerste-soknad.svg"
                ikonAlt="Din første digitale søknad om sykepenger"
                liten>
                <h2 className="panel__tittel sist">{getLedetekst('sykepengesoknad.foerste-soknad.tittel')}</h2>
            </IllustrertInnhold>
        </div>
        <div
            className="redaksjonelt-innhold"
            dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.foerste-soknad.mer_v2')} />
    </div>);
};

export default ForsteSoknadIntro;
