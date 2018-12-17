import PropTypes from 'prop-types';
import { childEllerChildren } from '../propTypes';

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

export const lagHeltall = (streng) => {
    const strengMedDesimaler = lagDesimaltall(streng);
    return strengMedDesimaler.split(',')[0];
};

export const getObjectValueByString = (o, s) => {
    // o = objekt
    // s = string
    let string = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    string = string.replace(/^\./, ''); // strip a leading dot
    const keys = string.split('.');
    let obj = { ...o };
    for (let i = 0, n = keys.length; i < n; i += 1) {
        const key = keys[i];
        if (key in obj) {
            obj = obj[key];
        }
    }
    return obj;
};

export const Vis = ({ hvis, children, render }) => {
    return hvis && render
        ? render()
        : hvis && children
            ? children
            : null;
};

Vis.propTypes = {
    hvis: PropTypes.bool,
    children: childEllerChildren,
};

export const hentFornavn = (navn) => {
    if (!navn) {
        return '';
    }

    const fornavn = navn.split(' ')[0];

    return fornavn.charAt(0).toUpperCase() + fornavn.slice(1).toLowerCase();
};

const maaneder = [
    'januar', 'februar', 'mars', 'april',
    'mai', 'juni', 'juli', 'august',
    'september', 'oktober', 'november', 'desember',
];

// Formater dato på formen DD.MM.YYYY til f.eks 01. juni 2018
export const formaterDato = (dato) => {
    if (!dato || dato === '') {
        return '';
    }

    const verdier = dato.split('.');

    if (verdier.length !== 3) {
        return dato;
    }

    const maaned = parseInt(verdier[1], 10);
    const maanedStr = maaneder[maaned - 1];

    if (!maanedStr) {
        return dato;
    }

    return `${verdier[0]}. ${maanedStr} ${verdier[2]}`;
};

export const formaterOrgnr = (orgnr) => {
    return orgnr.replace(/(...)(...)(...)/g, '$1 $2 $3');
};

export const tilStorForbokstav = (streng) => {
    return streng.replace(/^\w/, (c) => {
        return c.toUpperCase();
    });
};
