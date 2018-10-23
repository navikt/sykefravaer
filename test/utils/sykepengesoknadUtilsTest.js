import chai from 'chai';
import deepFreeze from 'deep-freeze';
import * as utils from '../../js/utils/sykepengesoknadUtils';
import { getTidligsteStartdatoSykeforloep } from '../../js/utils/sykmeldingUtils';
import { parseSoknad } from '../../js/reducers/soknader';

const expect = chai.expect;

describe('sykepengesoknadUtils', () => {
    let soknad1;
    let soknad2;
    let soknad3;
    let soknad4;
    let soknad5;
    let sendtSoknadUtland;
    let ikkeSendtSoknadUtland;
    let sendtSoknadUtlandMedFlerePerioder;
    let data;

    beforeEach(() => {
        soknad1 = {
            id: '1',
            status: 'KORRIGERT',
            sendtTilNAVDato: new Date('2017-02-04'),
            opprettetDato: new Date('2017-04-01'),
            fom: new Date('2017-05-01'),
            tom: new Date('2017-06-01'),
        };

        soknad2 = {
            id: '2',
            status: 'SENDT',
            sendtTilNAVDato: new Date('2017-02-06'),
            sendtTilArbeidsgiverDato: new Date('2017-02-08'),
            opprettetDato: new Date('2017-03-01'),
            fom: new Date('2017-04-01'),
            tom: new Date('2017-04-20'),
        };

        soknad3 = {
            id: '3',
            korrigerer: '1',
            status: 'KORRIGERT',
            sendtTilNAVDato: new Date('2017-02-05'),
            sendtTilArbeidsgiverDato: new Date('2017-02-10'),
            opprettetDato: new Date('2017-07-01'),
            fom: new Date('2017-10-01'),
            tom: new Date('2017-10-12'),
        };

        soknad4 = {
            id: '4',
            korrigerer: '3',
            status: 'SENDT',
            sendtTilNAVDato: new Date('2017-02-08'),
            sendtTilArbeidsgiverDato: new Date('2017-02-11'),
            opprettetDato: new Date('2017-02-01'),
            fom: new Date('2016-08-13'),
            tom: new Date('2016-08-19'),
        };

        soknad5 = {
            id: '5',
            status: 'NY',
            sendtTilArbeidsgiverDato: new Date('2017-02-01'),
            opprettetDato: new Date('2017-10-01'),
            fom: new Date('2017-05-01'),
            tom: new Date('2017-06-10'),
        };

        sendtSoknadUtland = parseSoknad({
            status: 'SENDT',
            soknadstype: 'OPPHOLD_UTLAND',
            sporsmal: [
                {
                    id: '24869',
                    tag: 'PERIODEUTLAND',
                    sporsmalstekst: 'Når skal du være utenfor Norge?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: '2018-07-22',
                    max: '2019-04-22',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [
                        {
                            verdi: '{"fom":"2015-08-01","tom":"2017-10-10"}',
                        },
                    ],
                    undersporsmal: [],
                },
            ],
        });

        sendtSoknadUtlandMedFlerePerioder = parseSoknad({
            status: 'SENDT',
            soknadstype: 'OPPHOLD_UTLAND',
            sporsmal: [
                {
                    id: '24869',
                    tag: 'PERIODEUTLAND',
                    sporsmalstekst: 'Når skal du være utenfor Norge?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: '2018-07-22',
                    max: '2019-04-22',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [
                        {
                            verdi: '{"fom":"2013-01-01","tom":"2013-01-02"}',
                        },
                        {
                            verdi: '{"fom":"2015-08-01","tom":"2017-10-10"}',
                        },
                    ],
                    undersporsmal: [],
                },
            ],
        });

        ikkeSendtSoknadUtland = parseSoknad({
            status: 'NY',
            soknadstype: 'OPPHOLD_UTLAND',
            opprettetDato: '2017-10-09',
            sporsmal: [
                {
                    id: '24869',
                    tag: 'PERIODEUTLAND',
                    sporsmalstekst: 'Når skal du være utenfor Norge?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: '2018-07-22',
                    max: '2019-04-22',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        });
    });


    describe('sorterEtterPerioder', () => {
        beforeEach(() => {
            data = [soknad1, soknad2, soknad3, soknad4];
        });

        it('Skal sortere etter periodene med perioden lengst frem i tid først', () => {
            const res = data.sort(utils.sorterEtterPerioder);
            expect(res).to.deep.equal([soknad3, soknad1, soknad2, soknad4]);
        });

        it('Skal sortere etter periodene med perioden lengst frem i tid først', () => {
            data = [soknad2, soknad4, soknad1, soknad3];
            const res = data.sort(utils.sorterEtterPerioder);
            expect(res).to.deep.equal([soknad3, soknad1, soknad2, soknad4]);
        });

        it('Skal sortere SENDT utenlandssøknad etter perioden', () => {
            data = [soknad1, soknad2, soknad3, soknad4, sendtSoknadUtland];
            const res = data.sort(utils.sorterEtterPerioder);
            expect(res).to.deep.equal([soknad3, sendtSoknadUtland, soknad1, soknad2, soknad4]);
        });

        it('Skal sortere ikke sendt utenlandssøknad etter opprettetDato', () => {
            data = [soknad1, soknad2, soknad3, soknad4, sendtSoknadUtland, ikkeSendtSoknadUtland];
            const res = data.sort(utils.sorterEtterPerioder);
            expect(res).to.deep.equal([soknad3, sendtSoknadUtland, ikkeSendtSoknadUtland, soknad1, soknad2, soknad4]);
        });

        it('Skal sortere sendt utenlandssøknad med flere perioder etter seneste tom', () => {
            data = [soknad1, soknad2, soknad3, soknad4, sendtSoknadUtlandMedFlerePerioder, ikkeSendtSoknadUtland];
            const res = data.sort(utils.sorterEtterPerioder);
            expect(res).to.deep.equal([soknad3, sendtSoknadUtlandMedFlerePerioder, ikkeSendtSoknadUtland, soknad1, soknad2, soknad4]);
        });
    });

    describe('getTidligsteSendtDato', () => {
        it('Skal returnere tidligste dato hvis det er to datoer', () => {
            expect(utils.getTidligsteSendtDato(soknad4)).to.deep.equal(new Date('2017-02-08'));
        });

        it('Skal returnere tidligste dato hvis det er to datoer', () => {
            expect(utils.getTidligsteSendtDato(soknad2)).to.deep.equal(new Date('2017-02-06'));
        });

        it('Skal returnere dato hvis bare sendtTilArbeidsgiverDato er oppgitt', () => {
            expect(utils.getTidligsteSendtDato(soknad5)).to.deep.equal(new Date('2017-02-01'));
        });

        it('Skal returnere dato hvis bare sendtTilNAVDato er oppgitt', () => {
            expect(utils.getTidligsteSendtDato(soknad1)).to.deep.equal(new Date('2017-02-04'));
        });
    });


    describe('sorterEtterSendtDato', () => {
        beforeEach(() => {
            data = [soknad1, soknad2, soknad3, soknad4, soknad5];
        });

        it('Skal sortere etter tidligste datoer', () => {
            const res = data.sort(utils.sorterEtterSendtDato);
            expect(res).to.deep.equal([soknad4, soknad2, soknad3, soknad1, soknad5]);
        });
    });

    describe('sorterEtterOpprettetDato', () => {
        beforeEach(() => {
            data = [soknad1, soknad2, soknad3, soknad4, soknad5];
        });

        it('Skal sortere etter opprettetDato, med den tidligst opprettede søknaden først', () => {
            const res = data.sort(utils.sorterEtterOpprettetDato);
            expect(res).to.deep.equal([soknad4, soknad2, soknad1, soknad3, soknad5]);
        });

        it('Hvis to søknader har samme opprettetDato, skal det sorteres etter FOM', () => {
            const soknad6 = {
                ...soknad2,
                fom: new Date('2017-01-18'),
            };

            const soknad7 = {
                ...soknad2,
                fom: new Date('2017-01-10'),
            };
            data = [soknad1, soknad3, soknad4, soknad5, soknad6, soknad7];
            const res = data.sort(utils.sorterEtterOpprettetDato);
            expect(res).to.deep.equal([soknad4, soknad7, soknad6, soknad1, soknad3, soknad5]);
        });
    });


    describe('erSendtTilBeggeMenIkkeSamtidig', () => {
        let soknadSendtTilNAV;
        let soknadSendtTilArbeidsgiver;
        let soknadSendtTilBeggeSamtidig;
        let soknadSendtTilBeggeMenIkkeSamtidig;

        beforeEach(() => {
            soknadSendtTilNAV = {
                sendtTilArbeidsgiverDato: null,
                sendtTilNAVDato: new Date('2017-02-10'),
            };

            soknadSendtTilArbeidsgiver = {
                sendtTilNAVDato: null,
                sendtTilArbeidsgiverDato: new Date('2017-02-10'),
            };

            soknadSendtTilBeggeSamtidig = {
                sendtTilArbeidsgiverDato: new Date('2017-02-10'),
                sendtTilNAVDato: new Date('2017-02-10'),
            };

            soknadSendtTilBeggeMenIkkeSamtidig = {
                sendtTilArbeidsgiverDato: new Date('2017-02-10'),
                sendtTilNAVDato: new Date('2017-02-12'),
            };
        });

        it('Skal returnere true hvis søknad er sendt til begge men ikke samtidig', () => {
            expect(utils.erSendtTilBeggeMenIkkeSamtidig(soknadSendtTilBeggeMenIkkeSamtidig)).to.equal(true);
        });

        it('Skal returnere false i alle andre tilfeller', () => {
            expect(utils.erSendtTilBeggeMenIkkeSamtidig(soknadSendtTilNAV));
            expect(utils.erSendtTilBeggeMenIkkeSamtidig(soknadSendtTilArbeidsgiver));
            expect(utils.erSendtTilBeggeMenIkkeSamtidig(soknadSendtTilBeggeSamtidig));
        });
    });

    describe('getTomDato', () => {
        it('Returnerer tom fra søknaden hvis gjenopptattArbeidFulltUtDato ikke er utfylt', () => {
            expect(utils.getTomDato({
                gjenopptattArbeidFulltUtDato: null,
                tom: new Date('2017-01-13'),
                aktiviteter: [{
                    periode: {
                        fom: new Date('2017-01-01'),
                        tom: new Date('2017-01-15'),
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date('2017-01-01'),
                        tom: new Date('2017-01-25'),
                    },
                    grad: 50,
                    avvik: null,
                }],
            })).to.deep.equal(new Date('2017-01-13'));
        });

        it('Returnerer gjenopptattArbeidFulltUtDato minus en dag hvis gjenopptattArbeidFulltUtDato er utfylt', () => {
            expect(utils.getTomDato({
                gjenopptattArbeidFulltUtDato: new Date('2017-01-24'),
                aktiviteter: [{
                    periode: {
                        fom: new Date('2017-01-01'),
                        tom: new Date('2017-01-15'),
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date('2017-01-01'),
                        tom: new Date('2017-01-25'),
                    },
                    grad: 50,
                    avvik: null,
                }],
            })).to.deep.equal(new Date('2017-01-23'));
        });

        it('Returnerer gjenopptattArbeidFulltUtDato hvis gjenopptattArbeidFulltUtDato er utfylt og samme dag som tidligste fom', () => {
            expect(utils.getTomDato({
                gjenopptattArbeidFulltUtDato: new Date('2017-01-01'),
                aktiviteter: [{
                    periode: {
                        fom: new Date('2017-01-01'),
                        tom: new Date('2017-01-15'),
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date('2017-01-16'),
                        tom: new Date('2017-01-25'),
                    },
                    grad: 50,
                    avvik: null,
                }],
            })).to.deep.equal(new Date('2017-01-01'));
        });
    });

    describe('mapAktiviteter', () => {
        it('Returnerer bare de periodene som er aktuelle for denne søknaden', () => {
            const soknad = {
                fom: new Date('2016-05-10'),
                tom: new Date('2016-05-20'),
                aktiviteter: [{
                    periode: {
                        fom: new Date('2016-05-01'),
                        tom: new Date('2016-05-09'),
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date('2016-05-10'),
                        tom: new Date('2016-05-20'),
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date('2016-05-21'),
                        tom: new Date('2016-05-25'),
                    },
                    grad: 100,
                    avvik: null,
                }],
            };

            const a = utils.mapAktiviteter(deepFreeze(soknad));
            expect(a.aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date('2016-05-10'),
                    tom: new Date('2016-05-20'),
                },
                grad: 100,
                avvik: null,
            }]);
        });

        it('Deler de andre periodene opp slik at bare den aktuelle delen av perioden tas med', () => {
            const soknad = {
                fom: new Date('2016-05-10'),
                tom: new Date('2016-05-20'),
                aktiviteter: [{
                    periode: {
                        fom: new Date('2016-05-01'),
                        tom: new Date('2016-05-05'),
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date('2016-05-06'),
                        tom: new Date('2016-05-12'),
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date('2016-05-13'),
                        tom: new Date('2016-05-25'),
                    },
                    grad: 100,
                    avvik: null,
                }],
            };

            const a = utils.mapAktiviteter(deepFreeze(soknad));
            expect(a.aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date('2016-05-10'),
                    tom: new Date('2016-05-12'),
                },
                grad: 100,
                avvik: null,
            }, {
                periode: {
                    fom: new Date('2016-05-13'),
                    tom: new Date('2016-05-20'),
                },
                grad: 100,
                avvik: null,
            }]);
        });

        it('Testeksempel mapAktiviteter 1', () => {
            const aktiviteter = [
                {
                    periode: {
                        fom: new Date('2017-06-22'),
                        tom: new Date('2017-08-02'),
                    },
                    grad: 100,
                    avvik: null,
                },
            ];
            const fom = new Date('2017-06-22');
            const tom = new Date('2017-07-12');
            const soknad = deepFreeze({ fom, tom, aktiviteter });
            const a = utils.mapAktiviteter(soknad);

            expect(a.aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date('2017-06-22'),
                    tom: new Date('2017-07-12'),
                },
                grad: 100,
                avvik: null,
            }]);
        });

        it('Testeksempel mapAktiviteter 2', () => {
            const aktiviteter = [
                {
                    periode: {
                        fom: new Date('2016-07-15'),
                        tom: new Date('2016-07-20'),
                    },
                },
                {
                    periode: {
                        fom: new Date('2016-07-21'),
                        tom: new Date('2016-07-25'),
                    },
                },
                {
                    periode: {
                        fom: new Date('2016-07-26'),
                        tom: new Date('2016-07-30'),
                    },
                },
            ];
            const fom = new Date('2016-07-18');
            const tom = new Date('2016-07-24');
            const soknad = { aktiviteter, fom, tom };
            const a = utils.mapAktiviteter(deepFreeze(soknad));
            expect(a.aktiviteter).to.deep.equal([
                {
                    periode: {
                        fom: new Date('2016-07-18'),
                        tom: new Date('2016-07-20'),
                    },
                },
                {
                    periode: {
                        fom: new Date('2016-07-21'),
                        tom: new Date('2016-07-24'),
                    },
                },
            ]);
        });
    });

    describe('getGjenopptattArbeidFulltUtDato', () => {
        let skjemasoknad;

        beforeEach(() => {
            skjemasoknad = {
                harGjenopptattArbeidFulltUt: true,
            };
        });

        it('Skal returnere null hvis harGjenopptattArbeidFulltUt er false og gjenopptattArbeidFulltUtDato er riktig fylt ut', () => {
            skjemasoknad.harGjenopptattArbeidFulltUt = false;
            skjemasoknad.gjenopptattArbeidFulltUtDato = '20.02.2017';
            const dato = utils.getGjenopptattArbeidFulltUtDato(skjemasoknad);
            expect(dato).to.equal(null);
        });

        it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato ikke er fylt ut', () => {
            const dato = utils.getGjenopptattArbeidFulltUtDato(skjemasoknad);
            expect(dato).to.equal(null);
        });

        it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er noe ugyldig (1)', () => {
            skjemasoknad.gjenopptattArbeidFulltUtDato = '02.02';
            const dato = utils.getGjenopptattArbeidFulltUtDato(skjemasoknad);
            expect(dato).to.equal(null);
        });

        it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng (1)', () => {
            skjemasoknad.gjenopptattArbeidFulltUtDato = '0_.__.____';
            const dato = utils.getGjenopptattArbeidFulltUtDato(skjemasoknad);
            expect(dato).to.equal(null);
        });

        it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng (2)', () => {
            skjemasoknad.gjenopptattArbeidFulltUtDato = '10.__.____';
            const dato = utils.getGjenopptattArbeidFulltUtDato(skjemasoknad);
            expect(dato).to.equal(null);
        });

        it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng (3)', () => {
            skjemasoknad.gjenopptattArbeidFulltUtDato = '10.05.____';
            const dato = utils.getGjenopptattArbeidFulltUtDato(skjemasoknad);
            expect(dato).to.equal(null);
        });


        it('Skal returnere gjenopptattArbeidFulltUtDato som en dato hvis gjenopptattArbeidFulltUtDato er noe gyldig', () => {
            skjemasoknad.gjenopptattArbeidFulltUtDato = '23.12.2017';
            const dato = utils.getGjenopptattArbeidFulltUtDato(skjemasoknad);
            expect(dato).to.deep.equal(new Date('2017-12-23'));
        });
    });

    describe('getTidligsteStartdatoSykeforloep', () => {
        let skjemasoknad;
        const tidligsteDato = new Date('2017-12-24');
        const senesteDato = new Date('2018-01-01');

        beforeEach(() => {
            skjemasoknad = {
                oppfoelgingsdato: tidligsteDato,
                identdato: senesteDato,
            };
        });

        it('skal returnere oppfølgingsdato hvis den er tidligere enn identdato', () => {
            const dato = getTidligsteStartdatoSykeforloep(skjemasoknad);
            expect(dato).to.deep.equal(tidligsteDato);
        });

        it('skal returnere identdato hvis oppfoelgingsdato er null', () => {
            skjemasoknad.oppfoelgingsdato = null;
            const dato = getTidligsteStartdatoSykeforloep(skjemasoknad);
            expect(dato).to.deep.equal(senesteDato);
        });

        it('skal returnere identdato hvis den er tidligere enn oppfølgingsdato', () => {
            skjemasoknad.oppfoelgingsdato = senesteDato;
            skjemasoknad.oppfoelgingsdato = tidligsteDato;
            const dato = getTidligsteStartdatoSykeforloep(skjemasoknad);
            expect(dato).to.deep.equal(tidligsteDato);
        });
    });

    describe('filtrerAktuelleAktiviteter', () => {
        const aktiviteter = [{
            periode: {
                fom: new Date('2017-01-01'),
                tom: new Date('2017-01-15'),
            },
        }, {
            periode: {
                fom: new Date('2017-01-16'),
                tom: new Date('2017-01-25'),
            },
        }];

        it('Returnerer aktiviteter om arbeid ikke er gjennopptatt - undefined', () => {
            const _aktiviteter = utils.filtrerAktuelleAktiviteter(aktiviteter, undefined);
            expect(_aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date('2017-01-01'),
                    tom: new Date('2017-01-15'),
                },
            }, {
                periode: {
                    fom: new Date('2017-01-16'),
                    tom: new Date('2017-01-25'),
                },
            }]);
        });

        it('Returnerer aktiviteter om arbeid ikke er gjennopptatt - null', () => {
            const _aktiviteter = utils.filtrerAktuelleAktiviteter(aktiviteter, null);
            expect(_aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date('2017-01-01'),
                    tom: new Date('2017-01-15'),
                },
            }, {
                periode: {
                    fom: new Date('2017-01-16'),
                    tom: new Date('2017-01-25'),
                },
            }]);
        });

        it('Returnerer aktiviteter om arbeid er gjennopptatt utenfor periodene', () => {
            const _aktiviteter = utils.filtrerAktuelleAktiviteter(aktiviteter, new Date('2017-02-01'));
            expect(_aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date('2017-01-01'),
                    tom: new Date('2017-01-15'),
                },
            }, {
                periode: {
                    fom: new Date('2017-01-16'),
                    tom: new Date('2017-01-25'),
                },
            }]);
        });

        it('Klipper siste periode om arbeid er gjennopptatt i løpet av den forrige', () => {
            const _aktiviteter = utils.filtrerAktuelleAktiviteter(aktiviteter, new Date('2017-01-21'));
            expect(_aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date('2017-01-01'),
                    tom: new Date('2017-01-15'),
                },
            }, {
                periode: {
                    fom: new Date('2017-01-16'),
                    tom: new Date('2017-01-20'),
                },
            }]);
        });

        it('Kutter hele perioden om arbeid er gjennopptatt før perioden starter', () => {
            const _aktiviteter = utils.filtrerAktuelleAktiviteter(aktiviteter, new Date('2017-01-15'));
            expect(_aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date('2017-01-01'),
                    tom: new Date('2017-01-14'),
                },
            }]);
        });

        it('Kutter alle aktiviteter om arbeid er gjennopptatt første dag i sykmeldingen', () => {
            const _aktiviteter = utils.filtrerAktuelleAktiviteter(aktiviteter, new Date('2017-01-01'));
            expect(_aktiviteter).to.deep.equal([]);
        });
    });
});
