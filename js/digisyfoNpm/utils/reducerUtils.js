import { tidligsteFom, senesteTom, parseDatoerPeriode, parseDatoerPeriodeListe } from './periodeUtils';
import { toDate } from './datoUtils';

export const parseSykmelding = (sykmelding) => {
    return Object.assign({}, sykmelding, {
        startLegemeldtFravaer: toDate(sykmelding.startLegemeldtFravaer),
        identdato: toDate(sykmelding.identdato),
        sendtdato: toDate(sykmelding.sendtdato),
        diagnose: Object.assign({}, sykmelding.diagnose, {
            yrkesskadeDato: toDate(sykmelding.diagnose.yrkesskadeDato),
        }),
        mulighetForArbeid: Object.assign({}, sykmelding.mulighetForArbeid, {
            perioder: sykmelding.mulighetForArbeid.perioder.map((p) => {
                return Object.assign({}, p, {
                    fom: toDate(p.fom),
                    tom: toDate(p.tom),
                });
            }),
        }),
        friskmelding: Object.assign({}, sykmelding.friskmelding, {
            antattDatoReturSammeArbeidsgiver: toDate(sykmelding.friskmelding.antattDatoReturSammeArbeidsgiver),
            tilbakemeldingReturArbeid: toDate(sykmelding.friskmelding.tilbakemeldingReturArbeid),
            utenArbeidsgiverAntarTilbakeIArbeidDato: toDate(sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato),
            utenArbeidsgiverTilbakemelding: toDate(sykmelding.friskmelding.utenArbeidsgiverTilbakemelding),
        }),
        bekreftelse: Object.assign({}, sykmelding.bekreftelse, {
            utstedelsesdato: toDate(sykmelding.bekreftelse.utstedelsesdato),
        }),
        tilbakedatering: Object.assign({}, sykmelding.tilbakedatering, {
            dokumenterbarPasientkontakt: toDate(sykmelding.tilbakedatering.dokumenterbarPasientkontakt),
        }),
    });
};

const parseAktivitetsdatoer = (aktiviteter) => {
    return aktiviteter.map((aktivitet) => {
        return Object.assign({}, aktivitet,
            {
                periode: parseDatoerPeriode(aktivitet.periode),
            });
    });
};

const parseUtdanningsDato = (utdanning) => {
    return utdanning && Object.assign({}, utdanning, { utdanningStartdato: toDate(utdanning.utdanningStartdato) });
};

const parseUtenlandsopphold = (utenlandsopphold) => {
    return utenlandsopphold && Object.assign({}, utenlandsopphold, { perioder: parseDatoerPeriodeListe(utenlandsopphold.perioder) });
};

export const parseSykepengesoknad = (soknad) => {
    const perioder = soknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const fom = soknad.fom ? soknad.fom : tidligsteFom(perioder);
    const tom = soknad.tom ? soknad.tom : senesteTom(perioder);
    return Object.assign({}, soknad, {
        aktiviteter: parseAktivitetsdatoer(soknad.aktiviteter),
        egenmeldingsperioder: soknad.egenmeldingsperioder && parseDatoerPeriodeListe(soknad.egenmeldingsperioder),
        ferie: soknad.ferie && parseDatoerPeriodeListe(soknad.ferie),
        permisjon: soknad.permisjon && parseDatoerPeriodeListe(soknad.permisjon),
        utenlandsopphold: parseUtenlandsopphold(soknad.utenlandsopphold),
        utdanning: parseUtdanningsDato(soknad.utdanning),
        gjenopptattArbeidFulltUtDato: toDate(soknad.gjenopptattArbeidFulltUtDato),
        identdato: toDate(soknad.identdato),
        oppfoelgingsdato: toDate(soknad.oppfoelgingsdato),
        sendtTilArbeidsgiverDato: toDate(soknad.sendtTilArbeidsgiverDato),
        sendtTilNAVDato: toDate(soknad.sendtTilNAVDato),
        opprettetDato: toDate(soknad.opprettetDato),
        sykmeldingSkrevetDato: toDate(soknad.sykmeldingSkrevetDato),
        forrigeSykeforloepTom: toDate(soknad.forrigeSykeforloepTom),
        fom: toDate(fom),
        tom: toDate(tom),
        avbruttDato: toDate(soknad.avbruttDato),
        forrigeSendteSoknadTom: toDate(soknad.forrigeSendteSoknadTom),
    });
};
