import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';

export const FrilanserSelvstendigKvitteringstegEn = () => {
    return (<Kvitteringsteg
        nummer="1"
        ok
        tittel={getLedetekst('bekreft-sykmelding.kvittering.digital-soknad.steg-1.tittel')}>
        <HtmlAvsnitt
            tag="div"
            nokkel="bekreft-sykmelding.kvittering.digital-soknad.steg-1.tekst" />
    </Kvitteringsteg>);
};

export default () => {
    const sokUrl = `${window.APP_SETTINGS.APP_ROOT}/soknader`;
    return (<div className="panel blokk js-kvittering js-kvittering--sok-naa-frilanser">
        <div className="stegvisKvittering">
            <FrilanserSelvstendigKvitteringstegEn />
            <Kvitteringsteg
                nummer="2"
                aktiv
                tittel={getLedetekst('bekreft-sykmelding.kvittering.sok-na.steg-2.tittel')}>
                <HtmlAvsnitt
                    tag="div"
                    nokkel="bekreft-sykmelding.kvittering.sok-na.steg-2.tekst" />
                <p className="kvitteringsteg__handling">
                    <Link
                        to={sokUrl}
                        className="js-sok knapp">{getLedetekst('sykmelding.kvittering.sok-na.steg-2.knapp')}</Link>
                </p>
                <HtmlAvsnitt
                    nokkel="sykmelding.kvittering.sok-na.papir.tekst" />
            </Kvitteringsteg>
        </div>
    </div>);
};
