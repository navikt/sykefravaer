export const toggleSelvstendigSoknad = () => {
    return true;
    // const url = window.location.href;
    // return url.indexOf('localhost') > -1 || url.indexOf('tjenester-q1') > -1;
};

export const toggleInnsendingAvSelvstendigSoknad = () => {
    return true;
    // const url = window.location.href;
    // return url.indexOf('localhost') > -1;
};

export const toggleBrukMockDataSelvstendigSoknad = () => {
    return false;
};

export const toggleSykepengesoknadUtland = () => {
    const url = window.location.href;
    return url.indexOf('localhost') > -1 || url.indexOf('tjenester-q1') > -1;
};

export const toggleBrukMockdataUtland = () => {
    const url = window.location.href;
    return url.indexOf('localhost') > -1;
};
