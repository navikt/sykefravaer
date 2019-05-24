import chai from 'chai';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import * as actions from './sykepengesoknader_actions';

const { HENT_SYKEPENGESOKNADER_FEILET, HENT_SYKEPENGESOKNADER_FORESPURT, HENTER_SYKEPENGESOKNADER, SYKEPENGESOKNADER_HENTET } = actions;

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('sykepengesoknader_actions', () => {
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
        it('Skal ha en henterSykepengesoknader()-funksjon som returnerer riktig action', () => {
            expect(actions.henterSykepengesoknader()).to.deep.equal({
                type: HENTER_SYKEPENGESOKNADER,
            });
        });

        it('Skal ha en sykepengesoknaderHentet()-funksjon som returnerer riktig action', () => {
            expect(actions.sykepengesoknaderHentet([{ id: 12345 }])).to.deep.equal({
                type: SYKEPENGESOKNADER_HENTET,
                sykepengesoknader: [{
                    id: 12345,
                }],
            });
        });

        it('Skal ha en hentSykepengesoknaderFeilet()-funksjon som returnerer riktig action', () => {
            expect(actions.hentSykepengesoknaderFeilet()).to.deep.equal({
                type: HENT_SYKEPENGESOKNADER_FEILET,
            });
        });

        it('Skal ha en hentSykepengesoknader()-funksjon som returnerer riktig action', () => {
            expect(actions.hentSykepengesoknader()).to.deep.equal({
                type: HENT_SYKEPENGESOKNADER_FORESPURT,
            });
        });
    });
});
