import { AVKREFTER_LEDER, HENT_LEDERE_FEILET, HENTER_LEDERE, LEDER_AVKREFTET, LEDER_AVKREFTET_FEILET, LEDERE_HENTET } from './ledereActions';

const defaultState = {
    data: [],
};

const setLederProps = (_ledere, orgnummer, props) => {
    return _ledere.map((leder) => {
        if (leder.orgnummer === orgnummer) {
            return {
                ...leder,
                ...props,
            };
        }
        return leder;
    });
};

const ledere = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LEDERE_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENTER_LEDERE: {
            return {
                henter: true,
                hentingFeilet: false,
                data: [],
                hentet: false,
            };
        }
        case HENT_LEDERE_FEILET: {
            return {
                henter: false,
                hentingFeilet: true,
                data: [],
                hentet: true,
            };
        }
        case LEDER_AVKREFTET: {
            const _ledere = setLederProps(state.data, action.orgnummer, { avkreftet: true });

            return {
                ...state,
                avkrefter: false,
                avkreftet: true,
                avkreftFeilet: false,
                data: _ledere,
            };
        }
        case LEDER_AVKREFTET_FEILET: {
            return {
                ...state,
                avkrefter: false,
                avkreftFeilet: true,
            };
        }
        case AVKREFTER_LEDER: {
            return {
                ...state,
                avkrefter: true,
                avkreftet: false,
                avkreftFeilet: false,
            };
        }
        default: {
            return state;
        }
    }
};

export default ledere;
