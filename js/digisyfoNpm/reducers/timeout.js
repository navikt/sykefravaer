import * as actiontyper from '../actions/actiontyper';

const STANDARD_TIMEOUT = 30;
const VIS_TIMEOUTBOKS_MINUTTER_FOER_UTLOGGING = 5;
export const MILLIES_MELLOM_VIS_BOKS_OG_TIMEOUT = VIS_TIMEOUTBOKS_MINUTTER_FOER_UTLOGGING * 60 * 1000;

const hentErInnloggetTil = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + STANDARD_TIMEOUT);
    return date;
};

const erBrukerUtlogget = (state) => {
    return state.erInnloggetTil.getTime() - new Date().getTime() < 0;
};

const erBrukerSnartUtlogget = (state) => {
    return state.erInnloggetTil.getTime() - new Date().getTime() - MILLIES_MELLOM_VIS_BOKS_OG_TIMEOUT < 0;
};

const initiellState = {
    erInnloggetTil: hentErInnloggetTil(),
    brukerSnartUtlogget: false,
};

export default function timeout(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontyper.FORLENG_INNLOGGET_SESJON: {
            return Object.assign({}, state, {
                erInnloggetTil: hentErInnloggetTil(),
                brukerSnartUtlogget: false,
            });
        }
        case actiontyper.SNART_UTLOGGET: {
            return Object.assign({}, state, {
                brukerSnartUtlogget: true,
            });
        }
        case actiontyper.SJEKK_INNLOGGINGSSESJON: {
            if (erBrukerUtlogget(state)) {
                window.location = '/esso/logout';
            }
            return Object.assign({}, state, {
                brukerSnartUtlogget: erBrukerSnartUtlogget(state),
            });
        }
        default: {
            return state;
        }
    }
}
