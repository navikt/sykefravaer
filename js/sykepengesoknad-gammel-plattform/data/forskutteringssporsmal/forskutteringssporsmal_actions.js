import * as actiontyper from '../../../actions/actiontyper';

export function sjekkSkalViseForskutteringssporsmal(sykepengesoknad) {
    return {
        type: actiontyper.SJEKK_SKAL_VISE_FORSKUTTERINGSSPORSMAL_FORESPURT,
        sykepengesoknad,
    };
}

export function sjekkerSkalViseForskutteringssporsmal() {
    return {
        type: actiontyper.SJEKKER_SKAL_VISE_FORSKUTTERINGSSPORSMAL,
    };
}

export function skalViseForskutteringssporsmalSjekket(visForkutteringssporsmal) {
    return {
        type: actiontyper.SKAL_VISE_FORSKUTTERINGSSPORSMAL_SJEKKET,
        visForkutteringssporsmal,
    };
}

export function sjekkSkalViseForskutteringssporsmalFeilet() {
    return {
        type: actiontyper.SJEKK_SKAL_VISE_FORSKUTTERINGSSPORSMAL_FEILET,
    };
}
