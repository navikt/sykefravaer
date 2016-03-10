import { expect } from 'chai';
import { getLedetekst, getHtmlLedetekst } from '../../js/ledetekster';

describe("LABELS", function() {

	describe("getLedetekst", () => {

		it("should replace placeholders", function() {
			const label = getLedetekst("sykmelding.teaser.tittel", {
				"%FOM%": "12. februar",
				"%TOM%": "8. mars"
			});
			expect(label).to.equal("Sykmelding fra 12. februar til 8. mars");
		});

		it("should alert when placeholder doesn't exist", function() {
			const label = getLedetekst("denne.finnes.ikke", {
				"%FOM%": "12. februar",
				"%TOM%": "8. mars"
			});
			expect(label).to.equal("denne.finnes.ikke [MANGLER LEDETEKST]");
		});	

	});

});