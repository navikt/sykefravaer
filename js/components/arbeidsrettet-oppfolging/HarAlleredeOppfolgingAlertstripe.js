import Alertstripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { getLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';

const HarAlleredeOppfolgingAlertstripe = () => {
    return (
        <div className="begrensning infoside-fo__alertstripe">
            <Alertstripe type="suksess">
                <div className="infoside-fo__alertstripe--innhold">
                    <Normaltekst className="infoside-fo__alertstripe--tekst">{getLedetekst('infoside-fo.alertstripe.tekst')}</Normaltekst>
                    <a className="knapp knapp--hoved infoside-fo__alertstripe--knapp" href="/veientilarbeid">
                        {getLedetekst('infoside-fo.alertstripe.knapp-tekst')}
                    </a>
                </div>
            </Alertstripe>
        </div>
    );
};

export default HarAlleredeOppfolgingAlertstripe;
