import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { getLedetekst } from 'digisyfo-npm';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import React from 'react';
import history from '../../history';

const handleNeiBtnClicked = () => {
    // TODO: Legg til API-kall for å registrere knappetrykk
    history.push('/sykefravaer');
};

const handleJaBtnClicked = () => {
    // TODO: Legg til API-kall for å registrere knappetrykk
    window.location.href = '/arbeidssokerregistrering/?fraSykefravaer=true';
};

const TrengerMerVeiledningRad = () => {
    return (
        <div className="infoside-fo__rad infoside-fo__rad--graa">
            <div className="begrensning">
                <Undertittel className="blokk-s">{getLedetekst('infoside-fo.veiledning.overskrift')}</Undertittel>
                <Normaltekst className="blokk-xs">{getLedetekst('infoside-fo.veiledning.tekst')}</Normaltekst>
                <div className="infoside-fo__knapperad">
                    <Knapp onClick={handleNeiBtnClicked}>
                        {getLedetekst('infoside-fo.knapp-nei')}
                    </Knapp>
                    <Hovedknapp onClick={handleJaBtnClicked}>
                        {getLedetekst('infoside-fo.knapp-ja')}
                    </Hovedknapp>
                </div>
            </div>
        </div>
    );
};

export default TrengerMerVeiledningRad;
