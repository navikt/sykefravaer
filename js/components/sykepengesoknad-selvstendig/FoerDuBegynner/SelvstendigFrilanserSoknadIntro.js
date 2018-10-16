import React from 'react';
import { getHtmlLedetekst } from 'digisyfo-npm';
import IllustrertInnhold from '../../IllustrertInnhold';

const SelvstendigFrilanserSoknadIntro = () => {
    return (
        <div className="panel blokk">
            <IllustrertInnhold
                ikon="/sykefravaer/img/svg/foerste-soknad.svg"
                ikonAlt="Din første digitale søknad om sykepenger"
                liten>
                <div
                    className="redaksjonelt-innhold"
                    dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.soknad-intro-selvstendig.personvern')} />
            </IllustrertInnhold>
        </div>);
};

export default SelvstendigFrilanserSoknadIntro;
