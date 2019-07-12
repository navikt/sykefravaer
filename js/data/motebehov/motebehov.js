import {
    HENT_MOTEBEHOV_FEILET,
    HENT_MOTEBEHOV_FORBUDT,
    HENT_MOTEBEHOV_HENTER,
    HENT_MOTEBEHOV_HENTET,
    SVAR_MOTEBEHOV_SENDT,
} from './motebehov_actions';

export const sorterMotebehovEtterNyeste = motebehovListe => [...motebehovListe]
    .filter(element => element.aktorId === element.opprettetAv)
    .sort((t1, t2) => t2.opprettetDato - t1.opprettetDato);

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    hentingForbudt: false,
    hentingForsokt: false,
    data: [],
};

export default function motebehov(state = initiellState, action = {}) {
    switch (action.type) {
        case HENT_MOTEBEHOV_HENTER: {
            return {
                ...state,
                henter: true,
                hentet: false,
                hentingFeilet: false,
                hentingForbudt: false,
                hentingForsokt: false,
                data: [],
            };
        }
        case HENT_MOTEBEHOV_HENTET: {
            return {
                ...state,
                henter: false,
                hentet: true,
                hentingForsokt: true,
                data: action.data.length > 0 ? sorterMotebehovEtterNyeste(action.data) : [],
            };
        }
        case HENT_MOTEBEHOV_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
                hentingForsokt: true,
            };
        }
        case HENT_MOTEBEHOV_FORBUDT: {
            return {
                ...state,
                henter: false,
                hentingForbudt: true,
                hentingForsokt: true,
            };
        }
        case SVAR_MOTEBEHOV_SENDT: {
            const nyttMotebehov = {
                ...action.svar,
                virksomhetsnummer: action.virksomhetsnummer,
                opprettetDato: new Date(),
            };
            return {
                ...state,
                data: [nyttMotebehov, ...state.data],
            };
        }
        default:
            return state;
    }
}
