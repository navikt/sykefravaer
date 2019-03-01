import * as actiontyper from '../../../actions/actiontyper';

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

export function aktuelleArbeidsgivereHentet(sykmeldingId, arbeidsgivere) {
    return {
        type: actiontyper.AKTUELLE_ARBEIDSGIVERE_HENTET,
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
