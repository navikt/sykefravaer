import { expect } from 'chai';
import { get } from '@navikt/digisyfo-npm';
import { call, put } from 'redux-saga/effects';
import { oppdaterDineSykmeldinger } from './dineSykmeldingerSagas';
import { HENTER_DINE_SYKMELDINGER, SET_DINE_SYKMELDINGER } from './dineSykmeldingerActions';

describe('dineSykmeldingerSagas', () => {
    const generator = oppdaterDineSykmeldinger();

    it('Skal dispatche HENTER_DINE_SYKMELDINGER', () => {
        const nextPut = put({ type: HENTER_DINE_SYKMELDINGER });
        expect(generator.next().value).to.deep.equal(nextPut);
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
