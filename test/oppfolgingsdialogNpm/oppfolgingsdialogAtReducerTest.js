import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as oppfolgingsdialogAtActions from '../../js/oppfolgingsdialogNpm/oppfolgingsdialoger_actions';
import oppfolgingsdialoger from '../../js/oppfolgingsdialogNpm/oppfolgingsdialoger';

describe('oppfolgingsdialoger', () => {
    let initialState = deepFreeze({
        data: [],
        henter: false,
        hentet: false,
        hentingFeilet: false,
    });

    it('håndterer OPPFOLGINGSDIALOGER_HENTET', () => {
        const action = oppfolgingsdialogAtActions.oppfolgingsdialogerHentet([{ min: 'test' }]);
        const nextState = oppfolgingsdialoger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{ min: 'test' }],
            henter: false,
            hentet: true,
            hentingFeilet: false,
        });
    });

    it('håndterer HENTER_OPPFOLGINGSDIALOGER', () => {
        const action = oppfolgingsdialogAtActions.henterOppfolgingsdialoger();
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentet: false,
            hentingFeilet: false,
        });
    });

    it('håndterer HENT_OPPFOLGINGSDIALOGER_FEILET', () => {
        initialState = deepFreeze({
            data: [],
            henter: false,
            hentet: false,
            hentingFeilet: false,
        });

        const action = oppfolgingsdialogAtActions.hentOppfolgingsdialogerFeilet();
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentet: false,
            hentingFeilet: true,
        });
    });
});
