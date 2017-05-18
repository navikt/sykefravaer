import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};

export default function allearbeidsgivere(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontyper.HENTER_ALLE_ARBEIDSGIVERE: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontyper.ALLE_ARBEIDSGIVERE_HENTET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                data: action.data,
            });
        }
        case actiontyper.HENT_ALLE_ARBEIDSGIVERE_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
            });
        }
        default: {
            return state;
        }
    }
}
