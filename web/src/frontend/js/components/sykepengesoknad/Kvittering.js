import React from 'react';
import Sidetopp from '../Sidetopp';

const Kvittering = () => {
    return (
    <div>
        <div>
            <Sidetopp tittel="Kvittering" />
            <div className="panel">
                <h2 className="hode hode-suksess hode-dekorert">Søknaden er sendt til arbeidsgiveren din</h2>
                <p>Søknaden er sendt til arbeidsgiveren din via Altinn. Arbeidsgiveren vil ved behov videresende søknaden til NAV. Si
                    gjerne fra til arbeidsgiveren din at du har sendt søknaden siden dette foreløpig er nytt for alle.</p>
                <p>Du trenger ikke å sende inn del D av sykmeldingen på papir, med mindre arbeidsgiveren eller NAV senere ber deg om det.</p>
            </div>
        </div>
        <article className="panel typo-infotekst ikke-print js-tilbakemelding">
            <h2 className="typo-undertittel">Hjelp oss å bli bedre</h2>
            <span className="typo-infotekst">Dette er en tjeneste som fortsatt er under utvikling. Gi oss tilbakemelding slik at vi kan bli bedre!</span>
            <div className="knapperad">
                <a target="_blank" href="https://www.survey-xact.no/LinkCollector?key=Z6ML2MRQC5CJ" className="rammeknapp rammeknapp--mini">Gi tilbakemelding</a>
            </div>
        </article>
    </div>);
};

export default Kvittering;
