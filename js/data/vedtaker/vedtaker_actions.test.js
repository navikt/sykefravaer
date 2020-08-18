import chai from 'chai';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import * as actions from './vedtaker_actions';

const {
    HENT_VEDTAKER_FEILET, HENT_VEDTAKER_FORESPURT, HENTER_VEDTAKER, VEDTAKER_HENTET,
} = actions;

chai.use(chaiEnzyme());
const { expect } = chai;

describe('vedtaker_actions', () => {
    let clock;

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest',
        };
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henter', () => {
        it('Skal ha en henterVedtaker()-funksjon som returnerer riktig action', () => {
            expect(actions.henterVedtaker()).to.deep.equal({
                type: HENTER_VEDTAKER,
            });
        });

        it('Skal ha en vedtakerHentet()-funksjon som returnerer riktig action', () => {
            expect(actions.vedtakerHentet([{ id: 12345 }])).to.deep.equal({
                type: VEDTAKER_HENTET,
                vedtaker: [{
                    id: 12345,
                }],
            });
        });

        it('Skal ha en hentVedtakerFeilet()-funksjon som returnerer riktig action', () => {
            expect(actions.hentVedtakerFeilet()).to.deep.equal({
                type: HENT_VEDTAKER_FEILET,
            });
        });

        it('Skal ha en hentVedtaker()-funksjon som returnerer riktig action', () => {
            expect(actions.hentVedtaker()).to.deep.equal({
                type: HENT_VEDTAKER_FORESPURT,
            });
        });
    });
});
