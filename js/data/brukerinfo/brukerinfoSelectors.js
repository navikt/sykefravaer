export const harStrengtFortroligAdresseSelector = state => state.brukerinfo.bruker.data.strengtFortroligAdresse;

export const skalHenteBrukerinfoSelector = state => !state.brukerinfo.bruker.henter
        && !state.brukerinfo.bruker.hentet;

export const skalHenteOppfolgingSelector = state => !state.brukerinfo.oppfolging.henter
        && !state.brukerinfo.oppfolging.hentet;

export const skalHenteSykmeldtinfodata = state => !state.brukerinfo.sykmeldtinfodata.henter
        && !state.brukerinfo.sykmeldtinfodata.hentet;
