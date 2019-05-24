export const HENT_AKTUELLE_ARBEIDSGIVERE_FEILET = 'HENT_AKTUELLE_ARBEIDSGIVERE_FEILET';
export const HENTER_AKTUELLE_ARBEIDSGIVERE = 'HENTER_AKTUELLE_ARBEIDSGIVERE';
export const AKTUELLE_ARBEIDSGIVERE_HENTET = 'AKTUELLE_ARBEIDSGIVERE_HENTET';
export const HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT = 'HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT';

export function hentAktuelleArbeidsgivereFeilet(sykmeldingId) {
    return {
        type: HENT_AKTUELLE_ARBEIDSGIVERE_FEILET,
        sykmeldingId,
    };
}

export function henterAktuelleArbeidsgivere(sykmeldingId) {
    return {
        type: HENTER_AKTUELLE_ARBEIDSGIVERE,
        sykmeldingId,
    };
}

export function aktuelleArbeidsgivereHentet(sykmeldingId, arbeidsgivere) {
    return {
        type: AKTUELLE_ARBEIDSGIVERE_HENTET,
        sykmeldingId,
        arbeidsgivere,
    };
}

export function hentAktuelleArbeidsgivere(sykmeldingId) {
    return {
        type: HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT,
        sykmeldingId,
    };
}
