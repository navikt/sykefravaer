import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import { arbeidssituasjoner, post } from '../../../digisyfoNpm';
import {
    avbrytSykmelding,
    bekreftSykmelding,
    gjenaapneSykmelding,
    sendSykmeldingTilArbeidsgiver,
} from './dinSykmeldingSagas';
import * as actions from './dinSykmeldingActions';
import { skalOppretteSoknadHentet } from '../sykmelding-meta/sykmeldingMetaActions';

describe('dinSykmeldingSagas', () => {
    describe('bekreftSykmelding', () => {
        const action = actions.bekreftSykmelding(
            '123',
            {
                arbeidssituasjon: 'arbeidstaker',
                feilaktigeOpplysninger: {
                    periode: true,
                },
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
            const nextCall = call(post, 'https://sykmelding-gateway.dev.nav.no/sykmeldinger-backend/api/v1/sykmeldinger/123/bekreft', {
                sporsmalOgSvarListe: [{
                    tekst: 'Jeg er sykmeldt fra',
                    shortName: 'ARBEIDSSITUASJON',
                    svartype: 'ARBEIDSSITUASJON',
                    svar: 'arbeidstaker',
                }],
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sjekke om det skal opprettes søknad', () => {
            const nextCall = call(post, 'https://flex-gateway.dev.nav.no/syfosoknad/api/sykmeldinger/123/actions/skalOppretteSoknad', {
                egenmeldingsperioder: null,
                harForsikring: false,
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
    });

    describe('bekreftSykmelding for frilansere som er innenfor ventetid', () => {
        const action = actions.bekreftSykmelding(
            '123',
            {
                arbeidssituasjon: arbeidssituasjoner.FRILANSER,
                feilaktigeOpplysninger: null,
                egenmeldingsperioder: [{
                    fom: new Date('2018-01-02'),
                    tom: new Date('2018-01-08'),
                }],
                harAnnetFravaer: true,
                harForsikring: true,
            },
        );
        const generator = bekreftSykmelding(action);

        it('Skal dispatche BEKREFTER_SYKMELDING', () => {
            const nextPut = put(actions.bekrefterSykmelding());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest bekrefte sykmeldingen', () => {
            const nextCall = call(post, 'https://sykmelding-gateway.dev.nav.no/sykmeldinger-backend/api/v1/sykmeldinger/123/bekreft', {
                sporsmalOgSvarListe: [{
                    tekst: 'Jeg er sykmeldt fra',
                    shortName: 'ARBEIDSSITUASJON',
                    svartype: 'ARBEIDSSITUASJON',
                    svar: arbeidssituasjoner.FRILANSER,
                },
                {
                    tekst: 'Har du forsikring som gjelder de første 16 dagene av sykefraværet?',
                    shortName: 'FORSIKRING',
                    svartype: 'JA_NEI',
                    svar: 'JA',
                },
                {
                    tekst: 'Brukte du egenmelding eller noen annen sykmelding før datoen denne sykmeldingen gjelder fra?',
                    shortName: 'FRAVAER',
                    svartype: 'JA_NEI',
                    svar: 'JA',
                },
                {
                    tekst: 'Hvilke dager var du borte fra jobb før datoen sykmeldingen gjelder fra?',
                    shortName: 'PERIODE',
                    svartype: 'PERIODER',
                    svar: '[{"fom":"2018-01-02","tom":"2018-01-08"}]',
                }],
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sjekke om det skulle ha vært opprettet søknad', () => {
            const nextCall = call(post, 'https://flex-gateway.dev.nav.no/syfosoknad/api/sykmeldinger/123/actions/skalOppretteSoknad', {
                egenmeldingsperioder: [{
                    fom: new Date('2018-01-02'),
                    tom: new Date('2018-01-08'),
                }],
                harForsikring: true,
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
            const nextCall = call(post, 'https://sykmelding-gateway.dev.nav.no/sykmeldinger-backend/api/v1/sykmeldinger/minSykmeldingId/send', {
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
            const nextCall = call(post, 'https://sykmelding-gateway.dev.nav.no/sykmeldinger-backend/api/v1/sykmeldinger/minAndreSykmeldingId/avbryt');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest dispatche SYKMELDING_AVBRUTT', () => {
            const nextPut = put(actions.sykmeldingAvbrutt('minAndreSykmeldingId'));
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

        it('Skal dernest gjenaapne sykmeldingen', () => {
            const nextCall = call(post, 'https://sykmelding-gateway.dev.nav.no/sykmeldinger-backend/api/v1/sykmeldinger/minAndreSykmeldingId/gjenapne');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest dispatche SYKMELDING_GJENAAPNET', () => {
            const nextPut = put(actions.sykmeldingGjenaapnet('minAndreSykmeldingId'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
