import { expect } from 'chai';
import { get } from '@navikt/digisyfo-npm';
import { call, put, select } from 'redux-saga/effects';
import { oppdaterDineSykmeldinger } from './dineSykmeldingerSagas';
import { HENTER_DINE_SYKMELDINGER, SET_DINE_SYKMELDINGER } from './dineSykmeldingerActions';
import { toggleSykmeldingerBackend, unleashtogglesHentetSelector } from '../../../data/unleash-toggles/unleashTogglesSelectors';

describe('dineSykmeldingerSagas', () => {
    describe('Skal hente sykmeldinger fra sykmeldinger-backend', () => { 
        const generator = oppdaterDineSykmeldinger();

        it('Skal sjekke toggles', () => {
            const togglesHentetSelect = select(unleashtogglesHentetSelector);
            const toggle = select(toggleSykmeldingerBackend);
            expect(generator.next().value).to.deep.equal(togglesHentetSelect);
            expect(generator.next(true).value).to.deep.equal(toggle);
        });

        it('Skal dispatche HENTER_DINE_SYKMELDINGER', () => {
            const nextPut = put({ type: HENTER_DINE_SYKMELDINGER });
            expect(generator.next(true).value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente dine sykmeldinger', () => {
            const nextCall = call(get, 'https://sykmeldinger-backend-proxy.dev.nav.no/api/v1/syforest/sykmeldinger');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette dine sykmeldinger', () => {
            const nextPut = put({
                type: SET_DINE_SYKMELDINGER,
                sykmeldinger: [{
                    id: 1,
                    diagnose: 'Alt vel',
                }],
            });
            expect(generator.next([{
                id: 1,
                diagnose: 'Alt vel',
            }]).value).to.deep.equal(nextPut);
        });
    });

    describe('Skal hente sykmeldinger fra syforest', () => {
        const generator = oppdaterDineSykmeldinger();

        it('Skal sjekke toggles', () => {
            const togglesHentetSelect = select(unleashtogglesHentetSelector);
            const toggle = select(toggleSykmeldingerBackend);
            expect(generator.next().value).to.deep.equal(togglesHentetSelect);
            expect(generator.next(true).value).to.deep.equal(toggle);
        });

        it('Skal dispatche HENTER_DINE_SYKMELDINGER', () => {
            const nextPut = put({ type: HENTER_DINE_SYKMELDINGER });
            expect(generator.next(false).value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente dine sykmeldinger', () => {
            const nextCall = call(get, '/syforest/sykmeldinger');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette dine sykmeldinger', () => {
            const nextPut = put({
                type: SET_DINE_SYKMELDINGER,
                sykmeldinger: [{
                    id: 1,
                    diagnose: 'Alt vel',
                }],
            });
            expect(generator.next([{
                id: 1,
                diagnose: 'Alt vel',
            }]).value).to.deep.equal(nextPut);
        });
    });

    describe('Henter ikke sykmeldinger hvis toggles ikke er hentet', () => {
        const generator = oppdaterDineSykmeldinger();

        it('Skal sjekke toggles', () => {
            const togglesHentetSelect = select(unleashtogglesHentetSelector);
            const toggle = select(toggleSykmeldingerBackend);
            expect(generator.next().value).to.deep.equal(togglesHentetSelect);
            expect(generator.next().value).to.deep.equal(toggle);
        });

        it('Generator er ferdig', () => {
            expect(generator.next().done).to.deep.equal(true);
        });
    });
});
