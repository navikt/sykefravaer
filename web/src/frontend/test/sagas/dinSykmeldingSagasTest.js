import { expect } from 'chai';
import {
    bekreftSykmelding,
    sendSykmeldingTilArbeidsgiver,
    avbrytSykmelding,
    gjenaapneSykmelding,
} from '../../js/sagas/dinSykmeldingSagas';
import * as actions from '../../js/actions/dinSykmelding_actions';
import { hentDineSykmeldinger } from "../../js/actions/dineSykmeldinger_actions";
import { hentArbeidsgiversSykmeldinger } from "../../js/actions/arbeidsgiversSykmeldinger_actions";
import { post } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import * as actiontyper from '../../js/actions/actiontyper';

describe("dinSykmeldingSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/syforest"
        }
    });

    describe("bekreftSykmelding", () => {

        const action = actions.bekreftSykmelding("123", "arbeidstaker", {
            periode: true
        });
        const generator = bekreftSykmelding(action);

        it("Skal dispatche BEKREFTER_SYKMELDING", () => {
            const nextPut = put({type: actiontyper.BEKREFTER_SYKMELDING});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest bekrefte sykmeldingen", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/sykmeldinger/123/actions/bekreft", {
                arbeidssituasjon: 'arbeidstaker',
                feilaktigeOpplysninger: {
                    periode: true,
                }
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dernest dispatche SYKMELDING_BEKREFTET", () => {
            const nextPut = put({
                type: actiontyper.SYKMELDING_BEKREFTET,
                sykmeldingId: "123"
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest dispatche HENT_DINE_SYKMELDINGER_FORESPURT", () => {
            const nextPut = put({
                type: actiontyper.HENT_DINE_SYKMELDINGER_FORESPURT,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest dispatche HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT", () => {
            const nextPut = put({
                type: actiontyper.HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });

    describe("sendSykmeldingTilArbeidsgiver", () => {

        const action = actions.sendSykmeldingTilArbeidsgiver("minSykmeldingId", "5678", {
            sykmeldingsgrad: true,
        }, true);
        const generator = sendSykmeldingTilArbeidsgiver(action);

        it("Skal dispatche SENDER_SYKMELDING", () => {
            const nextPut = put({type: actiontyper.SENDER_SYKMELDING, sykmeldingId: "minSykmeldingId"});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest sende sykmeldingen", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/sykmeldinger/minSykmeldingId/actions/send", {
                feilaktigeOpplysninger: {
                    sykmeldingsgrad: true,
                },
                orgnummer: "5678",
                beOmNyNaermesteLeder: true,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dernest dispatche SYKMELDING_SENDT", () => {
            const nextPut = put({
                type: actiontyper.SYKMELDING_SENDT,
                sykmeldingId: "minSykmeldingId",
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente dine sykmeldinger", () => {
            const nextPut = put({
                type: actiontyper.HENT_DINE_SYKMELDINGER_FORESPURT,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente arbeidsgivers sykmeldinger", () => {
            const nextPut = put({
                type: actiontyper.HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });

    describe("avbrytSykmelding", () => {

        const action = actions.avbrytSykmelding("minAndreSykmeldingId", {
            periode: true,
        });
        const generator = avbrytSykmelding(action);

        it("Skal dispatche AVBRYTER_SYKMELDING", () => {
            const nextPut = put(actions.avbryterSykmelding());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest avbryte sykmeldingen", () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/minAndreSykmeldingId/actions/avbryt', {
                periode: true,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dernest dispatche SYKMELDING_AVBRUTT", () => {
            const nextPut = put(actions.sykmeldingAvbrutt("minAndreSykmeldingId"));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente dine sykmeldinger", () => {
            const nextPut = put(hentDineSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente arbeidsgivers sykmeldinger", () => {
            const nextPut = put(hentArbeidsgiversSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });


    describe("gjenaapneSykmelding", () => {

        const action = actions.gjenaapneSykmelding("minAndreSykmeldingId", {
            periode: true,
        });
        const generator = gjenaapneSykmelding(action);

        it("Skal dispatche GJENAAPNER_SYKMELDING", () => {
            const nextPut = put(actions.gjenaapnerSykmelding());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest gjeaapne sykmeldingen", () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/minAndreSykmeldingId/actions/gjenaapne');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dernest dispatche SYKMELDING_GJENAAPNET", () => {
            const nextPut = put(actions.sykmeldingGjenaapnet("minAndreSykmeldingId"));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente dine sykmeldinger", () => {
            const nextPut = put(hentDineSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente arbeidsgivers sykmeldinger", () => {
            const nextPut = put(hentArbeidsgiversSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });
});