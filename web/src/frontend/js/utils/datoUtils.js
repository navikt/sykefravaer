export const toDate = (dato) => {
    return new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth);
};

//  midlertidig fiks til vi får på plass react-intl. Da kan vi bruke <FormattedDate value={toDate(dato)} format="norskLang"/> istedenfor
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

export function getAvstandIDager(from, to) {
    return Math.ceil(Math.abs(to.getTime() - from.getTime()) / (1000 * 3600 * 24));
}

export function sorterPerioder(sykmelding) {
    return Object.assign(sykmelding.mulighetForArbeid, {
        perioder: sykmelding.mulighetForArbeid.perioder.sort((a, b) => {
            if (toDate(a.fom).getTime() !== toDate(b.fom).getTime()) {
                return toDate(a.fom) - toDate(b.fom);
            }
            return toDate(a.tom) - toDate(b.tom);
        }),
    });
}

export function sorterSykmeldinger(sykmeldinger = [], kriterium = 'fom') {
    sykmeldinger.map(sorterPerioder);
    return sykmeldinger.sort((a, b) => {
        if (kriterium === 'fom' || a.arbeidsgiver.trim().toUpperCase() === b.arbeidsgiver.trim().toUpperCase()) {
            if (toDate(a.mulighetForArbeid.perioder[0].fom).getTime() !== toDate(b.mulighetForArbeid.perioder[0].fom).getTime()) {
                return toDate(b.mulighetForArbeid.perioder[0].fom) - toDate(a.mulighetForArbeid.perioder[0].fom);
            }
            return toDate(b.mulighetForArbeid.perioder[b.mulighetForArbeid.perioder.length - 1].tom) -
                toDate(a.mulighetForArbeid.perioder[a.mulighetForArbeid.perioder.length - 1].tom);
        }
        return Object.byString(a, kriterium) < Object.byString(b, kriterium) ? -1 : 1;
    });
}
