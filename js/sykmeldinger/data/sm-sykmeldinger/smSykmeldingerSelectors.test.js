import smSykmeldinger from './smSykmeldinger';
import { skalHenteSmSykmeldingerSelector } from './smSykmeldingerSelectors';
import expect from '../../../../test/expect';
import { henterSmSykmeldinger, smSykmeldingerHentet } from './smSykmeldingerActions';

describe('smSykmeldingerSelectors', () => {
    describe('skalHenteSmSykmeldingerSelector', () => {
        it('Skal returnere true når sykmeldinger ikke er hentet', () => {
            const state = {
                smSykmeldinger: smSykmeldinger(),
            };
            expect(skalHenteSmSykmeldingerSelector(state)).to.equal(true);
        });

        it('Skal returnere false når sykmeldinger er hentet', () => {
            const state = {
                smSykmeldinger: smSykmeldinger(smSykmeldinger(), smSykmeldingerHentet()),
            };
            expect(skalHenteSmSykmeldingerSelector(state)).to.equal(false);
        });

        it('Skal returnere false når sykmeldinger hentes', () => {
            const state = {
                smSykmeldinger: smSykmeldinger(smSykmeldinger(), henterSmSykmeldinger()),
            };
            expect(skalHenteSmSykmeldingerSelector(state)).to.equal(false);
        });
    });
});
