import { BRUKER_ER_UTLOGGET } from '../../../data/brukerinfo/brukerinfo_actions';
import {
    HENTER_AKTUELLE_ARBEIDSGIVERE,
    AKTUELLE_ARBEIDSGIVERE_HENTET,
    HENT_AKTUELLE_ARBEIDSGIVERE_FEILET,
} from './arbeidsgivereActions';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    sykmeldingId: null,
};

export default function arbeidsgivere(state = initiellState, action = {}) {
    switch (action.type) {
        case AKTUELLE_ARBEIDSGIVERE_HENTET: {
            return {
                data: action.arbeidsgivere,
                hentingFeilet: false,
                henter: false,
                sykmeldingId: action.sykmeldingId,
            };
        }
        case HENT_AKTUELLE_ARBEIDSGIVERE_FEILET: {
            return {
                data: [],
                hentingFeilet: true,
                henter: false,
                sykmeldingId: action.sykmeldingId,
            };
        }
        case HENTER_AKTUELLE_ARBEIDSGIVERE: {
            return {
                data: [],
                hentingFeilet: false,
                henter: true,
                sykmeldingId: action.sykmeldingId,
            };
        }
        case BRUKER_ER_UTLOGGET: {
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
