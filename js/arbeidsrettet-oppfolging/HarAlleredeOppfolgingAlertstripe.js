import Alertstripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { getLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';

const HarAlleredeOppfolgingAlertstripe = () => {
    const urlVeientilarbeid = process.env.NAIS_CLUSTER_NAME === 'dev-sbs'
        ? 'https://veientilarbeid-q.nav.no'
        : 'https://veientilarbeid.nav.no';
    return (
        <Alertstripe type="suksess" className="alleredeOppfolging blokk">
            <div className="alleredeOppfolging__innhold">
                <Normaltekst className="alleredeOppfolging__tekst">{getLedetekst('infoside-fo.alertstripe.tekst')}</Normaltekst>
                <a className="lenke" href={urlVeientilarbeid}>
                    {getLedetekst('infoside-fo.alertstripe.knapp-tekst')}
                </a>
            </div>
        </Alertstripe>
    );
};

export default HarAlleredeOppfolgingAlertstripe;
