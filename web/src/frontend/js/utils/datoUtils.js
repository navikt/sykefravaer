import { sorterPerioderEldsteFoerst } from './sorterSykmeldingerUtils';

export const toDate = (dato) => {
    return new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth);
};

export const toDatePrettyPrint = (dato) => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }
    let dag = dato.dayOfMonth;
    if (dag.toString().length === 1) {
        dag = `0${dag}`;
    }
    let maned = dato.monthValue;
    if (maned.toString().length === 1) {
        maned = `0${maned}`;
    }

    return `${dag}.${maned}.${dato.year}`;
};

const parseDate = (dato) => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }
    return new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth);
};

export function getDuration(from, to) {
    return Math.round(Math.floor(parseDate(to) - parseDate(from)) / (1000 * 60 * 60 * 24)) + 1;
}
