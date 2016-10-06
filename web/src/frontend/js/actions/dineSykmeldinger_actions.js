import fetch from 'isomorphic-fetch';

export function henterDineSykmeldinger() {
    return {
        type: 'HENTER_DINE_SYKMELDINGER',
    };
}

export function hentDineSykmeldingerFeilet() {
    return {
        type: 'HENT_DINE_SYKMELDINGER_FEILET',
    };
}

export function setDineSykmeldinger(sykmeldinger = []) {
    return {
        type: 'SET_DINE_SYKMELDINGER',
        sykmeldinger,
    };
}

export function sorterSykmeldinger(kriterium, status) {
    return {
        type: 'SET_SORTERING',
        kriterium,
        status,
    };
}

export function hentDineSykmeldinger() {
    return {
        type: 'HENT_DINE_SYKMELDINGER_FORESPURT',
    };
}
