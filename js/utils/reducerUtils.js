export const henterEllerHarHentetLedere = ledere => ledere.henter || ledere.hentet;

export const lederHarBlittAvkreftet = (ledere, nesteLedere) => ledere.avkrefter && nesteLedere.avkreftet;

export const henterEllerHarHentetSykeforloep = sykeforloep => sykeforloep.henter || sykeforloep.hentet;

export const forsoektHentetLedere = ledereReducer => ledereReducer.hentet || ledereReducer.hentingFeilet;

export const forsoektHentetDineSykmeldinger = dineSykmeldingerReducer => dineSykmeldingerReducer.hentet || dineSykmeldingerReducer.hentingFeilet;

export const forsoktHentetMote = moteReducer => moteReducer.hentet || moteReducer.hentingFeilet;
