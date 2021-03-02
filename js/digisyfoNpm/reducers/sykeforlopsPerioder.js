import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: [],
    hentet: [],
    hentingFeilet: [],
    data: [],
};

const sykeforlopsPerioder = (state = initiellState, action = {}) => {
    switch (action.type) {
        case actiontyper.HENTER_SYKEFORLOPSPERIODER: {
            return Object.assign({}, state, {
                henter: state.henter.concat({
                    fnr: action.fnr,
                    virksomhetsnummer: action.virksomhetsnummer,
                }),
                hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
                    return hentingFeilet.fnr !== action.fnr && hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer;
                }),
            });
        }
        case actiontyper.SYKEFORLOPSPERIODER_HENTET: {
            return Object.assign({}, state, {
                henter: state.hentingFeilet.filter((henter) => {
                    return henter.fnr !== action.fnr && henter.virksomhetsnummer !== action.virksomhetsnummer;
                }),
                hentet: state.hentet.concat({
                    fnr: action.fnr,
                    virksomhetsnummer: action.virksomhetsnummer,
                }),
                hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
                    return hentingFeilet.fnr !== action.fnr && hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer;
                }),
                data: state.data.concat({
                    fnr: action.fnr,
                    virksomhetsnummer: action.virksomhetsnummer,
                    periodeListe: action.periodeListe,
                }),
            });
        }
        case actiontyper.HENT_SYKEFORLOPSPERIODER_FEILET: {
            return Object.assign({}, state, {
                henter: state.henter.filter((henter) => {
                    return henter.fnr !== action.fnr && henter.virksomhetsnummer !== action.virksomhetsnummer;
                }),
                hentingFeilet: state.hentingFeilet.concat({
                    fnr: action.fnr,
                    virksomhetsnummer: action.virksomhetsnummer,
                }),
            });
        }
        default:
            return state;
    }
};

export default sykeforlopsPerioder;
