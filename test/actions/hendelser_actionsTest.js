import { expect } from 'chai';
import sinon from 'sinon';
import * as actions from '../../js/actions/hendelser_actions';
import * as actiontyper from '../../js/actions/actiontyper';

describe('hendelser', () => {
    let hendelse;
    let clock;

    beforeEach(() => {
        hendelse = {
            type: 'MIN_TYPE',
        };
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    it('Har en hentHendelser()-funksjon', () => {
        const res = actions.hentHendelser();
        expect(res).to.deep.equal({
            type: actiontyper.HENT_HENDELSER_FORESPURT,
        });
    });

    it('Har en hendelserHentet()-funksjon', () => {
        const hendelser = [hendelse, hendelse];
        expect(actions.hendelserHentet(hendelser)).to.deep.equal({
            type: actiontyper.HENDELSER_HENTET,
            data: hendelser,
        });
    });

    it('Har en henterHendelser()-funksjon', () => {
        expect(actions.henterHendelser()).to.deep.equal({
            type: actiontyper.HENTER_HENDELSER,
        });
    });

    it('Har en hentHendelserFeilet()-funksjon', () => {
        expect(actions.hentHendelserFeilet()).to.deep.equal({
            type: actiontyper.HENT_HENDELSER_FEILET,
        });
    });
});
