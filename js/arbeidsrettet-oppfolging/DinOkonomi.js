import { Utvidbar } from '@navikt/digisyfo-npm';
import React from 'react';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const DinOkonomi = () => {
    return (
        <ArbeidsrettetOppfolgingRad tittel="Hvordan blir økonomien din?">
            <p>Hvis du ikke kan gå tilbake i jobb før sykepengene tar slutt, kan du ha behov for arbeidsavklaringspenger (AAP) eller annen økonomisk støtte fra NAV.</p>
            <Utvidbar tittel="Arbeidsavklaringspenger" className="blokk--s">
                <p>Blabla</p>
            </Utvidbar>
            <Utvidbar tittel="Friskmelding til arbeidsformidling">
                <p>Blabla</p>
            </Utvidbar>
        </ArbeidsrettetOppfolgingRad>
    );
};

export default DinOkonomi;
