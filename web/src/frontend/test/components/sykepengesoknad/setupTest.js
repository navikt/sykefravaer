import { mapStateToPropsMedInitialValues, mapStateToProps, mapToInitialValues } from '../../../js/components/sykepengesoknad/setup';
import andreInntektskilder from '../../../js/enums/inntektskildetyper';
import { mapBackendsoknadToSkjemasoknad, mapAktiviteter } from 'digisyfo-npm';
import sinon from 'sinon';
import { getSoknad } from '../../mockSoknader';

import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

import deepFreeze from 'deep-freeze';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("setup", () => {

    let state;
    let ownProps;

    beforeEach(() => {
        state = {};
        ownProps = {};
    });

    describe("mapStateToPropsMedInitialValues", () => {
        
        it("Skal mappe til initielle verdier hvis det er en NY søknad", () => {
            ownProps.sykepengesoknad = getSoknad({
                status: 'NY',
            });
            const props = mapStateToPropsMedInitialValues(state, ownProps);
            expect(props.initialValues.harHattFerie).to.be.undefined;
        });

        it("Skal mappe til skjemasøknad hvis søknaden har status === 'UTKAST_TIL_KORRIGERING'", () => {
            ownProps.sykepengesoknad = getSoknad({
                status: 'UTKAST_TIL_KORRIGERING',
            });
            const props = mapStateToPropsMedInitialValues(state, ownProps);
            expect(props.initialValues.harHattFerie).to.be.false;
        });

        it("Skal mappe aktiviteter", () => {
            ownProps.sykepengesoknad = deepFreeze(getSoknad({
                fom: new Date("2016-07-18"),
                tom: new Date("2016-07-24"),
                aktiviteter:  [
                    {
                        periode: {
                            fom: new Date("2016-07-15"),
                            tom: new Date("2016-07-20")
                        },
                        grad: 100,
                        avvik: null
                    },
                    {
                        periode: {
                            fom: new Date("2016-07-21"),
                            tom: new Date("2016-07-25")
                        },
                        grad: 60,
                        avvik: null
                    },
                    {
                        periode: {
                            fom: new Date("2016-07-26"),
                            tom: new Date("2016-07-30")
                        },
                        grad: 60,
                        avvik: null
                    }
                ]
            }));
            const props = mapStateToPropsMedInitialValues(state, ownProps);
            const mappetSoknad = mapAktiviteter(ownProps.sykepengesoknad);
            expect(props.sykepengesoknad).to.deep.equal(mappetSoknad);
        })

    });

    describe("mapStateToProps", () => {

        it("Skal mappe aktiviteter", () => {
            ownProps.sykepengesoknad = deepFreeze(getSoknad({
                fom: new Date("2016-07-18"),
                tom: new Date("2016-07-24"),
                aktiviteter:  [
                    {
                        periode: {
                            fom: new Date("2016-07-15"),
                            tom: new Date("2016-07-20")
                        },
                        grad: 100,
                        avvik: null
                    },
                    {
                        periode: {
                            fom: new Date("2016-07-21"),
                            tom: new Date("2016-07-25")
                        },
                        grad: 60,
                        avvik: null
                    },
                    {
                        periode: {
                            fom: new Date("2016-07-26"),
                            tom: new Date("2016-07-30")
                        },
                        grad: 60,
                        avvik: null
                    }
                ]
            }));
            const props = mapStateToProps(state, ownProps);
            const mappetSoknad = mapAktiviteter(ownProps.sykepengesoknad);
            expect(props.sykepengesoknad).to.deep.equal(mappetSoknad);
        });

    });

    describe("mapToInitialValues", () => {

        let values; 

        beforeEach(() => {
            values = deepFreeze({
                andreInntektskilder: [],
                fom: new Date("2016-07-18"),
                tom: new Date("2016-07-24"),
                aktiviteter:  [
                    {
                        periode: {
                            fom: new Date("2016-07-15"),
                            tom: new Date("2016-07-20")
                        },
                        grad: 100,
                        avvik: null
                    },
                    {
                        periode: {
                            fom: new Date("2016-07-21"),
                            tom: new Date("2016-07-25")
                        },
                        grad: 60,
                        avvik: null
                    },
                    {
                        periode: {
                            fom: new Date("2016-07-26"),
                            tom: new Date("2016-07-30")
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

        it("Skal hente ut aktiviteter basert på fom/tom", () => {
            const res = mapToInitialValues(values);
            expect(res.aktiviteter.length).to.equal(2);
            expect(res.aktiviteter).to.deep.equal([
                {
                    periode: {
                        fom: new Date("2016-07-18"),
                        tom: new Date("2016-07-20")
                    },
                    grad: 100,
                    avvik: {}
                },
                {
                    periode: {
                        fom: new Date("2016-07-21"),
                        tom: new Date("2016-07-24")
                    },
                    grad: 60,
                    avvik: {}
                }
            ]);
        }); 

    });

});