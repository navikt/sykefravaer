export function getOppfolgingsdialog(oppfolgingsdialoger, oppfolgingsdialogId) {
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return `${oppfolgingsdialog.oppfoelgingsdialogId}` === `${oppfolgingsdialogId}`;
    })[0];
}
