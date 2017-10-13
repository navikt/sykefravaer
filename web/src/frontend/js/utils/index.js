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

export const getObjectValueByString = (o, s) => {
    // o = objekt
    // s = string
    let string = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    string = string.replace(/^\./, ''); // strip a leading dot
    const keys = string.split('.');
    let obj = Object.assign({}, o);
    for (let i = 0, n = keys.length; i < n; i += 1) {
        const key = keys[i];
        if (key in obj) {
            obj = obj[key];
        }
    }
    return obj;
};
