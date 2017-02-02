import React from 'react';
import Sidetopp from '../Sidetopp';

const Kvittering = () => {
    return (<div>
        <Sidetopp tittel="Kvittering" />
        <div className="panel">
            <h2 className="hode hode-suksess hode-dekorert">Søknaden er sendt til arbeidsgiveren din</h2>
            <p>Søknaden er sendt til arbeidsgiveren din via Altinn. Arbeidsgiveren vil ved behov videresende søknaden til NAV. Si 
            gjerne fra til arbeidsgiveren din at du har sendt søknaden siden dette foreløpig er nytt for alle.</p>
            <p>Du trenger ikke å sende inn del D av sykmeldingen på papir, med mindre arbeidsgiveren eller NAV senere ber deg om det.</p>
        </div>
    </div>)
}

export default Kvittering;
