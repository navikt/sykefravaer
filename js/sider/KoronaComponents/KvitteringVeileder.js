import React from 'react';

import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import { Systemtittel } from 'nav-frontend-typografi';

const KvitteringVeileder = () => {
    return (
        <div
            style={{ marginTop: '4rem' }}>
            <Bjorn
                className="blokk"
                hvit
                stor>
                <Systemtittel style={{ fontSize: '1.5rem' }}>Vennligst vent</Systemtittel>
                <br />
                Vi oppretter koronameldingen innen noen få minutter. Du får en sms eller epost straks den er klar og kan fylles ut av deg.
                <br />
                <br />
                Beklager at det blir litt dobbelt opp! Men vi må følge den vanlige sløyfa for sykmeldinger slik situasjonen er nå.
            </Bjorn>
        </div>
    );
};

export default KvitteringVeileder;
