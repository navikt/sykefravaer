import { actiontyper as moteActiontyper } from 'moter-npm';

const initiellState = {};

export default function motebehovSvar(state = initiellState, action = {}) {
    const virksomhet = {};
    switch (action.type) {
        case moteActiontyper.SVAR_MOTEBEHOV_SENDER:
            virksomhet[action.virksomhetsnummer] = {
                sender: true,
                sendt: false,
                sendingFeilet: false,
            };
            return { ...state, ...virksomhet };
        case moteActiontyper.SVAR_MOTEBEHOV_SENDT:
            virksomhet[action.virksomhetsnummer] = {
                sender: false,
                sendt: true,
                sendingFeilet: false,
            };
            return { ...state, ...virksomhet };
        case moteActiontyper.SVAR_MOTEBEHOV_FEILET:
            virksomhet[action.virksomhetsnummer] = {
                sender: false,
                sendt: false,
                sendingFeilet: true,
            };
            return { ...state, ...virksomhet };
        default:
            return state;
    }
}
