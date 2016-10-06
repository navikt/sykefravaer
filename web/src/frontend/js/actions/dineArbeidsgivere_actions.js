import fetch from 'isomorphic-fetch';

export function hentAktuelleArbeidsgivereFeilet(sykmeldingId) {
    return {
        type: 'HENT_AKTUELLE_ARBEIDSGIVERE_FEILET',
        sykmeldingId,
    };
}

export function henterAktuelleArbeidsgivere(sykmeldingId) {
    return {
        type: 'HENTER_AKTUELLE_ARBEIDSGIVERE',
        sykmeldingId,
    };
}

export function setAktuelleArbeidsgivere(sykmeldingId, arbeidsgivere) {
    return {
        type: 'SET_AKTUELLE_ARBEIDSGIVERE',
        sykmeldingId,
        arbeidsgivere,
    };
}

export function hentAktuelleArbeidsgivere(sykmeldingId) {
    return {
        type: 'HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT',
        sykmeldingId,
    };
}
