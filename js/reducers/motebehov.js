import { actiontyper as moteActiontyper } from 'moter-npm';

export const sorterMotebehovEtterNyeste = (motebehovListe) => {
    return [...motebehovListe].filter((element) => {
        return element.aktorId === element.opprettetAv;
    }).sort((t1, t2) => {
        return t2.opprettetDato - t1.opprettetDato;
    });
};

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    hentingForbudt: false,
    data: [],
};

export default function motebehov(state = initiellState, action = {}) {
    switch (action.type) {
        case moteActiontyper.HENT_MOTEBEHOV_HENTER: {
            return {
                ...state,
                henter: true,
                hentet: false,
                hentingFeilet: false,
                hentingForbudt: false,
                data: [],
            };
        }
        case moteActiontyper.HENT_MOTEBEHOV_HENTET: {
            return {
                ...state,
                henter: false,
                hentet: true,
                data: action.data.length > 0 ? sorterMotebehovEtterNyeste(action.data) : [],
            };
        }
        case moteActiontyper.HENT_MOTEBEHOV_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
            };
        }
        case moteActiontyper.HENT_MOTEBEHOV_FORBUDT: {
            return {
                ...state,
                henter: false,
                hentingForbudt: true,
            };
        }
        case moteActiontyper.SVAR_MOTEBEHOV_SENDT: {
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
