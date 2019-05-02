import sinon from 'sinon';
import smSykmeldinger from './smSykmeldinger';
import { bekrefterLestSmSykmelding, smSykmeldingBekreftetLest, smSykmeldingerHentet } from './smSykmeldingerActions';
import expect from '../../../../test/expect';
import mockSmSykmelding from '../../../../test/mock/mockSmSykmelding';
import { smSykmeldingSelector } from './smSykmeldingerSelectors';

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

    it('Skal sette bekreftetDato når sykmelding er bekreftet lest', () => {
        const now = new Date('2019-04-29');
        const clock = sinon.useFakeTimers(now);
        const smSykmelding = mockSmSykmelding();
        const state = smSykmeldinger(smSykmeldinger(), smSykmeldingerHentet([smSykmelding]));
        const action = smSykmeldingBekreftetLest(smSykmelding);
        const nextState = smSykmeldinger(state, action);
        const nySmSykmelding = smSykmeldingSelector({ smSykmeldinger: nextState }, smSykmelding.id);
        expect(nySmSykmelding.bekreftetDato).to.deep.equal(now);
        expect(nextState.visKvittering).to.equal(true);
        clock.restore();
    });
});
