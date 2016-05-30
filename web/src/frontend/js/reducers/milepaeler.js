export default function milepaeler(state = {}, action) {
    if (action.type === 'SET_MILEPAELER') {
        return {
            data: action.data,
        };
    }
    return state;
}
