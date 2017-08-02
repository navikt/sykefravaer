import * as actiontyper from '../actions/actiontyper';

export default function arbeidsgiverperiodeberegning(state = {}, action = {}) {
    switch (action.type) {
        case actiontyper.HENTER_ARBEIDSGIVERPERIODEBEREGNING: {
            return {
                henter: true,
                hentingFeilet: false,
                data: null,
            };
        }
        case actiontyper.ARBEIDSGIVERPERIODEBEREGNING_HENTET: {
            return {
                henter: false,
                hentingFeilet: false,
                data: action.arbeidsgiverperiodeberegning,
            };
        }
        case actiontyper.HENT_ARBEIDSGIVERPERIODEBEREGNING_FEILET: {
            return {
                henter: false,
                hentingFeilet: true,
                data: null,
            };
        }
        default: {
            return state;
        }
    }
}
