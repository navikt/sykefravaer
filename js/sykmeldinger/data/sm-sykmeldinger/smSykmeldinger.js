import { createReducer } from '../../../reducers/createReducer';
import {
    HENTER_SM_SYKMELDINGER,
    HENT_SM_SYKMELDINGER_FEILET,
    SM_SYKMELDINGER_HENTET,
    BEKREFTER_LEST_SM_SYKMELDING,
    SM_SYKMELDING_BEKREFTET_LEST,
    SM_SYKMELDING_BEKREFT_LEST_FEILET,
    KVITTERING_VIST_LENGE_NOK,
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
                data: state.data.map((smSykmelding) => {
                    return smSykmelding.id === action.smSykmelding.id
                        ? {
                            ...smSykmelding,
                            bekreftetDato: new Date(),
                        }
                        : smSykmelding;
                }),
                bekrefter: false,
                bekreftFeilet: false,
                visKvittering: true,
            };
        }
        case SM_SYKMELDING_BEKREFT_LEST_FEILET: {
            return {
                ...state,
                bekreftFeilet: true,
                bekrefter: false,
            };
        }
        case KVITTERING_VIST_LENGE_NOK: {
            return {
                ...state,
                visKvittering: false,
            };
        }
        default: {
            return state;
        }
    }
};

const parsePerioder = (perioderArg) => {
    const perioder = perioderArg && typeof perioderArg === 'string'
        ? JSON.parse(perioderArg)
        : perioderArg;
    return perioderArg
        ? perioder.map((periode) => {
            return {
                ...periode,
                fom: new Date(periode.fom),
                tom: new Date(periode.tom),
            };
        })
        : null;
};

const mapper = (smSykmelding) => {
    return {
        ...smSykmelding,
        sykmeldingsperioder: parsePerioder(smSykmelding.sykmeldingsperioder),
        bekreftetDato: smSykmelding.bekreftetDato
            ? new Date(smSykmelding.bekreftetDato)
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
