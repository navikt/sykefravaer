import { expect } from 'chai';
import { get } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import { hentSykeforloep } from '../../js/sagas/sykeforloepSagas';
import * as actions from '../../js/actions/sykeforloep_actions';
import getSykeforloep from '../mockSykeforloep';

describe('sykeforloepSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: '/syforest',
        };
    });

    const action = actions.hentSykeforloep();
    const generator = hentSykeforloep(action);

    it('Skal dispatche HENTER_SYKEFORLOEP', () => {
        const nextPut = put(actions.henterSykeforloep());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal hente sykeforloep', () => {
        const nextCall = call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep`);
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
