const initiellState = {

};

export default function arbeidsforhold(state = initiellState, action) {
    switch (action.type) {
        case 'SET_ARBEIDSFORHOLD': {
            return {
                data: action.arbeidsforhold
            };
        }
        default: {
            return state;
        }
    }
}
