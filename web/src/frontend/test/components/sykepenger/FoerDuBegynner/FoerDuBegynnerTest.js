import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { validate } from '../../../../js/components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';

describe("FoerDuBegynner", () => {

    describe("Validate", () => {

        let values; 

        beforeEach(() => {
            values = {}
        });

        it("Skal returnere ansvarBekreftet", () => {
            const res = validate(values);
            expect(typeof res.ansvarBekreftet).to.equal("string");
        });

        it("Skal returnere ansvarBekreftet når ansvarBekreftet er fylt ut", () => {
            values.ansvarBekreftet = true;
            const res = validate(values);
            expect(typeof res.ansvarBekreftet).to.equal("undefined");
        });

    });

});
