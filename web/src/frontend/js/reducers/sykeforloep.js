export default function sykeforloep(state = {}, action) {
    switch (action.type) {
        case 'HENT_SYKEFORLOEP_FEILET': {
            return Object.assign({}, state, {
                data: {},
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_SYKEFORLOEP': {
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'SET_SYKEFORLOEP': {
            const data = Object.assign({}, action.data);
            return Object.assign(state, {
                henter: false,
                hentingFeilet: false,
            }, {
                data,
            });
        }
        default: {
            return state;
        }
    }
}
