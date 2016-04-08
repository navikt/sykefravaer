import { expect } from 'chai';
import { getLedetekst, getHtmlLedetekst } from '../../js/ledetekster';

describe("LABELS", function() {

	describe("getLedetekst", () => {

		it("should alert when placeholder doesn't exist", function() {
			const label = getLedetekst("denne.finnes.ikke", {
				"%FOM%": "12. februar",
				"%TOM%": "8. mars"
			});
			expect(label).to.equal("denne.finnes.ikke [MANGLER LEDETEKST]");
		});	

	});

}); 