/* eslint-disable */
import { fraInputdatoTilJSDato } from './datoUtils';

export const parseDatoerPeriode = (periode) => {
    return Object.assign({}, periode, {
        fom: new Date(periode.fom),
        tom: new Date(periode.tom),
    });
};

export const parseDatoerPeriodeListe = (perioder) => {
    return perioder.map((p) => {
        return parseDatoerPeriode(p);
    });
};

export const tidligsteFom = (perioder) => {
    return perioder.map((p) => {
        return p.fom;
    })
        .sort((p1, p2) => {
            if (p1 > p2) {
                return 1;
            } if (p1 < p2) {
                return -1;
            }
            return 0;
        })[0];
};

export const senesteTom = (perioder) => {
    return perioder.map((p) => {
        return p.tom;
    })
        .sort((p1, p2) => {
            if (p1 < p2) {
                return 1;
            } if (p1 > p2) {
                return -1;
            }
            return 0;
        })[0];
};

export const tilDatePeriode = (periode) => {
    let fom;
    let tom;
    try {
        fom = fraInputdatoTilJSDato(periode.fom);
    } catch (e) {
        fom = periode.fom;
    }
    try {
        tom = fraInputdatoTilJSDato(periode.tom);
    } catch (e) {
        tom = periode.tom;
    }
    return {
        fom,
        tom,
    };
};

export const periodeOverlapperMedPeriode = (periodeA_, periodeB_) => {
    const periodeA = tilDatePeriode(periodeA_);
    const periodeB = tilDatePeriode(periodeB_);
    try {
        const forstePeriode = periodeA.fom.getTime() < periodeB.fom.getTime() ? periodeA : periodeB;
        const andrePeriode = periodeA.fom.getTime() < periodeB.fom.getTime() ? periodeB : periodeA;
        return forstePeriode.tom.getTime() >= andrePeriode.fom.getTime();
    } catch (e) {
        return false;
    }
};
