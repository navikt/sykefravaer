import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { toDatePrettyPrint, getDuration } from '../../js/utils/datoUtils';
import { getSykmelding } from '../../js/utils';

describe("toDate", () => {
	it("Skal formatere dato", () => {
		expect(toDatePrettyPrint({ year: 2014, monthValue: 2, dayOfMonth: 28 })).to.equal("28.02.2014");
	});

	it("Skal ta hensyn til tidssoner", () => {
		expect(toDatePrettyPrint({ year: 2016, monthValue: 5, dayOfMonth: 10 })).to.equal("10.05.2016");
	}); 

	it("Skal ta hensyn til skuddår", () => {
		expect(toDatePrettyPrint({ year: 1984, monthValue: 2, dayOfMonth: 29 })).to.equal("29.02.1984");
	});
});

describe("getDuration", () => {
	it("Skal regne ut varighet", () => {
		expect(getDuration({ year: 2014, monthValue: 2, dayOfMonth: 27 }, { year: 2014, monthValue: 3, dayOfMonth: 8 })).to.equal(10);
		expect(getDuration({ year: 2014, monthValue: 6, dayOfMonth: 30 }, { year: 2014, monthValue: 7, dayOfMonth: 5 })).to.equal(6);
	});
});

describe("getSykmelding", () => {
	it("Skal returnere null dersom den ikke finner sykmeldingen", () => {
		const res = getSykmelding([], 123);
		expect(res).to.deep.equal(null);
	});

	it("Skal returnere sykmeldingen dersom den finner sykmeldingen", () => {
		const sykmeldinger = deepFreeze([{id: 123}, {id: 345}, {id: 888}]);
		const res = getSykmelding(sykmeldinger, 123);
		expect(res).to.deep.equal({
			id: 123
		});
	});
})
