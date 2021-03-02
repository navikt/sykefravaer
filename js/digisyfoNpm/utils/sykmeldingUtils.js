import React from 'react';
import { SykmeldingOpplysning } from '../components/sykmeldingOpplysninger/SykmeldingOpplysning';
import { SykmeldingCheckbox } from '../components/sykmeldingOpplysninger/SykmeldingCheckbox';
import { getDuration, toDate } from './datoUtils';

export const hentPerioderForSykmelding = (sykmelding) => {
    return sykmelding.mulighetForArbeid
        ? sykmelding.mulighetForArbeid.perioder
        : sykmelding.sykmeldingsperioder;
};

export const getSykmeldingCheckbox = (sykmeldingBolk, felt, tekst, className) => {
    if (sykmeldingBolk[felt]) {
        return (<SykmeldingCheckbox tekst={tekst} jsClassName={felt} className={className} />);
    }
    return null;
};

export const getSykmeldingOpplysning = (sykmeldingBolk, felt, tittel, opplysning, Overskrift = 'h5') => {
    if (sykmeldingBolk[felt]) {
        return (
            <SykmeldingOpplysning tittel={tittel} Overskrift={Overskrift}>
                <p className={`opplysning__verdi js-${felt}`}>{opplysning || sykmeldingBolk[felt]}</p>
            </SykmeldingOpplysning>
        );
    }
    return null;
};

export function getSykmelding(sykmeldinger, sykmeldingId) {
    return sykmeldinger.find((sykmld) => {
        return `${sykmld.id}` === `${sykmeldingId}`;
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

export function sorterPerioderEldsteFoerst(perioder) {
    return perioder.sort((a, b) => {
        if (toDate(a.fom)
            .getTime() !== toDate(b.fom)
            .getTime()) {
            return toDate(a.fom) - toDate(b.fom);
        }
        return toDate(a.tom) - toDate(b.tom);
    });
}


export function getSykmeldingStartdato(sykmelding) {
    const perioder = hentPerioderForSykmelding(sykmelding);
    return sorterPerioderEldsteFoerst(perioder)[0].fom;
}

export function sorterSykmeldingerEldsteFoerst(sykmeldinger) {
    return sykmeldinger.sort((a, b) => {
        const startdatoA = toDate(getSykmeldingStartdato(a));
        const startdatoB = toDate(getSykmeldingStartdato(b));
        if (startdatoA.getTime() !== startdatoB.getTime()) {
            return startdatoA - startdatoB;
        }

        return getPeriodeSpenn(hentPerioderForSykmelding(a)) < getPeriodeSpenn(hentPerioderForSykmelding(b))
            ? -1
            : 1;
    });
}

const hentArbeidsgivernavn = (sykmelding) => {
    return sykmelding.mottakendeArbeidsgiver
        ? sykmelding.mottakendeArbeidsgiver.navn
        : sykmelding.arbeidsgiver
            ? sykmelding.arbeidsgiver
            : sykmelding.arbeidsgiverNavn
                ? sykmelding.arbeidsgiverNavn
                : '';
};

export function sorterSykmeldinger(sykmeldinger = [], kriterium = 'fom') {
    return sykmeldinger
        .map((sykmelding) => {
            return sykmelding.mulighetForArbeid
                ? {
                    ...sykmelding,
                    mulighetForArbeid: {
                        ...sykmelding.mulighetForArbeid,
                        perioder: sorterPerioderEldsteFoerst(sykmelding.mulighetForArbeid.perioder),
                    },
                }
                : {
                    ...sykmelding,
                    sykmeldingsperioder: sorterPerioderEldsteFoerst(sykmelding.sykmeldingsperioder),
                };
        })
        .sort((a, b) => {
            if (kriterium === 'fom' || hentArbeidsgivernavn(a)
                .trim()
                .toUpperCase() === hentArbeidsgivernavn(b)
                .toUpperCase()) {
                if (toDate(getSykmeldingStartdato(a))
                    .getTime() !== toDate(getSykmeldingStartdato(b))
                    .getTime()) {
                    // Hvis a og b har ulik startdato, sorterer vi etter startdato
                    return toDate(getSykmeldingStartdato(b)) - toDate(getSykmeldingStartdato(a));
                }
                const perioderA = hentPerioderForSykmelding(a);
                const perioderB = hentPerioderForSykmelding(b);
                const sistePeriodeB = perioderB[perioderB.length - 1];
                const sistePeriodeA = perioderA[perioderA.length - 1];
                return toDate(sistePeriodeB.tom) - toDate(sistePeriodeA.tom);
            }
            return Object.byString(a, kriterium) < Object.byString(b, kriterium)
                ? -1
                : 1;
        });
}
