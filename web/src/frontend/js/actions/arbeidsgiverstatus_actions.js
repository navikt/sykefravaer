
export function settArbeidsgiverstatus(arbeidsgiverstatus, sykmeldingsId) {
    console.log("action");
    return {
        type: 'SETT_ARBEIDSGIVER_STATUS',
        arbeidsgiverstatus,
        sykmeldingsId,
    };
}
