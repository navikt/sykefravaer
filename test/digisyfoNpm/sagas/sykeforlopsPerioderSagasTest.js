import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '../../../js/digisyfoNpm';
import * as actiontyper from '../../../js/digisyfoNpm/actions/actiontyper';
import { hentSykeforlopsPerioderSaga } from '../../../js/digisyfoNpm/sagas/sykeforlopsPerioderSagas';

describe('sykeforlopsPerioderSagas', () => {
    describe('hentSykeforlopsPerioder', () => {
        const generator = hentSykeforlopsPerioderSaga({
            fnr: '123',
            virksomhetsnummer: '456',
        });

        it('Skal dispatche HENTER_SYKEFORLOPSPERIODER', () => {
            const nextPut = put({
                fnr: '123',
                virksomhetsnummer: '456',
                type: actiontyper.HENTER_SYKEFORLOPSPERIODER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const nextCall = call(get, '/syforest/sykeforloep/siste/perioder?fnr=123&orgnr=456');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette SYKEFORLOPSPERIODER_HENTET', () => {
            const nextPut = put({
                type: actiontyper.SYKEFORLOPSPERIODER_HENTET,
                periodeListe: undefined,
                fnr: '123',
                virksomhetsnummer: '456',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
