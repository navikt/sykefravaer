export const getSykepengesoknaderUrl = () => {
    return process.env.REACT_APP_SYKEPENGESOKNAD_ROOT;
};

export const getSykepengesoknadUrl = (soknadId) => {
    return `${getSykepengesoknaderUrl()}/${soknadId}`;
};
