export const henterEllerHarHentetLedere = (ledere) => {
    return ledere.henter || ledere.hentet;
};

export const lederHarBlittAvkreftet = (ledere, nesteLedere) => {
    return ledere.avkrefter && nesteLedere.avkreftet;
};

export const henterEllerHarHentetToggles = (toggles) => {
    return toggles.henter || toggles.hentet;
};

export const henterEllerHarHentetSykeforloep = (sykeforloep) => {
    return sykeforloep.henter || sykeforloep.hentet;
};

export const forsoektHentetToggles = (toggles) => {
    return toggles.hentet || toggles.hentingFeilet;
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

export const henterEllerHarHentetMote = (moteReducer) => {
    return moteReducer.henter || forsoktHentetMote(moteReducer);
};
