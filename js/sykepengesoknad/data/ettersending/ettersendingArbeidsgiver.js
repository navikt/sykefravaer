/* eslint arrow-body-style: ["error", "as-needed"] */
export const ETTERSEND_SOKNAD_ARBG_FORESPURT = 'ETTERSEND_SOKNAD_ARBG_FORESPURT';
export const ETTERSENDER_SOKNAD_ARBG = 'ETTERSENDER_SOKNAD_ARBG';
export const ETTERSEND_SOKNAD_ARBG_FEILET = 'ETTERSEND_SOKNAD_ARBG_FEILET';
export const SOKNAD_ETTERSENDT_ARBG = 'SOKNAD_ETTERSENDT_ARBG';

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

export const ettersendSoknadTilArbeidsgiver = soknad => ({
    type: ETTERSEND_SOKNAD_ARBG_FORESPURT,
    soknad,
});

export const ettersenderSoknadTilArbeidsgiver = () => ({
    type: ETTERSENDER_SOKNAD_ARBG,
});

export const ettersendSoknadTilArbeidsgiverFeilet = () => ({
    type: ETTERSEND_SOKNAD_ARBG_FEILET,
});

export const soknadEttersendtTilArbeidsgiver = () => ({
    type: SOKNAD_ETTERSENDT_ARBG,
});

export default (state = initiellState, action = {}) => {
    switch (action.type) {
        case ETTERSENDER_SOKNAD_ARBG: {
            return {
                ...state,
                sender: true,
                sendingFeilet: false,
            };
        }
        case SOKNAD_ETTERSENDT_ARBG: {
            return {
                ...state,
                sender: false,
                sendingFeilet: false,
            };
        }
        case ETTERSEND_SOKNAD_ARBG_FEILET: {
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
