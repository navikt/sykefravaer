export const createReducer = (feilActionType, henterActionType, hentetActionType, initState = { data: {} }) => {
    return (state = initState, action = {}) => {
        switch (action.type) {
            case feilActionType: {
                return {
                    data: {},
                    henter: false,
                    hentingFeilet: true,
                    hentet: true,
                };
            }
            case henterActionType: {
                return {
                    data: {},
                    henter: true,
                    hentingFeilet: false,
                    hentet: false,
                };
            }
            case hentetActionType: {
                return {
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                    data: {
                        ...state.data,
                        ...action.data,
                    },
                };
            }
            default: {
                return state;
            }
        }
    };
};
