import * as actiontyper from './actiontyper';

export function setHendelser(data = []) {
    return {
        type: actiontyper.SET_HENDELSER,
        data,
    };
}

export function apneHendelser(hendelseIder) {
    return {
        type: actiontyper.APNE_HENDELSER,
        hendelseIder,
    };
}

export function leggTilHendelser(sykeforloep) {
    return {
        type: actiontyper.LEGG_TIL_HENDELSER,
        sykeforloep,
    };
}

export function setHendelseData(hendelseId, data) {
    return {
        type: actiontyper.SET_HENDELSEDATA,
        hendelseId,
        data,
    };
}
