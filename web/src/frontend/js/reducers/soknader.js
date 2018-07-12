import {
    HENT_SOKNADER_FEILET,
    HENTER_SOKNADER, OPPRETT_SYKEPENGESOKNADUTLAND_FEILET,
    OPPRETTER_SYKEPENGESOKNADUTLAND,
    SEND_SOKNAD_FEILET,
    SENDER_SOKNAD,
    SOKNAD_SENDT,
    SOKNADER_HENTET, SYKEPENGESOKNADUTLAND_OPPRETTET,
} from '../actions/actiontyper';
import { TIMER, DATO, PERIODER, PROSENT } from '../enums/svartyper';
import { TIL_SENDING } from '../enums/soknadstatuser';

const initiellState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    hentet: false,
    sender: false,
    sendingFeilet: false,
    oppretterSoknad: false,
    opprettFeilet: false,
};

const getMinMax = (sporsmal) => {
    switch (sporsmal.svartype) {
        case PERIODER:
        case DATO: {
            return {
                min: sporsmal.min ? new Date(sporsmal.min) : sporsmal.min,
                max: sporsmal.max ? new Date(sporsmal.max) : sporsmal.max,
            };
        }
        case TIMER:
        case PROSENT: {
            return {
                min: parseInt(sporsmal.min, 10),
                max: parseInt(sporsmal.max, 10),
            };
        }
        default: {
            return {};
        }
    }
};

const parseSporsmal = (sporsmal) => {
    const minMax = getMinMax(sporsmal);
    return {
        ...sporsmal,
        ...minMax,
        undersporsmal: [...sporsmal.undersporsmal].map(parseSporsmal),
    };
};

const parseSoknad = (soknad) => {
    return {
        ...soknad,
        fom: new Date(soknad.fom),
        tom: new Date(soknad.tom),
        opprettetDato: new Date(soknad.opprettetDato),
        sporsmal: [...soknad.sporsmal].map(parseSporsmal),
    };
};

export default (state = initiellState, action = {}) => {
    switch (action.type) {
        case SOKNADER_HENTET: {
            return {
                data: action.soknader.map(parseSoknad),
                hentet: true,
                henter: false,
                hentingFeilet: false,
            };
        }
        case HENT_SOKNADER_FEILET: {
            return {
                data: [],
                hentet: true,
                henter: false,
                hentingFeilet: true,
            };
        }
        case HENTER_SOKNADER: {
            return {
                data: [],
                hentet: false,
                henter: true,
                hentingFeilet: false,
            };
        }
        case SENDER_SOKNAD: {
            return {
                ...state,
                sender: true,
                sendingFeilet: false,
            };
        }
        case SOKNAD_SENDT: {
            return {
                ...state,
                data: state.data.map((s) => {
                    return s.id === action.soknad.id
                        ? {
                            ...action.soknad,
                            status: TIL_SENDING,
                        }
                        : { ...s };
                }),
                sender: false,
                sendingFeilet: false,
            };
        }
        case SEND_SOKNAD_FEILET: {
            return {
                ...state,
                sender: false,
                sendingFeilet: true,
            };
        }
        case OPPRETTER_SYKEPENGESOKNADUTLAND: {
            return {
                ...state,
                oppretterSoknad: true,
                opprettFeilet: false,
            };
        }
        case SYKEPENGESOKNADUTLAND_OPPRETTET: {
            return {
                ...state,
                oppretterSoknad: false,
                opprettFeilet: false,
                data: [...state.data, parseSoknad(action.soknad)],
            };
        }
        case OPPRETT_SYKEPENGESOKNADUTLAND_FEILET: {
            return {
                ...state,
                oppretterSoknad: false,
                opprettFeilet: true,
            };
        }
        default: {
            return state;
        }
    }
};
