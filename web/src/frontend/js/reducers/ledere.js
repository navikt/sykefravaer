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
        case 'LEDERE_HENTET': {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        }
        case 'HENTER_LEDERE': {
            return {
                henter: true,
                hentingFeilet: false,
                data: [],
            };
        }
        case 'HENT_LEDERE_FEILET': {
            return {
                henter: false,
                hentingFeilet: true,
                data: [],
            };
        }
        case 'LEDER_AVKREFTET': {
            const _ledere = setLederProps(state.data, action.orgnummer, { avkreftet: true });

            return Object.assign({}, state, {
                avkrefter: false,
                avkreftFeilet: false,
                data: _ledere,
            });
        }
        case 'LEDER_AVKREFTET_FEILET': {
            return Object.assign({}, state,
                {
                    avkrefter: false,
                    avkreftFeilet: true,
                });
        }
        case 'AVKREFTER_LEDER': {
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
