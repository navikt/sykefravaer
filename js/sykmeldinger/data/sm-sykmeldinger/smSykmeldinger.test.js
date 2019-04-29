import smSykmeldinger from './smSykmeldinger';
import { bekrefterLestSmSykmelding, smSykmeldingBekreftetLest } from './smSykmeldingerActions';
import expect from '../../../../test/expect';

describe('smSykmeldinger', () => {
    it('Skal håndtere bekrefterLestSmSykmelding()', () => {
        const state = smSykmeldinger();
        const action = bekrefterLestSmSykmelding();
        const nextState = smSykmeldinger(state, action);
        expect(nextState.bekrefter).to.equal(true);
    });

    it('Skal håndtere smSykmeldingBekreftetLest()', () => {
        const state = smSykmeldinger();
        const action = smSykmeldingBekreftetLest();
        const nextState = smSykmeldinger(state, action);
        expect(nextState.bekrefter).to.equal(false);
    });
});
