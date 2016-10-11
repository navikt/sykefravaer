import { toDate } from './datoUtils';
import * as utils from './index';

export function sorterPerioderEldsteFoerst(perioder) {
    return perioder.sort((a, b) => {
        if (toDate(a.fom).getTime() !== toDate(b.fom).getTime()) {
            return toDate(a.fom) - toDate(b.fom);
        }
        return toDate(a.tom) - toDate(b.tom);
    });
}

export function sorterSykmeldingerEldsteFoerst(sykmeldinger) {
    return sykmeldinger.sort((a, b) => {
        const startdatoA = toDate(utils.getSykmeldingStartdato(a));
        const startdatoB = toDate(utils.getSykmeldingStartdato(b));
        if (startdatoA.getTime() !== startdatoB.getTime()) {
            return startdatoA - startdatoB;
        }
        return utils.getPeriodeSpenn(a.mulighetForArbeid.perioder) < utils.getPeriodeSpenn(b.mulighetForArbeid.perioder) ? -1 : 1;
    });
}

export function sorterSykmeldinger(sykmeldinger = [], kriterium = 'fom') {
    sykmeldinger.map((sykmelding) => {
        const perioder = sorterPerioderEldsteFoerst(sykmelding.mulighetForArbeid.perioder);
        return Object.assign(sykmelding.mulighetForArbeid, { perioder });
    });
    return sykmeldinger.sort((a, b) => {
        if (kriterium === 'fom' || a.arbeidsgiver.trim().toUpperCase() === b.arbeidsgiver.trim().toUpperCase()) {
            if (toDate(utils.getSykmeldingStartdato(a)).getTime() !== toDate(utils.getSykmeldingStartdato(b)).getTime()) {
                // Hvis a og b har ulik startdato, sorterer vi etter startdato
                return toDate(utils.getSykmeldingStartdato(b)) - toDate(utils.getSykmeldingStartdato(a));
            }
            const sistePeriodeB = b.mulighetForArbeid.perioder[b.mulighetForArbeid.perioder.length - 1];
            const sistePeriodeA = a.mulighetForArbeid.perioder[a.mulighetForArbeid.perioder.length - 1];
            return toDate(sistePeriodeB.tom) - toDate(sistePeriodeA.tom);
        }
        return Object.byString(a, kriterium) < Object.byString(b, kriterium) ? -1 : 1;
    });
}
