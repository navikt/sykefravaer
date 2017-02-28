import { tidligsteFom, senesteTom } from "../../js/utils/periodeUtils";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";

chai.use(chaiEnzyme());
const expect = chai.expect;


describe("periodeUtils", () => {
    it("", () => {
        const perioder = [
            {
                fom: '2017-05-10',
                tom: '2017-05-15',
            }, {
                fom: '2017-05-01',
                tom: '2017-05-09',
            }, {
                fom: '2017-04-10',
                tom: '2017-04-30',
            }, {
                fom: '2017-05-16',
                tom: '2017-05-20',
            }, {
                fom: '2017-05-21',
                tom: '2017-05-22',
            }, {

            }
        ];

        const fom = tidligsteFom(perioder);
        const tom = senesteTom(perioder);

        expect(fom).to.equal('2017-04-10');
        expect(tom).to.equal('2017-05-22');
    });
});