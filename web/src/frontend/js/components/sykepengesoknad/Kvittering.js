import React from 'react';
import Sidetopp from '../Sidetopp';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';

const Kvittering = () => {
    return (<div>
        <Sidetopp tittel="Kvittering" />
        <div className="panel">
            <div className="hode hode--suksess">
                <h2 className="hode__tittel">{getLedetekst('sykepengesoknad.kvittering.tittel')}</h2>
                <div dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.kvittering.tekst')} />
            </div>
        </div>
        <article className="panel typo-infotekst ikke-print js-tilbakemelding">
            <h2 className="typo-undertittel">Hjelp oss å bli bedre</h2>
            <p className="typo-infotekst sist">Dette er en tjeneste som fortsatt er under utvikling. Gi oss tilbakemelding slik at vi kan bli bedre!</p>
            <div className="knapperad">
                <a target="_blank" href="https://www.survey-xact.no/LinkCollector?key=Z6ML2MRQC5CJ" className="rammeknapp rammeknapp--mini">Gi tilbakemelding</a>
            </div>
        </article>
    </div>);
};

export default Kvittering;
