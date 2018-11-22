import { expect } from 'chai';
import { get } from 'digisyfo-npm';
import { put, call, select } from 'redux-saga/effects';
import { hentSykeforloep } from '../../js/sagas/sykeforloepSagas';
import * as actions from '../../js/actions/sykeforloep_actions';
import getSykeforloep from '../mock/mockSykeforloep';
import { skalHenteSykeforloep } from '../../js/selectors/sykeforloepSelectors';

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
