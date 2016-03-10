export function setSykmeldinger(sykmeldinger = []) {
  return {
    type: 'SET_SYKMELDINGER',
    sykmeldinger
  };
}

export function addSykmelding(sykmelding) {
  return {
    type: 'ADD_SYKMELDING',
    sykmelding
  };
}

export function bekreftSykmelding(sykmeldingId) {
	return {
		type: "BEKREFT_SYKMELDING", 
		sykmeldingId
	}
}

export function sendSykmelding(sykmeldingId) {
	return {
		type: "SEND_SYKMELDING", 
		sykmeldingId
	}
}

export function setEgenvalgtArbeidsgiver(sykmeldingId, egenvalgtArbeidsgiver) {
	return {
		type: "SET_EGENVALGT_ARBEIDSGIVER", 
		sykmeldingId, 
		egenvalgtArbeidsgiver
	}
}