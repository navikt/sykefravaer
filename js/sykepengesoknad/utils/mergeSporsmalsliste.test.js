import mergeSporsmalsliste, { finnSporsmal } from './mergeSporsmalsliste';
import expect from '../../../test/expect';
import mockNySoknadArbeidstakerUtfylt from '../../../test/mock/mockNySoknadArbeidstakerUtfylt';

describe("mergeSporsmalsliste", () => {
    it("finnSporsmal skal returnere spørsmål basert på ID", () => {
        const sporsmalsliste = mockNySoknadArbeidstakerUtfylt().sporsmal;
        const spm = finnSporsmal(sporsmalsliste, '56');
        expect(spm).to.deep.equal(sporsmalsliste[1]);
    });

    it("finnSporsmal skal returnere spørsmål basert på ID rekursivt", () => {
        const sporsmalsliste = mockNySoknadArbeidstakerUtfylt().sporsmal;
        const spm = finnSporsmal(sporsmalsliste, '63');
        expect(spm).to.deep.equal({
            id: '63',
            tag: 'HVOR_MYE_PROSENT_VERDI_0',
            sporsmalstekst: null,
            undertekst: 'prosent',
            svartype: 'TALL',
            svaralternativer: null,
            min: 1,
            max: 99,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [
                {
                    verdi: '79',
                },
            ],
            undersporsmal: [],
        });
    });

    it("Skal la frontend overstyre dersom det finnes svar både i frontend og backend", () => {
        const sporsmalsliste = [{
            id: '56',
            tag: 'EGENMELDINGER',
            sporsmalstekst: 'Vi har registrert at du ble sykmeldt mandag 1. oktober 2018. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 15. - 30. september 2018?',
            undertekst: null,
            svartype: 'JA_NEI',
            svaralternativer: null,
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [
                {
                    verdi: 'JA',
                },
            ],
            undersporsmal: [
                {
                    id: '57',
                    tag: 'EGENMELDINGER_NAR',
                    sporsmalstekst: 'Hvilke dager før 1. oktober 2018 var du borte fra jobb?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    svaralternativer: null,
                    min: '2018-04-01',
                    max: '2018-09-30',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [
                        {
                            verdi: '{"fom":"01.05.2018","tom":"04.05.2018"}',
                        },
                    ],
                    undersporsmal: [],
                },
            ],
        }];
        const sporsmalslisteNy = [{
            id: '56',
            tag: 'EGENMELDINGER',
            sporsmalstekst: 'Vi har registrert at du ble sykmeldt mandag 1. oktober 2018. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 15. - 30. september 2018?',
            undertekst: null,
            svartype: 'JA_NEI',
            svaralternativer: null,
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [
                {
                    verdi: 'JA',
                },
            ],
            undersporsmal: [
                {
                    id: '57',
                    tag: 'EGENMELDINGER_NAR',
                    sporsmalstekst: 'Hvilke dager før 1. oktober 2018 var du borte fra jobb?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    svaralternativer: null,
                    min: '2018-04-01',
                    max: '2018-09-30',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [
                        {
                            verdi: '{"fom":"01.05.2018","tom":"10.05.2018"}',
                        },
                    ],
                    undersporsmal: [],
                },
            ],
        }];
        const resultat = mergeSporsmalsliste(sporsmalslisteNy, sporsmalsliste);
        expect(resultat).to.deep.equal(sporsmalsliste);
    });

    it("Skal bruke svar fra backend når spørsmål har fått ny ID (1)", () => {
        const sporsmalsliste = [{
            id: '56',
            tag: 'EGENMELDINGER',
            sporsmalstekst: 'Vi har registrert at du ble sykmeldt mandag 1. oktober 2018. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 15. - 30. september 2018?',
            undertekst: null,
            svartype: 'JA_NEI',
            svaralternativer: null,
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [
                {
                    verdi: 'JA',
                },
            ],
            undersporsmal: [
                {
                    id: '57',
                    tag: 'EGENMELDINGER_NAR',
                    sporsmalstekst: 'Hvilke dager før 1. oktober 2018 var du borte fra jobb?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    svaralternativer: null,
                    min: '2018-04-01',
                    max: '2018-09-30',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [
                        {
                            verdi: '{"fom":"01.05.2018","tom":"04.05.2018"}',
                        },
                    ],
                    undersporsmal: [],
                },
            ],
        }];
        const sporsmalslisteNy = [{
            id: '56',
            tag: 'EGENMELDINGER',
            sporsmalstekst: 'Vi har registrert at du ble sykmeldt mandag 1. oktober 2018. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 15. - 30. september 2018?',
            undertekst: null,
            svartype: 'JA_NEI',
            svaralternativer: null,
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [
                {
                    verdi: 'JA',
                },
            ],
            undersporsmal: [
                {
                    id: '890',
                    tag: 'EGENMELDINGER_NAR',
                    sporsmalstekst: 'Hvilke dager før 1. oktober 2018 var du borte fra jobb?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    svaralternativer: null,
                    min: '2018-04-01',
                    max: '2018-09-30',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [
                        {
                            verdi: '{"fom":"01.05.2018","tom":"10.05.2018"}',
                        },
                    ],
                    undersporsmal: [],
                },
            ],
        }];
        const resultat = mergeSporsmalsliste(sporsmalslisteNy, sporsmalsliste);
        expect(resultat).to.deep.equal(sporsmalslisteNy);
    });

    it("Skal bruke svar fra backend når spørsmål har fått ny ID (2)", () => {
        const sporsmalsliste = [{
            id: '56',
            tag: 'EGENMELDINGER',
            sporsmalstekst: 'Vi har registrert at du ble sykmeldt mandag 1. oktober 2018. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 15. - 30. september 2018?',
            undertekst: null,
            svartype: 'JA_NEI',
            svaralternativer: null,
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [
                {
                    verdi: 'JA',
                },
            ],
            undersporsmal: [
                {
                    id: '57',
                    tag: 'EGENMELDINGER_NAR',
                    sporsmalstekst: 'Hvilke dager før 1. oktober 2018 var du borte fra jobb?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    svaralternativer: null,
                    min: '2018-04-01',
                    max: '2018-09-30',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [
                        {
                            verdi: '{"fom":"01.05.2018","tom":"04.05.2018"}',
                        },
                    ],
                    undersporsmal: [],
                },
            ],
        }];
        const sporsmalslisteNy = [{
            id: '56',
            tag: 'EGENMELDINGER',
            sporsmalstekst: 'Vi har registrert at du ble sykmeldt mandag 1. oktober 2018. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 15. - 30. september 2018?',
            undertekst: null,
            svartype: 'JA_NEI',
            svaralternativer: null,
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [
                {
                    verdi: 'NEI',
                },
            ],
            undersporsmal: [
                {
                    id: '890',
                    tag: 'EGENMELDINGER_NAR',
                    sporsmalstekst: 'Hvilke dager før 1. oktober 2018 var du borte fra jobb?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    svaralternativer: null,
                    min: '2018-04-01',
                    max: '2018-09-30',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [
                        {
                            verdi: '{"fom":"01.05.2018","tom":"10.05.2018"}',
                        },
                    ],
                    undersporsmal: [],
                },
            ],
        }];
        const resultat = mergeSporsmalsliste(sporsmalslisteNy, sporsmalsliste);
        expect(resultat).to.deep.equal([{
            id: '56',
            tag: 'EGENMELDINGER',
            sporsmalstekst: 'Vi har registrert at du ble sykmeldt mandag 1. oktober 2018. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 15. - 30. september 2018?',
            undertekst: null,
            svartype: 'JA_NEI',
            svaralternativer: null,
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [
                {
                    verdi: 'JA',
                },
            ],
            undersporsmal: [
                {
                    id: '890',
                    tag: 'EGENMELDINGER_NAR',
                    sporsmalstekst: 'Hvilke dager før 1. oktober 2018 var du borte fra jobb?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    svaralternativer: null,
                    min: '2018-04-01',
                    max: '2018-09-30',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [
                        {
                            verdi: '{"fom":"01.05.2018","tom":"10.05.2018"}',
                        },
                    ],
                    undersporsmal: [],
                },
            ],
        }]);
    });
});
