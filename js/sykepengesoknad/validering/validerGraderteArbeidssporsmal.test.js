import { setLedetekster } from '@navikt/digisyfo-npm';
import fraBackendsoknadTilInitiellSoknad from '../utils/fraBackendsoknadTilInitiellSoknad';
import { parseSoknad } from '../data/soknader/soknader';
import expect from '../../../test/expect';
import validerGraderteArbeidssporsmal from './validerGraderteArbeidssporsmal';

describe('validerGraderteArbeidssporsmal', () => {
    beforeEach(() => {
        setLedetekster({
            'soknad.feilmelding.hvor_mye_timer_verdi.max': 'Antall timer du har oppgitt er lavere enn sykmeldingen tilsier. Husk å oppgi hvor mye du har jobbet totalt',
        });
    });

    it('Skal klage når oppgitt timer i beregnet arbeidsgrad utgjør mindre enn arbeidsgrad i sykmeldingen', () => {
        const soknad = {
            id: 'a6337d3a-517c-4aa8-a019-17a78246d9cc',
            aktorId: '1924473393808',
            sykmeldingId: '8a8b9a41-b8ee-4ff3-947b-62fffe8bfc0d',
            soknadstype: 'ARBEIDSTAKERE',
            status: 'NY',
            fom: '2019-05-07',
            tom: '2019-05-15',
            opprettetDato: '2019-05-16',
            innsendtDato: null,
            sendtTilNAVDato: null,
            sendtTilArbeidsgiverDato: null,
            avbruttDato: null,
            startSykeforlop: '2019-05-07',
            sykmeldingUtskrevet: '2019-05-07',
            arbeidsgiver: {
                navn: 'ÅSEN BOFELLESSKAP',
                orgnummer: '995816598',
            },
            korrigerer: null,
            korrigertAv: null,
            arbeidssituasjon: 'ARBEIDSTAKER',
            soknadPerioder: [
                {
                    fom: '2019-05-07',
                    tom: '2019-05-15',
                    grad: 40,
                },
            ],
            sporsmal: [
                {
                    id: '214633',
                    tag: 'JOBBET_DU_GRADERT_0',
                    sporsmalstekst: 'I perioden 7. - 15. mai 2019 skulle du jobbe 60 % av ditt normale arbeid hos ÅSEN BOFELLESSKAP. Jobbet du mer enn dette?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: 'JA',
                    svar: [{
                        verdi: 'JA',
                    }],
                    undersporsmal: [
                        {
                            id: '214634',
                            tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                            sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?',
                            undertekst: 'timer per uke',
                            svartype: 'TALL',
                            min: '1',
                            max: '150',
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [{
                                verdi: '37,5',
                            }],
                            undersporsmal: [],
                        },
                        {
                            id: '214635',
                            tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                            sporsmalstekst: 'Hvor mye jobbet du totalt 7. - 15. mai 2019 hos ÅSEN BOFELLESSKAP?',
                            undertekst: null,
                            svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '214636',
                                    tag: 'HVOR_MYE_PROSENT_0',
                                    sporsmalstekst: 'prosent',
                                    undertekst: null,
                                    svartype: 'RADIO',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                                    svar: [],
                                    undersporsmal: [
                                        {
                                            id: '214637',
                                            tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                            sporsmalstekst: null,
                                            undertekst: 'prosent',
                                            svartype: 'TALL',
                                            min: '61',
                                            max: '99',
                                            pavirkerAndreSporsmal: false,
                                            kriterieForVisningAvUndersporsmal: null,
                                            svar: [],
                                            undersporsmal: [],
                                        },
                                    ],
                                },
                                {
                                    id: '214638',
                                    tag: 'HVOR_MYE_TIMER_0',
                                    sporsmalstekst: 'timer',
                                    undertekst: null,
                                    svartype: 'RADIO',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                                    svar: [{
                                        verdi: 'CHECKED',
                                    }],
                                    undersporsmal: [
                                        {
                                            id: '214639',
                                            tag: 'HVOR_MYE_TIMER_VERDI_0',
                                            sporsmalstekst: null,
                                            undertekst: 'timer totalt',
                                            svartype: 'TALL',
                                            min: '1',
                                            max: '193',
                                            pavirkerAndreSporsmal: false,
                                            kriterieForVisningAvUndersporsmal: null,
                                            svar: [{
                                                verdi: '31',
                                            }],
                                            undersporsmal: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const values = fraBackendsoknadTilInitiellSoknad(soknad);
        const feilmeldinger = validerGraderteArbeidssporsmal(soknad.sporsmal, values, parseSoknad(soknad).soknadPerioder);
        expect(feilmeldinger.HVOR_MYE_TIMER_VERDI_0).to.equal('Antall timer du har oppgitt er lavere enn sykmeldingen tilsier. Husk å oppgi hvor mye du har jobbet totalt');
    });

    it('Skal ikke klage når oppgitt timer i beregnet arbeidsgrad utgjør mer enn arbeidsgrad i sykmeldingen', () => {
        const soknad = {
            id: 'a6337d3a-517c-4aa8-a019-17a78246d9cc',
            aktorId: '1924473393808',
            sykmeldingId: '8a8b9a41-b8ee-4ff3-947b-62fffe8bfc0d',
            soknadstype: 'ARBEIDSTAKERE',
            status: 'NY',
            fom: '2019-05-07',
            tom: '2019-05-15',
            opprettetDato: '2019-05-16',
            innsendtDato: null,
            sendtTilNAVDato: null,
            sendtTilArbeidsgiverDato: null,
            avbruttDato: null,
            startSykeforlop: '2019-05-07',
            sykmeldingUtskrevet: '2019-05-07',
            arbeidsgiver: {
                navn: 'ÅSEN BOFELLESSKAP',
                orgnummer: '995816598',
            },
            korrigerer: null,
            korrigertAv: null,
            arbeidssituasjon: 'ARBEIDSTAKER',
            soknadPerioder: [
                {
                    fom: '2019-05-07',
                    tom: '2019-05-15',
                    grad: 40,
                },
            ],
            sporsmal: [
                {
                    id: '214633',
                    tag: 'JOBBET_DU_GRADERT_0',
                    sporsmalstekst: 'I perioden 7. - 15. mai 2019 skulle du jobbe 60 % av ditt normale arbeid hos ÅSEN BOFELLESSKAP. Jobbet du mer enn dette?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: 'JA',
                    svar: [{
                        verdi: 'JA',
                    }],
                    undersporsmal: [
                        {
                            id: '214634',
                            tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                            sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?',
                            undertekst: 'timer per uke',
                            svartype: 'TALL',
                            min: '1',
                            max: '150',
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [{
                                verdi: '37,5',
                            }],
                            undersporsmal: [],
                        },
                        {
                            id: '214635',
                            tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                            sporsmalstekst: 'Hvor mye jobbet du totalt 7. - 15. mai 2019 hos ÅSEN BOFELLESSKAP?',
                            undertekst: null,
                            svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '214636',
                                    tag: 'HVOR_MYE_PROSENT_0',
                                    sporsmalstekst: 'prosent',
                                    undertekst: null,
                                    svartype: 'RADIO',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                                    svar: [],
                                    undersporsmal: [
                                        {
                                            id: '214637',
                                            tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                            sporsmalstekst: null,
                                            undertekst: 'prosent',
                                            svartype: 'TALL',
                                            min: '61',
                                            max: '99',
                                            pavirkerAndreSporsmal: false,
                                            kriterieForVisningAvUndersporsmal: null,
                                            svar: [],
                                            undersporsmal: [],
                                        },
                                    ],
                                },
                                {
                                    id: '214638',
                                    tag: 'HVOR_MYE_TIMER_0',
                                    sporsmalstekst: 'timer',
                                    undertekst: null,
                                    svartype: 'RADIO',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                                    svar: [{
                                        verdi: 'CHECKED',
                                    }],
                                    undersporsmal: [
                                        {
                                            id: '214639',
                                            tag: 'HVOR_MYE_TIMER_VERDI_0',
                                            sporsmalstekst: null,
                                            undertekst: 'timer totalt',
                                            svartype: 'TALL',
                                            min: '1',
                                            max: '193',
                                            pavirkerAndreSporsmal: false,
                                            kriterieForVisningAvUndersporsmal: null,
                                            svar: [{
                                                verdi: '32',
                                            }],
                                            undersporsmal: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const values = fraBackendsoknadTilInitiellSoknad(soknad);
        const feilmeldinger = validerGraderteArbeidssporsmal(soknad.sporsmal, values, parseSoknad(soknad).soknadPerioder);
        expect(feilmeldinger.HVOR_MYE_TIMER_VERDI_0).to.equal(undefined);
    });

    it('Skal ikke klage når oppgitt timer i beregnet arbeidsgrad utgjør mindre enn arbeidsgrad i sykmeldingen hvis man har valgt å oppgi svar i prosent', () => {
        const soknad = {
            id: 'a6337d3a-517c-4aa8-a019-17a78246d9cc',
            aktorId: '1924473393808',
            sykmeldingId: '8a8b9a41-b8ee-4ff3-947b-62fffe8bfc0d',
            soknadstype: 'ARBEIDSTAKERE',
            status: 'NY',
            fom: '2019-05-07',
            tom: '2019-05-15',
            opprettetDato: '2019-05-16',
            innsendtDato: null,
            sendtTilNAVDato: null,
            sendtTilArbeidsgiverDato: null,
            avbruttDato: null,
            startSykeforlop: '2019-05-07',
            sykmeldingUtskrevet: '2019-05-07',
            arbeidsgiver: {
                navn: 'ÅSEN BOFELLESSKAP',
                orgnummer: '995816598',
            },
            korrigerer: null,
            korrigertAv: null,
            arbeidssituasjon: 'ARBEIDSTAKER',
            soknadPerioder: [
                {
                    fom: '2019-05-07',
                    tom: '2019-05-15',
                    grad: 40,
                },
            ],
            sporsmal: [
                {
                    id: '214633',
                    tag: 'JOBBET_DU_GRADERT_0',
                    sporsmalstekst: 'I perioden 7. - 15. mai 2019 skulle du jobbe 60 % av ditt normale arbeid hos ÅSEN BOFELLESSKAP. Jobbet du mer enn dette?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: 'JA',
                    svar: [{
                        verdi: 'JA',
                    }],
                    undersporsmal: [
                        {
                            id: '214634',
                            tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                            sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?',
                            undertekst: 'timer per uke',
                            svartype: 'TALL',
                            min: '1',
                            max: '150',
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [{
                                verdi: '37,5',
                            }],
                            undersporsmal: [],
                        },
                        {
                            id: '214635',
                            tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                            sporsmalstekst: 'Hvor mye jobbet du totalt 7. - 15. mai 2019 hos ÅSEN BOFELLESSKAP?',
                            undertekst: null,
                            svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '214636',
                                    tag: 'HVOR_MYE_PROSENT_0',
                                    sporsmalstekst: 'prosent',
                                    undertekst: null,
                                    svartype: 'RADIO',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                                    svar: [{
                                        verdi: 'CHECKED',
                                    }],
                                    undersporsmal: [
                                        {
                                            id: '214637',
                                            tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                            sporsmalstekst: null,
                                            undertekst: 'prosent',
                                            svartype: 'TALL',
                                            min: '61',
                                            max: '99',
                                            pavirkerAndreSporsmal: false,
                                            kriterieForVisningAvUndersporsmal: null,
                                            svar: [],
                                            undersporsmal: [],
                                        },
                                    ],
                                },
                                {
                                    id: '214638',
                                    tag: 'HVOR_MYE_TIMER_0',
                                    sporsmalstekst: 'timer',
                                    undertekst: null,
                                    svartype: 'RADIO',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                                    svar: [],
                                    undersporsmal: [
                                        {
                                            id: '214639',
                                            tag: 'HVOR_MYE_TIMER_VERDI_0',
                                            sporsmalstekst: null,
                                            undertekst: 'timer totalt',
                                            svartype: 'TALL',
                                            min: '1',
                                            max: '193',
                                            pavirkerAndreSporsmal: false,
                                            kriterieForVisningAvUndersporsmal: null,
                                            svar: [{
                                                verdi: '4',
                                            }],
                                            undersporsmal: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const values = fraBackendsoknadTilInitiellSoknad(soknad);
        const feilmeldinger = validerGraderteArbeidssporsmal(soknad.sporsmal, values, parseSoknad(soknad).soknadPerioder);
        expect(feilmeldinger.HVOR_MYE_TIMER_VERDI_0).to.equal(undefined);
    });
});
