export const OPPHOLD_UTLAND_SKJEMA = 'OPPHOLD_UTLAND_SKJEMA';
export const DIN_SYKMELDING_SKJEMANAVN = 'dinSykmeldingSkjema';
export const SYKEPENGER_SKJEMANAVN = 'SYKEPENGERSKJEMA';

export const getSykepengesoknadSkjemanavn = (id) => {
    return `SYKEPENGESOKNAD_ARBEIDSTAKER___${id}`;
};
