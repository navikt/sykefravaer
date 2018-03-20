export const getOppfolgingstilfelleStartdato = (sykeforloep, sykmeldingId) => {
    const aktueltSykeforloep = sykeforloep.filter((sf) => {
        return sf.sykmeldinger.filter((sm) => {
            return sm.id === sykmeldingId;
        }).length > 0;
    })[0];
    const aktuellSykmelding = aktueltSykeforloep.sykmeldinger.filter((sm) => {
        return sm.id === sykmeldingId;
    })[0];

    return aktueltSykeforloep.oppfoelgingsdato.getTime() < aktuellSykmelding.identdato.getTime()
        ? aktueltSykeforloep.oppfoelgingsdato
        : aktuellSykmelding.identdato;
};
