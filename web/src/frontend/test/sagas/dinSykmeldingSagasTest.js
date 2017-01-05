import { expect } from 'chai';
import { bekreftSykmelding, sendSykmeldingTilArbeidsgiver, avbrytSykmelding } from '../../js/sagas/dinSykmeldingSagas';
import * as actions from '../../js/actions/dinSykmelding_actions';
import { post } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("dinSykmeldingSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/syforest"
        }
    })

    describe("bekreftSykmelding", () => {

        const action = actions.bekreftSykmelding("123", "arbeidstaker", {
            periode: true
        });
        const generator = bekreftSykmelding(action);

        it("Skal dispatche BEKREFTER_SYKMELDING", () => {
            const nextPut = put({type: 'BEKREFTER_SYKMELDING'});
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
                type: 'SYKMELDING_BEKREFTET',
                sykmeldingId: "123"
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest dispatche HENT_DINE_SYKMELDINGER_FORESPURT", () => {
            const nextPut = put({
                type: 'HENT_DINE_SYKMELDINGER_FORESPURT',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest dispatche HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT", () => {
            const nextPut = put({
                type: 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT',
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
            const nextPut = put({type: 'SENDER_SYKMELDING'});
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
                type: 'SYKMELDING_SENDT',
                sykmeldingId: "minSykmeldingId"
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente dine sykmeldinger", () => {
            const nextPut = put({
                type: 'HENT_DINE_SYKMELDINGER_FORESPURT',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente arbeidsgivers sykmeldinger", () => {
            const nextPut = put({
                type: 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT',
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
            const nextPut = put({type: 'AVBRYTER_SYKMELDING'});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest avbryte sykmeldingen", () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/minAndreSykmeldingId/actions/avbryt', {
                periode: true,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("SKal dernest dispatche SYKMELDING_AVBRUTT", () => {
            const nextPut = put({
                type: 'SYKMELDING_AVBRUTT', 
                sykmeldingId: "minAndreSykmeldingId"
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente dine sykmeldinger", () => {
            const nextPut = put({
                type: 'HENT_DINE_SYKMELDINGER_FORESPURT',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente arbeidsgivers sykmeldinger", () => {
            const nextPut = put({
                type: 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });

});