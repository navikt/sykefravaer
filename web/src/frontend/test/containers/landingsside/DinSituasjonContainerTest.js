import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { setLedetekster } from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps, DinSituasjon } from "../../../js/containers/landingsside/DinSituasjonContainer";

describe("DinSituasjonContainer", () => {

	describe("mapStateToProps", () => {

		let state;

		beforeEach(() => {
			state = {
				ledere: {
					data: []
				}
			}
		});

		it("Skal returnere visDinSituasjon === false hvis det ikke finnes ledere", () => {
			const res = mapStateToProps(state);
			expect(res.visDinSituasjon).to.be.false;
		});

		it("Skal returnere visDinSituasjon === true hvis det finnes ledere", () => {
			state.ledere.data = [{}]
			const res = mapStateToProps(state);
			expect(res.visDinSituasjon).to.be.true;
		});

	});

});