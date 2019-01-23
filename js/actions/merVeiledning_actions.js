export const BEKREFT_MER_VEILEDNING_FORESPURT = 'BEKREFT_MER_VEILEDNING_FORESPURT';
const BEKREFTER_MER_VEILEDNING = 'BEKREFTER_MER_VEILEDNING';
const BEKREFT_MER_VEILEDNING_FEILET = 'BEKREFT_MER_VEILEDNING_FEILET';
const MER_VEILEDNING_BEKREFTET = 'MER_VEILEDNING_BEKREFTET';


export function bekreftMerVeiledning(hendelseIder, callback) {
    return {
        type: BEKREFT_MER_VEILEDNING_FORESPURT,
        hendelseIder,
        callback,
    };
}

export function bekrefterMerVeiledning() {
    return {
        type: BEKREFTER_MER_VEILEDNING,
    };
}

export function bekreftMerVeiledningFeilet() {
    return {
        type: BEKREFT_MER_VEILEDNING_FEILET,
    };
}

export function merVeiledningBekreftet() {
    return {
        type: MER_VEILEDNING_BEKREFTET,
    };
}
