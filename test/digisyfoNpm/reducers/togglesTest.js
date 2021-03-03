import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import toggles from '../../../js/digisyfoNpm/reducers/toggles';
import * as actions from '../../../js/digisyfoNpm/actions/toggles_actions';

describe('toggles', () => {
    it('toggles TOGGLES_HENTET ', () => {
        const initialState = deepFreeze({});
        const action = actions.togglesHentet({
            'nokkel.1': 'Verdi 1',
            'nokkel.2': 'Verdi 2',
            'nokkel.3': 'Verdi 3',
        });
        const nextState = toggles(initialState, action);
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

    it('Håndterer HENTER_TOGGLES ', () => {
        const initialState = deepFreeze({});
        const action = actions.henterToggles();
        const nextState = toggles(initialState, action);
        expect(nextState).to.deep.equal({
            henter: true,
            hentingFeilet: false,
            hentet: false,
        });
    });

    it('Håndterer HENT_TOGGLES_FEILET ', () => {
        const initialState = deepFreeze({});
        const action = actions.hentTogglesFeilet();
        const nextState = toggles(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: true,
            hentet: true,
        });
    });
});
