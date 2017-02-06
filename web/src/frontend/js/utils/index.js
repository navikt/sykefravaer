export const lagHeltall = (streng) => {
    return streng.replace(/[^\d.-]/g, '').replace(/-/g, '');
};

export const lagDesimaltall = (streng) => {
    let s = streng.replace(/,/g, '.');
    if (!s.endsWith('.')) {
        s = parseFloat(s);
        if (isNaN(s)) {
            return '';
        }
    }
    return `${s}`.replace(/\./g, ',');
};

export const parseDato = (input) => {
    const grupper = lagHeltall(input).split('.');
    let dato = grupper.join('');
    if (dato.length > 2 || grupper.length > 1) {
        dato = dato.replace(/(.{2})/, '$1.');
        if (dato.length >= 6 || grupper.length > 2) {
            dato = dato.replace(/(.{5})/, '$1.');
        }
    }
    return dato;
};

const parsedato = (dato) => {
    const datoSplit = dato.split('.');
    let ar = datoSplit[2];
    if (ar.length === 2) {
        ar = `20${ar}`;
    }
    return `${ar}-${datoSplit[1]}-${datoSplit[0]}`;
};

export const fraInputdatoTilJSDato = (inputDato) => {
    const d = parsedato(inputDato);
    return new Date(d);
};

export const erGyldigDato = (dato) => {
    const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    if (!re.test(dato)) {
        return false;
    }
    if (dato.trim().length !== 10) {
        return false;
    }
    const _dato = fraInputdatoTilJSDato(dato);
    if (isNaN(_dato.getTime())) {
        return false;
    }
    return true;
};
