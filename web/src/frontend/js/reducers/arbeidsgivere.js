const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    sykmeldingId: null,
};

export default function arbeidsgivere(state = initiellState, action) {
    switch (action.type) {
        case 'SET_AKTUELLE_ARBEIDSGIVERE': {
            return {
                data: action.arbeidsgivere,
                hentingFeilet: false,
                henter: false,
                sykmeldingId: action.sykmeldingId,
            };
        }
        case 'HENT_AKTUELLE_ARBEIDSGIVERE_FEILET': {
            return {
                data: [],
                hentingFeilet: true,
                henter: false,
                sykmeldingId: action.sykmeldingId,
            };
        }
        case 'HENTER_AKTUELLE_ARBEIDSGIVERE': {
            return {
                data: [],
                hentingFeilet: false,
                henter: true,
                sykmeldingId: action.sykmeldingId,
            };
        }
        default: {
            return state;
        }
    }
}
