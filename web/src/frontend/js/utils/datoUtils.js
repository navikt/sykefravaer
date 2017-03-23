export const datoMedKlokkeslett = (dato) => {
    if (dato === undefined || dato === null) {
        return '';
    }

    const days = parseInt(dato.substring(8, 10), 10) < 10 ? dato.substring(9, 10) : dato.substring(8, 10);
    const months = parseInt(dato.substring(5, 7), 10) < 10 ? dato.substring(6, 7) : dato.substring(5, 7);
    const time = dato.substring(11, 16);

    /* 16/2 klokken 14:15 */
    return `${days}/${months} klokken ${time}`;
};
