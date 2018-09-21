import { sykepengesoknadstatuser } from 'digisyfo-npm';

export const erForsteSykepengesoknad = (state) => {
    return state.sykepengesoknader.data
        && state.sykepengesoknader.data.filter((s) => {
            return s.status === sykepengesoknadstatuser.NY
                || s.status === sykepengesoknadstatuser.FREMTIDIG;
        }).length === state.sykepengesoknader.data.length;
};

export const skalHenteSykepengesoknader = (state) => {
    return !state.sykepengesoknader.hentet
        && !state.sykepengesoknader.henter;
};
