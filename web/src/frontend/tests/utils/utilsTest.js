import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { getSykmelding } from '../../js/utils';

describe("getSykmelding", () => {
	it("Skal returnere undefined dersom den ikke finner sykmeldingen", () => {
		const res = getSykmelding([], 123);
		expect(res).to.deep.equal(undefined);
	});

	it("Skal returnere sykmeldingen dersom den finner sykmeldingen", () => {
		const sykmeldinger = deepFreeze([{id: 123}, {id: 345}, {id: 888}]);
		const res = getSykmelding(sykmeldinger, 123);
		expect(res).to.deep.equal({
			id: 123
		});
	});
})
