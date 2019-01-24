import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import dineSykmeldinger from '../../js/reducers/dineSykmeldinger';
import { selectSkalHenteDineSykmeldinger } from '../../js/selectors/dineSykmeldingerSelectors';
import { hentDineSykmeldingerFeilet, henterDineSykmeldinger, setDineSykmeldinger } from '../../js/actions/dineSykmeldinger_actions';

describe('dineSykmeldingerSelectors', () => {
    describe('selectSkalHenteDineSykmeldinger', () => {
        it('Skal returnere true hvis sykmeldinger ikke er hentet', () => {
            const state = {
                dineSykmeldinger: dineSykmeldinger(),
            };
            expect(selectSkalHenteDineSykmeldinger(deepFreeze(state))).to.equal(true);
        });

        it('Skal returnere false hvis sykmeldinger hentes', () => {
            const state = {
                dineSykmeldinger: dineSykmeldinger(dineSykmeldinger(), henterDineSykmeldinger()),
            };
            expect(selectSkalHenteDineSykmeldinger(deepFreeze(state))).to.equal(false);
        });

        it('Skal returnere false hvis sykmeldinger er hentet', () => {
            const state = {
                dineSykmeldinger: dineSykmeldinger(dineSykmeldinger(), setDineSykmeldinger([])),
            };
            expect(selectSkalHenteDineSykmeldinger(deepFreeze(state))).to.equal(false);
        });

        it('Skal returnere false hvis sykmeldinger har feilet', () => {
            const state = {
                dineSykmeldinger: dineSykmeldinger(dineSykmeldinger(), hentDineSykmeldingerFeilet()),
            };
            expect(selectSkalHenteDineSykmeldinger(deepFreeze(state))).to.equal(false);
        });
    });
});
