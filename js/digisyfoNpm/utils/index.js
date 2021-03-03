export * from './browserUtils';
export * from './datoUtils';
export * from './periodeUtils';
export * from './reducerUtils';
export * from './sykmeldingUtils';
export * from './sykeforloepUtils';

// Fra Stack Overflow <3
Object.byString = function byString(o, s) {
    let s_ = s;
    let o_ = o;
    s_ = s_.replace(/\[(\w+)]/g, '.$1');
    s_ = s_.replace(/^\./, '');
    const a = s_.split('.');
    for (let i = 0, n = a.length; i < n; i += 1) {
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
    const keys = Object.keys(objekt);

    for (let i = 0; i < keys.length; i += 1) {
        if (objekt[keys[i]]) {
            resultat.push(objekt[keys[i]]);
        }
    }
    return resultat;
}

const createLogger = () => {
    if (window.location.search.indexOf('log=true') > -1 || (process.env.NODE_ENV === 'development')) {
        // eslint-disable-next-line
        return console.log;
    }
    return () => {};
};

export const log = createLogger();
