import * as actiontyper from './actiontyper';

export function hentArbeidsgiverperiodeberegning(sykepengesoknad) {
    return {
        type: actiontyper.HENT_ARBEIDSGIVERPERIODEBEREGNING_FORESPURT,
        sykepengesoknad,
    };
}

export function henterArbeidsgiverperiodeberegning() {
    return {
        type: actiontyper.HENTER_ARBEIDSGIVERPERIODEBEREGNING,
    };
}

export function arbeidsgiverperiodeberegningHentet(arbeidsgiverperiodeberegning) {
    return {
        type: actiontyper.ARBEIDSGIVERPERIODEBEREGNING_HENTET,
        arbeidsgiverperiodeberegning,
    };
}

export function arbeidsgiverperiodeberegningFeilet() {
    return {
        type: actiontyper.HENT_ARBEIDSGIVERPERIODEBEREGNING_FEILET,
    };
}
