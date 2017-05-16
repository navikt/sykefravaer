export const lagHeltall = (streng) => {
    return streng.replace(/[^\d.-]/g, '').replace(/-/g, '');
};

export const lagDesimaltall = (streng) => {
    let s = streng.replace(/,/g, '.');
    if (s.startsWith('.')) {
        return '';
    }
    if (!s.endsWith('.')) {
        s = parseFloat(s);
        if (isNaN(s)) {
            return '';
        }
    }
    s = `${s}`.replace(/\./g, ',');
    if (s.indexOf(',') > -1) {
        s = s.split(',');
        s = [s[0], s[1].substr(0, 2)];
        return s.join(',');
    }
    return s;
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

export const newDate = () => {
    const now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getHours(), now.getUTCMinutes(), now.getUTCSeconds());
};

export const erMotePassert = (mote) => {
    if (mote.bekreftetAlternativ && mote.bekreftetAlternativ.tid <= newDate()) {
        return true;
    }
    const antallAlternativer = mote.alternativer.length;
    return mote.alternativer.filter((alternativ) => {
        return alternativ.tid <= newDate();
    }).length === antallAlternativer;
};

export const erGyldigDatoformat = (dato) => {
    const d = dato.replace(/\./g, '');
    let s = `${parseInt(d, 10)}`;
    if (dato.startsWith('0')) {
        s = `0${s}`;
    }
    if (dato.trim().length !== 10) {
        return false;
    }
    if (s.length !== 8) {
        return false;
    }
    return true;
};

export const erGyldigDato = (dato) => {
    const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    if (!re.test(dato)) {
        return false;
    }
    return erGyldigDatoformat(dato);
};

export const getObjectValueByString = (o, s) => {
    // o = objekt
    // s = string
    let string = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    string = string.replace(/^\./, ''); // strip a leading dot
    const keys = string.split('.');
    let obj = Object.assign({}, o);
    for (let i = 0, n = keys.length; i < n; ++i) {
        const key = keys[i];
        if (key in obj) {
            obj = obj[key];
        }
    }
    return obj;
};
