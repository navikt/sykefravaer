import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    data: {},
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

export default function sykmeldtInfo(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontyper.HENTET_SYKMELDT_INFO: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case actiontyper.HENTER_SYKMELDT_INFO: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case actiontyper.HENT_SYKMELDT_INFO_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        default: {
            return state;
        }
    }
}
