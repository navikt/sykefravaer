import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import Side from '../Side';
import KvitteringVeileder from './KvitteringVeileder';

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
        tittel: 'Koronamelding opprettes',
    },
];

const KoronaKvittering = () => {
    return (
        <Side
            tittel="Koronameldingen opprettes"
            brodsmuler={brodsmuler}
            laster={false}
        >
            <Sidetittel tag="h1" style={{ marginBottom: '3rem', textAlign: 'center' }}>Koronameldingen opprettes</Sidetittel>
            <KvitteringVeileder />
        </Side>

    );
};

export default KoronaKvittering;
