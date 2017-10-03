import * as actiontyper from '../actions/actiontyper';

const defaultState = {
    data: [],
};

const setLederProps = (_ledere, orgnummer, props) => {
    return _ledere.map((leder) => {
        let _leder = Object.assign({}, leder);
        if (_leder.orgnummer === orgnummer) {
            _leder = Object.assign({}, _leder, props);
        }
        return _leder;
    });
};

const ledere = (state = defaultState, action = {}) => {
    switch (action.type) {
        case actiontyper.LEDERE_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case actiontyper.HENTER_LEDERE: {
            return {
                henter: true,
                hentingFeilet: false,
                data: [],
                hentet: false,
            };
        }
        case actiontyper.HENT_LEDERE_FEILET: {
            return {
                henter: false,
                hentingFeilet: true,
                data: [],
                hentet: true,
            };
        }
        case actiontyper.LEDER_AVKREFTET: {
            const _ledere = setLederProps(state.data, action.orgnummer, { avkreftet: true });

            return Object.assign({}, state, {
                avkrefter: false,
                avkreftFeilet: false,
                data: _ledere,
            });
        }
        case actiontyper.LEDER_AVKREFTET_FEILET: {
            return Object.assign({}, state,
                {
                    avkrefter: false,
                    avkreftFeilet: true,
                });
        }
        case actiontyper.AVKREFTER_LEDER: {
            return Object.assign({}, state,
                {
                    avkrefter: true,
                    avkreftFeilet: false,
                });
        }
        default: {
            return state;
        }
    }
};

export default ledere;
