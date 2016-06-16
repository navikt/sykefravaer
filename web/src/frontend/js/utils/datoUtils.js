export const toDate = (dato) => new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth);

export const fromDateToJSON = (date) =>
    ({
        chronology: {
            calendarType: 'iso8601',
            id: 'ISO'
        },
        dayOfMonth: date.getDate(),
        dayOfWeek: date.getDay(),
        hour: 0,
        minute: 0,
        monthValue: date.getMonth() + 1,
        nano: 0,
        second: 0,
        year: date.getFullYear()
    });

//midlertidig fiks til vi får på plass react-intl. Da kan vi bruke <FormattedDate value={toDate(dato)} format="norskLang"/> istedenfor
export const toDatePrettyPrint = (dato) => {
    if (dato == null) {
        return null;
    }
    let dag = dato.dayOfMonth;
    if (dag.toString().length === 1) {
        dag = "0" + dag;
    }
    let maned = dato.monthValue;
    if (maned.toString().length === 1) {
        maned = "0" + maned;
    }

    return dag + "." + maned + "." + dato.year;
};

export function getDuration(from, to) {
    return Math.floor(parseDate(to) - parseDate(from))/ (1000 * 60 * 60 * 24) + 1;
}

const parseDate = (dato) => {
    if (dato == null) {
        return new Date();
    }
    return new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth);
};

export function sorterPerioder(sykmelding) {
    return Object.assign(sykmelding.mulighetForArbeid, {
        perioder: sykmelding.mulighetForArbeid.perioder.sort((a, b) => {
            if (toDate(a.fom).getTime() !== toDate(b.fom).getTime()) {
                return toDate(a.fom) - toDate(b.fom)
            }
            return toDate(a.tom) - toDate(b.tom)
        }),
    });
}

export function sorterSykmeldinger(sykmeldinger = [], kriterium = 'fom') {
    sykmeldinger.map(sorterPerioder);
    return sykmeldinger.sort((a, b) => {
        if (kriterium === 'fom' || a.arbeidsgiver.trim().toUpperCase() === b.arbeidsgiver.trim().toUpperCase()) {
            return toDate(b.mulighetForArbeid.perioder[0].fom) - toDate(a.mulighetForArbeid.perioder[0].fom);
        }
        return Object.byString(a, kriterium) < Object.byString(b, kriterium) ? -1 : 1;
    });
}