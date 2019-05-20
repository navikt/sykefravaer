export const henterEllerHarHentetLedere = (ledere) => {
    return ledere.henter || ledere.hentet;
};

export const lederHarBlittAvkreftet = (ledere, nesteLedere) => {
    return ledere.avkrefter && nesteLedere.avkreftet;
};

export const henterEllerHarHentetSykeforloep = (sykeforloep) => {
    return sykeforloep.henter || sykeforloep.hentet;
};

export const forsoektHentetLedere = (ledereReducer) => {
    return ledereReducer.hentet || ledereReducer.hentingFeilet;
};

export const forsoektHentetDineSykmeldinger = (dineSykmeldingerReducer) => {
    return dineSykmeldingerReducer.hentet || dineSykmeldingerReducer.hentingFeilet;
};

export const forsoktHentetMote = (moteReducer) => {
    return moteReducer.hentet || moteReducer.hentingFeilet;
};
