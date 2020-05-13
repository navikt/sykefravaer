export const getOppfolgingstilfelleStartdato = (sykeforloep, sykmeldingId) => {
    const aktueltSykeforloep = sykeforloep.filter((sf) => {
        return sf.sykmeldinger.filter((sm) => {
            return sm.id === sykmeldingId;
        }).length > 0;
    })[0];
    return aktueltSykeforloep.oppfolgingsdato;
};
