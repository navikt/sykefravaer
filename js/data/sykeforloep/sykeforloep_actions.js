import * as actiontyper from '../actiontyper';

export function hentSykeforloep() {
    return {
        type: actiontyper.HENT_SYKEFORLOEP_FORESPURT,
    };
}

export function henterSykeforloep() {
    return {
        type: actiontyper.HENTER_SYKEFORLOEP,
    };
}

export function sykeforloepHentet(data) {
    return {
        type: actiontyper.SYKEFORLOEP_HENTET,
        data,
    };
}

export function hentSykeforloepFeilet() {
    return {
        type: actiontyper.HENT_SYKEFORLOEP_FEILET,
    };
}

export function hentSykeforloepMetadata() {
    return {
        type: actiontyper.HENT_SYKEFORLOEP_METADATA_FORESPURT,
    };
}

export function henterSykeforloepMetadata() {
    return {
        type: actiontyper.HENTER_SYKEFORLOEP_METADATA,
    };
}

export function sykeforloepMetadataHentet(data) {
    return {
        type: actiontyper.SYKEFORLOEP_METADATA_HENTET,
        data,
    };
}

export function hentSykeforloepMetadataFeilet() {
    return {
        type: actiontyper.HENT_SYKEFORLOEP_METADATA_FEILET,
    };
}
