import { SEND_SKJEMA_FEILET, SEND_SKJEMA_FEILET_HANDTERT, SKJEMA_ER_GYLDIG } from './reduxFormMeta_actions';

const defaultState = {};

const reduxFormMeta = (state = defaultState, action = {}) => {
    switch (action.type) {
        case SEND_SKJEMA_FEILET: {
            return {
                ...state,
                [action.skjemanavn]: {
                    status: SEND_SKJEMA_FEILET,
                    settFokus: true,
                },
            };
        }
        case SEND_SKJEMA_FEILET_HANDTERT: {
            return {
                ...state,
                [action.skjemanavn]: {
                    status: SEND_SKJEMA_FEILET,
                    settFokus: false,
                },
            };
        }
        case SKJEMA_ER_GYLDIG: {
            return {
                ...state,
                [action.skjemanavn]: {
                    status: SEND_SKJEMA_FEILET_HANDTERT,
                    settFokus: false,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default reduxFormMeta;
