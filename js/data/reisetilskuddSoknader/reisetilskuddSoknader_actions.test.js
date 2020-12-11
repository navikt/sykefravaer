import chai from 'chai';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import * as actions from './reisetilskuddSoknader_actions';

const {
    HENT_VEDTAK_FEILET, HENT_VEDTAK_FORESPURT, HENTER_VEDTAK, VEDTAK_HENTET,
} = actions;

chai.use(chaiEnzyme());
const { expect } = chai;

describe('vedtak_actions', () => {
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
        it('Skal ha en henterVedtak()-funksjon som returnerer riktig action', () => {
            expect(actions.henterVedtak()).to.deep.equal({
                type: HENTER_VEDTAK,
            });
        });

        it('Skal ha en alleVedtakHentet()-funksjon som returnerer riktig action', () => {
            expect(actions.alleVedtakHentet([{ id: 12345 }])).to.deep.equal({
                type: VEDTAK_HENTET,
                vedtak: [{
                    id: 12345,
                }],
            });
        });

        it('Skal ha en hentVedtakFeilet()-funksjon som returnerer riktig action', () => {
            expect(actions.hentVedtakFeilet()).to.deep.equal({
                type: HENT_VEDTAK_FEILET,
            });
        });

        it('Skal ha en hentAlleVedtak()-funksjon som returnerer riktig action', () => {
            expect(actions.hentAlleVedtak()).to.deep.equal({
                type: HENT_VEDTAK_FORESPURT,
            });
        });
    });
});
