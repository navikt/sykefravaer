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

    it("Skal ha en senderSykmelding()-funksjon som returnerer riktig action", () => {
        const sykmeldingId = 12;
        const action = actions.senderSykmelding(sykmeldingId);
        expect(action).to.deep.equal({
            sykmeldingId: 12, 
            type: "SENDER_SYKMELDING",
        });
    });

    it("Skal ha en sendSykmeldingFeilet()-funksjon som returnerer riktig action", () => {
        const sykmeldingId = 12;
        const action = actions.sendSykmeldingFeilet(sykmeldingId);
        expect(action).to.deep.equal({
            sykmeldingId: 12, 
            type: "SEND_SYKMELDING_FEILET",
        });
    });

    it("Skal ha en sykmeldingSendt()-funksjon som returnerer riktig action", () => {
        const sykmelding = {
            id: 14,
            status: 'SENDT'
        };
        const action = actions.sykmeldingSendt(sykmelding);
        expect(action).to.deep.equal({
            sykmelding: {
                id: 14,
                status: 'SENDT'
            }, 
            type: "SYKMELDING_SENDT",
        });
    });

});
