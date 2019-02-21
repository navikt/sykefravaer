import fraBackendsoknadTilInitiellSoknad from '../../../js/sykepengesoknad/utils/fraBackendsoknadTilInitiellSoknad';
import mockLagretSoknad from '../../mock/mockLagretSoknad';
import expect from '../../expect';
import {
    ARBEIDSGIVER,
    BEKREFT_OPPLYSNINGER_UTLAND,
    LAND,
    PERIODEUTLAND,
    SYKMELDINGSGRAD,
} from '../../../js/enums/tagtyper';
import mockSoknadArbeidstakerUtfylt from '../../mock/mockNySoknadArbeidstakerUtfylt';

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
        });
    });

    it('Skal mappe JA_NEI', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[ARBEIDSGIVER]).to.deep.equal({
            svarverdier: [{
                verdi: 'JA',
            }],
        });
    });

    it('Skal mappe CHECKBOX_PANEL', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[BEKREFT_OPPLYSNINGER_UTLAND]).to.deep.equal({
            svarverdier: [{
                verdi: 'CHECKED',
            }],
        });
    });

    it('Skal mappe underspørsmål', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[SYKMELDINGSGRAD]).to.deep.equal({
            svarverdier: [{
                verdi: 'JA',
            }],
        });
    });

    it('Skal mappe RADIO_GRUPPE', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockSoknadArbeidstakerUtfylt());
        expect(initiellSoknad.HVOR_MYE_HAR_DU_JOBBET_1).to.deep.equal({
            svarverdier: [{
                verdi: 'PROSENT',
            }],
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
});
