import { mapToInitialValues, getNestedKeys } from '../../../js/components/sykepengesoknad/setup';
import andreInntektskilder from '../../../js/enums/inntektskildetyper';

import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

import deepFreeze from 'deep-freeze';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("setup", () => {

    describe("getNestedKeys", () => {

        const objekt = {
            "ferie": "Feil"
        };

        const objektNostetIToNivaer = {
            "ferie": "Feil",
            "utenlandsopphold": {
                "perioder": "Feil",
                "harBlabla": "Feil",
            }
        };

        const objektNostetITreNivaer = {
            "ferie": "Feil",
            "utenlandsopphold": {
                "perioder": "Feil",
                "harBlabla": "Feil",
                "nostet": {
                    "periode": "Feil"
                }
            }
        };

        const objektMedArray = {
            "ferie": "Feil",
            "utenlandsopphold": {
                "perioder": "Feil",
                "harBlabla": "Feil",
                "inntektskilder": [{
                    "ostepop": "Feil"
                }]
            }
        };

        const objektMed_errorKey = {
            "ferie": "Feil",
            "utenlandsopphold": {
                "perioder": "Feil",
                "harBlabla": "Feil",
                "inntektskilder": {
                    _error: "Halla"
                }
            }
        };

        it("Skal returnere nøkler for unøstet objekt", () => {
            expect(getNestedKeys(objekt)).to.deep.equal(["ferie"]);
        });

        it("Skal returnere nøkler for objekt nøstet i to nivåer", () => {
            const keys = getNestedKeys(objektNostetIToNivaer);
            expect(keys).to.contain("ferie")
            expect(keys).to.contain("utenlandsopphold.perioder");
            expect(keys).to.contain("utenlandsopphold.harBlabla");
        });

        it("Skal returnere nøkler for objekt nøstet i tre nivåer", () => {
            const keys = getNestedKeys(objektNostetITreNivaer);
            expect(keys).to.contain("ferie")
            expect(keys).to.contain("utenlandsopphold.perioder");
            expect(keys).to.contain("utenlandsopphold.harBlabla");
            expect(keys).to.contain("utenlandsopphold.nostet.periode");
        });


        it("Skal returnere nøkler for objekt med array", () => {
            const keys = getNestedKeys(objektMedArray);
            expect(keys).to.contain("ferie")
            expect(keys).to.contain("utenlandsopphold.perioder");
            expect(keys).to.contain("utenlandsopphold.harBlabla");
            expect(keys).to.contain("utenlandsopphold.inntektskilder[0].ostepop");
        });

        it("Skal returnere nøkler før objekt med _error-key", () => {
            const keys = getNestedKeys(objektMed_errorKey);
            expect(keys).not.to.contain("utenlandsopphold.inntektskilder._error");
            expect(keys).to.contain("utenlandsopphold.inntektskilder");
            expect(keys).to.contain("ferie")
            expect(keys).to.contain("utenlandsopphold.perioder");
            expect(keys).to.contain("utenlandsopphold.harBlabla");
        })

    })

    describe("mapToInitialValues", () => {

        let values; 

        beforeEach(() => {
            values = deepFreeze({
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
            });
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

        it("Skal sette andreInntektskilder til defaultverdier", () => {
            const res = mapToInitialValues(values);
            expect(res.andreInntektskilder).to.deep.equal(andreInntektskilder);
        });

        it("Skal sette utenlandsopphold til objekt med perioder", () => {
            const res = mapToInitialValues(values);
            expect(res.utenlandsopphold).to.deep.equal({
                perioder: [],
            });
        });

    });

});