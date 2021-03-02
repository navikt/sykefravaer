import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import ledetekster from '../../../js/digisyfoNpm/reducers/ledetekster';
import * as actions from '../../../js/digisyfoNpm/actions/ledetekster_actions';

describe('ledetekster', () => {
    it('håndterer LEDETEKSTER_HENTET ', () => {
        const initialState = deepFreeze({});
        const action = actions.ledeteksterHentet({
            'nokkel.1': 'Verdi 1',
            'nokkel.2': 'Verdi 2',
            'nokkel.3': 'Verdi 3',
        });
        const nextState = ledetekster(initialState, action);
        expect(nextState).to.deep.equal({
            data: {
                'nokkel.1': 'Verdi 1',
                'nokkel.2': 'Verdi 2',
                'nokkel.3': 'Verdi 3',
            },
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
    });

    it('Håndterer HENTER_LEDETEKSTER ', () => {
        const initialState = deepFreeze({});
        const action = actions.henterLedetekster();
        const nextState = ledetekster(initialState, action);
        expect(nextState).to.deep.equal({
            data: {},
            henter: true,
            hentingFeilet: false,
            hentet: false,
        });
    });

    it('Håndterer HENT_LEDETEKSTER_FEILET ', () => {
        const initialState = deepFreeze({});
        const action = actions.hentLedeteksterFeilet();
        const nextState = ledetekster(initialState, action);
        expect(nextState).to.deep.equal({
            data: {},
            henter: false,
            hentingFeilet: true,
            hentet: true,
        });
    });
});
