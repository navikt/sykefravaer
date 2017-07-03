export function getOppfolgingsdialog(oppfolgingsdialoger, oppfolgingsdialogId) {
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return oppfolgingsdialog.oppfoelgingsdialogId.toString() === oppfolgingsdialogId.toString();
    })[0];
}

export const erOppfolgingsdialogOpprettetMedArbeidsgiver = (oppfolgingsdialoger, virksomhetsnummer) => {
    return oppfolgingsdialoger.filter((dialog) => {
        return dialog.virksomhetsnummer === virksomhetsnummer;
    }).length > 0;
};

export const isEmpty = (array) => {
    return array.length === 0;
};
