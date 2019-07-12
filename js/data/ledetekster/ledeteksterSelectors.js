const selectLedeteksterSlice = state => state.ledetekster;

export const selectLedeteksterData = state => selectLedeteksterSlice(state).data;

export const selectLedeteksterHenter = state => selectLedeteksterSlice(state).henter;

export const selectLedeteksterHentingFeilet = state => selectLedeteksterSlice(state).hentingFeilet;
