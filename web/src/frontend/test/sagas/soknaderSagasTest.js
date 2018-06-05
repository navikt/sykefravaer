import { expect } from 'chai';
import { get } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import { hentSoknader } from '../../js/sagas/soknaderSagas';
import * as actions from '../../js/actions/soknader_actions';
import mockSoknader from '../mockSoknader';

describe('soknaderSagas', () => {
    const action = actions.hentSoknader();
    const generator = hentSoknader(action);

    it('Skal dispatche HENTER_SOKNADXER', () => {
        const nextPut = put(actions.henterSoknader());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal hente søknader', () => {
        const nextCall = call(get, '/syfosoknad/soknader');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal deretter dispatche SOKNADER_HENTET', () => {
        const nextPut = put(actions.soknaderHentet(mockSoknader));
        expect(generator.next(mockSoknader).value).to.deep.equal(nextPut);
    });
});
