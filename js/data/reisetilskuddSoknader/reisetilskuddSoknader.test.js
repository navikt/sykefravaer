import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import reisetilskuddSoknader from './reisetilskuddSoknader';
import * as actions from './reisetilskuddSoknader_actions';
import mockReisetilskuddSoknader, { reisetilskuddSoknaderRespons } from '../../../test/mock/mockReisetilskuddSoknader';

describe('reisetilskuddSoknader', () => {
    let getStateMedDataHentet;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-03-15').getTime());
        getStateMedDataHentet = () => {
            const state = reisetilskuddSoknader();
            const action = actions.reisetilskuddSoknaderHentet(reisetilskuddSoknaderRespons);
            return reisetilskuddSoknader(deepFreeze(state), action);
        };
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henter', () => {
        it('Håndterer henter', () => {
            const action = actions.henterReisetilskuddSoknader();
            const initState = reisetilskuddSoknader();
            const state = reisetilskuddSoknader(deepFreeze(initState), action);
            expect(state.henter).to.equal(true);
        });

        it('Håndterer hentReisetilskuddSoknaderFeilet', () => {
            const action = actions.hentReisetilskuddSoknaderFeilet();
            const initState = reisetilskuddSoknader();
            const state = reisetilskuddSoknader(deepFreeze(initState), action);
            expect(state.hentingFeilet).to.equal(true);
            expect(state.henter).to.equal(false);
            expect(state.hentet).to.equal(true);
        });

        it('Håndterer reisetilskuddSoknaderHentet', () => {
            const state = getStateMedDataHentet();
            expect(state.hentingFeilet).to.equal(false);
            expect(state.henter).to.equal(false);
            expect(state.data).to.deep.equal(mockReisetilskuddSoknader);
        });
    });
});
