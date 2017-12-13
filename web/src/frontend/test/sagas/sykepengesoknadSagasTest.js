import {expect} from "chai";
import {
    hentBerikelse,
    hentSykepengesoknader,
    sendSykepengesoknad,
    sendSykepengesoknadTilArbeidsgiver,
    sendSykepengesoknadTilNAV,
    startEndring,
    avbrytSoknad,
    gjenapneSoknad
} from "../../js/sagas/sykepengesoknadSagas";
import {finnSoknad} from "../../js/reducers/sykepengesoknader";
import {get, post} from "../../js/api";
import {call, put, select} from "redux-saga/effects";
import * as actiontyper from "../../js/actions/actiontyper";
import * as actions from "../../js/actions/sykepengesoknader_actions";
import sinon from "sinon";

describe("sykepengersoknadSagas", () => {

    let clock;

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/syforest"
        };
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henting', () => {
        const generator = hentSykepengesoknader({
            type: actiontyper.HENT_SYKEPENGESOKNADER_FORESPURT,
        });

        it("Skal dispatche HENTER_SYKEPENGESOKNADER", () => {
            const nextPut = put({
                type: actiontyper.HENTER_SYKEPENGESOKNADER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente sykepengesoknader", () => {
            const nextCall = call(get, "http://tjenester.nav.no/syforest/soknader");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dernest sette soknader på state", () => {
            const nextPut = put({
                type: actiontyper.SYKEPENGESOKNADER_HENTET,
                sykepengesoknader: [{id: '1'}],
            });
            expect(generator.next([{
                id: '1',
            }]).value).to.deep.equal(nextPut);
        });
    });

    describe('innsending der REST-tjeneste svarer med søknad', () => {
        // GAMMELT RESTSVAR
        const generator = sendSykepengesoknad({
            type: actiontyper.SEND_SYKEPENGESOKNAD_FORESPURT,
            sykepengesoknad: {id: '1'},
        });

        it("skal dispatche SENDER_SYKEPENGESOKNAD", () => {
            const nextPut = put({
                type: actiontyper.SENDER_SYKEPENGESOKNAD,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("skal dernest sende sykepengesoknader", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/soknader/1/actions/send", {id: '1'});
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("skal overskrive overskrive soknad med soknad fra rest-tjenesten hvis den svarer med en søknad", () => {
            const nextPut = put({
                type: actiontyper.SYKEPENGESOKNAD_SENDT,
                sykepengesoknadsId: '1',
                sykepengesoknad: {
                    id: '1',
                    testdata: 'testdata',
                }
            });
            expect(generator.next({
                id: '1',
                testdata: 'testdata',
            }).value).to.deep.equal(nextPut);
        });
    });

    describe('innsending til arbeidsgiver', () => {

        const action = actions.sendSykepengesoknadTilArbeidsgiver("1");
        const generator = sendSykepengesoknadTilArbeidsgiver(action);

        it("skal dispatche SENDER_SYKEPENGESOKNAD", () => {
            const action = actions.senderSykepengesoknad();
            const nextPut = put(action);
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("skal dernest sende sykepengesoknad", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/soknader/1/actions/send-til-arbeidsgiver");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("skal overskrive soknad med soknad fra rest-tjenesten", () => {
            const action = actions.sykepengesoknadSendtTilArbeidsgiver("1", {
                id: '1',
                testdata: 'testdata',
            });
            const nextPut = put(action);
            expect(generator.next({
                id: '1',
                testdata: 'testdata',
            }).value).to.deep.equal(nextPut);
        });
    });

    describe('innsending til NAV', () => {

        const action = actions.sendSykepengesoknadTilNAV("1");
        const generator = sendSykepengesoknadTilNAV(action);

        it("skal dispatche SENDER_SYKEPENGESOKNAD", () => {
            const action = actions.senderSykepengesoknad();
            const nextPut = put(action);
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("skal dernest sende sykepengesoknad", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/soknader/1/actions/send-til-nav");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("skal overskrive overskrive soknad med soknad fra rest-tjenesten", () => {
            const action = actions.sykepengesoknadSendtTilNAV("1", {
                id: '1',
                testdata: 'testdata',
            });
            const nextPut = put(action);
            expect(generator.next({
                id: '1',
                testdata: 'testdata',
            }).value).to.deep.equal(nextPut);
        });
    });

    describe('innsending der REST-tjeneste ikke svarer med søknad', () => {
        // GAMMELT RESTSVAR
        const generator = sendSykepengesoknad({
            type: actiontyper.SEND_SYKEPENGESOKNAD_FORESPURT,
            sykepengesoknad: {id: '1'},
        });

        it("skal dispatche SENDER_SYKEPENGESOKNAD", () => {
            const nextPut = put({
                type: actiontyper.SENDER_SYKEPENGESOKNAD,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("skal dernest sende sykepengesoknader", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/soknader/1/actions/send", {id: '1'});
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("skal overskrive overskrive soknad med soknad fra rest-tjenesten hvis den svarer med en søknad", () => {
            const nextPut = put({
                type: actiontyper.SYKEPENGESOKNAD_SENDT,
                sykepengesoknadsId: '1',
                sykepengesoknad: undefined,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe("Endring", () => {

        const action = actions.startEndringForespurt("123");
        const generator = startEndring(action);

        it("Skal sende forespørsel til server", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/soknader/123/actions/korriger");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche endringStartet", () => {
            const action = actions.endringStartet({id: "123"})
            const nextPut = put(action);
            expect(generator.next({id: "123"}).value).to.deep.equal(nextPut);
        });

    });


    describe("Avbryt", () => {
        const action = actions.avbrytSoknad("123");
        const generator = avbrytSoknad(action);

        it("Skal dispatche avbyterSoknad()", () => {
            const action = actions.avbryterSoknad();
            const nextPut = put(action);
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal sende forespørsel til server", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/soknader/123/actions/avbryt");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche soknadAvbrutt()", () => {
            const action = actions.soknadAvbrutt("123");
            const nextPut = put(action)
            expect(generator.next().value).to.deep.equal(nextPut);
        })
    });

    describe("Gjenåpning av avbrutt søknad", () => {

        const action = actions.gjenapneSoknad("45668");
        const generator = gjenapneSoknad(action);

        it("Skal dispatche gjenapnerSoknad()", () => {
            const action = actions.gjenapnerSoknad();
            const nextPut = put(action);
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal sende forespørsel til server", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/soknader/45668/actions/gjenapne");
            expect(generator.next().value).to.deep.equal(nextCall); 
        });

        it("Skal dispatche soknadGjenapnet('45668')", () => {
            const action = actions.soknadGjenapnet("45668");
            const nextPut = put(action);
            expect(generator.next().value).to.deep.equal(nextPut);
        })

    })

    describe("berikelse", () => {

        const berikelseAction = actions.hentBerikelse("123");

        describe("berike og hente søknader", () => {

            const generator = hentBerikelse(berikelseAction);

            it("skal sjekke state etter søknader", () => {
                expect(generator.next().value).to.deep.equal(select(finnSoknad, "123"));
            });

            it("Skal dernest dispatche hentSykepengesoknader", () => {
                const nextCall = call(hentSykepengesoknader);
                expect(generator.next({}).value).to.deep.equal(nextCall);
            });

            it("Skal dernest dispatche henterBerikelse", () => {
                const nextPut = put({
                    type: actiontyper.HENTER_SYKEPENGESOKNAD_BERIKELSE,
                });
                expect(generator.next().value).to.deep.equal(nextPut);
            });

            it("Skal dernest hente sykepengesoknader", () => {
                const nextCall = call(get, "http://tjenester.nav.no/syforest/soknader/123/berik");
                expect(generator.next().value).to.deep.equal(nextCall);
            });

            it("Skal dispatche SYKEPENGESOKNAD_BERIKELSE_HENTET", () => {
                const nextPut = put(
                    {
                        type: actiontyper.SYKEPENGESOKNAD_BERIKELSE_HENTET,
                        data: {
                            forrigeSykeforloepTom: '2017-06-12'
                        },
                        sykepengesoknadsId: '123',
                    });

                expect(generator.next({
                    forrigeSykeforloepTom: '2017-06-12',
                }).value).to.deep.equal(nextPut);
            });
        });

        describe("berike allerede hentet", () => {
            const generator = hentBerikelse(berikelseAction);

            it("skal sjekke state etter søknader", () => {
                expect(generator.next().value).to.deep.equal(select(finnSoknad, "123"));
            });

            it("Skal dernest dispatche henterBerikelse", () => {
                const nextPut = put({
                    type: actiontyper.HENTER_SYKEPENGESOKNAD_BERIKELSE,
                });
                expect(generator.next({id: '123'}).value).to.deep.equal(nextPut);
            });

            it("Skal dernest hente sykepengesoknader", () => {
                const nextCall = call(get, "http://tjenester.nav.no/syforest/soknader/123/berik");
                expect(generator.next().value).to.deep.equal(nextCall);
            });

            it("Skal dispatche SYKEPENGESOKNAD_BERIKELSE_HENTET", () => {
                const nextPut = put(
                    {
                        type: actiontyper.SYKEPENGESOKNAD_BERIKELSE_HENTET,
                        data: {
                            forrigeSykeforloepTom: '2017-06-12'
                        },
                        sykepengesoknadsId: '123',
                    });

                expect(generator.next({
                    forrigeSykeforloepTom: '2017-06-12',
                }).value).to.deep.equal(nextPut);
            });
        })
    });
});