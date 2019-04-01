/* eslint arrow-body-style: ["error", "as-needed"] */
export const ETTERSEND_SOKNAD_NAV_FORESPURT = 'ETTERSEND_SOKNAD_NAV_FORESPURT';
export const ETTERSENDER_SOKNAD_NAV = 'ETTERSENDER_SOKNAD_NAV';
export const ETTERSEND_SOKNAD_NAV_FEILET = 'ETTERSEND_SOKNAD_NAV_FEILET';
export const SOKNAD_ETTERSENDT_NAV = 'SOKNAD_ETTERSENDT_NAV';

const initiellState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    hentet: false,
    sender: false,
    sendingFeilet: false,
    oppretterSoknad: false,
    opprettFeilet: false,
    avbryter: false,
    avbrytSoknadFeilet: false,
};

export const ettersendSoknadTilNav = soknad => ({
    type: ETTERSEND_SOKNAD_NAV_FORESPURT,
    soknad,
});

export const ettersenderSoknadTilNav = () => ({
    type: ETTERSENDER_SOKNAD_NAV,
});

export const ettersendSoknadTilNavFeilet = () => ({
    type: ETTERSEND_SOKNAD_NAV_FEILET,
});

export const soknadEttersendtTilNav = () => ({
    type: SOKNAD_ETTERSENDT_NAV,
});

export default (state = initiellState, action = {}) => {
    switch (action.type) {
        case ETTERSENDER_SOKNAD_NAV: {
            return {
                ...state,
                sender: true,
                sendingFeilet: false,
            };
        }
        case SOKNAD_ETTERSENDT_NAV: {
            return {
                ...state,
                sender: false,
                sendingFeilet: false,
            };
        }
        case ETTERSEND_SOKNAD_NAV_FEILET: {
            return {
                ...state,
                sender: false,
                sendingFeilet: true,
            };
        }
        default: {
            return state;
        }
    }
};
