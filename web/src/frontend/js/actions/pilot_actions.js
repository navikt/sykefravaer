import * as actiontyper from './actiontyper';

export const hentPilotSykepenger = (sykmeldingId) => {
    return {
        type: actiontyper.HENT_PILOT_SYKEPENGER_FORESPURT,
        sykmeldingId,
    };
};

export const henterPilotSykepenger = () => {
    return {
        type: actiontyper.HENTER_PILOT_SYKEPENGER,
    };
};

export const pilotSykepengerHentet = (erPilot, sykmeldingId) => {
    return {
        type: actiontyper.PILOT_SYKEPENGER_HENTET,
        data: {
            pilotSykepenger: erPilot,
            sykmeldingId,
        },
    };
};

export const hentPilotSykepengerFeilet = () => {
    return {
        type: actiontyper.HENT_PILOT_SYKEPENGER_FEILET,
    };
};
