import {
    HENTER_MOTE,
    MOTE_HENTET,
    HENT_MOTE_FEILET,
    MOTE_IKKE_FUNNET,
} from './mote_actions';
import { konverterTid } from '../../utils/moteUtils';

const initialState = {
    data: null,
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

const mote = (state = initialState, action = {}) => {
    switch (action.type) {
        case HENTER_MOTE: {
            return Object.assign({}, state, {
                henter: true,
            });
        }
        case MOTE_HENTET: {
            return {
                data: konverterTid(action.data),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENT_MOTE_FEILET: {
            return {
                data: null,
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        case MOTE_IKKE_FUNNET: {
            return {
                data: null,
                henter: false,
                hentingFeilet: false,
                moteIkkeFunnet: true,
                hentet: true,
            };
        }
        default: {
            return state;
        }
    }
};

export default mote;
