import { PropTypes } from 'react';
import * as sykmldstatuser from '../enums/sykmeldingstatuser';
import * as arbeidssituasjoner from '../enums/arbeidssituasjoner';
import * as soknadstatuser from '../enums/sykepengesoknadstatuser';
import { fields as inntektskildetyper } from '../enums/inntektskildetyper';
import { JA, NEI, VET_IKKE } from '../enums/forskutterersvar';

export const arbeidssituasjon = PropTypes.oneOf([
    arbeidssituasjoner.ARBEIDSTAKER,
    arbeidssituasjoner.NAERINGSDRIVENDE,
    arbeidssituasjoner.FRILANSER,
    arbeidssituasjoner.ARBEIDSLEDIG,
    arbeidssituasjoner.ANNET]);

export const brodsmule = PropTypes.shape({
    sti: PropTypes.string,
    tittel: PropTypes.string,
    sisteSmule: PropTypes.bool,
    erKlikkbar: PropTypes.bool,
});

export const soknadperiode = PropTypes.shape({
    fom: PropTypes.instanceOf(Date),
    tom: PropTypes.instanceOf(Date),
});

export const annenInntektskilde = PropTypes.shape({
    sykmeldt: PropTypes.bool,
    annenInntektskildeType: PropTypes.oneOf(inntektskildetyper),
});

export const naermesteLeder = PropTypes.shape({
    navn: PropTypes.string,
    epost: PropTypes.string,
    mobil: PropTypes.string,
    orgnummer: PropTypes.string,
    organisasjonsnavn: PropTypes.string,
    aktivTom: PropTypes.string,
});

export const arbeidsgiver = PropTypes.shape({
    navn: PropTypes.string,
    orgnummer: PropTypes.string,
    naermesteLeder,
});

export const sykepengesoknad = PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.oneOf([soknadstatuser.SENDT, soknadstatuser.NY, soknadstatuser.TIL_SENDING, soknadstatuser.UTGAATT, soknadstatuser.UTKAST_TIL_KORRIGERING, soknadstatuser.KORRIGERT]),
    sendtTilArbeidsgiverDato: PropTypes.instanceOf(Date),
    sendtTilNAVDato: PropTypes.instanceOf(Date),
    opprettetDato: PropTypes.instanceOf(Date),
    arbeidsgiver,
    identdato: PropTypes.instanceOf(Date),
    ansvarBekreftet: PropTypes.bool,
    bekreftetKorrektInformasjon: PropTypes.bool,
    arbeidsgiverForskutterer: PropTypes.oneOf([null, JA, NEI, VET_IKKE]),
    egenmeldingsperioder: PropTypes.arrayOf(soknadperiode),
    gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
    ferie: PropTypes.arrayOf(soknadperiode),
    permisjon: PropTypes.arrayOf(soknadperiode),
    utenlandsopphold: PropTypes.shape({
        perioder: PropTypes.arrayOf(soknadperiode),
        soektOmSykepengerIPerioden: PropTypes.bool,
    }),
    aktiviteter: PropTypes.arrayOf(PropTypes.shape({
        periode: soknadperiode,
        grad: PropTypes.number,
        avvik: PropTypes.shape({
            arbeidstimerNormalUke: PropTypes.number,
            arbeidsgrad: PropTypes.number,
            timer: PropTypes.number,
        }),
    })).isRequired,
    andreInntektskilder: PropTypes.arrayOf(annenInntektskilde),
    utdanning: PropTypes.shape({
        utdanningStartdato: PropTypes.instanceOf(Date),
        erUtdanningFulltidsstudium: PropTypes.bool,
    }),
    sykmeldingSkrevetDato: PropTypes.instanceOf(Date),
    erUnderEndring: PropTypes.bool,
});

export const sykmeldingdiagnose = PropTypes.shape({
    diagnose: PropTypes.string,
    diagnosekode: PropTypes.string,
    diagnosesystem: PropTypes.string,
});

export const sykmeldingperiode = PropTypes.shape({
    fom: PropTypes.string,
    tom: PropTypes.string,
    grad: PropTypes.number,
    behandlingsdager: PropTypes.number,
    reisetilskudd: PropTypes.bool,
    avventende: PropTypes.string,
});

export const sykmelding = PropTypes.shape({
    id: PropTypes.string,
    startLegemeldtFravaer: PropTypes.string,
    skalViseSkravertFelt: PropTypes.bool,
    identdato: PropTypes.string,
    status: PropTypes.oneOf([sykmldstatuser.NY, sykmldstatuser.SENDT, sykmldstatuser.UTGAATT, sykmldstatuser.AVBRUTT, sykmldstatuser.BEKREFTET, sykmldstatuser.TIL_SENDING]),
    naermesteLederStatus: PropTypes.string,
    innsendtArbeidsgivernavn: PropTypes.string,
    valgtArbeidssituasjon: arbeidssituasjon,
    orgnummer: PropTypes.string,
    sendtDato: PropTypes.string,
    pasient: PropTypes.shape({
        fnr: PropTypes.string,
        fornavn: PropTypes.string,
        etternavn: PropTypes.string,
    }),
    arbeidsgiver: PropTypes.string,
    diagnose: PropTypes.shape({
        hoveddiagnose: sykmeldingdiagnose,
        bidiagnoser: PropTypes.arrayOf(sykmeldingdiagnose),
        fravaersgrunnLovfestet: PropTypes.string,
        fravaerBeskrivelse: PropTypes.string,
        svangerskap: PropTypes.bool,
        yrkesskade: PropTypes.bool,
        yrkesskadeDato: PropTypes.string,
    }),
    mulighetForArbeid: PropTypes.shape({
        perioder: PropTypes.arrayOf(sykmeldingperiode),
        aktivitetIkkeMulig433: PropTypes.arrayOf(PropTypes.string),
        aktivitetIkkeMulig434: PropTypes.arrayOf(PropTypes.string),
        aarsakAktivitetIkkeMulig433: PropTypes.string,
        aarsakAktivitetIkkeMulig434: PropTypes.string,
    }),
    friskmelding: PropTypes.shape({
        arbeidsfoerEtterPerioden: PropTypes.bool,
        hensynPaaArbeidsplassen: PropTypes.string,
        antarReturSammeArbeidsgiver: PropTypes.bool,
        antattDatoReturSammeArbeidsgiver: PropTypes.string,
        antarReturAnnenArbeidsgiver: PropTypes.bool,
        tilbakemeldingReturArbeid: PropTypes.string,
        utenArbeidsgiverAntarTilbakeIArbeid: PropTypes.bool,
        utenArbeidsgiverAntarTilbakeIArbeidDato: PropTypes.string,
        utenArbeidsgiverTilbakemelding: PropTypes.string,
    }),
    utdypendeOpplysninger: PropTypes.shape({
        sykehistorie: PropTypes.string,
        paavirkningArbeidsevne: PropTypes.string,
        resultatAvBehandling: PropTypes.string,
        henvisningUtredningBehandling: PropTypes.string,
    }),
    arbeidsevne: PropTypes.shape({
        tilretteleggingArbeidsplass: PropTypes.string,
        tiltakNAV: PropTypes.string,
        tiltakAndre: PropTypes.string,
    }),
    meldingTilNav: PropTypes.shape({
        navBoerTaTakISaken: PropTypes.bool,
        navBoerTaTakISakenBegrunnelse: PropTypes.string,
    }),
    innspillTilArbeidsgiver: PropTypes.string,
    tilbakedatering: PropTypes.shape({
        dokumenterbarPasientkontakt: PropTypes.string,
        tilbakedatertBegrunnelse: PropTypes.string,
    }),
    bekreftelse: PropTypes.shape({
        utstedelsesdato: PropTypes.string,
        sykmelder: PropTypes.string,
        sykmelderTlf: PropTypes.string,
    }),
});
