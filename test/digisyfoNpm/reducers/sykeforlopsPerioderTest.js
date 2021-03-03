import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as actions from '../../../js/digisyfoNpm/actions/sykeforlopsPerioder_actions';
import sykeforlopsPerioder from '../../../js/digisyfoNpm/reducers/sykeforlopsPerioder';

describe('sykeforlopsPerioder', () => {
    describe('henter', () => {
        const initialState = deepFreeze({
            henter: [],
            hentet: [],
            hentingFeilet: [],
            data: [],
        });

        it('håndterer HENTER_SYKEFORLOPSPERIODER', () => {
            const action = actions.henterSykeforlopsPerioder('fnr', 'virksomhetsnummer');
            const nextState = sykeforlopsPerioder(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [{ fnr: 'fnr', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
        });

        it('håndterer SYKEFORLOPSPERIODE_HENTET', () => {
            const state = deepFreeze({
                henter: [{ fnr: 'fnr', virksomhetsnummer: 'virksomhetsnummer' }],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
            const action = actions.sykeforlopsPerioderHentet(
                {
                    fom: '1.1.2017',
                    tom: '2.1.2017',
                    grad: 100,
                    aktivitet: 'Test aktivitet',
                },
                'fnr',
                'virksomhetsnummer',
            );
            const nextState = sykeforlopsPerioder(state, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [{ fnr: 'fnr', virksomhetsnummer: 'virksomhetsnummer' }],
                hentingFeilet: [],
                data: [{
                    periodeListe: {
                        fom: '1.1.2017',
                        tom: '2.1.2017',
                        grad: 100,
                        aktivitet: 'Test aktivitet',
                    },
                    fnr: 'fnr',
                    virksomhetsnummer: 'virksomhetsnummer',
                }],
            });
        });

        it('håndterer HENT_SYKEFORLOPSPERIODE_FEILET', () => {
            const action = actions.hentSykeforlopsPerioderFeilet('fnr', 'virksomhetsnummer');
            const nextState = sykeforlopsPerioder(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [],
                hentingFeilet: [{ fnr: 'fnr', virksomhetsnummer: 'virksomhetsnummer' }],
                data: [],
            });
        });
    });
});
