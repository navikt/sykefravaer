import { mapToInitialValues } from '../../../js/components/sykepengesoknad/setup';

import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("setup", () => {

    describe("mapToInitialValues", () => {

        let values; 

        beforeEach(() => {
            values = {
                andreInntektskilder: [],
                aktiviteter:  [
                    {
                        periode: {
                            fom: "2016-07-15",
                            tom: "2016-07-20"
                        },
                        grad: 100,
                        avvik: null
                    },
                    {
                        periode: {
                            fom: "2016-07-15",
                            tom: "2016-07-20"
                        },
                        grad: 60,
                        avvik: null
                    },
                    {
                        periode: {
                            fom: "2016-07-15",
                            tom: "2016-07-20"
                        },
                        grad: 60,
                        avvik: null
                    }
                ]
            };
        });

        it("Skal sette avvik på aktiviteter", () => {
            const res = mapToInitialValues(values);
            expect(res.aktiviteter[0].avvik).to.deep.equal({});
            expect(res.aktiviteter[1].avvik).to.deep.equal({});
            expect(res.aktiviteter[2].avvik).to.deep.equal({});
        });

        it("Skal sette utdanning til tomt objekt", () => {
            const res = mapToInitialValues(values);
            expect(res.utdanning).to.deep.equal({});
        });

        it("Skal sette andreInntektskilder til tomt objekt", () => {
            const res = mapToInitialValues(values);
            expect(res.andreInntektskilder).to.deep.equal({});
        });

        it("Skal sette utenlandsopphold til objekt med perioder", () => {
            const res = mapToInitialValues(values);
            expect(res.utenlandsopphold).to.deep.equal({
                perioder: [],
            });
        })

    })

})