import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
    HENT_VEDLIKEHOLD_FEILET,
    HENT_VEDLIKEHOLD_FORESPURT,
    HENTER_VEDLIKEHOLD,
    henterVedlikehold, hentVedlikehold,
    hentVedlikeholdFeilet,
    VEDLIKEHOLD_HENTET,
    vedlikeholdHentet,
} from './vedlikehold_actions';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('vedlikehold_actions', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest',
        };
    });

    describe('henter', () => {
        it('Skal ha en henterVedlikehold()-funksjon som returnerer riktig action', () => {
            expect(henterVedlikehold()).to.deep.equal({
                type: HENTER_VEDLIKEHOLD,
            });
        });

        it('Skal ha en vedlikeholdHentet()-funksjon som returnerer riktig action', () => {
            expect(vedlikeholdHentet(true)).to.deep.equal({
                type: VEDLIKEHOLD_HENTET,
                data: {
                    vedlikehold: true,
                },
            });
        });

        it('Skal ha en hentVedlikeholdFeilet()-funksjon som returnerer riktig action', () => {
            expect(hentVedlikeholdFeilet()).to.deep.equal({
                type: HENT_VEDLIKEHOLD_FEILET,
            });
        });

        it('Skal ha en hentVedlikehold()-funksjon som returnerer riktig action', () => {
            expect(hentVedlikehold()).to.deep.equal({
                type: HENT_VEDLIKEHOLD_FORESPURT,
            });
        });
    });
});
