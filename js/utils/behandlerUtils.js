export const getBehandlerNavn = (behandler) => {
    // should not happen :-)
    if (!behandler) {
        return '';
    }
    return `${behandler.fornavn}${
        behandler.mellomnavn ? ` ${behandler.mellomnavn}` : ''
    } ${behandler.etternavn}`;
};
