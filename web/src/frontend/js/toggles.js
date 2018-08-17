export const toggleSelvstendigSoknad = () => {
    // return false;
    const url = window.location.href;
    return url.indexOf('localhost') > -1 || url.indexOf('tjenester-q1') > -1;
};

export const toggleInnsendingAvSelvstendigSoknad = () => {
    // return false;
    const url = window.location.href;
    return url.indexOf('localhost') > -1 || url.indexOf('tjenester-q1') > -1;
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

export const toggleHeleAppen = () => {
    // Hvis denne settes til false, deaktiveres hele appen og det vises en plakat i stedet
    // Tekst hardkodes i Side.js
    return true;
};
