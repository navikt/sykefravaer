export * from './browserUtils';
export * from './datoUtils';
export * from './sorterSykmeldingerUtils';
export * from './sykmeldingUtils';
export * from './valideringUtils';

// Fra Stack Overflow <3
Object.byString = function byString(o, s) {
    let s_ = s;
    let o_ = o;
    s_ = s_.replace(/\[(\w+)]/g, '.$1');
    s_ = s_.replace(/^\./, '');
    const a = s_.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i];
        if (k in o_) {
            o_ = o_[k];
        } else {
            return undefined;
        }
    }
    return o_;
};

export const getCookie = (name) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

export function filtrerObjektKeys(objekt) {
    const resultat = [];

    for (const key in objekt) {
        if (objekt[key]) {
            resultat.push(objekt[key]);
        }
    }
    return resultat;
}
