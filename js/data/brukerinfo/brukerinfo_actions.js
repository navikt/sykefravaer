export const HENT_BRUKERINFO_FEILET = 'HENT_BRUKERINFO_FEILET';
export const HENTER_BRUKERINFO = 'HENTER_BRUKERINFO';
export const BRUKERINFO_HENTET = 'BRUKERINFO_HENTET';
export const SET_TIDSLINJE_ARBEIDSSITUASJON = 'SET_TIDSLINJE_ARBEIDSSITUASJON';
export const BRUKER_ER_INNLOGGET = 'BRUKER_ER_INNLOGGET';
export const BRUKER_ER_UTLOGGET = 'BRUKER_ER_UTLOGGET';
export const SJEKKER_INNLOGGING = 'SJEKKER_INNLOGGING';
export const SJEKK_INNLOGGING_FEILET = 'SJEKK_INNLOGGING_FEILET';
export const SJEKK_INNLOGGING_FORESPURT = 'SJEKK_INNLOGGING_FORESPURT';
export const HENT_BRUKERINFO_FORESPURT = 'HENT_BRUKERINFO_FORESPURT';
export const HENT_OPPFOLGING_FORESPURT = 'HENT_OPPFOLGING_FORESPURT';
export const HENTER_OPPFOLGING = 'HENTER_OPPFOLGING';
export const OPPFOLGING_HENTET = 'OPPFOLGING_HENTET';
export const HENT_OPPFOLGING_FEILET = 'HENT_OPPFOLGING_FEILET';
export const HENT_SYKMELDTINFODATA_FORESPURT = 'HENT_SYKMELDTINFODATA_FORESPURT';
export const HENTER_SYKMELDTINFODATA = 'HENTER_SYKMELDTINFODATA';
export const SYKMELDTINFODATA_HENTET = 'SYKMELDTINFODATA_HENTET';
export const HENT_SYKMELDTINFODATA_FEILET = 'HENT_SYKMELDTINFODATA_FEILET';

export function hentBrukerinfoFeilet() {
    return {
        type: HENT_BRUKERINFO_FEILET,
    };
}

export function henterBrukerinfo() {
    return {
        type: HENTER_BRUKERINFO,
    };
}

export function brukerinfoHentet(brukerinfo = {}) {
    return {
        type: BRUKERINFO_HENTET,
        data: brukerinfo,
    };
}

export function setArbeidssituasjon(arbeidssituasjon) {
    return {
        type: SET_TIDSLINJE_ARBEIDSSITUASJON,
        arbeidssituasjon,
    };
}

export function setErInnlogget() {
    return {
        type: BRUKER_ER_INNLOGGET,
    };
}

export function setErUtlogget() {
    return {
        type: BRUKER_ER_UTLOGGET,
    };
}

export function sjekkerInnlogging() {
    return {
        type: SJEKKER_INNLOGGING,
    };
}

export function sjekkInnlogging() {
    return {
        type: SJEKK_INNLOGGING_FORESPURT,
    };
}

export function sjekkInnloggingFeilet() {
    return {
        type: SJEKK_INNLOGGING_FEILET,
    };
}

export function hentBrukerinfo() {
    return {
        type: HENT_BRUKERINFO_FORESPURT,
    };
}

export function hentOppfolging() {
    return {
        type: HENT_OPPFOLGING_FORESPURT,
    };
}

export function henterOppfolging() {
    return {
        type: HENTER_OPPFOLGING,
    };
}

export function oppfolgingHentet(data) {
    return {
        type: OPPFOLGING_HENTET,
        data,
    };
}

export function hentOppfolgingFeilet() {
    return {
        type: HENT_OPPFOLGING_FEILET,
    };
}


export function hentSykmeldtinfodata() {
    return {
        type: HENT_SYKMELDTINFODATA_FORESPURT,
    };
}

export function henterSykmeldtinfodata() {
    return {
        type: HENTER_SYKMELDTINFODATA,
    };
}

export function sykmeldtInfodataHentet(data) {
    return {
        type: SYKMELDTINFODATA_HENTET,
        data,
    };
}

export function hentSykmeldtinfodataFeilet() {
    return {
        type: HENT_SYKMELDTINFODATA_FEILET,
    };
}
