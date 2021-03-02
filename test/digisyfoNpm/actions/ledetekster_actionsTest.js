import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../../js/digisyfoNpm/actions/ledetekster_actions';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('ledetekster_actions', () => {
    it('Should have a henterLedetekster action that returns a proper function', () => {
        expect(actions.henterLedetekster()).to.deep.equal({
            type: 'HENTER_LEDETEKSTER',
        });
    });

    it('Should have a ledeteksterHentet action that returns a proper function', () => {
        expect(actions.ledeteksterHentet({ tekst: 'Min sykepengesoknadoppsummeringledetekst' })).to.deep.equal({
            type: 'LEDETEKSTER_HENTET',
            ledetekster: {
                tekst: 'Min sykepengesoknadoppsummeringledetekst',
            },
        });
    });

    it('Should have a hentLedeteksterFeilet action that returns a proper function', () => {
        expect(actions.hentLedeteksterFeilet()).to.deep.equal({
            type: 'HENT_LEDETEKSTER_FEILET',
        });
    });

    it('Should have a hentLedetekster funksjon som returnerer riktig action', () => {
        expect(actions.hentLedetekster()).to.deep.equal({
            type: 'HENT_LEDETEKSTER_FORESPURT',
        });
    });
});
