import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import vedtak from './vedtak';
import * as actions from './vedtak_actions';
import mockVedtak, { vedtakRespons } from '../../../test/mock/mockVedtak';

describe('vedtak', () => {
    let getStateMedDataHentet;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-03-15').getTime());
        getStateMedDataHentet = () => {
            const state = vedtak();
            const action = actions.alleVedtakHentet(vedtakRespons);
            return vedtak(deepFreeze(state), action);
        };
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henter', () => {
        it('Håndterer henter', () => {
            const action = actions.henterVedtak();
            const initState = vedtak();
            const state = vedtak(deepFreeze(initState), action);
            expect(state.henter).to.equal(true);
        });

        it('Håndterer hentVedtakFeilet', () => {
            const action = actions.hentVedtakFeilet();
            const initState = vedtak();
            const state = vedtak(deepFreeze(initState), action);
            expect(state.hentingFeilet).to.equal(true);
            expect(state.henter).to.equal(false);
            expect(state.hentet).to.equal(true);
        });

        it('Håndterer alleVedtakHentet', () => {
            const state = getStateMedDataHentet();
            expect(state.hentingFeilet).to.equal(false);
            expect(state.henter).to.equal(false);
            expect(state.data).to.deep.equal(mockVedtak);
        });
    });
});
