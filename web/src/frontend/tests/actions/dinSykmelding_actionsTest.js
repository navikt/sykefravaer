import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/dinSykmelding_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("dinSykmelding_actions", () => {

    it("skal returnere riktig aciton", () => {

        const arbeidssituasjon = 'test';
        const sykmeldingsId = 23;

        var action = actions.setArbeidssituasjon(arbeidssituasjon, sykmeldingsId);

        expect(action.type).to.equal("SET_ARBEIDSSITUASJON");
        expect(action.arbeidssituasjon).to.equal('test');
        expect(action.sykmeldingsId).to.equal(23);
    });

});