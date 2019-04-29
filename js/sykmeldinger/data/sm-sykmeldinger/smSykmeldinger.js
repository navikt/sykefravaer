import { createReducer } from '../../../reducers/createReducer';
import {
    HENTER_SM_SYKMELDINGER,
    HENT_SM_SYKMELDINGER_FEILET,
    SM_SYKMELDINGER_HENTET,
    BEKREFTER_LEST_SM_SYKMELDING,
    SM_SYKMELDING_BEKREFTET_LEST,
    SM_SYKMELDING_BEKREFT_LEST_FEILET,
} from './smSykmeldingerActions';

const spesialHandler = (state, action) => {
    switch (action.type) {
        case BEKREFTER_LEST_SM_SYKMELDING: {
            return {
                ...state,
                bekrefter: true,
                bekreftFeilet: false,
            };
        }
        case SM_SYKMELDING_BEKREFTET_LEST: {
            return {
                ...state,
                bekrefter: false,
                bekreftFeilet: false,
            };
        }
        case SM_SYKMELDING_BEKREFT_LEST_FEILET: {
            return {
                ...state,
                bekreftFeilet: true,
                bekrefter: false,
            };
        }
        default: {
            return state;
        }
    }
};

const mapper = (smSykmelding) => {
    return {
        ...smSykmelding,
        lestAvBrukerDato: smSykmelding.lestAvBrukerDato
            ? new Date(smSykmelding.lestAvBrukerDato)
            : null,
    };
};

const smSykmeldinger = createReducer(
    HENT_SM_SYKMELDINGER_FEILET,
    HENTER_SM_SYKMELDINGER,
    SM_SYKMELDINGER_HENTET,
    {
        henter: false,
        hentingFeilet: false,
        hentet: false,
        bekrefter: false,
        data: [],
    },
    mapper,
    spesialHandler,
);

export default smSykmeldinger;
