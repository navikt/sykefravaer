export const getOppfolgingstilfelleStartdato = (sykeforloep, sykmeldingId) => {
    const aktueltSykeforloep = sykeforloep.filter(sf => sf.sykmeldinger.filter(sm => sm.id === sykmeldingId).length > 0)[0];
    const aktuellSykmelding = aktueltSykeforloep.sykmeldinger.filter(sm => sm.id === sykmeldingId)[0];

    return aktueltSykeforloep.oppfoelgingsdato.getTime() < aktuellSykmelding.identdato.getTime()
        ? aktueltSykeforloep.oppfoelgingsdato
        : aktuellSykmelding.identdato;
};
