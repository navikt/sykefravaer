import {
    MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
} from 'oppfolgingsdialog-npm';

const MILLISEKUNDER_PER_DAG = 86400000;

export const leggTilDagerPaaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const leggTilMnderPaaDato = (dato, mnder) => {
    const nyDato = new Date(dato);
    nyDato.setMonth(nyDato.getMonth() + mnder);
    return new Date(nyDato);
};

export const leggTilMnderOgDagerPaaDato = (dato, mnder, dager) => {
    let nyDato = leggTilMnderPaaDato(dato, mnder);
    nyDato = leggTilDagerPaaDato(nyDato, dager);
    return new Date(nyDato);
};

/* eslint-disable max-len */

export const getArbeidsgivere = [
    {
        virksomhetsnummer: '123456789',
        navn: 'Lommen Barnehave',
        harNaermesteLeder: false,
    },
    {
        virksomhetsnummer: '***REMOVED***',
        navn: 'Skogen Barnehave',
        harNaermesteLeder: true,
    },
];

const arbeidsgiver = {
    virksomhetsnummer: '***REMOVED***',
    navn: 'Lommen Barnehave',
    harNaermesteLeder: false,
};

export const getArbeidsgiver = (ag) => {
    return Object.assign({}, arbeidsgiver, ag);
};

export const getSykmeldinger = [
    {
        id: '31ac2ac8-aa31-4f5f-8bda-fd199aa7d8f4',
        startLegemeldtFravaer: new Date('2017-04-15'),
        skalViseSkravertFelt: true,
        identdato: new Date('2017-04-15'),
        status: 'NY',
        naermesteLederStatus: null,
        innsendtArbeidsgivernavn: null,
        valgtArbeidssituasjon: null,
        orgnummer: '123456789',
        sendtdato: null,
        pasient: {
            fnr: '***REMOVED***',
            fornavn: 'Frida',
            etternavn: 'Frost',
        },
        arbeidsgiver: 'Lommen Barnehave',
        diagnose: {
            hoveddiagnose: {
                diagnose: 'TENDINITT INA',
                diagnosekode: 'L87',
                diagnosesystem: 'ICPC-2',
            },
            bidiagnoser: [
                {
                    diagnose: 'GANGLION SENE',
                    diagnosekode: 'L87',
                    diagnosesystem: 'ICPC-2',
                },
            ],
            fravaersgrunnLovfestet: null,
            fravaerBeskrivelse: 'Medising årsak i kategorien annet',
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: new Date('2017-04-15'),
        },
        mulighetForArbeid: {
            perioder: [
                {
                    fom: new Date('2017-04-15'),
                    tom: new Date('2017-04-25'),
                    grad: 100,
                    behandlingsdager: null,
                    reisetilskudd: null,
                    avventende: null,
                },
                {
                    fom: new Date('2017-04-26'),
                    tom: new Date('2017-09-26'),
                    grad: 60,
                    behandlingsdager: null,
                    reisetilskudd: false,
                    avventende: null,
                },
            ],
            aktivitetIkkeMulig433: [
                'Annet',
            ],
            aktivitetIkkeMulig434: [
                'Annet',
            ],
            aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
            aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
        },
        friskmelding: {
            arbeidsfoerEtterPerioden: true,
            hensynPaaArbeidsplassen: 'Må ta det pent',
            antarReturSammeArbeidsgiver: true,
            antattDatoReturSammeArbeidsgiver: new Date('2017-04-15'),
            antarReturAnnenArbeidsgiver: true,
            tilbakemeldingReturArbeid: new Date('2017-04-15'),
            utenArbeidsgiverAntarTilbakeIArbeid: false,
            utenArbeidsgiverAntarTilbakeIArbeidDato: null,
            utenArbeidsgiverTilbakemelding: null,
        },
        utdypendeOpplysninger: {
            sykehistorie: null,
            paavirkningArbeidsevne: null,
            resultatAvBehandling: null,
            henvisningUtredningBehandling: null,
        },
        arbeidsevne: {
            tilretteleggingArbeidsplass: 'Fortsett som sist.',
            tiltakNAV: 'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
            tiltakAndre: null,
        },
        meldingTilNav: {
            navBoerTaTakISaken: false,
            navBoerTaTakISakenBegrunnelse: null,
        },
        innspillTilArbeidsgiver: null,
        tilbakedatering: {
            dokumenterbarPasientkontakt: null,
            tilbakedatertBegrunnelse: null,
        },
        bekreftelse: {
            utstedelsesdato: new Date('2017-02-10'),
            sykmelder: 'Frida Frost',
            sykmelderTlf: '94431152',
        },
    },
    {
        id: '31ac2ac8-aa31-4f5f-8bda-fd199aa7d8f4',
        startLegemeldtFravaer: new Date('2017-04-15'),
        skalViseSkravertFelt: true,
        identdato: new Date('2017-04-15'),
        status: 'NY',
        naermesteLederStatus: null,
        innsendtArbeidsgivernavn: null,
        valgtArbeidssituasjon: null,
        orgnummer: '***REMOVED***',
        sendtdato: null,
        pasient: {
            fnr: '***REMOVED***',
            fornavn: 'Frida',
            etternavn: 'Frost',
        },
        arbeidsgiver: 'Skogen Barnehave',
        diagnose: {
            hoveddiagnose: {
                diagnose: 'TENDINITT INA',
                diagnosekode: 'L87',
                diagnosesystem: 'ICPC-2',
            },
            bidiagnoser: [
                {
                    diagnose: 'GANGLION SENE',
                    diagnosekode: 'L87',
                    diagnosesystem: 'ICPC-2',
                },
            ],
            fravaersgrunnLovfestet: null,
            fravaerBeskrivelse: 'Medising årsak i kategorien annet',
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: new Date('2017-04-15'),
        },
        mulighetForArbeid: {
            perioder: [
                {
                    fom: new Date('2017-04-15'),
                    tom: new Date('2017-04-25'),
                    grad: 100,
                    behandlingsdager: null,
                    reisetilskudd: null,
                    avventende: null,
                },
                {
                    fom: new Date('2017-04-26'),
                    tom: new Date('2017-09-26'),
                    grad: 60,
                    behandlingsdager: null,
                    reisetilskudd: false,
                    avventende: null,
                },
            ],
            aktivitetIkkeMulig433: [
                'Annet',
            ],
            aktivitetIkkeMulig434: [
                'Annet',
            ],
            aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
            aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
        },
        friskmelding: {
            arbeidsfoerEtterPerioden: true,
            hensynPaaArbeidsplassen: 'Må ta det pent',
            antarReturSammeArbeidsgiver: true,
            antattDatoReturSammeArbeidsgiver: new Date('2017-04-15'),
            antarReturAnnenArbeidsgiver: true,
            tilbakemeldingReturArbeid: new Date('2017-04-15'),
            utenArbeidsgiverAntarTilbakeIArbeid: false,
            utenArbeidsgiverAntarTilbakeIArbeidDato: null,
            utenArbeidsgiverTilbakemelding: null,
        },
        utdypendeOpplysninger: {
            sykehistorie: null,
            paavirkningArbeidsevne: null,
            resultatAvBehandling: null,
            henvisningUtredningBehandling: null,
        },
        arbeidsevne: {
            tilretteleggingArbeidsplass: 'Fortsett som sist.',
            tiltakNAV: 'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
            tiltakAndre: null,
        },
        meldingTilNav: {
            navBoerTaTakISaken: false,
            navBoerTaTakISakenBegrunnelse: null,
        },
        innspillTilArbeidsgiver: null,
        tilbakedatering: {
            dokumenterbarPasientkontakt: null,
            tilbakedatertBegrunnelse: null,
        },
        bekreftelse: {
            utstedelsesdato: new Date('2017-04-10'),
            sykmelder: 'Frida Frost',
            sykmelderTlf: '94431152',
        },
    },
];

const sykmelding = {
    id: '3456789',
    pasient: {
        fnr: '***REMOVED***',
        fornavn: 'Per',
        etternavn: 'Person',
    },
    arbeidsgiver: 'Selskapet AS',
    orgnummer: '123456789',
    status: 'NY',
    identdato: new Date('2015-12-31'),
    diagnose: {
        hoveddiagnose: {
            diagnose: 'Influensa',
            diagnosesystem: 'ICPC',
            diagnosekode: 'LP2',
        },
    },
    mulighetForArbeid: {
        perioder: [{
            fom: new Date('2015-12-31'),
            tom: new Date('2016-01-06'),
            grad: 67,
        }],
    },
    friskmelding: {
        arbeidsfoerEtterPerioden: true,
    },
    utdypendeOpplysninger: {},
    arbeidsevne: {},
    meldingTilNav: {},
    tilbakedatering: {},
    bekreftelse: {
        sykmelder: 'Ove Olsen',
        utstedelsesdato: new Date('2016-05-02'),
    },
};

const getSykmelding = (skmld = {}) => {
    return Object.assign({}, sykmelding, skmld);
};

export const hentSykmeldingIkkeGyldigForOppfoelging = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 3)).toISOString(),
                    tom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2)).toISOString(),
                },
                {
                    fom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1)).toISOString(),
                    tom: leggTilMnderOgDagerPaaDato(dagensDato, -MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, -1).toISOString(),
                },
            ],
        },
    });
};

export const hentSykmeldingGyldigForOppfoelging = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: leggTilDagerPaaDato(dagensDato, -35).toISOString(),
                    tom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
                },
                {
                    fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
                    tom: leggTilDagerPaaDato(dagensDato, 35).toISOString(),
                },
            ],
        },
    });
};

export default getSykmelding;
/* eslint-disable max-len */
