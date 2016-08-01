export function setHendelser(data = []) {
    return {
        type: 'SET_HENDELSER',
        data,
    };
}

export function apneHendelser(hendelseIder) {
    return {
        type: 'ÅPNE_HENDELSER',
        hendelseIder,
    };
}

export function leggTilHendelser(sykeforloep) {
    return {
        type: 'LEGG_TIL_HENDELSER',
        sykeforloep,
    };
}

export function setHendelseData(hendelseId, data) {
    return {
        type: 'SET_HENDELSEDATA',
        hendelseId,
        data,
    };
}
