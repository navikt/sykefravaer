import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import {
    oppdaterSoknader,
} from './soknaderSagas';
import { get } from '../gateway-api/index';
import * as actions from './soknaderActions';
import mockSoknader from '../../../test/mock/mockSoknadSelvstendig';

describe('soknaderSagas', () => {
    describe('Henting av søknader når det er togglet på', () => {
        const action = actions.hentSoknader();
        const generator = oppdaterSoknader(action);

        it('Skal dispatche HENTER_SOKNADER', () => {
            const nextPut = put(actions.henterSoknader());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal hente søknader', () => {
            const nextCall = call(get, 'https://syfoapi-q.nav.no/syfosoknad/api/soknader');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter dispatche SOKNADER_HENTET', () => {
            const nextPut = put(actions.soknaderHentet(mockSoknader));
            expect(generator.next(mockSoknader).value).to.deep.equal(nextPut);
        });
    });
});
