import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import * as utils from '../../../../js/components/sykepengesoknad/validering/valideringUtils';

describe("valideringUtils", () => {

    describe("validerPerioder", () => {

        it("Skal klage hvis det ikke finnes perioder", () => {
            const res = utils.validerPerioder();
            expect(res).to.deep.equal({
                _error: 'Vennligst oppgi minst én periode'
            })
        });

        it("Skal klage hvis det finnes tomme perioder", () => {
            const res = utils.validerPerioder([{}]);
            expect(res).to.deep.equal({
                _error: 'Vennligst oppgi minst én periode'
            }) 
        });

        it("Skal klage hvis det er oppgitt kun én dato", () => {
            const res = utils.validerPerioder([{
                fom: "12.12.2012"
            }]);
            expect(res).to.deep.equal([{
                tom: "Vennligst fyll ut dato"
            }]);
        });

        it("Skal klage hvis det er oppgitt kun én dato", () => {
            const res = utils.validerPerioder([{
                tom: "12.12.2012"
            }]);
            expect(res).to.deep.equal([{
                fom: "Vennligst fyll ut dato"
            }]);
        });

        it("Skal klage hvis til-dato er før fra-dato", () => {
            const res = utils.validerPerioder([{
                fom: "12.01.2014",
                tom: "12.12.2012"
            }]);
            expect(res).to.deep.equal([{
                fom: "Startdato må være før sluttdato",
                tom: "Sluttdato må være etter startdato"
            }]);
        });

        it("Skal ikke klage hvis det er fylt ut en gyldig periode", () => {
            const res = utils.validerPerioder([{
                fom: "12.01.2014",
                tom: "12.12.2014"
            }]);
            expect(res).to.be.null;
        });

        it("Skal ikke klage hvis startdato og sluttdato er samme dato", () => {
            const res = utils.validerPerioder([{
                fom: "12.01.2014",
                tom: "12.01.2014"
            }]);
            expect(res).to.be.null;
        });

    })

})