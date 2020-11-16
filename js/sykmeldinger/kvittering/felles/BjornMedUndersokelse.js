import React from 'react';
import { Bjorn } from '@navikt/digisyfo-npm';

const BjornMedUndersokelse = () => {
    return (
        <Bjorn className="blokk" hvit stor>
            <h2>
                Har du fått denne sykmeldingen via video, telefon eller gjennom en melding?
            </h2>
            <p>
      Nasjonalt senter for e-helseforskning vil gjerne høre om dine erfaringer
      med å få sykmelding uten å møte opp på legekontoret. Velkommen til å
      besvare noen spørsmål, det tar mindre enn fem minutter. Besvarelsen er
      helt anonym.
            </p>
            <p>
                <a
                    href="https://response.questback.com/isa/qbv.dll/ShowQuest?questid=5511835&sid=HWfcgPoSbG"
                    target="_blank"
                    rel="noopener noreferrer"
                >
        Trykk her for å svare på undersøkelsen
                </a>
            </p>
        </Bjorn>
    );
};

export default BjornMedUndersokelse;
