export const SKJEMANAVN_OPPHOLD_UTLAND = 'OPPHOLD_UTLAND_SKJEMA';
export const PREFIX_SYKMELDINGSKJEMA = 'SYKMELDING___';
export const PREFIX_SKJEMANAVN_SOKNAD = 'SOKNAD___';

export const getSykmeldingSkjemanavn = (id) => {
    return `${PREFIX_SYKMELDINGSKJEMA}${id}`;
};

export const getSoknadSkjemanavn = (id) => {
    return `${PREFIX_SKJEMANAVN_SOKNAD}${id}`;
};
