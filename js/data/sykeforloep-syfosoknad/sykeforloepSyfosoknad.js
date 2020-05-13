import { BRUKER_ER_UTLOGGET } from '../brukerinfo/brukerinfo_actions';
import { HENT_SYKEFORLOEP_SYFOSOKNAD_FEILET, SYKEFORLOEP_SYFOSOKNAD_HENTET, HENTER_SYKEFORLOEP_SYFOSOKNAD } from './sykeforloepSyfosoknad_actions';

const initState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    startdato: null,
    data: [],
};


export default (state = initState, action = {}) => {
    switch (action.type) {
        case HENTER_SYKEFORLOEP_SYFOSOKNAD: {
            return Object.assign({}, state, {
                henter: true,
                hentet: false,
                hentingFeilet: false,
                startdato: null,
                data: [],
            });
        }
        case SYKEFORLOEP_SYFOSOKNAD_HENTET: {
            return Object.assign({}, state, {
                henter: false,
                hentet: true,
                data: action.data.map((skforloep) => {
                    return {
                        ...skforloep,
                        oppfolgingsdato: new Date(skforloep.oppfolgingsdato),
                        sykmeldinger: skforloep.sykmeldinger,
                    };
                }),
            });
        }
        case HENT_SYKEFORLOEP_SYFOSOKNAD_FEILET: {
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
