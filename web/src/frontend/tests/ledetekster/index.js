import {expect} from 'chai';
import {getLedetekst, getHtmlLedetekst} from '../../js/ledetekster';

describe("LABELS", function () {

    describe("getLedetekst", () => {

        it("Skal gi beskjed hvis en ledetekst ikke finnes", function () {
            const label = getLedetekst("denne.finnes.ikke", {
                "%FOM%": "12. februar",
                "%TOM%": "8. mars"
            });
            expect(label).to.equal("denne.finnes.ikke [MANGLER LEDETEKST]");
        });

        it("Skal returnere tom streng dersom ledetekster ikke er hentet", function() {
        	const label = getLedetekst("min.ledetekst", {});
        	expect(label).to.equal("");
        });

    });

}); 