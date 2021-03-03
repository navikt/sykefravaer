import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../../js/digisyfoNpm/actions/toggles_actions';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('toggles_actions', () => {
    it('Should have a henterToggles action that returns a proper function', () => {
        expect(actions.henterToggles()).to.deep.equal({
            type: 'HENTER_TOGGLES',
        });
    });

    it('Should have a togglesHentet action that returns a proper function', () => {
        expect(actions.togglesHentet({ toggle1: 'true' })).to.deep.equal({
            type: 'HENTET_TOGGLES',
            data: {
                toggle1: 'true',
            },
        });
    });

    it('Should have a hentTogglesFeilet action that returns a proper function', () => {
        expect(actions.hentTogglesFeilet()).to.deep.equal({
            type: 'HENT_TOGGLES_FEILET',
        });
    });

    it('Should have a hentToggles funksjon som returnerer riktig action', () => {
        expect(actions.hentToggles()).to.deep.equal({
            type: 'HENT_TOGGLES_FORESPURT',
        });
    });
});
