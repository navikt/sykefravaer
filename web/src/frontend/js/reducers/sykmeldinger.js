function setSykmeldingStatus(state, id, sykmeldingStatus) {
	return state.map((sykmld) => {
		if (sykmld.id === id) {
			return Object.assign({}, sykmld, {
				status: sykmeldingStatus,
			});
		}
		return Object.assign({}, sykmld);
	});
}

function setEgenvalgtArbeidsgiver(state, id, arbeidsgiver) {
	return state.map((sykmld) => {
		if (sykmld.id === id) {
			return Object.assign({}, sykmld, {
				egenvalgtArbeidsgiver: arbeidsgiver,
			});
		}
		return Object.assign({}, sykmld);
	});
}

const initiellState = { 
	henter: false,
	hentingFeilet: false,
	data: [] 
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
			hentingFeilet: true,
			henter: false,
		};
	default:
		return state;
	}
}
