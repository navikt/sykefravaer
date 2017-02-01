import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import sinon from 'sinon';

import { Oppsummering, validate } from '../../../../js/components/sykepengesoknad/Oppsummering/Oppsummering';
import { getSoknad } from '../../../mockSoknader';

xdescribe("Oppsummering", () => {

    let sendTilFoerDuBegynner;

    beforeEach(() => {
        sendTilFoerDuBegynner = sinon.spy();
    })

    it("Skal kalle på sendTilFoerDuBegynner hvis foregående sted ikke er valide", () => {
        const values = {};
        const res = validate(values, {
            sendTilFoerDuBegynner,
            sykepengesoknad: {
                random: "random"
            }
        });
        expect(sendTilFoerDuBegynner.calledWith({random: "random"})).to.be.true;
    });


    it("Skal ikke kalle på sendTilFoerDuBegynner hvis foregående sted ikke er valide", () => {
        const values = {};
        const res = validate(values, {
            sendTilFoerDuBegynner,
            sykepengesoknad: {
                random: "random"
            }
        });
        expect(sendTilFoerDuBegynner.calledWith({random: "random"})).to.be.false;
    });


})