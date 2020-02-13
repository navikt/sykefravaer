import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

const AvventendeSykmeldingKvittering = () => {
    return (
        <div className="panel blokk js-kvittering js-kvittering--sok-naa-frilanser">
            <Systemtittel style={{ marginBottom: '1rem' }}>Avventende sykmelding er sendt</Systemtittel>
            <Normaltekst>Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det blir lagt til rette for deg på arbeidsplassen.</Normaltekst>
        </div>
    );
};

export default AvventendeSykmeldingKvittering;
