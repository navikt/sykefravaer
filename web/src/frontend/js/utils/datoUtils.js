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

export function sorterPerioderEldsteFoerst(perioder) {
    return perioder.sort((a, b) => {
        if (toDate(a.fom).getTime() !== toDate(b.fom).getTime()) {
            return toDate(a.fom) - toDate(b.fom);
        }
        return toDate(a.tom) - toDate(b.tom);
    });
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

export function sorterSykmeldingerEldsteFoerst(sykmeldinger) {
    return sykmeldinger.sort((a, b) => {
        const startdatoA = toDate(getSykmeldingStartdato(a));
        const startdatoB = toDate(getSykmeldingStartdato(b));
        if (startdatoA.getTime() !== startdatoB.getTime()) {
            return startdatoA - startdatoB;
        }
        return getPeriodeSpenn(a.mulighetForArbeid.perioder) < getPeriodeSpenn(b.mulighetForArbeid.perioder) ? -1 : 1;
    });
}

export function sorterSykmeldinger(sykmeldinger = [], kriterium = 'fom') {
    sykmeldinger.map((sykmelding) => {
        const perioder = sorterPerioderEldsteFoerst(sykmelding.mulighetForArbeid.perioder);
        return Object.assign(sykmelding.mulighetForArbeid, { perioder });
    });
    return sykmeldinger.sort((a, b) => {
        if (kriterium === 'fom' || a.arbeidsgiver.trim().toUpperCase() === b.arbeidsgiver.trim().toUpperCase()) {
            if (toDate(getSykmeldingStartdato(a)).getTime() !== toDate(getSykmeldingStartdato(b)).getTime()) {
                // Hvis a og b har ulik startdato, sorterer vi etter startdato
                return toDate(getSykmeldingStartdato(b)) - toDate(getSykmeldingStartdato(a));
            }
            const sistePeriodeB = b.mulighetForArbeid.perioder[b.mulighetForArbeid.perioder.length - 1];
            const sistePeriodeA = a.mulighetForArbeid.perioder[a.mulighetForArbeid.perioder.length - 1];
            return toDate(sistePeriodeB.tom) - toDate(sistePeriodeA.tom);
        }
        return Object.byString(a, kriterium) < Object.byString(b, kriterium) ? -1 : 1;
    });
}
