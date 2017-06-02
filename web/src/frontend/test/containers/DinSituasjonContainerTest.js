import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { setLedetekster } from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps, DinSituasjon } from "../../js/containers/DinSituasjonContainer";

describe.only("DinSituasjonContainer", () => {

	describe("mapStateToProps", () => {

		let state;

		beforeEach(() => {
			state = {
				tidslinjer: {
					data: [{
						startdato: "2017-12-15"
					}, {
						startdato: "2017-05-01"
					}]
				}
			}
		});

		it("Skal returnere sykefravaerStartdato hvis det finnes data", () => {
			const res = mapStateToProps(state);
			expect(res.sykefravaerStartdato).to.equal("2017-12-15");
		});

		it("Skal returnere sykefravaerStartdato === undefined hvis det ikke finnes data", () => {
			state.tidslinjer.data = undefined;
			const res = mapStateToProps(state);
			expect(res.sykefravaerStartdato).to.be.undefined;
		});

	});

});