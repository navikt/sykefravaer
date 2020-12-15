import { HENT_REISETILSKUDDSOKNADER_FEILET, HENTER_REISETILSKUDDSOKNADER, REISETILSKUDDSOKNADER_HENTET } from './reisetilskuddSoknader_actions';

const initiellState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

export default (state = initiellState, action = {}) => {
    switch (action.type) {
        case REISETILSKUDDSOKNADER_HENTET: {
            return {
                ...state,
                data: action.reisetilskuddSoknader.map((reisetilskuddSoknader) => {
                    return { ...reisetilskuddSoknader };
                }),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENTER_REISETILSKUDDSOKNADER: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case HENT_REISETILSKUDDSOKNADER_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        default:
            return state;
    }
};
