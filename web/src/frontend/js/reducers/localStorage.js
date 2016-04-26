const initiellState = {
	teller: 0
};

export default function localStorage(state = initiellState, action) {
	switch (action.type) {
        case 'SKJUL_UNDER_UTVIKLING_VARSEL':
            return {
                teller: "Helge"
            };
        default:
            return state;
    }
}
