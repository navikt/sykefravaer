import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/dinSykmelding_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("dinSykmelding_actions", () => {

    it("Skal ha en setArbeidssituasjon()-funksjon som returnerer riktig action", () => {

        const arbeidssituasjon = 'test';
        const sykmeldingId = 23;

        var action = actions.setArbeidssituasjon(arbeidssituasjon, sykmeldingId);

        expect(action.type).to.equal("SET_ARBEIDSSITUASJON");
        expect(action.arbeidssituasjon).to.equal('test');
        expect(action.sykmeldingId).to.equal(23);
    });

    it("Skal ha en setArbeidsgiver som returnerer riktig action", () => {

        const arbeidsgiver = {
            orgnummer: 12345678,
            navn: "Mosveens Sykkelverksted & Hipstercafe"
        };
        const sykmeldingId = 23;

        var action = actions.setArbeidsgiver(sykmeldingId, arbeidsgiver);

        expect(action.type).to.equal("SET_ARBEIDSGIVER");
        expect(action.arbeidsgiver).to.deep.equal({
            orgnummer: 12345678,
            navn: "Mosveens Sykkelverksted & Hipstercafe"
        });
        expect(action.sykmeldingId).to.equal(23);        

    });

});