import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import sinon from 'sinon';
import { Field } from 'redux-form';

import Feilomrade from '../../../../js/components/skjema/Feilomrade';
import ForskuttererArbeidsgiver, { ForskuttererSporsmal } from '../../../../js/components/sykepengesoknad/Oppsummering/ForskuttererArbeidsgiver';
import { getSoknad } from '../../../mockSoknader';
import { Hjelpetekst, setLedetekster } from 'digisyfo-npm';

describe("ForskuttererArbeidsgiver", () => {

	const ledetekster = {
		"sykepengesoknad.forskutterer-arbeidsgiver.sporsmal": "Betaler arbeidsgiveren lønnen din når du er syk?",
		"sykepengesoknad.forskutterer-arbeidsgiver.hjelpetekst.tittel": "Lønn under sykdom",
		"sykepengesoknad.forskutterer-arbeidsgiver.hjelpetekst.tekst": "Arbeidsgiveren betaler vanligvis lønnen de første 16 kalenderdagene man er syk. Noen arbeidsgivere fortsetter å utbetale lønn og søker om å få pengene igjen fra NAV senere.",
		"sykepengesoknad.forskutterer-arbeidsgiver.svar.JA": "Ja",
		"sykepengesoknad.forskutterer-arbeidsgiver.svar.NEI": "Nei",
		"sykepengesoknad.forskutterer-arbeidsgiver.svar.VET_IKKE": "Vet ikke",
		"sykepengesoknad.forskutterer-arbeidsgiver.infotekst.JA": "Arbeidsgiveren din mottar kopi av søknaden du sender til NAV",
		"sykepengesoknad.forskutterer-arbeidsgiver.infotekst.NEI": "Søknaden sendes til NAV. Arbeidsgiveren din får ikke kopi.",
		"sykepengesoknad.forskutterer-arbeidsgiver.infotekst.VET_IKKE": "Siden du ikke vet svaret på dette spørsmålet, sender vi kopi av søknaden du sender til arbeidsgiveren din",
	};

	beforeEach(() => {
		setLedetekster(ledetekster);
	});

	describe("ForskuttererSporsmal", () => {

		let component;

		beforeEach(() => {
			component = shallow(<ForskuttererSporsmal />);
		});

		it("Inneholder hjelpetekst", () => {
			const h = component.find(Hjelpetekst);
			expect(h).to.have.length(1);
			expect(h.prop("tittel")).to.equal(ledetekster["sykepengesoknad.forskutterer-arbeidsgiver.hjelpetekst.tittel"]);
			expect(h.prop("tekst")).to.equal(ledetekster["sykepengesoknad.forskutterer-arbeidsgiver.hjelpetekst.tekst"]);
		});

		it("Inneholder Feilomrade", () => {
			expect(component.find(Feilomrade)).to.have.length(1);
		});
	})

});