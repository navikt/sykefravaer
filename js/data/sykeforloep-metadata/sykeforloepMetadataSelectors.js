export const erTiltakSykmeldteInngangAktivSelector = state => state.sykeforloepMetadata.data.erTiltakSykmeldteInngangAktiv;

export const skalHenteSykeforloepMetadata = state => !state.sykeforloepMetadata.henter
        && !state.sykeforloepMetadata.hentet
        && !state.sykeforloepMetadata.hentingFeilet;
