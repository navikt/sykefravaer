const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};

export default function arbeidsgiversSykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case 'SET_ARBEIDSGIVERS_SYKMELDINGER':
            return {
                data: action.sykmeldinger,
                henter: false,
                hentingFeilet: false,
            };
        case 'HENTER_ARBEIDSGIVERS_SYKMELDINGER':
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        case 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET':
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
            };
        default:
            return state;
    }
}
