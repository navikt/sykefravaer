export default function milepaeler(state = {}, action) {
    switch (action.type) {
        case 'SET_MILEPAELER':
            return {
                data: action.data,
            };
        default:
            return state;
    }
}
