import * as actiontyper from './actiontyper';

export function hentAlleArbeidsgivere() {
    return {
        type: actiontyper.HENT_ALLE_ARBEIDSGIVERE_FORESPURT,
    };
}

export function henterAlleArbeidsgivere() {
    return {
        type: actiontyper.HENTER_ALLE_ARBEIDSGIVERE,
    };
}
export function alleArbeidsgivereHentet(data = []) {
    return {
        type: actiontyper.ALLE_ARBEIDSGIVERE_HENTET,
        data,
    };
}

export function hentAlleArbeidsgivereFeilet() {
    return {
        type: actiontyper.HENT_ALLE_ARBEIDSGIVERE_FEILET,
    };
}
