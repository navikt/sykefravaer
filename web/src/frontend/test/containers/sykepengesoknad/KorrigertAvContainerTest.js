import chai from 'chai';
import React from 'react'
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { setLedetekster } from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { mapStateToProps, KorrigertAv } from '../../../js/containers/sykepengesoknad/KorrigertAvContainer';

describe("KorrigertAvContainer", () => {

	let soknad1;
	let soknad2;
	let soknad3;
	let soknad4;
	let soknad5;
	let ownProps;
	let state;
	let data;

	beforeEach(() => {
	    soknad1 = {
	        id: "1",
	        status: "KORRIGERT",
	        sendtTilNAVDato: new Date("2017-02-04"),
	    };

	    soknad2 = {
	        id: "2",
	        status: "SENDT",
	        sendtTilNAVDato: new Date("2017-02-06"),
	        sendtTilArbeidsgiverDato: new Date("2017-02-08"),
	    };

	    soknad3 = {
	        id: "3",
	        korrigerer: "1",
	        status: "KORRIGERT",
	        sendtTilNAVDato: new Date("2017-02-05"),
	        sendtTilArbeidsgiverDato: new Date("2017-02-10")
	    };

	    soknad4 = {
	        id: "4",
	        korrigerer: "3",
	        status: "SENDT",
	        sendtTilNAVDato: new Date("2017-02-08"),
	        sendtTilArbeidsgiverDato: new Date("2017-02-11")
	    };

	    soknad5 = {
	        id: "5",
	        status: "NY",
	        sendtTilArbeidsgiverDato: new Date("2017-02-01")
	    };

	    data = [soknad1, soknad2, soknad3, soknad4, soknad5];
	    ownProps = {};
	});

	describe("mapStateToProps", () => {

		beforeEach(() => {
			state = {
				sykepengesoknader: {
					data,
				}
			}
		})

		it("Skal returnere korrigertAvSoknad", () => {

			ownProps.sykepengesoknad = soknad1;
			const res = mapStateToProps(state, ownProps);
			expect(res.korrigertAvSoknad).to.deep.equal(soknad4);

		});

	});

	describe("KorrigertAv", () => {

		beforeEach(() => {
			setLedetekster({
				'sykepengesoknad.korrigert.tekst': 'Du sendte inn en endring av denne søknaden den %DATO%.',
				'sykepengesoknad.korrigert.lenketekst': "Se siste versjon av søknaden"
			});
		});

		it("Skal vise informasjon om den nye utgaven", () => {
			const comp = mount(<KorrigertAv korrigertAvSoknad={soknad2} />);
			expect(comp.text()).to.contain("Du sendte inn en endring av denne søknaden den 06.02.2017.");
			expect(comp.text()).to.contain("Se siste versjon av søknaden");
		});

	});


})