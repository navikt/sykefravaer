import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { lagHtml } from '../../../../js/digisyfoNpm/components/tidslinje/TidslinjeBudskap';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('TidslinjeBudskap', () => {
    it('Skal vise bilde dersom det finnes bilde', () => {
        const html = lagHtml('Olsen', 'Olsen.jpg');
        expect(html).to.deep.equal({
            __html: '<div class="side-innhold tidslinjeBoble__budskap"><img class="js-img" alt="" src="Olsen.jpg" /> Olsen</div>',
        });
    });

    it('Skal vise alt-tekst dersom det finnes bilde og alt-tekst', () => {
        const html = lagHtml('Olsen', 'Olsen.jpg', 'Mr. Olsen');
        expect(html).to.deep.equal({
            __html: '<div class="side-innhold tidslinjeBoble__budskap"><img class="js-img" alt="Mr. Olsen" src="Olsen.jpg" /> Olsen</div>',
        });
    });

    it('Skal ikke vise bilde dersom det ikke finnes bilde', () => {
        const html = lagHtml('Hansen');
        expect(html).to.deep.equal({
            __html: '<div class="side-innhold tidslinjeBoble__budskap">Hansen</div>',
        });
    });
});
