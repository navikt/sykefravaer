import Alertstripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { getLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';

const HarAlleredeOppfolgingAlertstripe = () => {
    return (
        <Alertstripe type="suksess" className="alleredeOppfolging blokk">
            <div className="alleredeOppfolging__innhold">
                <Normaltekst className="alleredeOppfolging__tekst">{getLedetekst('infoside-fo.alertstripe.tekst')}</Normaltekst>
                <a className="lenke" href="/veientilarbeid">
                    {getLedetekst('infoside-fo.alertstripe.knapp-tekst')}
                </a>
            </div>
        </Alertstripe>
    );
};

export default HarAlleredeOppfolgingAlertstripe;
