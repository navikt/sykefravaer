import deepFreeze from 'deep-freeze';
import fraBackendsoknadTilInitiellSoknad from './fraBackendsoknadTilInitiellSoknad';
import mockLagretSoknad from '../../../test/mock/mockLagretSoknad';
import expect from '../../../test/expect';
import {
    ARBEIDSGIVER,
    BEKREFT_OPPLYSNINGER_UTLAND,
    LAND,
    PERIODEUTLAND,
    SYKMELDINGSGRAD,
} from '../enums/tagtyper';
import { genererParseForEnkeltverdi } from '../felleskomponenter/sporsmal/fieldUtils';

describe('fraBackendsoknadTilInitiellSoknad', () => {
    it('Skal mappe perioder på norsk format', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{
            fom: '01.09.2018',
            tom: '01.10.2018',
        }, {
            fom: '12.08.207_',
            tom: '12.08.2017',
        }]);
    });

    it('Skal beholde eksisterende perioder i frontend dersom det finnes', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad(), {
            [PERIODEUTLAND]: [{
                fom: '01.09.2018',
                tom: '01.10.2018',
            }],
        });
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{
            fom: '01.09.2018',
            tom: '01.10.2018',
        }]);
    });

    it('Skal beholde svar i frontend dersom det kommer annet svar fra backend med samme spørsmålsid', () => {
        const soknad = mockLagretSoknad();
        soknad.sporsmal[0].svar = [];
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(soknad, {
            [LAND]: genererParseForEnkeltverdi('56')('England'),
        });
        expect(initiellSoknad[LAND]).to.deep.equal({
            svarverdier: [{
                verdi: 'England',
            }],
            id: '56',
        });
    });

    it('Skal bruke svar fra backend dersom det kommer annet svar fra backend med ny spørsmålsid', () => {
        const soknad = mockLagretSoknad();
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(soknad, {
            [LAND]: genererParseForEnkeltverdi('856')('England'),
        });
        expect(initiellSoknad[LAND]).to.deep.equal({
            svarverdier: [{
                verdi: 'Oslo',
            }],
            id: '56',
        });
    });

    it('Skal mappe perioder på ISO-format', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad({
            sporsmal: [{
                id: '55',
                tag: 'PERIODEUTLAND',
                sporsmalstekst: 'Når skal du være utenfor Norge?',
                undertekst: null,
                svartype: 'PERIODER',
                min: '2018-06-03',
                max: '2019-03-03',
                kriterieForVisningAvUndersporsmal: null,
                svar: [
                    {
                        verdi: '{"fom":"01.02.20__","tom":"01.03.2017"}',
                    },
                ],
                undersporsmal: [],
            }],
        }));
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{
            fom: '01.02.20__',
            tom: '01.03.2017',
        }]);
    });

    it('Skal mappe uferdige perioder ', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad({
            sporsmal: [{
                id: '55',
                tag: 'PERIODEUTLAND',
                sporsmalstekst: 'Når skal du være utenfor Norge?',
                undertekst: null,
                svartype: 'PERIODER',
                min: '2018-06-03',
                max: '2019-03-03',
                kriterieForVisningAvUndersporsmal: null,
                svar: [
                    {
                        verdi: '{"fom":"2018-09-10","tom":"2018-09-20"}',
                    },
                ],
                undersporsmal: [],
            }],
        }));
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{
            fom: '10.09.2018',
            tom: '20.09.2018',
        }]);
    });

    it('Skal opprette en tom periode når det ikke finnes perioder', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad({
            sporsmal: [{
                id: '55',
                tag: 'PERIODEUTLAND',
                sporsmalstekst: 'Når skal du være utenfor Norge?',
                undertekst: null,
                svartype: 'PERIODER',
                min: '2018-06-03',
                max: '2019-03-03',
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            }],
        }));
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{}]);
    });

    it('Skal mappe fritekst', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[LAND]).to.deep.equal({
            svarverdier: [{
                verdi: 'Oslo',
            }],
            id: '56',
        });
    });

    it('Skal mappe JA_NEI', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[ARBEIDSGIVER]).to.deep.equal({
            svarverdier: [{
                verdi: 'JA',
            }],
            id: '57',
        });
    });

    it('Skal mappe CHECKBOX_PANEL', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[BEKREFT_OPPLYSNINGER_UTLAND]).to.deep.equal({
            svarverdier: [{
                verdi: 'CHECKED',
            }],
            id: '61',
        });
    });

    it('Skal mappe underspørsmål', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[SYKMELDINGSGRAD]).to.deep.equal({
            svarverdier: [{
                verdi: 'JA',
            }],
            id: '58',
        });
    });

    it('Skal mappe underspørsmål til RADIO_GRUPPE_TIMER_PROSENT', () => {
        const soknad = {
            sporsmal: [{
                id: '59320',
                tag: 'JOBBET_DU_100_PROSENT_0',
                sporsmalstekst: 'I perioden 2. - 21. januar 2019 var du 100 % sykmeldt fra TESTBEDRIFT. Jobbet du noe i denne perioden?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '59321',
                        tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                        sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?',
                        undertekst: 'timer per uke',
                        svartype: 'TALL',
                        min: '1',
                        max: '150',
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: '59322',
                        tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                        sporsmalstekst: 'Hvor mye jobbet du totalt 2. - 21. januar 2019 hos Min arbeidsgiver?',
                        undertekst: null,
                        svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                        min: null,
                        max: null,
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [
                            {
                                id: '59323',
                                tag: 'HVOR_MYE_PROSENT_0',
                                sporsmalstekst: 'prosent',
                                undertekst: null,
                                svartype: 'RADIO',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [
                                    {
                                        verdi: 'CHECKED',
                                    },
                                ],
                                undersporsmal: [
                                    {
                                        id: '59324',
                                        tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                        sporsmalstekst: null,
                                        undertekst: 'prosent',
                                        svartype: 'TALL',
                                        min: '1',
                                        max: '99',
                                        pavirkerAndreSporsmal: false,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                            {
                                id: '59325',
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
                                        id: '59326',
                                        tag: 'HVOR_MYE_TIMER_VERDI_0',
                                        sporsmalstekst: null,
                                        undertekst: 'timer totalt',
                                        svartype: 'TALL',
                                        min: '1',
                                        max: '429',
                                        pavirkerAndreSporsmal: false,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }],
        };
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(soknad);
        expect(initiellSoknad.HVOR_MYE_HAR_DU_JOBBET_0.svarverdier).to.deep.equal([{ verdi: 'prosent' }]);
    });

    it('Skal mappe RADIO_GRUPPE_TIMER_PROSENT når underspørsmål er besvart med svar nr. 2', () => {
        const soknad = {
            sporsmal: [{
                id: '90601',
                tag: 'JOBBET_DU_100_PROSENT_0',
                sporsmalstekst: 'I perioden 13. - 14. februar 2019 var du 100 % sykmeldt fra VANN- OG AVLØPSETATEN. Jobbet du noe i denne perioden?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [{
                    verdi: 'JA',
                }],
                undersporsmal: [{
                    id: '90602',
                    tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                    sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?',
                    undertekst: 'timer per uke',
                    svartype: 'TALL',
                    min: '1',
                    max: '150',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [{
                        verdi: '37',
                    }],
                    undersporsmal: [],
                }, {
                    id: '90603',
                    tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                    sporsmalstekst: 'Hvor mye jobbet du totalt 13. - 14. februar 2019 hos VANN- OG AVLØPSETATEN?',
                    undertekst: null,
                    svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [{
                        id: '90604',
                        tag: 'HVOR_MYE_PROSENT_0',
                        sporsmalstekst: 'prosent',
                        undertekst: null,
                        svartype: 'RADIO',
                        min: null,
                        max: null,
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [{
                            id: '90605',
                            tag: 'HVOR_MYE_PROSENT_VERDI_0',
                            sporsmalstekst: null,
                            undertekst: 'prosent',
                            svartype: 'TALL',
                            min: '1',
                            max: '99',
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        }],
                    }, {
                        id: '90606',
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
                        undersporsmal: [{
                            id: '90607',
                            tag: 'HVOR_MYE_TIMER_VERDI_0',
                            sporsmalstekst: null,
                            undertekst: 'timer totalt',
                            svartype: 'TALL',
                            min: '1',
                            max: '43',
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [{
                                verdi: '3',
                            }],
                            undersporsmal: [],
                        }],
                    }],
                }],
            }],
        };
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(soknad);
        expect(initiellSoknad.HVOR_MYE_HAR_DU_JOBBET_0.svarverdier).to.deep.equal([{ verdi: 'timer' }]);
    });

    /* eslint-disable max-len */
    xit('Test fra Q1', () => {
        const soknadRespons = { id: '45111da0-257e-4a67-918b-bd5d24510d98', aktorId: '1924473393808', sykmeldingId: '141b5d8a-e815-4c04-9710-0b09cf0a10b1', soknadstype: 'ARBEIDSTAKERE', status: 'NY', fom: '2019-03-23', tom: '2019-03-31', opprettetDato: '2019-04-02', innsendtDato: null, sendtTilNAVDato: null, sendtTilArbeidsgiverDato: null, avbruttDato: null, startSykeforlop: '2019-03-23', sykmeldingUtskrevet: '2019-03-23', arbeidsgiver: { navn: 'ÅSEN BOFELLESSKAP', orgnummer: '995816598' }, korrigerer: null, korrigertAv: null, arbeidssituasjon: 'ARBEIDSTAKER', soknadPerioder: [{ fom: '2019-03-23', tom: '2019-03-31', grad: 100 }], sporsmal: [{ id: '186686', tag: 'ANSVARSERKLARING', sporsmalstekst: 'Jeg vet at dersom jeg gir uriktige opplysninger, eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar. Jeg er også klar over at jeg må melde fra til NAV dersom jeg i sykmeldingsperioden satt i varetekt, sonet straff eller var under forvaring.', undertekst: null, svartype: 'CHECKBOX_PANEL', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [{ verdi: 'CHECKED' }], undersporsmal: [] }, { id: '186687', tag: 'EGENMELDINGER', sporsmalstekst: 'Vi har registrert at du ble sykmeldt lørdag 23. mars 2019. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 7. - 22. mars 2019?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'JA', svar: [{ verdi: 'NEI' }], undersporsmal: [{ id: '186688', tag: 'EGENMELDINGER_NAR', sporsmalstekst: 'Hvilke dager før 23. mars 2019 var du borte fra jobb?', undertekst: null, svartype: 'PERIODER', min: '2018-09-23', max: '2019-03-22', pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '186689', tag: 'TILBAKE_I_ARBEID', sporsmalstekst: 'Var du tilbake i fullt arbeid hos ÅSEN BOFELLESSKAP før 1. april 2019?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: true, kriterieForVisningAvUndersporsmal: 'JA', svar: [{ verdi: 'NEI' }], undersporsmal: [{ id: '186690', tag: 'TILBAKE_NAR', sporsmalstekst: 'Fra hvilken dato ble arbeidet gjenopptatt?', undertekst: null, svartype: 'DATO', min: '2019-03-23', max: '2019-03-31', pavirkerAndreSporsmal: true, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '186707', tag: 'ANDRE_INNTEKTSKILDER', sporsmalstekst: 'Har du andre inntektskilder, eller jobber du for andre enn ÅSEN BOFELLESSKAP?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'JA', svar: [], undersporsmal: [{ id: '186708', tag: 'HVILKE_ANDRE_INNTEKTSKILDER', sporsmalstekst: 'Hvilke andre inntektskilder har du?', undertekst: 'Du trenger ikke oppgi andre ytelser fra NAV', svartype: 'CHECKBOX_GRUPPE', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [{ id: '186709', tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD', sporsmalstekst: 'Andre arbeidsforhold', undertekst: null, svartype: 'CHECKBOX', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [], undersporsmal: [{ id: '186710', tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT', sporsmalstekst: 'Er du sykmeldt fra dette?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '186711', tag: 'INNTEKTSKILDE_SELVSTENDIG', sporsmalstekst: 'Selvstendig næringsdrivende', undertekst: null, svartype: 'CHECKBOX', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [], undersporsmal: [{ id: '186712', tag: 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT', sporsmalstekst: 'Er du sykmeldt fra dette?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '186713', tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA', sporsmalstekst: 'Selvstendig næringsdrivende dagmamma', undertekst: null, svartype: 'CHECKBOX', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [], undersporsmal: [{ id: '186714', tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT', sporsmalstekst: 'Er du sykmeldt fra dette?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '186715', tag: 'INNTEKTSKILDE_JORDBRUKER', sporsmalstekst: 'Jordbruker / Fisker / Reindriftsutøver', undertekst: null, svartype: 'CHECKBOX', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [], undersporsmal: [{ id: '186716', tag: 'INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT', sporsmalstekst: 'Er du sykmeldt fra dette?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '186717', tag: 'INNTEKTSKILDE_FRILANSER', sporsmalstekst: 'Frilanser', undertekst: null, svartype: 'CHECKBOX', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [], undersporsmal: [{ id: '186718', tag: 'INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT', sporsmalstekst: 'Er du sykmeldt fra dette?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '186719', tag: 'INNTEKTSKILDE_ANNET', sporsmalstekst: 'Annet', undertekst: null, svartype: 'CHECKBOX', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }] }, { id: '186723', tag: 'VAER_KLAR_OVER_AT', sporsmalstekst: 'Vær klar over at:', undertekst: '<ul><li>rett til sykepenger forutsetter at du er borte fra arbeid på grunn av egen sykdom. Sosiale eller økonomiske problemer gir ikke rett til sykepenger</li><li>du kan miste retten til sykepenger hvis du uten rimelig grunn nekter å opplyse om egen funksjonsevne eller nekter å ta imot tilbud om behandling og/eller tilrettelegging</li><li>sykepenger utbetales i maksimum 52 uker, også for gradert (delvis) sykmelding</li><li>fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul>', svartype: 'IKKE_RELEVANT', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }, { id: '186724', tag: 'BEKREFT_OPPLYSNINGER', sporsmalstekst: 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.', undertekst: null, svartype: 'CHECKBOX_PANEL', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }, { id: '187162', tag: 'JOBBET_DU_100_PROSENT_0', sporsmalstekst: 'I perioden 23. - 28. mars 2019 var du 100 % sykmeldt fra ÅSEN BOFELLESSKAP. Jobbet du noe i denne perioden?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'JA', svar: [], undersporsmal: [{ id: '187163', tag: 'HVOR_MANGE_TIMER_PER_UKE_0', sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?', undertekst: 'timer per uke', svartype: 'TALL', min: '1', max: '150', pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }, { id: '187164', tag: 'HVOR_MYE_HAR_DU_JOBBET_0', sporsmalstekst: 'Hvor mye jobbet du totalt 23. - 28. mars 2019 hos ÅSEN BOFELLESSKAP?', undertekst: null, svartype: 'RADIO_GRUPPE_TIMER_PROSENT', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [{ id: '187165', tag: 'HVOR_MYE_PROSENT_0', sporsmalstekst: 'prosent', undertekst: null, svartype: 'RADIO', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [{ verdi: 'CHECKED' }], undersporsmal: [{ id: '187166', tag: 'HVOR_MYE_PROSENT_VERDI_0', sporsmalstekst: null, undertekst: 'prosent', svartype: 'TALL', min: '1', max: '99', pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '187167', tag: 'HVOR_MYE_TIMER_0', sporsmalstekst: 'timer', undertekst: null, svartype: 'RADIO', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [], undersporsmal: [{ id: '187168', tag: 'HVOR_MYE_TIMER_VERDI_0', sporsmalstekst: null, undertekst: 'timer totalt', svartype: 'TALL', min: '1', max: '129', pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }] }] }, { id: '187169', tag: 'FERIE_PERMISJON_UTLAND', sporsmalstekst: 'Har du hatt ferie, permisjon eller oppholdt deg utenfor Norge i perioden 23. - 28. mars 2019?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: true, kriterieForVisningAvUndersporsmal: 'JA', svar: [], undersporsmal: [{ id: '187170', tag: 'FERIE_PERMISJON_UTLAND_HVA', sporsmalstekst: 'Kryss av alt som gjelder deg:', undertekst: null, svartype: 'CHECKBOX_GRUPPE', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [{ id: '187171', tag: 'FERIE', sporsmalstekst: 'Jeg tok ut ferie', undertekst: null, svartype: 'CHECKBOX', min: null, max: null, pavirkerAndreSporsmal: true, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [], undersporsmal: [{ id: '187172', tag: 'FERIE_NAR', sporsmalstekst: null, undertekst: null, svartype: 'PERIODER', min: '2019-03-23', max: '2019-03-28', pavirkerAndreSporsmal: true, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '187173', tag: 'PERMISJON', sporsmalstekst: 'Jeg hadde permisjon', undertekst: null, svartype: 'CHECKBOX', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [], undersporsmal: [{ id: '187174', tag: 'PERMISJON_NAR', sporsmalstekst: null, undertekst: null, svartype: 'PERIODER', min: '2019-03-23', max: '2019-03-28', pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }, { id: '187175', tag: 'UTLAND', sporsmalstekst: 'Jeg var utenfor Norge', undertekst: null, svartype: 'CHECKBOX', min: null, max: null, pavirkerAndreSporsmal: true, kriterieForVisningAvUndersporsmal: 'CHECKED', svar: [], undersporsmal: [{ id: '187176', tag: 'UTLAND_NAR', sporsmalstekst: null, undertekst: null, svartype: 'PERIODER', min: '2019-03-23', max: '2019-03-28', pavirkerAndreSporsmal: true, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }, { id: '187177', tag: 'UTLANDSOPPHOLD_SOKT_SYKEPENGER', sporsmalstekst: null, undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }] }] }, { id: '187178', tag: 'UTDANNING', sporsmalstekst: 'Har du vært under utdanning i løpet av perioden 23. - 28. mars 2019?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: 'JA', svar: [], undersporsmal: [{ id: '187179', tag: 'UTDANNING_START', sporsmalstekst: 'Når startet du på utdanningen?', undertekst: null, svartype: 'DATO', min: null, max: '2019-03-28', pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }, { id: '187180', tag: 'FULLTIDSSTUDIUM', sporsmalstekst: 'Er utdanningen et fulltidsstudium?', undertekst: null, svartype: 'JA_NEI', min: null, max: null, pavirkerAndreSporsmal: false, kriterieForVisningAvUndersporsmal: null, svar: [], undersporsmal: [] }] }] };
        const verdier = {
            ANSVARSERKLARING: {
                svarverdier: [{
                    verdi: 'CHECKED',
                }],
                id: '186686',
            },
            EGENMELDINGER: {
                svarverdier: [{
                    verdi: 'NEI',
                }],
                id: '186687',
            },
            EGENMELDINGER_NAR: [{}],
            TILBAKE_I_ARBEID: {
                svarverdier: [{
                    verdi: 'JA',
                }],
                id: '186689',
            },
            TILBAKE_NAR: {
                svarverdier: [{
                    verdi: '29.03.2019',
                }],
                id: '186690',
            },
            JOBBET_DU_100_PROSENT_0: {
                svarverdier: [{
                    verdi: 'NEI',
                }],
                id: '187143',
            },
            HVOR_MYE_HAR_DU_JOBBET_0: {
                svarverdier: [{
                    verdi: 'prosent',
                }],
                id: '187145',
            },
            HVOR_MYE_PROSENT_0: {
                svarverdier: [{
                    verdi: 'CHECKED',
                }],
                id: '187146',
            },
            FERIE_NAR: [{}],
            PERMISJON_NAR: [{}],
            UTLAND_NAR: [{}],
        };
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(deepFreeze(soknadRespons), deepFreeze(verdier));
        expect(initiellSoknad.JOBBET_DU_100_PROSENT_0).to.equal({
            id: '187162',
            svarverdier: [],
        });
    });
    /* eslint-enable max-len */
});
