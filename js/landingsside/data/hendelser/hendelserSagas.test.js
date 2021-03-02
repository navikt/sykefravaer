import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '../../../digisyfoNpm';
import * as actions from './hendelserActions';
import { hentHendelser } from './hendelserSagas';

describe('hendelserSagas', () => {
    describe('hentHendelser', () => {
        const generator = hentHendelser();

        it('Skal dispatche HENTER_HENDELSER', () => {
            const nextPut = put(actions.henterHendelser());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente hendelser', () => {
            const nextCall = call(get, '/syforest/informasjon/hendelser');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest lagre hendelser i state', () => {
            const nextPut = put(actions.hendelserHentet([]));
            expect(generator.next([]).value).to.deep.equal(nextPut);
        });
    });
});
