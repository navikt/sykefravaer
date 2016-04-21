export function hentSykmeldinger() {
    return {
        type: 'HENT_SYKMELDINGER',
    };
}

export function hentSykmeldingerFeilet() {
    return {
        type: 'HENT_SYKMELDINGER_FEILET',
    };
}

export function setSykmeldinger(sykmeldinger = []) {
    return {
        type: 'SET_SYKMELDINGER',
        sykmeldinger,
    };
}

export function sorterSykmeldinger(sortering) {
    return {
        type: 'SET_SORTERING',
        sortering,
    };
}
