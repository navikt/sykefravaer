export const getOppfolgingsdialoger = [
    {
        oppfoelgingsdialogId: "1",
        sykmeldtAktoerId: "***REMOVED***",
        naermesteLederAktoerId: "1000058278305",
        virksomhetsnummer: "***REMOVED***",
        versjon: 1,
        oppfoelgingsdialogstatus: "OPPRETTET",
        arbeidsoppgaveListe: [
            {
                arbeidsoppgaveId: "1",
                arbeidsoppgavenavn: "Luft hunden",
                delAvArbeidsuke: "50",
                kanGjennomfoeres: true,
                gjennomfoering: {
                    paaAnnetSted: true,
                    medMerTid: false,
                    medHjelp: false,
                    beskrivelse: "Må luftes i skogen",
                    kanIkkeGjennomfoeresFoer: null,
                    tilretteleggingArbeidsgiver: null
                }
            },
            {
                arbeidsoppgaveId: "2",
                arbeidsoppgavenavn: "Luft katta",
                delAvArbeidsuke: "20",
                kanGjennomfoeres: false,
                gjennomfoering: {
                    paaAnnetSted: null,
                    medMerTid: null,
                    medHjelp: null,
                    beskrivelse: null,
                    kanIkkeGjennomfoeresFoer: "Katter lufter seg selv",
                    tilretteleggingArbeidsgiver: "Kan heller lufte en hund"
                }
            }
        ],
        tiltakListe: [
            {
                tiltakId: "1",
                tiltaknavn: "Gå tur",
                knyttetTilArbeidsoppgaveId: "1",
                fom: "2017-05-07",
                tom: "2017-05-09",
                beskrivelse: "Gå tur med hunden på fredag kl 16.00",
                ansvarlig: "1000058278305",
                maal: "Kom i form"
            }
        ]
    }
];

const oppfolgingsdialog = {
    oppfoelgingsdialogId: "1",
    sykmeldtAktoerId: "***REMOVED***",
    naermesteLederAktoerId: "1000058278305",
    virksomhetsnummer: "***REMOVED***",
    versjon: 1,
    oppfoelgingsdialogstatus: "OPPRETTET",
    arbeidsoppgaveListe: [
        {
            arbeidsoppgaveId: "1",
            arbeidsoppgavenavn: "Luft hunden",
            delAvArbeidsuke: "50",
            kanGjennomfoeres: true,
            gjennomfoering: {
                paaAnnetSted: true,
                medMerTid: false,
                medHjelp: false,
                beskrivelse: "Må luftes i skogen",
                kanIkkeGjennomfoeresFoer: null,
                tilretteleggingArbeidsgiver: null
            }
        },
        {
            arbeidsoppgaveId: "2",
            arbeidsoppgavenavn: "Luft katta",
            delAvArbeidsuke: "20",
            kanGjennomfoeres: false,
            gjennomfoering: {
                paaAnnetSted: null,
                medMerTid: null,
                medHjelp: null,
                beskrivelse: null,
                kanIkkeGjennomfoeresFoer: "Katter lufter seg selv",
                tilretteleggingArbeidsgiver: "Kan heller lufte en hund"
            }
        }
    ],
    tiltakListe: [
        {
            tiltakId: "1",
            tiltaknavn: "Gå tur",
            knyttetTilArbeidsoppgaveId: "1",
            fom: "2017-05-07",
            tom: "2017-05-09",
            beskrivelse: "Gå tur med hunden på fredag kl 16.00",
            ansvarlig: "1000058278305",
            maal: "Kom i form"
        }
    ]
};

const getOppfolgingsdialog = (oppfolgingsdialogId = {}) => {
    return Object.assign({}, oppfolgingsdialog, oppfolgingsdialogId);
};

export default getOppfolgingsdialog;