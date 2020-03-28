import React from 'react';
import LenkeTilDineSykmeldinger from '../../components/LenkeTilDineSykmeldinger';
import Kvitteringsteg, {
    StegvisKvittering,
} from '../../sykmeldinger/kvittering/felles/Kvitteringsteg';
import Side from '../Side';

const brodsmuler = [
    {
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: '16-dagers koronamelding',
        sti: '/egensykmelding',
        erKlikkbar: true,
    },
    {
        tittel: 'Kvittering',
    },
];

const KoronaKvittering = () => {
    return (
        <Side
            tittel="Hva nå?"
            brodsmuler={brodsmuler}
            laster={false}
        >
            <div>
                <div className="panel blokk">
                    <StegvisKvittering>
                        <Kvitteringsteg nummer="1" ok tittel="Sykmeldingen opprettes">
                            <p>
                            Det kan ta noen få minutter før sykmeldingen er opprettet. Vi
                            varsler deg så fort den er klar.
                            </p>
                        </Kvitteringsteg>
                        <Kvitteringsteg nummer="2" tittel="Bekreft og send inn sykmeldingen">
                            <p>Bekreft at informasjonen i sykmeldingen er riktig.</p>
                        </Kvitteringsteg>
                        <Kvitteringsteg nummer="3" tittel="Senere kan du søke om sykepenger">
                            <p>
                            Når sykmeldingsforløpet er ferdig aktiveres søknad om sykepenger.
                            Du kan se når du kan fylle ut søknaden om sykepenger under
                            planlagte søknader
                            </p>
                        </Kvitteringsteg>
                    </StegvisKvittering>
                </div>
                <LenkeTilDineSykmeldinger />
            </div>
        </Side>

    );
};

export default KoronaKvittering;
