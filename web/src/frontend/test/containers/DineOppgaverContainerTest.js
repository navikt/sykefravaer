import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import sinon from 'sinon';
import { setLedetekster } from 'digisyfo-npm';
import { Link } from 'react-router';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps, DineOppgaver } from "../../js/containers/DineOppgaverContainer";

describe("DineOppgaverContainer", () => {

	describe("mapStateToProps", () => {

		let state;

		beforeEach(() => {
			state = {
				dineSykmeldinger: {
					data: [{
						status: "NY",
						id: "1"
					}, {
						status: "SENDT",
						id: "2"
					}]
				},
				sykepengesoknader: {
					data: [{
						status: "NY",
						id: "3"
					}, {
						status: "SENDT",
						id: "4"
					}]
				}
			};
		}); 

		it("Skal returnere NYE sykmeldinger", () => {
			const res = mapStateToProps(state);
			expect(res.sykmeldinger).to.deep.equal([{
				status: "NY",
				id: "1"
			}])
		});

		it("Skal returnere NYE sykepengesoknader", () => {
			const res = mapStateToProps(state);
			expect(res.sykepengesoknader).to.deep.equal([{
				status: "NY",
				id: "3"
			}])
		});

		it("Skal returnere visOppgaver === true hvis det finnes oppgaver", () => {
			const res = mapStateToProps(state);
			expect(res.visOppgaver).to.be.true;
		});

		it("Skal returnere visOppgaver === false hvis det ikke finnes oppgaver", () => {
			state.dineSykmeldinger.data = [];
			state.sykepengesoknader.data = [];
			const res = mapStateToProps(state);
			expect(res.visOppgaver).to.be.false;
		});

	});

	describe("DineOppgaver", () => {

		let component; 

		beforeEach(() => {
			setLedetekster({
				'dine-oppgaver.tittel': 'Oppgaver som venter på deg',
				'dine-oppgaver.sykepengesoknader.en-soknad': "Du har 1 ny søknad",
				'dine-oppgaver.sykepengesoknader.flere-soknader': "Du har %ANTALL% nye søknader",
				'dine-oppgaver.sykmeldinger.en-sykmelding': "Du har 1 ny sykmelding",
				'dine-oppgaver.sykmeldinger.flere-sykmeldinger': "Du har %ANTALL% nye sykmeldinger",
			});
		});

		it("Skal vise null hvis visOppgaver === false", () => {
			let component = shallow(<DineOppgaver visOppgaver={false} />);
			expect(component.html()).to.be.null;
		});

		it("Skal vise null hvis visOppgaver === false", () => {
			let component = shallow(<DineOppgaver visOppgaver={false} />);
			expect(component.html()).to.be.null;
		});

		describe("Hvis du har oppgaver", () => {
			beforeEach(() => {
				component = shallow(<DineOppgaver visOppgaver={true} sykepengesoknader={[{id: "1"}]} sykmeldinger={[{}, {}]} />);
			});

			it("Skal vise tittel", () => {
				expect(component.find(".js-tittel")).to.contain("Oppgaver som venter på deg");
			});

			it("Skal vise en lenke til din sykepengesoknad hvis det er én søknad", () => {
				component = mount(<DineOppgaver visOppgaver={true} sykepengesoknader={[{id: "1"}]} sykmeldinger={[{}, {}]} />);
				expect(component.find(Link).at(1).prop("to")).to.equal("/sykefravaer/soknader/1");
				expect(component.find(Link).at(1).text()).to.equal("Du har 1 ny søknad");
			});

			it("Skal vise en lenke til dine sykepengesoknader hvis det er flere søknader", () => {
				component = mount(<DineOppgaver visOppgaver={true} sykepengesoknader={[{id: "1"}, {}]} sykmeldinger={[{}, {}]} />);
				expect(component.find(Link).at(1).prop("to")).to.equal("/sykefravaer/soknader");
				expect(component.find(Link).at(1).text()).to.equal("Du har 2 nye søknader");
			});

			it("Skal vise en lenke til din sykmelding hvis det er én søknad", () => {
				component = mount(<DineOppgaver visOppgaver={true} sykepengesoknader={[{id: "1"}]} sykmeldinger={[{id: 1}]} />);
				expect(component.find(Link).at(0).prop("to")).to.equal("/sykefravaer/sykmeldinger/1");
				expect(component.find(Link).at(0).text()).to.equal("Du har 1 ny sykmelding");
			});

			it("Skal vise en lenke til dine sykmeldinger hvis det er flere sykmeldinger", () => {
				component = mount(<DineOppgaver visOppgaver={true} sykepengesoknader={[{id: "1"}, {}]} sykmeldinger={[{}, {}]} />);
				expect(component.find(Link).at(0).prop("to")).to.equal("/sykefravaer/sykmeldinger");
				expect(component.find(Link).at(0).text()).to.equal("Du har 2 nye sykmeldinger");
			});
		})

	}); 

});