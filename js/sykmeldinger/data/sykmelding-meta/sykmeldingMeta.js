import {
    HENT_VENTETID_FEILET, HENTER_VENTETID, SKAL_OPPRETTE_SOKNAD_HENTET, VENTETID_HENTET,
} from './sykmeldingMetaActions';

const initiellState = {};

export default function ventetid(state = initiellState, action = {}) {
    switch (action.type) {
        case HENTER_VENTETID: {
            return {
                ...state,
                [action.sykmeldingId]: {
                    ...state[action.sykmeldingId],
                    henterVentetid: true,
                },
            };
        }
        case HENT_VENTETID_FEILET: {
            return {
                ...state,
                [action.sykmeldingId]: {
                    ...state[action.sykmeldingId],
                    henterVentetid: false,
                    hentVentetidFeilet: true,
                },
            };
        }
        case VENTETID_HENTET: {
            return {
                ...state,
                [action.sykmeldingId]: {
                    ...state[action.sykmeldingId],
                    henterVentetid: false,
                    hentVentetidFeilet: false,
                    erUtenforVentetid: action.erUtenforVentetid,
                    ventetidHentet: true,
                },
            };
        }
        case SKAL_OPPRETTE_SOKNAD_HENTET: {
            return {
                ...state,
                [action.sykmeldingId]: {
                    ...state[action.sykmeldingId],
                    skalOppretteSoknad: action.skalOppretteSoknad,
                },
            };
        }
        default: {
            return state;
        }
    }
}
