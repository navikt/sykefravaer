import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/arbeidsgiverperiodeberegning_actions';
import arbeidsgiverperiodeberegning from '../../js/reducers/arbeidsgiverperiodeberegning';

describe('arbeidsgiverperiodeberegning', () => {
    let state = {};

    it('Håndterer hentArbeidsgiverperiodeberegning()', () => {
        const action = actions.henterArbeidsgiverperiodeberegning();
        state = arbeidsgiverperiodeberegning(deepFreeze(state), action);
        expect(state).to.deep.equal({
            henter: true,
            hentingFeilet: false,
            data: null,
        });
    });

    it('Håndterer arbeidsgiverperiodeberegningHentet({})', () => {
        const action = actions.arbeidsgiverperiodeberegningHentet({ en: 'to' });
        state = arbeidsgiverperiodeberegning(deepFreeze(state), action);
        expect(state).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: { en: 'to' },
        });
    });

    it('Håndterer sjekkSkalViseForskutteringssporsmalFeilet', () => {
        const action = actions.arbeidsgiverperiodeberegningFeilet();
        state = arbeidsgiverperiodeberegning(deepFreeze(state), action);
        expect(state).to.deep.equal({
            henter: false,
            hentingFeilet: true,
            data: null,
        });
    });
});
