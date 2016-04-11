const initiellState = {
	henter: false,
	hentingFeilet: false,
	data: [],
};

export default function sykmeldinger(state = initiellState, action) {
	switch (action.type) {
	case 'SET_SYKMELDINGER':
		return {
			data: action.sykmeldinger,
			henter: false,
			hentingFeilet: false,
		};
	case 'HENT_SYKMELDINGER':
		return {
			data: [],
			henter: true,
			hentingFeilet: false,
		};
	case 'HENT_SYKMELDINGER_FEILET':
		return {
			data: [],
			henter: false,
			hentingFeilet: true,
		};
	default:
		return state;
	}
}
