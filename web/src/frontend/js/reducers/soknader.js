import { HENT_SOKNADER_FEILET, HENTER_SOKNADER, SEND_SOKNAD_FEILET, SENDER_SOKNAD, SOKNAD_SENDT, SOKNADER_HENTET } from '../actions/actiontyper';
import { TIMER, DATO, PERIODER, PROSENT } from '../enums/svartyper';
import { TIL_SENDING } from '../enums/soknadstatuser';

const initiellState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

const parseSvar = (svar) => {
    switch (svar.svartype) {
        case PERIODER:
        case DATO: {
            return {
                ...svar,
                min: new Date(svar.min),
                max: new Date(svar.max),
            };
        }
        case TIMER:
        case PROSENT: {
            return {
                ...svar,
                min: parseInt(svar.min, 10),
                max: parseInt(svar.max, 10),
            };
        }
        default: {
            /* eslint-disable no-use-before-define */
            return {
                ...svar,
                undersporsmal: svar.undersporsmal.map(parseSporsmal),
            };
            /* eslint-disable no-use-before-define */
        }
    }
};

const parseSporsmal = (sporsmal) => {
    return !sporsmal.svar
        ? sporsmal
        : {
            ...sporsmal,
            svar: parseSvar(sporsmal.svar),
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
        default: {
            return state;
        }
    }
};
