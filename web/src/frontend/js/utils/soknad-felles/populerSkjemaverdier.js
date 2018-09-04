export default (verdier, feltnavn, nyVerdi) => {
    return {
        ...verdier,
        [feltnavn]: nyVerdi,
    };
};
