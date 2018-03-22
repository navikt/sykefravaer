import * as actiontyper from '../actions/actiontyper';

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
        default: {
            return state;
        }
    }
}
