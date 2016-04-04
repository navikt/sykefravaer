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

export default function sykmeldinger(state = [], action) {
	switch (action.type) {
	case 'SET_SYKMELDINGER':
		return action.sykmeldinger;
	case 'BEKREFT_SYKMELDING':
		return setSykmeldingStatus(state, action.sykmeldingId, 'BEKREFTET');
	case 'SET_EGENVALGT_ARBEIDSGIVER':
		return setEgenvalgtArbeidsgiver(state, action.sykmeldingId, action.egenvalgtArbeidsgiver);
	case 'SEND_SYKMELDING':
		return setSykmeldingStatus(state, action.sykmeldingId, 'SENDT');
	case 'ADD_SYKMELDING':
		return [...state, action.sykmelding];
	default:
		return state;
	}
}
