import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import soknader from '../../js/reducers/soknader';
import * as actions from '../../js/actions/soknader_actions';
import mockSoknader, { soknadrespons } from '../mockSoknader';

describe('soknader', () => {
    it('Har en default state', () => {
        const state = soknader();
        expect(state).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: false,
            hentet: false,
        });
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
        expect(state.hentet).to.equal(false);
    });

    it('Håndterer soknaderHentet', () => {
        const action = actions.soknaderHentet(soknadrespons);
        const initState = soknader();
        const state = soknader(deepFreeze(initState), action);
        expect(state.hentingFeilet).to.equal(false);
        expect(state.henter).to.equal(false);
        expect(state.data).to.deep.equal(mockSoknader);
    });
});
