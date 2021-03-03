import { expect } from 'chai';
import { put, call, select } from 'redux-saga/effects';
import { get } from '../gateway-api';
import { hentSykeforloep } from './sykeforloepSagas';
import * as actions from './sykeforloep_actions';
import getSykeforloep from '../../../test/mock/mockSykeforloep';
import { skalHenteSykeforloep } from './sykeforloepSelectors';

describe('sykeforloepSagas', () => {
    const action = actions.hentSykeforloep();
    const generator = hentSykeforloep(action);

    it('Skal sjekke om sykeforløp skal hentes', () => {
        const nextSelect = select(skalHenteSykeforloep);
        expect(generator.next().value).to.deep.equal(nextSelect);
    });

    it('Skal dispatche HENTER_SYKEFORLOEP', () => {
        const nextPut = put(actions.henterSykeforloep());
        expect(generator.next(true).value).to.deep.equal(nextPut);
    });

    it('Skal hente sykeforloep', () => {
        const nextCall = call(get, '/syforest/sykeforloep');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal deretter dispatche SYKEFORLOEP_HENTET', () => {
        const sykeforloep = [
            getSykeforloep(),
        ];
        const nextPut = put(actions.sykeforloepHentet(sykeforloep));
        expect(generator.next(sykeforloep).value).to.deep.equal(nextPut);
    });
});
