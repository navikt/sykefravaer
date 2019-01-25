import { expect } from 'chai';
import { get } from '@navikt/digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import * as actions from '../../js/actions/hendelser_actions';
import { hentHendelser } from '../../js/sagas/hendelserSagas';

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
