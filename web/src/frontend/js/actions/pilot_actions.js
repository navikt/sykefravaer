export const hentPilotSykepenger = (sykmeldingId) => {
    return {
        type: 'HENT_PILOT_SYKEPENGER_FORESPURT',
        sykmeldingId,
    };
};

export const henterPilotSykepenger = () => {
    return {
        type: 'HENTER_PILOT_SYKEPENGER',
    };
};

export const pilotSykepengerHentet = (erPilot) => {
    return {
        type: 'PILOT_SYKEPENGER_HENTET',
        data: {
            pilotSykepenger: erPilot,
        },
    };
};

export const hentPilotSykepengerFeilet = () => {
    return {
        type: 'HENT_PILOT_SYKEPENGER_FEILET',
    };
};
