import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import BjornMedUndersokelse from '../felles/BjornMedUndersokelse';

const AvventendeSykmeldingKvittering = () => {
    return (
        <React.Fragment>
            <div className="panel blokk js-kvittering js-kvittering--sok-naa-frilanser">
                <Normaltekst>Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det blir lagt til rette for deg på arbeidsplassen.</Normaltekst>
            </div>
            <BjornMedUndersokelse />
        </React.Fragment>
    );
};

export default AvventendeSykmeldingKvittering;
