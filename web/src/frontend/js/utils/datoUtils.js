export const datoMedKlokkeslett = (dato) => {
    if (dato === undefined || dato === null) {
        return '';
    }

    const d = new Date(dato);

    const datoJustert = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));

    const days = datoJustert.getDate() < 10 ? `0${datoJustert.getDate()}` : `${datoJustert.getDate()}`;
    const months = datoJustert.getMonth() + 1;
    const hours = datoJustert.getHours() < 10 ? `0${datoJustert.getHours()}` : `${datoJustert.getHours()}`;
    const minutes = datoJustert.getMinutes() < 10 ? `0${datoJustert.getMinutes()}` : `${datoJustert.getMinutes()}`;

    /* 16/2 klokken 14:15 */
    return `${days}/${months} klokken ${hours}:${minutes}`;
};
