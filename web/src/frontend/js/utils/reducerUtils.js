export const henterEllerHarHentetSykmeldinger = (sykmeldinger) => {
    return sykmeldinger.henter || sykmeldinger.hentet;
};

export const henterEllerHarHentetLedere = (ledere) => {
    return ledere.henter || ledere.hentet;
};

export const lederHarBlittAvkreftet = (ledere, nesteLedere) => {
    return ledere.avkrefter && nesteLedere.avkreftet;
};

export const henterEllerHarHentetToggles = (toggles) => {
    return toggles.henter || toggles.hentet;
};

export const hentetEllerHentingFeilet = (reducere) => {
    return reducere.filter((reducer) => {
        return reducer.hentet || reducer.hentingFeilet;
    }).length === reducere.length;
};
