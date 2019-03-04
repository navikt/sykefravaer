import * as actiontyper from '../../../actions/actiontyper';

export default function forskutteringssporsmal(state = {}, action = {}) {
    switch (action.type) {
        case actiontyper.SJEKKER_SKAL_VISE_FORSKUTTERINGSSPORSMAL: {
            return {
                henter: true,
                hentingFeilet: false,
                visSporsmal: false,
            };
        }
        case actiontyper.SKAL_VISE_FORSKUTTERINGSSPORSMAL_SJEKKET: {
            return {
                henter: false,
                hentingFeilet: false,
                visSporsmal: action.visForkutteringssporsmal,
            };
        }
        case actiontyper.SJEKK_SKAL_VISE_FORSKUTTERINGSSPORSMAL_FEILET: {
            return {
                henter: false,
                hentingFeilet: true,
                visSporsmal: true,
            };
        }
        default: {
            return state;
        }
    }
}
