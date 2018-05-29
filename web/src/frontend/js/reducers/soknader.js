import { HENT_SOKNADER_FEILET, HENTER_SOKNADER, SOKNADER_HENTET } from '../actions/actiontyper';
import { TIMER, DATO, PERIODER, PROSENT } from '../enums/svartyper';

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
        // sykmeldingId: 'b83994d1-bfa8-4033-9412-a49dfe7272df',
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
        default: {
            return state;
        }
    }
};
