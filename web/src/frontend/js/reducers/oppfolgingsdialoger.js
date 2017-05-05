import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: {},
};

export default function oppfolgingsdialoger(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.OPPFOLGINGSDIALOGER_HENTET:
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        case actiontyper.HENTER_OPPFOLGINGSDIALOGER:
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        case actiontyper.HENT_OPPFOLGINGSDIALOGER_FEILET:
            return {
                data: {},
                henter: false,
                hentingFeilet: true,
            };
        default:
            return state;
    }
}
