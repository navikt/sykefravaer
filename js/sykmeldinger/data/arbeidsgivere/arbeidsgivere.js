import * as actiontyper from '../../../data/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    sykmeldingId: null,
};

export default function arbeidsgivere(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontyper.AKTUELLE_ARBEIDSGIVERE_HENTET: {
            return {
                data: action.arbeidsgivere,
                hentingFeilet: false,
                henter: false,
                sykmeldingId: action.sykmeldingId,
            };
        }
        case actiontyper.HENT_AKTUELLE_ARBEIDSGIVERE_FEILET: {
            return {
                data: [],
                hentingFeilet: true,
                henter: false,
                sykmeldingId: action.sykmeldingId,
            };
        }
        case actiontyper.HENTER_AKTUELLE_ARBEIDSGIVERE: {
            return {
                data: [],
                hentingFeilet: false,
                henter: true,
                sykmeldingId: action.sykmeldingId,
            };
        }
        case actiontyper.BRUKER_ER_UTLOGGET: {
            return {
                data: [],
                hentingFeilet: false,
                henter: false,
            };
        }
        default: {
            return state;
        }
    }
}
