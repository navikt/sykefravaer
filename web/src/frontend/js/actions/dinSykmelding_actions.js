
export function settArbeidsgiverstatus(arbeidsgiverstatus, sykmeldingsId) {
    console.log("action");
    return {
        type: 'SETT_ARBEIDSGIVER_STATUS',
        arbeidsgiverstatus,
        sykmeldingsId,
    };
}

export function sendSykmeldingGaaVidere(arbeidsgiverstatus){
    console.log("videre");
    return {
        type: 'GAA_VIDERE',
        arbeidsgiverstatus,
    };
}
