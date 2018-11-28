import React from 'react';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import IllustrertInnhold from '../../IllustrertInnhold';

const ForsteSelvstendigFrilanserSoknadIntro = () => {
    return (<div className="panel blokk">
        <div className="blokk--s">
            <IllustrertInnhold
                ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/foerste-soknad.svg`}
                ikonAlt="Din første digitale søknad om sykepenger"
                liten>
                <h2 className="panel__tittel sist">{getLedetekst('sykepengesoknad.foerste-selvstendig-soknad.tittel')}</h2>
            </IllustrertInnhold>
        </div>
        <div
            className="redaksjonelt-innhold"
            dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.foerste-selvstendig-soknad.mer')} />
    </div>);
};

export default ForsteSelvstendigFrilanserSoknadIntro;
