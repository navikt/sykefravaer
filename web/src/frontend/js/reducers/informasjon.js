export default function informasjon(state = {}, action) {
    switch (action.type) {
        case 'SET_INFORMASJON':
            return {
                data: action.data,
            };
        default:
            return state;
    }
}
