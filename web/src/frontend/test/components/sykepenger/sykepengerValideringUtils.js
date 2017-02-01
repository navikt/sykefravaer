import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

import * as utils from '../../../js/components/sykepengesoknad/valideringUtils';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("sykepengerValideringUtils", () => {

    describe("harMinstEnPeriode", () => {

        it("Skal returnere false dersom man ikke sender inn noenting", () => {
            const res = utils.harMinstEnPeriode();
            expect(res).to.be.false;
        });

        it("Skal returnere false dersom man ikke sender inn tomt array", () => {
            const res = utils.harMinstEnPeriode([]);
            expect(res).to.be.false;
        });

        it("Skal returnere false dersom man ikke sender inn array med tomt objekt", () => {
            const res = utils.harMinstEnPeriode([{}]);
            expect(res).to.be.false;
        });

        it("Skal returnere false dersom man ikke sender inn array med to tomme objekt", () => {
            const res = utils.harMinstEnPeriode([{}, {}]);
            expect(res).to.be.false;
        });

        it("Skal returnere true dersom man ikke sender inn array med en periode", () => {
            const res = utils.harMinstEnPeriode([{
                fom: "12.12.2020",
                tom: "14.12.2020"
            }]);
            expect(res).to.be.true;
        });


        it("Skal returnere true dersom man ikke sender inn array med to perioder", () => {
            const res = utils.harMinstEnPeriode([{
                fom: "12.12.2020",
                tom: "14.12.2020"
            }, {
                fom: "12.12.2020",
                tom: "14.12.2020"
            }]);
            expect(res).to.be.true;
        });

    })

});