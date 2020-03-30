import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import { Knapp } from 'nav-frontend-knapper';
import history from '../../../history';

const SuksessKvittering = () => {
    return (
        <div>
            <Sidetittel tag="h1" style={{ marginBottom: '3rem', textAlign: 'center' }}>Egenmeldingen opprettes</Sidetittel>
            <Bjorn
                className="blokk"
                hvit
                stor>
                Egenmeldingen opprettes hvert øyeblikk. Enkelte ganger kan det ta litt tid, men du får en sms eller e-post straks den er klar til å fylles ut.
                <br />
                <br />
                Du kan gå hit for å se om den er klar:
                <br />
                <br />
                <Knapp onClick={() => { return history.push(`${process.env.REACT_APP_CONTEXT_ROOT}`); }}>Til ditt sykefravær</Knapp>
            </Bjorn>
        </div>

    );
};

export default SuksessKvittering;
