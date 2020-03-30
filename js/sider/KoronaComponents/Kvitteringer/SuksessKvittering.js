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
                Egenmeldingen opprettes hvert øyeblikk. Du kan gå tilbake til hovedsiden: Ditt sykefravær, for å se om den er klar.
                <br />
                <br />
                Enkelte ganger kan det ta litt lengre tid. Uansett vil du bli varslet over sms eller e-post straks den er klar og kan fylles ut av deg.
                <br />
                <br />
                <Knapp onClick={() => { return history.push(`${process.env.REACT_APP_CONTEXT_ROOT}`); }}>Til ditt sykefravær</Knapp>
            </Bjorn>
        </div>

    );
};

export default SuksessKvittering;
