import { expect } from 'chai';
import { formatDate, getDuration } from '../../js/utils';

describe("formatDate", () => {
	it("Skal formatere dato", () => {
		expect(formatDate("2014-02-27T23:00:00.000Z")).to.equal("28.02.2014");
	});

	it("Skal ta hensyn til tidssoner", () => {
		expect(formatDate("2016-05-10T10:23:48.355Z")).to.equal("10.05.2016");
	}); 

	it("Skal ta hensyn til skuddår", () => {
		expect(formatDate("1984-02-28T23:00:00.000Z")).to.equal("29.02.1984");
	});
});

describe("getDuration", () => {
	it("Skal regne ut varighet", () => {
		expect(getDuration("2014-02-27T23:00:00.000Z", "2014-03-08T23:00:00.000Z")).to.equal(10);
		expect(getDuration("2014-06-30T23:00:00.000Z", "2014-07-05T23:00:00.000Z")).to.equal(6);
	});

})