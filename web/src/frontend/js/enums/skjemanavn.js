export const OPPHOLD_UTLAND_SKJEMA = 'OPPHOLD_UTLAND_SKJEMA';

export const getSykmeldingSkjemanavn = (id) => {
    return `SYKMELDING___${id}`;
};

export const getSykepengesoknadArbeidstakerSkjemanavn = (id) => {
    return `SYKEPENGESOKNAD_ARBEIDSTAKER___${id}`;
};

export const getSykepengesoknadSelvstendigSkjemanavn = (id) => {
    return `SYKEPENGESOKNAD_SELVSTENDIG/FRILANSER___${id}`;
};
