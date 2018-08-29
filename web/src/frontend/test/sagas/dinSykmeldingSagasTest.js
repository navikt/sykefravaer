import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import { arbeidssituasjoner, post } from 'digisyfo-npm';
import {
    avbrytSykmelding,
    bekreftSykmelding,
    gjenaapneSykmelding,
    sendSykmeldingTilArbeidsgiver,
} from '../../js/sagas/dinSykmeldingSagas';
import * as actions from '../../js/actions/dinSykmelding_actions';
import { hentDineSykmeldinger } from '../../js/actions/dineSykmeldinger_actions';
import { skalOppretteSoknadHentet } from '../../js/actions/sykmeldingMeta_actions';
import { hentArbeidsgiversSykmeldinger } from '../../js/actions/arbeidsgiversSykmeldinger_actions';

describe('dinSykmeldingSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest',
        };
    });

    describe('bekreftSykmelding', () => {
        const action = actions.bekreftSykmelding(
            '123',
            {
                arbeidssituasjon: 'arbeidstaker',
                feilaktigeOpplysninger: {
                    periode: true,
                },
                dekningsgrad: null,
                egenmeldingsperioder: null,
                harAnnetFravaer: false,
                harForsikring: false,
            },
        );
        const generator = bekreftSykmelding(action);

        it('Skal dispatche BEKREFTER_SYKMELDING', () => {
            const nextPut = put(actions.bekrefterSykmelding());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest bekrefte sykmeldingen', () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/123/actions/bekreft', {
                arbeidssituasjon: 'arbeidstaker',
                feilaktigeOpplysninger: {
                    periode: true,
                },
                harForsikring: null,
                dekningsgrad: null,
                harAnnetFravaer: null,
                egenmeldingsperioder: null,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sjekke om det skal opprettes søknad', () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/123/actions/skalOppretteSoknad', {
                egenmeldingsperioder: null,
                dekningsgrad: null,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette skalOppretteSoknad', () => {
            const nextPut = put(skalOppretteSoknadHentet('123', true));
            expect(generator.next(true).value).to.deep.equal(nextPut);
        });

        it('Skal dernest dispatche SET_ARBEIDSSITUASJON', () => {
            const nextPut = put(actions.setArbeidssituasjon('arbeidstaker', '123'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest dispatche SYKMELDING_BEKREFTET', () => {
            const nextPut = put(actions.sykmeldingBekreftet('123'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest dispatche HENT_DINE_SYKMELDINGER_FORESPURT', () => {
            const nextPut = put(hentDineSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest dispatche HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT', () => {
            const nextPut = put(hentArbeidsgiversSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('bekreftSykmelding for frilansere som er innenfor ventetid', () => {
        const action = actions.bekreftSykmelding(
            '123',
            {
                arbeidssituasjon: arbeidssituasjoner.FRILANSER,
                feilaktigeOpplysninger: null,
                dekningsgrad: '75',
                egenmeldingsperioder: [{
                    fom: new Date('2018-01-02'),
                    tom: new Date('2018-01-08'),
                }],
                harAnnetFravaer: true,
                harForsikring: true,
            });
        const generator = bekreftSykmelding(action);

        it('Skal dispatche BEKREFTER_SYKMELDING', () => {
            const nextPut = put(actions.bekrefterSykmelding());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest bekrefte sykmeldingen', () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/123/actions/bekreft', {
                arbeidssituasjon: arbeidssituasjoner.FRILANSER,
                feilaktigeOpplysninger: null,
                dekningsgrad: '75',
                egenmeldingsperioder: [
                    {
                        fom: new Date('2018-01-02'),
                        tom: new Date('2018-01-08'),
                    },
                ],
                harAnnetFravaer: true,
                harForsikring: true,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sjekke om det skulle ha vært opprettet søknad', () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/123/actions/skalOppretteSoknad', {
                egenmeldingsperioder: [{
                    fom: new Date('2018-01-02'),
                    tom: new Date('2018-01-08'),
                }],
                dekningsgrad: '75',
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest dispatche svar på sjekk om det skulle ha vært opprettet søknad', () => {
            const nextPut = put(skalOppretteSoknadHentet('123', true));
            expect(generator.next(true).value).to.deep.equal(nextPut);
        });

        it('Skal dernest dispatche SETT_ARBEIDSSITUASJON', () => {
            const nextPut = put(actions.setArbeidssituasjon(arbeidssituasjoner.FRILANSER, '123'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest dispatche SYKMELDING_BEKREFTET', () => {
            const nextPut = put(actions.sykmeldingBekreftet('123'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest dispatche HENT_DINE_SYKMELDINGER_FORESPURT', () => {
            const nextPut = put(hentDineSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest dispatche HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT', () => {
            const nextPut = put(hentArbeidsgiversSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('sendSykmeldingTilArbeidsgiver', () => {
        const action = actions.sendSykmeldingTilArbeidsgiver('minSykmeldingId', '5678', {
            sykmeldingsgrad: true,
        }, true);
        const generator = sendSykmeldingTilArbeidsgiver(action);

        it('Skal dispatche SENDER_SYKMELDING', () => {
            const nextPut = put(actions.senderSykmelding('minSykmeldingId'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende sykmeldingen', () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/minSykmeldingId/actions/send', {
                feilaktigeOpplysninger: {
                    sykmeldingsgrad: true,
                },
                orgnummer: '5678',
                beOmNyNaermesteLeder: true,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest dispatche SYKMELDING_SENDT', () => {
            const nextPut = put(actions.sykmeldingSendt('minSykmeldingId'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente dine sykmeldinger', () => {
            const nextPut = put(hentDineSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente arbeidsgivers sykmeldinger', () => {
            const nextPut = put(hentArbeidsgiversSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('avbrytSykmelding', () => {
        const action = actions.avbrytSykmelding('minAndreSykmeldingId', {
            periode: true,
        });
        const generator = avbrytSykmelding(action);

        it('Skal dispatche AVBRYTER_SYKMELDING', () => {
            const nextPut = put(actions.avbryterSykmelding());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest avbryte sykmeldingen', () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/minAndreSykmeldingId/actions/avbryt', {
                periode: true,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest dispatche SYKMELDING_AVBRUTT', () => {
            const nextPut = put(actions.sykmeldingAvbrutt('minAndreSykmeldingId'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente dine sykmeldinger', () => {
            const nextPut = put(hentDineSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente arbeidsgivers sykmeldinger', () => {
            const nextPut = put(hentArbeidsgiversSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });


    describe('gjenaapneSykmelding', () => {
        const action = actions.gjenaapneSykmelding('minAndreSykmeldingId', {
            periode: true,
        });
        const generator = gjenaapneSykmelding(action);

        it('Skal dispatche GJENAAPNER_SYKMELDING', () => {
            const nextPut = put(actions.gjenaapnerSykmelding());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest gjeaapne sykmeldingen', () => {
            const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/minAndreSykmeldingId/actions/gjenaapne');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest dispatche SYKMELDING_GJENAAPNET', () => {
            const nextPut = put(actions.sykmeldingGjenaapnet('minAndreSykmeldingId'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente dine sykmeldinger', () => {
            const nextPut = put(hentDineSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente arbeidsgivers sykmeldinger', () => {
            const nextPut = put(hentArbeidsgiversSykmeldinger());
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
