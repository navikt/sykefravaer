import {
    AVBRYT_SYKEPENGESOKNAD_FEILET,
    AVBRYTER_SYKEPENGESOKNAD, BEKREFT_SYKMELDING_ANGRET,
    HENT_SOKNADER_FEILET,
    HENTER_SOKNADER, OPPDATER_SOKNAD_FEILET,
    OPPRETT_SYKEPENGESOKNADUTLAND_FEILET,
    OPPRETTER_SYKEPENGESOKNADUTLAND,
    SEND_SOKNAD_FEILET,
    SENDER_SOKNAD,
    SOKNAD_OPPDATERT,
    SOKNAD_SENDT,
    SOKNADER_HENTET,
    SYKEPENGESOKNAD_AVBRUTT,
    SYKEPENGESOKNADUTLAND_OPPRETTET,
} from '../actions/actiontyper';
import { TIMER, DATO, PERIODER, PROSENT } from '../enums/svartyper';
import { NY, SENDT } from '../enums/soknadstatuser';

const initiellState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    hentet: false,
    sender: false,
    sendingFeilet: false,
    oppretterSoknad: false,
    opprettFeilet: false,
    avbryter: false,
    avbrytSoknadFeilet: false,
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

export const parseSoknad = (soknad) => {
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
                            status: SENDT,
                            innsendtDato: new Date(),
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

        case AVBRYTER_SYKEPENGESOKNAD: {
            return {
                ...state,
                avbryter: true,
                avbrytSoknadFeilet: false,
            };
        }

        case SYKEPENGESOKNAD_AVBRUTT: {
            return {
                ...state,
                data: [...state.data.filter((s) => { return s.id !== action.soknad.id; })],
                avbryter: false,
                avbrytSoknadFeilet: false,
            };
        }
        case AVBRYT_SYKEPENGESOKNAD_FEILET: {
            return {
                ...state,
                avbryter: false,
                avbrytSoknadFeilet: true,
            };
        }
        case OPPDATER_SOKNAD_FEILET: {
            return {
                ...state,
                oppdaterFeilet: true,
            };
        }
        case SOKNAD_OPPDATERT: {
            return {
                ...state,
                oppdaterFeilet: false,
                data: state.data.map((s) => {
                    return s.id === action.soknad.id
                        ? parseSoknad(action.soknad)
                        : s;
                }),
            };
        }
        case BEKREFT_SYKMELDING_ANGRET: {
            return {
                ...state,
                data: state.data.filter((s) => {
                    return s.sykmeldingId === action.sykmeldingId
                        && s.status !== NY;
                }),
            };
        }
        default: {
            return state;
        }
    }
};
