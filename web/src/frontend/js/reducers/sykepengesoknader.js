const initiellState = {
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
    data: [],
};

const setSykepengesoknaderProps = (_sykepengesoknader, soknadsId, props) => {
    return _sykepengesoknader.map((soknad) => {
        let _soknad = Object.assign({}, soknad);
        if (_soknad.id === soknadsId) {
            _soknad = Object.assign({}, _soknad, props);
        }
        return _soknad;
    });
};

export default function sykepengesoknader(state = initiellState, action) {
    switch (action.type) {
        case 'SET_SYKEPENGESOKNADER': {
            return Object.assign({}, state, {
                data: action.sykepengesoknader,
                henter: false,
                hentingFeilet: false,
            });
        }
        case 'HENTER_SYKEPENGESOKNADER': {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case 'HENT_SYKEPENGESOKNADER_FEILET': {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'SENDER_SYKEPENGESOKNAD': {
            return Object.assign({}, state, {
                sender: true,
                sendingFeilet: false,
            });
        }
        case 'SENDER_SYKEPENGESOKNAD_FEILET': {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
            });
        }
        case 'SYKEPENGESOKNAD_SENDT': {
            const data = setSykepengesoknaderProps(state.data, action.sykepengesoknadsId, {
                status: 'SENDT',
            });
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        default:
            return state;
    }
}
