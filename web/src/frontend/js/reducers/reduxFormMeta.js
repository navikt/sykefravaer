const defaultState = {};
import * as actiontyper from '../actions/actiontyper';
import { SEND_SKJEMA_FEILET } from '../enums/reduxFormMetaEnums';

export default function reduxFormMeta(state = defaultState, action = {}) {
    switch (action.type) {
        case actiontyper.SEND_SKJEMA_FEILET: {
            const s = {};
            s[action.skjemanavn] = {
                status: SEND_SKJEMA_FEILET,
                settFokus: true,
            };
            return Object.assign({}, state, s);
        }
        case actiontyper.SEND_SKJEMA_FEILET_HANDTERT: {
            const s = {};
            s[action.skjemanavn] = {
                status: SEND_SKJEMA_FEILET,
                settFokus: false,
            };
            return Object.assign({}, state, s);
        }
        case actiontyper.SKJEMA_ER_GYLDIG:
        case '@@redux-form/SET_SUBMIT_SUCCEEDED': {
            const s = {};
            s[action.skjemanavn] = {};
            return Object.assign({}, state, s);
        }
        default: {
            return state;
        }
    }
}
