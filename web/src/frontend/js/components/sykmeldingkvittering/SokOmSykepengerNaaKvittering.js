import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';

export default () => {
    const sokUrl = `${window.APP_SETTINGS.APP_ROOT}/soknader`;
    return (<div className="panel blokk js-kvittering js-kvittering--sok-naa">
        <div className="stegvisKvittering">
            <Kvitteringsteg
                ikon="kvitteringhake.svg"
                alt="Grønn hake"
                tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-1.tittel')} />
            <Kvitteringsteg
                ikon="kvitteringSokSykepenger.svg"
                alt="Søk om sykepenger"
                tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-2.tittel')}>
                <HtmlAvsnitt
                    nokkel="sykmelding.kvittering.sok-na.steg-2.tekst" />
                <p className="kvitteringsteg__handling">
                    <Link
                        to={sokUrl}
                        className="js-sok knapp">{getLedetekst('sykmelding.kvittering.sok-na.steg-2.knapp')}</Link>
                </p>
            </Kvitteringsteg>
        </div>
    </div>);
};
