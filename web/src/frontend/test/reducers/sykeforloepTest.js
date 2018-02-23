import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as actions from '../../js/actions/sykeforloep_actions';
import { BRUKER_ER_UTLOGGET } from '../../js/actions/actiontyper';
import sykeforloep, { hentStartdatoFraSykeforloep } from '../../js/reducers/sykeforloep';
import getSykeforloep from '../mockSykeforloep';

describe('sykeforloep', () => {
    let state;

    describe('hentStartdatoFraSykeforloep', () => {
        it('skal returnere null, om det ikke er sykeforloep', () => {
            expect(hentStartdatoFraSykeforloep([])).to.equal(null);
        });

        it('skal returnere eldste dato, om det er sykeforloep', () => {
            const sykeforloepNyest = getSykeforloep({
                oppfoelgingsdato: '2018-01-05',
            });
            const sykeforloepEldst = getSykeforloep({
                oppfoelgingsdato: '2018-01-01',
            });
            expect(hentStartdatoFraSykeforloep([sykeforloepNyest, sykeforloepEldst]).getTime()).to.equal(new Date(sykeforloepEldst.oppfoelgingsdato).getTime());
        });
    });

    it('Har en initiell state', () => {
        state = sykeforloep();
        expect(state).to.deep.equal({
            hentet: false,
            hentingFeilet: false,
            henter: false,
            startdato: null,
            data: [],
        });
    });

    it('Håndterer HENTER_SYKEFORLOEP', () => {
        const action = actions.henterSykeforloep();
        const nextState = sykeforloep(state, action);
        expect(nextState).to.deep.equal({
            henter: true,
            hentet: false,
            hentingFeilet: false,
            startdato: null,
            data: [],
        });
    });

    it('Håndterer SYKEFORLOEP_HENTET', () => {
        const sykeforloepNyest = getSykeforloep({
            oppfoelgingsdato: '2018-01-05',
        });
        const sykeforloepEldst = getSykeforloep({
            oppfoelgingsdato: '2018-01-01',
        });
        const data = [sykeforloepNyest, sykeforloepEldst];
        const action = actions.sykeforloepHentet(data);
        const nextState = sykeforloep(state, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentet: true,
            hentingFeilet: false,
            startdato: new Date(sykeforloepEldst.oppfoelgingsdato),
            data,
        });
    });

    it('Håndterer HENT_SYKEFORLOEP_FEILET', () => {
        const action = actions.hentSykeforloepFeilet();
        const nextState = sykeforloep(state, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentet: false,
            hentingFeilet: true,
            startdato: null,
            data: [],
        });
    });

    it('Håndterer BRUKER_ER_UTLOGGET', () => {
        const initialState = deepFreeze({
            henter: false,
            hentet: true,
            hentingFeilet: false,
            data: [],
        });
        const action = {
            type: BRUKER_ER_UTLOGGET,
        };
        const nextState = sykeforloep(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentet: true,
            hentingFeilet: false,
            data: [],
        });
    });
});
