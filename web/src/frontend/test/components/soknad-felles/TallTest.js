import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { genererValiderTall } from '../../../js/components/soknad-felles/Tall';
import { genererParseForEnkeltverdi } from '../../../js/components/soknad-felles/fieldUtils';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Tall', () => {
    let valider;
    let parse;

    beforeEach(() => {
        parse = genererParseForEnkeltverdi('1');
        valider = genererValiderTall(1, 20, 'Husk å fylle ut dette');
    });

    describe('validerTall', () => {
        it('Skal klage hvis et felt ikke er fylt ut', () => {
            const verdi = parse();
            const feilmelding = valider(verdi);
            expect(feilmelding).to.equal('Husk å fylle ut dette');
        });

        it('Skal klage hvis tallet er for høyt', () => {
            const verdi = parse('21');
            const feilmelding = valider(verdi);
            expect(feilmelding).to.equal('Vennligst fyll ut et tall mellom 1 og 20');
        });

        it('Skal klage hvis tallet er for lavt', () => {
            const verdi = parse('0');
            const feilmelding = valider(verdi);
            expect(feilmelding).to.equal('Vennligst fyll ut et tall mellom 1 og 20');
        });

        it('Skal ikke klage hvis tallet er gyldig og et number', () => {
            const verdi = parse('3');
            const okmelding = valider(verdi);
            expect(okmelding).to.equal(undefined);
        });
    });
});
