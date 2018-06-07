export const toggleSelvstendigSoknad = () => {
    const url = window.location.href;
    return url.indexOf('localhost') > -1 || url.indexOf('tjenester-q1') > -1;
};
