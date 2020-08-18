import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import vedtaker from './vedtaker';
import * as actions from './vedtaker_actions';
import mockVedtaker, { vedtakRespons } from '../../../test/mock/mockVedtaker';

describe('vedtaker', () => {
    let getStateMedDataHentet;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-03-15').getTime());
        getStateMedDataHentet = () => {
            const state = vedtaker();
            const action = actions.vedtakerHentet(vedtakRespons);
            return vedtaker(deepFreeze(state), action);
        };
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henter', () => {
        it('Håndterer henter', () => {
            const action = actions.henterVedtaker();
            const initState = vedtaker();
            const state = vedtaker(deepFreeze(initState), action);
            expect(state.henter).to.equal(true);
        });

        it('Håndterer hentVedtakerFeilet', () => {
            const action = actions.hentVedtakerFeilet();
            const initState = vedtaker();
            const state = vedtaker(deepFreeze(initState), action);
            expect(state.hentingFeilet).to.equal(true);
            expect(state.henter).to.equal(false);
            expect(state.hentet).to.equal(true);
        });

        it('Håndterer vedtakerHentet', () => {
            const state = getStateMedDataHentet();
            expect(state.hentingFeilet).to.equal(false);
            expect(state.henter).to.equal(false);
            expect(state.data).to.deep.equal(mockVedtaker);
        });
    });
});
