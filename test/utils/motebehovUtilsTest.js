import chai from 'chai';
import sinon from 'sinon';
import {
    erMotebehovToggletPaa,
    finnNyesteMotebehovForVirksomhetListe,
    skalViseMotebehovKvittering,
    hentMoteLandingssideUrl,
    erOppfolgingstilfelleSluttDatoPassert,
    erOppfoelgingsdatoNyereEnn132DagerForProdsetting,
    erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker,
    skalViseMotebehovMedOppfolgingsforlopListe,
    erMotebehovTilgjengeligForOppfolgingsforlop,
    harMotebehovSvar,
    hentOppfolgingsforlopStartdato,
    hentOppfolgingsforlopSluttdato,
    OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER,
    OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER,
} from '../../js/utils/motebehovUtils';
import { getMotebehov } from '../mock/mockMotebehov';
import { leggTilDagerPaaDato } from '../testUtils';
import { hentSykmeldingAktiv } from '../mock/mockSykmeldinger';

const expect = chai.expect;

describe('motebehovUtils', () => {
    let clock;
    beforeEach(() => {
        const dagensDato = new Date('2019-02-23');
        clock = sinon.useFakeTimers(dagensDato.getTime());
    });

    afterEach(() => {
        clock.restore();
    });

    describe('finnNyesteMotebehovForVirksomhetListe', () => {
        let motebehovReducer;
        let virksomhetsnrListe;
        beforeEach(() => {
            virksomhetsnrListe = ['110110110', '110110111'];
            motebehovReducer = {
                data: [
                    getMotebehov({
                        virksomhetsnummer: virksomhetsnrListe[0],
                        opprettetDato: leggTilDagerPaaDato(new Date(), -1),
                    }),
                    getMotebehov({
                        virksomhetsnummer: virksomhetsnrListe[1],
                        opprettetDato: leggTilDagerPaaDato(new Date(), 1),
                    }),
                ],
            };
        });
        it('Skal finne nyeste motebehov dersom det er flere motebehov hos ulike virksomheter', () => {
            const exp = virksomhetsnrListe[1];
            const res = finnNyesteMotebehovForVirksomhetListe(motebehovReducer, virksomhetsnrListe).virksomhetsnummer;
            expect(res).to.equal(exp);
        });

        it('Skal finne nyeste motebehov dersom det er flere motebehov hos en virksomhet', () => {
            const exp = virksomhetsnrListe[0];
            const res = finnNyesteMotebehovForVirksomhetListe(motebehovReducer, [virksomhetsnrListe[0]]).virksomhetsnummer;
            expect(res).to.equal(exp);
        });

        it('Skal ikke finne nyeste motebehov dersom det er motebehov, men ikke hos viksomhet', () => {
            const exp = undefined;
            const res = finnNyesteMotebehovForVirksomhetListe(motebehovReducer, []);
            expect(res).to.equal(exp);
        });

        it('Skal ikke finne nyeste motebehov dersom det ikke er motebehov hos virksomhet', () => {
            const exp = undefined;
            const res = finnNyesteMotebehovForVirksomhetListe({ data: [] }, virksomhetsnrListe);
            expect(res).to.equal(exp);
        });
    });

    describe('skalViseMotebehovKvittering', () => {
        let motebehovReducer;
        let virksomhetsnrListe;
        beforeEach(() => {
            virksomhetsnrListe = ['110110110', '110110111'];
            motebehovReducer = {
                data: [
                    getMotebehov({
                        virksomhetsnummer: virksomhetsnrListe[0],
                        opprettetDato: leggTilDagerPaaDato(new Date(), -1),
                    }),
                    getMotebehov({
                        virksomhetsnummer: virksomhetsnrListe[1],
                        opprettetDato: leggTilDagerPaaDato(new Date(), 1),
                    }),
                ],
            };
        });
        it('Skal returnere false om det ikke eksisterer motebehov hos virksomhet', () => {
            const exp = false;
            const res = skalViseMotebehovKvittering({ data: [] }, virksomhetsnrListe);
            expect(res).to.equal(exp);
        });

        it('Skal returnere false om det eksisterer motebehov, men ikke hos virksomhet', () => {
            const exp = false;
            const res = skalViseMotebehovKvittering({ data: [] }, virksomhetsnrListe);
            expect(res).to.equal(exp);
        });

        it('Skal returnere true om det eksisterer motebehov hos virksomhet', () => {
            const exp = true;
            const res = skalViseMotebehovKvittering(motebehovReducer, virksomhetsnrListe);
            expect(res).to.equal(exp);
        });
    });

    describe('hentMoteLandingssideUrl', () => {
        it('Skal returnere url til landingsside for dialogmoter om skalViseMotebehov=true ', () => {
            const exp = '/sykefravaer/dialogmoter';
            const res = hentMoteLandingssideUrl(true);
            expect(res).to.equal(exp);
        });

        it('Skal returnere url til side for mote om skalViseMotebehov=false', () => {
            const exp = '/sykefravaer/dialogmoter/mote';
            const res = hentMoteLandingssideUrl(false);
            expect(res).to.equal(exp);
        });
    });

    describe('erOppfolgingstilfelleSluttDatoPassert', () => {
        let sluttOppfolgingsdato;

        it('Skal returnere false om sluttdato for oppfolgingstilfelle er ikke passert', () => {
            sluttOppfolgingsdato = leggTilDagerPaaDato(new Date(), 1);
            const exp = false;
            const res = erOppfolgingstilfelleSluttDatoPassert(sluttOppfolgingsdato);
            expect(res).to.equal(exp);
        });

        it('Skal returnere true om sluttdato for oppfolgingstilfelle er passert', () => {
            sluttOppfolgingsdato = leggTilDagerPaaDato(new Date(), -1);
            const exp = true;
            const res = erOppfolgingstilfelleSluttDatoPassert(sluttOppfolgingsdato);
            expect(res).to.equal(exp);
        });
    });

    describe('hentOppfolgingsforlopStartdato', () => {
        let oppfoelgingsdato;

        it('skal returnere false, dersom dagens dato er mindre enn 16 uker etter start av oppfoelgingsdato', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER - 1));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(false);
        });
    });

    describe('toggles', () => {
        const toggleMotebehov = (erMotebehovTogglePaa) => {
            return {
                data: {
                    'syfotoggles.dialogmote.motebehov.vis': erMotebehovTogglePaa ? 'true' : 'false',
                },
            };
        };

        describe('erMotebehovToggletPaa', () => {
            it('skal returnere false', () => {
                const exp = false;
                const res = erMotebehovToggletPaa(toggleMotebehov(false));
                expect(res).to.equal(exp);
            });
            it('skal returnere true', () => {
                const exp = true;
                const res = erMotebehovToggletPaa(toggleMotebehov(true));
                expect(res).to.equal(exp);
            });
        });
    });

    describe('erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker', () => {
        let oppfoelgingsdato;

        it('skal returnere false, dersom dagens dato er mindre enn 16 uker etter start av oppfoelgingsdato', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER - 1));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(false);
        });

        it('skal returnere true, dersom dagens dato er 16 uker etter start av oppfoelgingsdato ', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER);
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(true);
        });

        it('skal returnere true, dersom dagens dato er mer 16 uker etter start av oppfoelgingsdato ', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER + 1));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(true);
        });

        it('skal returnere true, dersom dagens dato er mer enn 16 uker og mindre enn 26 uker etter start av oppfoelgingsdato ', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER - 1));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(true);
        });

        it('skal returnere false, dersom dagens dato er 26 uker etter start av oppfoelgingsdato', () => {
            oppfoelgingsdato = leggTilDagerPaaDato(new Date(), -(26 * 7));
            expect(erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(oppfoelgingsdato)).to.equal(false);
        });
    });

    describe('hentOppfolgingsforlopStartdato', () => {
        let oppfolgingsforlopsPeriodeData;

        it('skal returnere sykeforloepsPeriode med nyeste fom for sykeforloepsPeriode', () => {
            oppfolgingsforlopsPeriodeData = [
                { fom: '2016-11-01' },
                { fom: '2016-10-01' },
                { fom: '2016-12-01' },
            ];
            const exp = new Date(oppfolgingsforlopsPeriodeData[1].fom).getTime();
            const res = hentOppfolgingsforlopStartdato(oppfolgingsforlopsPeriodeData).getTime();
            expect(res).to.equal(exp);
        });

        it('skal returnere sykeforloepsPeriode med nyeste fom for sykeforloepsPeriode', () => {
            oppfolgingsforlopsPeriodeData = [
                { fom: '2016-11-01' },
                { fom: '2016-12-01' },
                { fom: '2016-10-01' },
            ];
            const exp = new Date(oppfolgingsforlopsPeriodeData[2].fom).getTime();
            const res = hentOppfolgingsforlopStartdato(oppfolgingsforlopsPeriodeData).getTime();
            expect(res).to.equal(exp);
        });
    });

    describe('hentOppfolgingsforlopSluttdato', () => {
        let oppfolgingsforlopsPeriodeData;

        it('skal returnere sykeforloepsPeriode med nyeste tom for sykeforloepsPeriode', () => {
            oppfolgingsforlopsPeriodeData = [
                { tom: '2016-11-01' },
                { tom: '2016-12-01' },
                { tom: '2016-10-01' },
            ];
            const exp = new Date(oppfolgingsforlopsPeriodeData[1].tom).getTime();
            const res = hentOppfolgingsforlopSluttdato(oppfolgingsforlopsPeriodeData).getTime();
            expect(res).to.equal(exp);
        });

        it('skal returnere sykeforloepsPeriode med nyeste tom for sykeforloepsPeriode', () => {
            oppfolgingsforlopsPeriodeData = [
                { tom: '2016-11-01' },
                { tom: '2016-10-01' },
                { tom: '2016-12-01' },
            ];
            const exp = new Date(oppfolgingsforlopsPeriodeData[2].tom).getTime();
            const res = hentOppfolgingsforlopSluttdato(oppfolgingsforlopsPeriodeData).getTime();
            expect(res).to.equal(exp);
        });
    });

    describe('skalViseMotebehovMedOppfolgingsforlopListe', () => {
        let oppfolgingsforlopsPerioderReducer;
        let togglesPaa;
        let togglesAv;
        let motebehovReducer;
        beforeEach(() => {
            togglesPaa = {
                data: {
                    'syfotoggles.dialogmote.motebehov.vis': 'true',
                },
            };
            togglesAv = { data: {} };
            oppfolgingsforlopsPerioderReducer = {};
        });

        it('skal returnere false, dersom toggle for motebehov er skrudd av og oppfoelgingsdato ikke er passert med 16uker', () => {
            oppfolgingsforlopsPerioderReducer = {
                data: [
                    { fom: leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER - 1)) },
                ],
            };
            expect(skalViseMotebehovMedOppfolgingsforlopListe([oppfolgingsforlopsPerioderReducer], togglesAv)).to.equal(false);
        });

        it('skal returnere false, dersom toggle for motebehov er skrudd av og oppfoelgingsdato er passert med 16uker', () => {
            oppfolgingsforlopsPerioderReducer = {
                data: [
                    { fom: leggTilDagerPaaDato(new Date(), -OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER) },
                ],
            };
            expect(skalViseMotebehovMedOppfolgingsforlopListe([oppfolgingsforlopsPerioderReducer], togglesAv)).to.equal(false);
        });

        it('skal returnere false, dersom toggle for motebehov er skrudd paa og oppfoelgingsdato ikke er passert med 16uker', () => {
            oppfolgingsforlopsPerioderReducer = [{
                data: [
                    { fom: leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER - 1)) },
                ],
            }];
            expect(skalViseMotebehovMedOppfolgingsforlopListe([oppfolgingsforlopsPerioderReducer], togglesPaa)).to.equal(false);
        });

        it('skal returnere true, dersom toggle for motebehov er skrudd paa og oppfoelgingsdato er passert med 16uker', () => {
            oppfolgingsforlopsPerioderReducer = {
                data: [
                    { fom: leggTilDagerPaaDato(new Date(), -OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER) },
                ],
            };
            expect(skalViseMotebehovMedOppfolgingsforlopListe([oppfolgingsforlopsPerioderReducer], togglesPaa)).to.equal(true);
        });

        it('skal returnere true, dersom toggle for motebehov er skrudd paa og oppfoelgingsdato er passert med 16 uker og ikke 26 uker', () => {
            oppfolgingsforlopsPerioderReducer = {
                data: [
                    { fom: leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER - 1)) },
                ],
            };
            expect(skalViseMotebehovMedOppfolgingsforlopListe([oppfolgingsforlopsPerioderReducer], togglesPaa)).to.equal(true);
        });

        it('skal returnere false, dersom toggle for motebehov er skrudd paa og oppfoelgingsdato er passert med 16 uker og 26 uker', () => {
            oppfolgingsforlopsPerioderReducer = {
                data: [
                    { fom: leggTilDagerPaaDato(new Date(), -OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER) },
                ],
            };
            expect(skalViseMotebehovMedOppfolgingsforlopListe([oppfolgingsforlopsPerioderReducer], togglesPaa)).to.equal(false);
        });

        describe('hentingForbudt', () => {
            it('skal returnere false, henting av motebehov er forbudt fra syfomotebehov', () => {
                oppfolgingsforlopsPerioderReducer = {
                    data: [
                        { fom: leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER - 1)) },
                    ],
                };
                motebehovReducer = {
                    hentingForbudt: true,
                };
                expect(skalViseMotebehovMedOppfolgingsforlopListe([oppfolgingsforlopsPerioderReducer], togglesPaa, motebehovReducer)).to.equal(false);
            });
        });
    });

    describe('erMotebehovTilgjengeligForOppfolgingsforlop', () => {
        let state;
        let dineSykmeldingerReducer;
        let orgnummer;
        let sykmeldingAktiv;
        let ledereReducer;
        let togglesPaa;
        let togglesAv;
        beforeEach(() => {
            orgnummer = '110110110';
            sykmeldingAktiv = {
                ...hentSykmeldingAktiv(new Date()),
                orgnummer,
            };
            ledereReducer = {
                data: [{ orgnummer }],
            };
            dineSykmeldingerReducer = {
                data: [sykmeldingAktiv],
            };
            state = {
                dineSykmeldinger: dineSykmeldingerReducer,
                ledere: ledereReducer,
            };
            togglesPaa = {
                data: {
                    'syfotoggles.dialogmote.motebehov.vis': 'true',
                },
            };
            togglesAv = { data: {} };
        });

        it('skal returnere false, dersom toggle for motebehov er skrudd av og oppfoelgingsdato ikke er passert med 16uker', () => {
            state = {
                ...state,
                oppfolgingsforlopsPerioder: {
                    [orgnummer]: {
                        data: [
                            { fom: leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER - 1)) },
                        ],
                    },
                },
                toggles: togglesAv,
            };
            expect(erMotebehovTilgjengeligForOppfolgingsforlop(state)).to.equal(false);
        });

        it('skal returnere false, dersom toggle for motebehov er skrudd av og oppfoelgingsdato er passert med 16uker', () => {
            state = {
                ...state,
                oppfolgingsforlopsPerioder: {
                    [orgnummer]: {
                        data: [
                            { fom: leggTilDagerPaaDato(new Date(), -OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER) },
                        ],
                    },
                },
                toggles: togglesAv,
            };
            expect(erMotebehovTilgjengeligForOppfolgingsforlop(state)).to.equal(false);
        });

        it('skal returnere false, dersom toggle for motebehov er skrudd paa og oppfoelgingsdato ikke er passert med 16uker', () => {
            state = {
                ...state,
                oppfolgingsforlopsPerioder: {
                    [orgnummer]: {
                        data: [
                            { fom: leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER - 1)) },
                        ],
                    },
                },
                toggles: togglesPaa,
            };
            expect(erMotebehovTilgjengeligForOppfolgingsforlop(state)).to.equal(false);
        });

        it('skal returnere true, dersom toggle for motebehov er skrudd paa og oppfoelgingsdato er passert med 16uker', () => {
            state = {
                ...state,
                oppfolgingsforlopsPerioder: {
                    [orgnummer]: {
                        data: [
                            { fom: leggTilDagerPaaDato(new Date(), -OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER) },
                        ],
                    },
                },
                toggles: togglesPaa,
            };
            expect(erMotebehovTilgjengeligForOppfolgingsforlop(state)).to.equal(true);
        });

        it('skal returnere true, dersom toggle for motebehov er skrudd paa og oppfoelgingsdato er passert med 16 uker og ikke 26 uker', () => {
            state = {
                ...state,
                oppfolgingsforlopsPerioder: {
                    [orgnummer]: {
                        data: [
                            { fom: leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER - 1)) },
                        ],
                    },
                },
                toggles: togglesPaa,
            };
            expect(erMotebehovTilgjengeligForOppfolgingsforlop(state)).to.equal(true);
        });

        it('skal returnere false, dersom toggle for motebehov er skrudd paa og oppfoelgingsdato er passert med 16 uker og 26 uker', () => {
            state = {
                ...state,
                oppfolgingsforlopsPerioder: {
                    [orgnummer]: {
                        data: [
                            { fom: leggTilDagerPaaDato(new Date(), -OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER) },
                        ],
                    },
                },
                toggles: togglesPaa,
            };
            expect(erMotebehovTilgjengeligForOppfolgingsforlop(state)).to.equal(false);
        });

        describe('hentingForbudt', () => {
            it('skal returnere false, henting av motebehov er forbudt fra syfomotebehov', () => {
                state = {
                    ...state,
                    motebehov: {
                        hentingForbudt: true,
                    },
                    oppfolgingsforlopsPerioder: {
                        [orgnummer]: {
                            data: [
                                { fom: leggTilDagerPaaDato(new Date(), -(OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER - 1)) },
                            ],
                        },
                    },
                    toggles: togglesPaa,
                };
                expect(erMotebehovTilgjengeligForOppfolgingsforlop(state)).to.equal(false);
            });
        });
    });

    describe('erOppfoelgingsdatoNyereEnn132DagerForProdsetting', () => {
        let oppfoelgingsdato;

        it('skal returnere false dersom oppfoelgingsdato ikke er nyere enn 132 dager for prodsetting av motebehov ', () => {
            oppfoelgingsdato = new Date('2018-07-17');
            const resultat = erOppfoelgingsdatoNyereEnn132DagerForProdsetting(oppfoelgingsdato);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere true dersom oppfoelgingsdato er nyere enn 132 dager for prodsetting av motebehov ', () => {
            oppfoelgingsdato = new Date('2018-07-18');
            const resultat = erOppfoelgingsdatoNyereEnn132DagerForProdsetting(oppfoelgingsdato);
            const forventet = true;
            expect(resultat).to.equal(forventet);
        });
    });

    describe('harMotebehovSvar', () => {
        let state = {};

        it('skal returnere false', () => {
            state = {
                motebehov: {
                    data: [],
                },
            };
            const resultat = harMotebehovSvar(state);
            const forventet = false;
            expect(resultat).to.equal(forventet);
        });

        it('skal returnere true', () => {
            const motebehovSvarIkkeUtgaatt = {
                opprettetDato: leggTilDagerPaaDato(new Date(), -1),
            };
            state = {
                motebehov: {
                    data: [motebehovSvarIkkeUtgaatt],
                },
            };
            const resultat = harMotebehovSvar(state);
            const forventet = true;
            expect(resultat).to.equal(forventet);
        });
    });
});
