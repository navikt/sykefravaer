export function getOppfolgingsdialog(oppfolgingsdialoger, oppfolgingsdialogId) {
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return oppfolgingsdialog.oppfoelgingsdialogId === oppfolgingsdialogId.toString();
    })[0];
}

export const isEmpty = (array) => {
    return array.length === 0;
};
