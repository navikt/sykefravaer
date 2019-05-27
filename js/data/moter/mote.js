import {
    HENTER_MOTE,
    MOTE_HENTET,
    HENT_MOTE_FEILET,
    MOTE_IKKE_FUNNET,
} from './mote_actions';
import { konverterTid } from '../../utils/moteUtils';
import { SVAR_SENDT } from '../svar/svar_actions';

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
        case SVAR_SENDT: {
            const avkryssetIder = action.data;
            const deltakertype = action.deltakertype;
            const data = Object.assign({}, state.data, {
                deltakere: state.data.deltakere
                    .map((deltaker) => {
                        if (deltaker.type === deltakertype) {
                            return Object.assign({}, deltaker, {
                                svar: deltaker.svar.map((s) => {
                                    if (avkryssetIder.includes(s.id)) {
                                        return Object.assign({}, s, {
                                            valgt: true,
                                        });
                                    }
                                    return s;
                                }),
                                svartidspunkt: new Date(),
                            });
                        }
                        return deltaker;
                    }),
            });

            return Object.assign({}, state, {
                data,
                sender: false,
                sendingFeilet: false,
                sendt: true,
            });
        }
        default: {
            return state;
        }
    }
};

export default mote;
