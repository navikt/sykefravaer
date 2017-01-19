import * as actiontyper from './actiontyper';

export function hentAktuelleArbeidsgivereFeilet(sykmeldingId) {
    return {
        type: actiontyper.HENT_AKTUELLE_ARBEIDSGIVERE_FEILET,
        sykmeldingId,
    };
}

export function henterAktuelleArbeidsgivere(sykmeldingId) {
    return {
        type: actiontyper.HENTER_AKTUELLE_ARBEIDSGIVERE,
        sykmeldingId,
    };
}

export function setAktuelleArbeidsgivere(sykmeldingId, arbeidsgivere) {
    return {
        type: actiontyper.SET_AKTUELLE_ARBEIDSGIVERE,
        sykmeldingId,
        arbeidsgivere,
    };
}

export function hentAktuelleArbeidsgivere(sykmeldingId) {
    return {
        type: actiontyper.HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT,
        sykmeldingId,
    };
}
