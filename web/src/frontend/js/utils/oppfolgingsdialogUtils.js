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

export const hentOppfolgingsdialogOpprettetMedArbeidsgiver = (oppfolgingsdialoger, virksomhetsnummer) => {
    return oppfolgingsdialoger.filter((dialog) => {
        return dialog.virksomhetsnummer === virksomhetsnummer;
    })[0];
};

export const erOppfolgingsdialogOpprettbarMedArbeidsgiver = (oppfolgingsdialoger, arbeidsgiver) => {
    return arbeidsgiver.harNaermesteLeder && !erOppfolgingsdialogOpprettetMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver.virksomhetsnummer);
};

export const erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver = (oppfolgingsdialoger, arbeidsgivere) => {
    return arbeidsgivere.filter((arbeidsgiver) => {
        return erOppfolgingsdialogOpprettbarMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver);
    }).length > 0;
};

export const isEmpty = (array) => {
    return array.length === 0;
};
