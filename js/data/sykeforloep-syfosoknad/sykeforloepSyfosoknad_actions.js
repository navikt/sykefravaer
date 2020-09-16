export const HENT_SYKEFORLOEP_SYFOSOKNAD_FORESPURT = 'HENT_SYKEFORLOEP_SYFOSOKNAD_FORESPURT';
export const HENTER_SYKEFORLOEP_SYFOSOKNAD = 'HENTER_SYKEFORLOEP_SYFOSOKNAD';
export const SYKEFORLOEP_SYFOSOKNAD_HENTET = 'SYKEFORLOEP_SYFOSOKNAD_HENTET';
export const HENT_SYKEFORLOEP_SYFOSOKNAD_FEILET = 'HENT_SYKEFORLOEP_SYFOSOKNAD_FEILET';

export function hentSykeforloepSyfosoknad() {
    return {
        type: HENT_SYKEFORLOEP_SYFOSOKNAD_FORESPURT,
    };
}

export function henterSykeforloepSyfosoknad() {
    return {
        type: HENTER_SYKEFORLOEP_SYFOSOKNAD,
    };
}

export function sykeforloepSyfosoknadHentet(data) {
    return {
        type: SYKEFORLOEP_SYFOSOKNAD_HENTET,
        data,
    };
}

export function hentSykeforloepSyfosoknadFeilet() {
    return {
        type: HENT_SYKEFORLOEP_SYFOSOKNAD_FEILET,
    };
}
