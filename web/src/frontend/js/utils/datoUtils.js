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

export function getPeriodeSpenn(perioder) {
    const forsteStartDato = perioder.sort((a, b) => {
        return toDate(a.fom) - toDate(b.fom);
    })[0].fom;
    const sisteSluttDato = perioder.sort((a, b) => {
        return toDate(b.tom) - toDate(a.tom);
    })[0].tom;
    return getDuration(forsteStartDato, sisteSluttDato);
}

export function getSykmeldingStartdato(sykmelding) {
    return sorterPerioderEldsteFoerst(sykmelding.mulighetForArbeid.perioder)[0].fom;
}
