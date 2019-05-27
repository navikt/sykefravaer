import {
    HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET,
    HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET,
    HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER,
} from './oppfolgingsforlopsPerioder_actions';

const initiellState = {};

export default function oppfolgingsforlopsPerioder(state = initiellState, action = {}) {
    const virksomhet = {};
    switch (action.type) {
        case HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER:
            virksomhet[action.virksomhetsnummer] = {
                henter: true,
                hentet: false,
                hentingFeilet: false,
                data: state[action.virksomhetsnummer] ? state[action.virksomhetsnummer].data : [],
            };
            return { ...state, ...virksomhet };
        case HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET:
            virksomhet[action.virksomhetsnummer] = {
                henter: false,
                hentet: true,
                hentingFeilet: false,
                data: action.periodeListe ? action.periodeListe : [],
            };
            return { ...state, ...virksomhet };
        case HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET:
            virksomhet[action.virksomhetsnummer] = {
                henter: false,
                hentet: false,
                hentingFeilet: true,
                data: state[action.virksomhetsnummer] ? state[action.virksomhetsnummer].data : [],
            };
            return { ...state, ...virksomhet };
        default:
            return state;
    }
}
