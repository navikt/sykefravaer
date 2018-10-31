import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { BETALER_ARBEIDSGIVER } from '../../../js/enums/tagtyper';
import { erHorisontal } from '../../../js/components/soknad-felles-sporsmal/RadioGruppe';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('RadioGruppe', () => {
    describe('erHorisontal', () => {
        it('Skal returnere false for BETALER_ARBEIDSGIVER', () => {
            expect(erHorisontal(BETALER_ARBEIDSGIVER)).to.equal(false);
        });

        it('Skal returnere true for HVOR_MYE_HAR_DU_JOBBET_0', () => {
            expect(erHorisontal('HVOR_MYE_HAR_DU_JOBBET_0')).to.equal(true);
        });
    });
});
