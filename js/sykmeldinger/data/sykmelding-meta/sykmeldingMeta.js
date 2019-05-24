import * as actiontyper from '../../../data/actiontyper';

const initiellState = {};

export default function ventetid(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontyper.HENTER_VENTETID: {
            return {
                ...state,
                [action.sykmeldingId]: {
                    ...state[action.sykmeldingId],
                    henterVentetid: true,
                },
            };
        }
        case actiontyper.HENT_VENTETID_FEILET: {
            return {
                ...state,
                [action.sykmeldingId]: {
                    ...state[action.sykmeldingId],
                    henterVentetid: false,
                    hentVentetidFeilet: true,
                },
            };
        }
        case actiontyper.VENTETID_HENTET: {
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
        case actiontyper.SKAL_OPPRETTE_SOKNAD_HENTET: {
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
