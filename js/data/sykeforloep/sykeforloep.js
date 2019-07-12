import { parseSykmelding } from '@navikt/digisyfo-npm';
import { BRUKER_ER_UTLOGGET } from '../brukerinfo/brukerinfo_actions';
import { HENT_SYKEFORLOEP_FEILET, SYKEFORLOEP_HENTET, HENTER_SYKEFORLOEP } from './sykeforloep_actions';

const initState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    startdato: null,
    data: [],
};

export const hentStartdatoFraSykeforloep = (sykeforloep) => {
    if (sykeforloep.length === 0) {
        return null;
    }
    const startdato = sykeforloep.sort((s1, s2) => new Date(s2.oppfoelgingsdato) - new Date(s1.oppfoelgingsdato))[0].oppfoelgingsdato;
    return new Date(startdato);
};


export default (state = initState, action = {}) => {
    switch (action.type) {
        case HENTER_SYKEFORLOEP: {
            return Object.assign({}, state, {
                henter: true,
                hentet: false,
                hentingFeilet: false,
                startdato: null,
                data: [],
            });
        }
        case SYKEFORLOEP_HENTET: {
            return Object.assign({}, state, {
                henter: false,
                hentet: true,
                data: action.data.map(skforloep => ({
                    ...skforloep,
                    oppfoelgingsdato: new Date(skforloep.oppfoelgingsdato),
                    sykmeldinger: skforloep.sykmeldinger.map(parseSykmelding),
                })),
                startdato: hentStartdatoFraSykeforloep(action.data),
            });
        }
        case HENT_SYKEFORLOEP_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
            });
        }
        case BRUKER_ER_UTLOGGET: {
            return {
                henter: false,
                hentet: true,
                hentingFeilet: false,
                data: [],
            };
        }
        default: {
            return state;
        }
    }
};
