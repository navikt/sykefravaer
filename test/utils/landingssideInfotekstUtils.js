import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

import { visInfotekst } from '../../js/utils/landingssideInfotekstUtils';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('landingssideInfotekstUtils', () => {
    describe('visInfotekst', () => {
        it('skal returnere true dersom string inneholder minst en bokstav', () => {
            expect(visInfotekst('hello world')).to.equal(true);
        });
        it('skal returnere false for tom string', () => {
            expect(visInfotekst('')).to.equal(false);
        });
        it('Skal returnere false for string som inneholder kun whitespace', () => {
            expect(visInfotekst(' ')).to.equal(false);
        });
        it('Skal returenere false for "landingsside.infoboks.tekst [MANGLER LEDETEKST]"', () => {
            expect(visInfotekst('landingsside.infoboks.tekst [MANGLER LEDETEKST]')).to.equal(false);
        });
    });
});
