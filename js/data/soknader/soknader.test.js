import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import soknader from './soknader';
import * as actions from './soknaderActions';
import mockSoknader, { soknadrespons } from '../../../test/mock/mockSoknadSelvstendig';

describe('soknader', () => {
    let getStateMedDataHentet;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-03-15').getTime());
        getStateMedDataHentet = () => {
            const state = soknader();
            const action = actions.soknaderHentet(soknadrespons);
            return soknader(deepFreeze(state), action);
        };
    });

    afterEach(() => {
        clock.restore();
    });

    it('Håndterer henter', () => {
        const action = actions.henterSoknader();
        const initState = soknader();
        const state = soknader(deepFreeze(initState), action);
        expect(state.henter).to.equal(true);
    });

    it('Håndterer hentSoknaderFeilet', () => {
        const action = actions.hentSoknaderFeilet();
        const initState = soknader();
        const state = soknader(deepFreeze(initState), action);
        expect(state.hentingFeilet).to.equal(true);
        expect(state.henter).to.equal(false);
        expect(state.hentet).to.equal(true);
    });

    it('Håndterer soknaderHentet', () => {
        const state = getStateMedDataHentet();
        expect(state.hentingFeilet).to.equal(false);
        expect(state.henter).to.equal(false);
        expect(state.data).to.deep.equal(mockSoknader);
    });
});
