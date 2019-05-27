export const HENT_SYKEFORLOEP_METADATA_FORESPURT = 'HENT_SYKEFORLOEP_METADATA_FORESPURT';
export const HENTER_SYKEFORLOEP_METADATA = 'HENTER_SYKEFORLOEP_METADATA';
export const SYKEFORLOEP_METADATA_HENTET = 'SYKEFORLOEP_METADATA_HENTET';
export const HENT_SYKEFORLOEP_METADATA_FEILET = 'HENT_SYKEFORLOEP_METADATA_FEILET';

export function hentSykeforloepMetadata() {
    return {
        type: HENT_SYKEFORLOEP_METADATA_FORESPURT,
    };
}

export function henterSykeforloepMetadata() {
    return {
        type: HENTER_SYKEFORLOEP_METADATA,
    };
}

export function sykeforloepMetadataHentet(data) {
    return {
        type: SYKEFORLOEP_METADATA_HENTET,
        data,
    };
}

export function hentSykeforloepMetadataFeilet() {
    return {
        type: HENT_SYKEFORLOEP_METADATA_FEILET,
    };
}
