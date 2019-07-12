export const toggleBrukMockDataSelvstendigSoknad = () => false;

export const toggleBrukMockdataUtland = () => {
    const url = window.location.href;
    return url.indexOf('localhost') > -1;
};

export const toggleHeleAppen = () =>
    // Hvis denne settes til false, deaktiveres hele appen og det vises en plakat i stedet
    // Tekst hardkodes i Side.js
    true;
