import { mapStateToProps, getNestedKeys } from '../../js/containers/FeiloppsummeringContainer';

import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

import deepFreeze from 'deep-freeze';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("FeiloppsummeringContainer", () => {

    describe("mapStateToProps", () => {

        let state;
        let ownProps;

        beforeEach(() => {
            state = {
                form: {
                    "MITTSKJEMA": {}
                },
                formMeta: {},
            };
            ownProps =  {
                skjemanavn: "MITTSKJEMA"
            };
        })

        it("Returnerer skjemanavn", () => {
            expect(mapStateToProps(state, ownProps).skjemanavn).to.equal("MITTSKJEMA")
        });

        it("Returnerer settFokus", () => {
            expect(mapStateToProps(state, ownProps).settFokus).to.be.false;

            state.formMeta = {
                "MITTSKJEMA": {
                    status: "SEND_SKJEMA_FEILET",
                    settFokus: true,
                }
            }
            expect(mapStateToProps(state, ownProps).settFokus).to.be.true;
        });

        it("Returnerer visFeilliste", () => {
            expect(mapStateToProps(state, ownProps).visFeilliste).to.be.false;

            state.formMeta = {
                MITTSKJEMA: {
                    status: "SEND_SKJEMA_FEILET"
                }
            };
            expect(mapStateToProps(state, ownProps).visFeilliste).to.be.true;
        });

        it("Returnerer names hvis det ikke finnes feil i skjema", () => {
            expect(mapStateToProps(state, ownProps).names).to.deep.equal(["INGEN_FEIL"]);
        });

        it("Returnerer names hvis det finnes feil i skjema", () => {
            state.form.MITTSKJEMA = {
                syncErrors: {
                    "felt1": "Testfeilmelding 1",
                    "felt2": "Testfeilmelding 2",
                    "felt3": {
                        _error: "Testfeilmelding 3"
                    }
                }
            }
            expect(mapStateToProps(state, ownProps).names).to.deep.equal(["felt1", "felt2", "felt3"]);
        });

    });

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

});