export const harStrengtFortroligAdresse = (state) => {
    return state.brukerinfo.bruker.data.strengtFortroligAdresse;
};

export const skalHenteBrukerinfo = (state) => {
    return !state.brukerinfo.bruker.henter
        && !state.brukerinfo.bruker.hentet;
};

export const skalHenteOppfolging = (state) => {
    return !state.brukerinfo.oppfolging.henter
        && !state.brukerinfo.oppfolging.hentet;
};
