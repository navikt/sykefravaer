import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { mapStateToProps, Container } from "../../../js/containers/landingsside/DetteHarSkjeddContainer";
import DetteHarSkjedd from '../../../js/components/landingsside/DetteHarSkjedd';

describe("DetteHarSkjeddContainer", () => {

	let hendelser;

	beforeEach(() => {
		hendelser = [
			{"id":68929,"inntruffetdato":new Date("2017-09-18"),"type":"AKTIVITETSKRAV_VARSEL","ressursId":null},
			{"id":66306,"inntruffetdato":new Date("2017-08-02"),"type":"NY_NAERMESTE_LEDER","ressursId":null},
			{"id":68931,"inntruffetdato":new Date("2017-09-18"),"type":"AKTIVITETSKRAV_BEKREFTET","ressursId":"68929"}]
	});

	describe("mapStateToProps", () => {
		let state;

		beforeEach(() => {
			state = {};
			state.hendelser = {
				data: hendelser,
			}
		})

		it("Skal returnere hendelser av typen AKTIVITETSKRAV_BEKREFTET", () => {
			const props = mapStateToProps(state);
			expect(props.hendelser).to.deep.equal([{"id":68931,"inntruffetdato":new Date("2017-09-18"),"type":"AKTIVITETSKRAV_BEKREFTET","ressursId":"68929"}])
		});

		it("Skal returnere visDetteHarSkjedd === true dersom det finnes (minst) en hendelse av typen AKTIVITETSKRAV_BEKREFTET", () => {
			const props = mapStateToProps(state);
			expect(props.visDetteHarSkjedd).to.be.true;
		});

		it("Skal returnere visDetteHarSkjedd === false dersom det ikke finnes en hendelse av typen AKTIVITETSKRAV_BEKREFTET", () => {
			state.hendelser.data = [{"id":68929,"inntruffetdato":new Date("2017-09-18"),"type":"AKTIVITETSKRAV_VARSEL","ressursId":null}, {"id":66306,"inntruffetdato":new Date("2017-08-02"),"type":"NY_NAERMESTE_LEDER","ressursId":null}];
			const props = mapStateToProps(state);
			expect(props.visDetteHarSkjedd).to.be.false;
		});

	});

	describe("Container", () => {

		it("Skal returnere null dersom visDetteHarSkjedd === false", () => {
			const component = mount(<Container visDetteHarSkjedd={false} />);
			expect(component.html()).to.be.null;
		});

		it("Skal returnere null dersom visDetteHarSkjedd === false", () => {
			const component = mount(<Container visDetteHarSkjedd={true} hendelser={[]} />);
			expect(component.contains(<DetteHarSkjedd hendelser={[]} />)).to.be.true;
		})	

	})

})