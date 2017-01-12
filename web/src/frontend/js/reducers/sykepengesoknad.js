const initiellState = {
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
    data: [],
};

const setSykepengesoknadProps = (sykepengesoknader, soknadsId, props) => {
    return sykepengesoknader.map((soknad) => {
        let _soknad = Object.assign({}, soknad);
        if (_soknad.id === soknadsId) {
            _soknad = Object.assign({}, _soknad, props);
        }
        return _soknad;
    });
};

export default function sykepengesoknad(state = initiellState, action) {
    switch (action.type) {
        default:
        case 'SET_SYKEPENGESOKNADER': {
            return Object.assign({}, state, {
                data: action.soknader,
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
            const data = setSykepengesoknadProps(state.data, action.sykepengesoknadsId, {
                status: 'SENDT',
            });
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        return state;
    }
}
