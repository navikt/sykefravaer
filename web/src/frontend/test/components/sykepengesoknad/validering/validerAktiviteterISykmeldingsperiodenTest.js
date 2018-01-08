import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import validate, {
    antallFeil,
    ikkeJobbetMerEnnGraderingProsentFeil,
    ikkeJobbetMerEnnGraderingTimerFeil,
    antallTimerErMerEnn100ProsentFeil,
    normaltAntallFeil,
    overHundreFeil,
    overHundreogfemtiFeil,
    jobbetMerEnnPlanlagtFeil,
    sammeNormalAntallFeil } from '../../../../js/components/sykepengesoknad/validering/validerAktiviteterISykmeldingsperioden';
import { inntektskildetyper } from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AndreInntektskilder';
import { getSoknad } from '../../../mockSoknader';

describe("validerAktiviteterISykmeldingsperioden", () => {

    let values; 
    let sykepengesoknad;
    let sendTilFoerDuBegynner;

    beforeEach(() => {
        values = {
            "ansvarBekreftet":true,
            "bruktEgenmeldingsdagerFoerLegemeldtFravaer":false,
            "harGjenopptattArbeidFulltUt":false,
            "harHattFeriePermisjonEllerUtenlandsopphold":false
        };
        sykepengesoknad = getSoknad({
            "aktiviteter": [{
                "periode": {
                    "fom": "2017-01-01",
                    "tom": "2017-01-15"
                },
                "grad": 100,
                "avvik": null
            }, {
                "periode": {
                    "fom": "2017-16-01",
                    "tom": "2017-16-25"
              },
              "grad": 50,
              "avvik": null,
            }]
        });
        sendTilFoerDuBegynner = sinon.spy();
    });

    it("Skal returnere undefined når alt er OK", () => {
        const values = {
            "aktiviteter":[{"jobbetMerEnnPlanlagt":false},{"jobbetMerEnnPlanlagt":false}],
            "harAndreInntektskilder":false,
            "utdanning": {
                "underUtdanningISykmeldingsperioden": false
            }
        };
        const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
        expect(res).to.deep.equal({})
    });

    it("Skal kalle på sendTilFoerDuBegynner dersom alt fra side 1 + 2 ikke er fylt ut", () => {
        values = {};
        const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
        expect(sendTilFoerDuBegynner.calledWith(sykepengesoknad)).to.be.true;
    });

    it("Skal ikke kalle på sendTilFoerDuBegynner dersom alt fra side 1 + 2 ikke er fylt ut", () => {
        validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
        expect(sendTilFoerDuBegynner.called).to.be.false;
    });

    describe("Aktivitet", () => {

        it("Skal funke når aktiviteter ikke er oppgitt", () => {
            const values = {};
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(typeof res).to.equal("object")
        });

        it("Skal validere alle aktiviteter i søknaden", () => {
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter).to.have.length(2); 
            expect(res.aktiviteter[0].jobbetMerEnnPlanlagt).to.equal(jobbetMerEnnPlanlagtFeil);
            expect(res.aktiviteter[1].jobbetMerEnnPlanlagt).to.equal(jobbetMerEnnPlanlagtFeil);
        });

        it("Skal validere alle aktiviteter i sykmeldingen når man ikke har jobbet mer enn planlagt", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: false
            }, {
                jobbetMerEnnPlanlagt: false
            }]
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter).to.be.undefined;
        });

        it("Skal validere avvik når man har jobbet mer enn planlagt", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
            }, {
                jobbetMerEnnPlanlagt: true,
            }]
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    arbeidsgrad: antallFeil,
                    arbeidstimerNormalUke: normaltAntallFeil
                }
            }, {
                avvik: {
                    arbeidsgrad: antallFeil,
                    arbeidstimerNormalUke: normaltAntallFeil
                }
            }])
        });

        it("Skal validere avvik når man har jobbet mer enn planlagt og arbeidsgrad er en tom streng", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    arbeidsgrad: "",
                    enhet: "prosent",
                }
            }, {
                jobbetMerEnnPlanlagt: true,
            }]
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    arbeidsgrad: antallFeil,
                    arbeidstimerNormalUke: normaltAntallFeil
                }
            }, {
                avvik: {
                    arbeidsgrad: antallFeil,
                    arbeidstimerNormalUke: normaltAntallFeil
                }
            }])
        });

        it("Skal validere arbeidstimerNormalUke når man har jobbet mer enn planlagt", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    enhet: "timer",
                    timer: "55"
                }
            }, {
                jobbetMerEnnPlanlagt: true,
            }]
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    arbeidstimerNormalUke: normaltAntallFeil
                }
            }, {
                avvik: {
                    arbeidsgrad: antallFeil,
                    arbeidstimerNormalUke: normaltAntallFeil
                }
            }])
        });

        it("Skal validere arbeidsgrad når man har jobbet mer enn planlagt", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    enhet: "timer",
                    arbeidstimerNormalUke: "55",
                }
            }, {
                jobbetMerEnnPlanlagt: true,
            }]
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter[0]).to.deep.equal({
                avvik: {
                    timer: antallFeil,
                }
            });
            expect(res.aktiviteter[1]).to.deep.equal({
                avvik: {
                    arbeidsgrad: antallFeil,
                    arbeidstimerNormalUke: normaltAntallFeil
                }
            })
        });

        it("Skal validere arbeidsgrad når man har jobbet mer enn planlagt og timer er en tom streng", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    timer: "",
                    enhet: "timer",
                    arbeidstimerNormalUke: "55",
                }
            }, {
                jobbetMerEnnPlanlagt: true,
            }]
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter[0]).to.deep.equal({
                avvik: {
                    timer: antallFeil,
                }
            });
            expect(res.aktiviteter[1]).to.deep.equal({
                avvik: {
                    arbeidsgrad: antallFeil,
                    arbeidstimerNormalUke: normaltAntallFeil
                }
            })
        });

        it("Skal ikke validere arbeidsgrad når man har jobbet mer enn planlagt og oppgitt arbeidsgrad", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    arbeidsgrad: "50",
                    enhet: "prosent",
                    arbeidstimerNormalUke: "55"
                }
            }, {
                jobbetMerEnnPlanlagt: true,
            }]
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter).to.deep.equal([{}, {
                avvik: {
                    arbeidsgrad: antallFeil,
                    arbeidstimerNormalUke: normaltAntallFeil
                }
            }])
        });

        it("Skal ikke validere om arbeidsgrad er over 100%", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    arbeidsgrad: 101,
                    enhet: "prosent",
                    arbeidstimerNormalUke: "37,5"
                }
            }, {
                jobbetMerEnnPlanlagt: false,
            }];
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    arbeidsgrad: overHundreFeil,
                }
            }, {}])
        });

        it("Skal ikke validere dersom oppgitt arbeidsgrad er laver enn (100 - sykmeldt grad)", () => {

            let _soknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": "2017-16-01",
                        "tom": "2017-16-25"
                    },
                    "grad": 50,
                    "avvik": null
                }]
            });

            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    arbeidsgrad: 45,
                    enhet: "prosent",
                    arbeidstimerNormalUke: "37,5"
                },
                grad: 50,
            }];

            const res = validate(values, { sykepengesoknad:_soknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    arbeidsgrad: ikkeJobbetMerEnnGraderingProsentFeil,
                }
            }])
        });

        it("Skal ikke validere tall i prosent over 100", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    arbeidsgrad: 101,
                    enhet: "prosent",
                    arbeidstimerNormalUke: "37,5"
                },
                grad: 50,
            }, {
                jobbetMerEnnPlanlagt: false,
            }];

            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    arbeidsgrad: overHundreFeil,
                }
            }, {}])
        });

        it("Skal ikke validere tall i timer over 100", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    timer: "151",
                    enhet: "timer",
                    arbeidstimerNormalUke: "37,5"
                },
                grad: 50,
            }, {
                jobbetMerEnnPlanlagt: false,
            }];

            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    timer: overHundreogfemtiFeil,
                }
            }, {}])
        });

        it("Skal ikke validere normal arbeidstid over 100", () => {
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: false,
            }, {
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    arbeidsgrad: 70,
                    enhet: "prosent",
                    arbeidstimerNormalUke: "101"
                },
                grad: 50,
            }];

            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.deep.equal([{},{
                avvik: {
                    arbeidstimerNormalUke: overHundreFeil,
                }
            }])
        });

        it("Skal ikke validere dersom oppgitt antall timer gir stillingsprosent lavere enn arbeidsgrad", () => {
            const sykmeldingsgrad = 22;
            let _soknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": new Date("2017-08-01"),
                        "tom": new Date("2017-08-02")
                    },
                    "grad": sykmeldingsgrad,
                    "avvik": null
                }]
            });
            // Sykmeldt i 2 dager, skulle da ha jobbet 15 timer
            // Jobbet 3 timer
            // Faktisk arbeidsgrad === 3 / 15 === 0,2 (< 22 %)
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    timer: "3",
                    enhet: "timer",
                    arbeidstimerNormalUke: "37,5"
                },
                grad: sykmeldingsgrad,
            }];

            const res = validate(values, { sykepengesoknad:_soknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    timer: ikkeJobbetMerEnnGraderingTimerFeil,
                }
            }])
        });

        it("Skal ta med ferie/permisjon når arbeidsgrad valideres", () => {
            const sykmeldingsgrad = 22;
            let _soknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": new Date("2017-08-01"),
                        "tom": new Date("2017-08-10")
                    },
                    "grad": sykmeldingsgrad,
                    "avvik": null
                }]
            });
            // Sykmeldt i 8 virkedager, men ferie i 4 dag, skulle da ha jobbet 4 x 7.5 = 30 timer
            // Jobbet 33 timer
            // Faktisk arbeidsgrad === 33 / 30 === 1.1; dvs mer enn 100 %
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    timer: "33",
                    enhet: "timer",
                    arbeidstimerNormalUke: "37,5"
                },
                grad: sykmeldingsgrad,
            }];
            values.harHattFeriePermisjonEllerUtenlandsopphold = true;
            values.harHattFerie = true;
            values.ferie = [{
                fom: "01.08.2017",
                tom: "04.08.2017"
            }];
            const res = validate(values, { sykepengesoknad: _soknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    timer: antallTimerErMerEnn100ProsentFeil,
                }
            }])
        });

        it("Skal bare ta med ferie/permisjon som er innenfor perioden når arbeidsgrad valideres", () => {
            const sykmeldingsgrad = 22;
            let _soknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": new Date("2017-08-01"),
                        "tom": new Date("2017-08-10")
                    },
                    "grad": sykmeldingsgrad,
                    "avvik": null
                }]
            });
            // Sykmeldt i 8 virkedager, men ferie i 4 dag, skulle da ha jobbet 4 x 7.5 = 30 timer
            // Jobbet 33 timer
            // Faktisk arbeidsgrad === 33 / 30 === 1.1; dvs mer enn 100 %
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    timer: "33",
                    enhet: "timer",
                    arbeidstimerNormalUke: "37,5"
                },
                grad: sykmeldingsgrad,
            }];
            values.harHattFeriePermisjonEllerUtenlandsopphold = true;
            values.harHattFerie = true;
            values.ferie = [{
                fom: "20.07.2017",
                tom: "04.08.2017"
            }];
            const res = validate(values, { sykepengesoknad: _soknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    timer: antallTimerErMerEnn100ProsentFeil,
                }
            }])
        });

        it("Skal validere dersom oppgitt antall timer gir stillingsprosent høyere enn arbeidsgrad", () => {
            const sykmeldingsgrad = 75;
            let _soknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": new Date("2017-08-01"),
                        "tom": new Date("2017-08-02")
                    },
                    "grad": sykmeldingsgrad,
                    "avvik": null
                }]
            });
            // Sykmeldt i 2 dager, skulle da ha jobbet 15 timer
            // Jobbet 12 timer
            // Faktisk arbeidsgrad === 12 / 15 === 0,8 (> 75 %)
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    timer: "12",
                    enhet: "timer",
                    arbeidstimerNormalUke: "37,5"
                },
                grad: sykmeldingsgrad,
            }];

            const res = validate(values, { sykepengesoknad:_soknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.be.undefined;
        });

        it("Skal validere dersom oppgitt antall timer gir stillingsprosent høyere enn arbeidsgrad", () => {
            const sykmeldingsgrad = 60;
            let _soknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": new Date("2017-08-18"),
                        "tom": new Date("2017-08-19")
                    },
                    "grad": sykmeldingsgrad,
                    "avvik": null
                }]
            });
            // Sykmeldt i 1 dag (perioden går fra fredag til lørdag), skulle da ha jobbet 7,5 timer
            // Jobbet 4 timer
            // Faktisk arbeidsgrad === 4 / 7,5 === 0,53 (> 40 %)
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    timer: "4",
                    arbeidsgrad: "53",
                    enhet: "timer",
                    arbeidstimerNormalUke: "37,5"
                },
                grad: sykmeldingsgrad,
            }];

            const res = validate(values, { sykepengesoknad:_soknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.be.undefined;
        });

        it("Skal ikke validere dersom oppgitt antall timer gir stillingsprosent helt lik arbeidsgrad", () => {
            const sykmeldingsgrad = 60;
            let _soknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": new Date("2017-08-18"),
                        "tom": new Date("2017-08-19")
                    },
                    "grad": sykmeldingsgrad,
                    "avvik": null
                }]
            });
            // Sykmeldt i 1 dag (perioden går fra fredag til lørdag), skulle da ha jobbet 7,5 timer
            // Jobbet 3 timer
            // Faktisk arbeidsgrad === 3 / 7,5 === 0,40 (=== 40 %)
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    timer: "3",
                    arbeidsgrad: "40",
                    enhet: "timer",
                    arbeidstimerNormalUke: "37,5"
                },
                grad: sykmeldingsgrad,
            }];

            const res = validate(values, { sykepengesoknad:_soknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    timer: ikkeJobbetMerEnnGraderingTimerFeil,
                }
            }])
        });

        it("Skal gi valideringsfeil på timer selv om normal arbeidstid ikke er oppgitt", () => {
            let _soknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": "2017-16-01",
                        "tom": "2017-16-25"
                    },
                    "grad": 50,
                    "avvik": null
                }]
            });

            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    timer: "1000",
                    enhet: "timer",
                },
                grad: 50,
            }];

            const res = validate(values, { sykepengesoknad:_soknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    timer: overHundreogfemtiFeil,
                    arbeidstimerNormalUke: normaltAntallFeil,
                }
            }])
        });

        it("Skal gi valideringsfeil på timer dersom antall oppgitt timer tilsvarer over 100 %", () => {
            let _soknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": new Date("2017-07-31"),
                        "tom": new Date("2017-08-08")
                    },
                    "grad": 60,
                    "avvik": null
                }]
            });
            values.aktiviteter = [{
                jobbetMerEnnPlanlagt: true,
                avvik: {
                    arbeidstimerNormalUke: "50",
                    timer: "71",
                    enhet: "timer"
                },
                grad: 50
            }];

            const res = validate(values, { sykepengesoknad:_soknad, sendTilFoerDuBegynner });

            expect(res.aktiviteter).to.deep.equal([{
                avvik: {
                    timer: "Antall timer tilsvarer over 100 % av din stilling",
                }
            }])
        })

        describe("Samme normale arbeidstid", () => {
            it("Skal kreve at man har oppgitt samme normalarbeidstid for hver periode", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "40"
                    }
                }, {
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "50"
                    }
                }];
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.deep.equal([{
                    avvik: {
                        arbeidstimerNormalUke: sammeNormalAntallFeil,
                    }
                }, {
                    avvik: {
                        arbeidstimerNormalUke: sammeNormalAntallFeil,
                    }
                }])
            });

            it("Skal ikke protestere hvis bruker har oppgitt samme normalarbeidstid for hver periode hvis bruker har jobbet mer enn planlagt i bare en av periodene", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "40"
                    }
                }, {
                    jobbetMerEnnPlanlagt: false,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "50"
                    }
                }];
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.deep.equal(undefined)
            });

            it("Skal ikke protestere hvis bruker har oppgitt samme normalarbeidstid for hver periode", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "40"
                    }
                }, {
                    jobbetMerEnnPlanlagt: false,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "40"
                    }
                }];
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.deep.equal(undefined)
            });

            it("Skal ikke protestere hvis bruker har oppgitt normalarbeidstid og bare har én periode", () => {
                const sykepengesoknad = getSoknad({
                    "aktiviteter": [{
                        "periode": {
                            "fom": "2017-16-01",
                            "tom": "2017-16-25"
                        },
                        "grad": 50,
                        "avvik": null
                    }]
                });
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "40"
                    }
                }];
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.deep.equal(undefined)
            });

            it("Skal ikke protestere på samme normalarbeidstid hvis bruker har oppgitt normalarbeidstid for kun én periode (og tom streng for den andre)", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "40"
                    }
                }, {
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: ""
                    }
                }];
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter[0].avvik).to.be.undefined;
                expect(res.aktiviteter[1].avvik.arbeidstimerNormalUke).to.equal("Vennligst oppgi normalt antall");
            });

            it("Skal ikke protestere på samme normalarbeidstid hvis bruker har oppgitt normalarbeidstid for kun én periode (og ingenting for den andre)", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "40"
                    }
                }, {
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "40",
                        enhet: "prosent",
                    }
                }];
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter[0].avvik).to.be.undefined;
                expect(res.aktiviteter[1].avvik.arbeidstimerNormalUke).to.equal("Vennligst oppgi normalt antall");
            });

        });

    });



    describe("Inntektskilde", () => {

        it("Skal validere hvorvidt brukeren har andre inntektskilder", () => {
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.harAndreInntektskilder).to.equal("Du må svare på om du har andre inntektskilder");
        });

        describe("Dersom brukeren ikke har andre inntektskilder", () => {

            beforeEach(() => {
                values.harAndreInntektskilder = false;
            });

            it("Skal ikke validere hvorvidt brukeren har andre inntektskilder", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.harAndreInntektskilder).to.be.undefined;
            });

            it("Skal ikke validere hvilke inntektskilder", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.andreInntektskilder).to.be.undefined;
            });

        });

        describe("Dersom brukeren har andre inntektskilder", () => {
            let res;
            let values;

            beforeEach(() => {
                values = {
                    harAndreInntektskilder: true,
                    andreInntektskilder: [...inntektskildetyper],
                };
            });

            it("Brukeren må velge hvilken inntektskilde hvis ingenting er utfylt", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.andreInntektskilder).to.deep.equal({
                    _error: "Vennligst oppgi hvilke andre inntektskilder du har"
                })
            });

            it("Brukeren må velge hvilken inntektskilde hvis alt er utfylt", () => {
                values.andreInntektskilder[4] = Object.assign({}, values.andreInntektskilder[4], { avkrysset: false });
                values.andreInntektskilder[3] = Object.assign({}, values.andreInntektskilder[3], { avkrysset: false });
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.andreInntektskilder).to.deep.equal({
                    _error: "Vennligst oppgi hvilke andre inntektskilder du har"
                })
            });

            it("Brukeren må velge hvilken inntektskilde", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.andreInntektskilder).to.deep.equal({
                    _error: "Vennligst oppgi hvilke andre inntektskilder du har"
                })
            });

            it("Brukeren må svare på om han/hun er sykmeldt for hver avkrysset inntektskilde (1)", () => {
                values.andreInntektskilder[0] = Object.assign({}, inntektskildetyper[0], {
                    avkrysset: true,
                }); 
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.andreInntektskilder[0]).to.deep.equal({
                    "sykmeldt": "Vennligst svar på om du er sykmeldt"
                });
            });

            it("Brukeren må svare på om han/hun er sykmeldt for hver avkrysset inntektskilde (2)", () => {
                values.andreInntektskilder[0] = Object.assign({}, inntektskildetyper[0], {
                    sykmeldt: false,
                    avkrysset: true,
                });
                values.andreInntektskilder[4] = Object.assign({}, inntektskildetyper[4], {
                    avkrysset: false,
                });
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.hasOwnProperty("andreInntektskilder")).to.be.false;
            });

            it("Brukeren må svare på om han/hun er sykmeldt for hver avkrysset inntektskilde (3)", () => {
                values.andreInntektskilder[0] = Object.assign({}, inntektskildetyper[0], {
                    avkrysset: true,
                    sykmeldt: true,
                });
                values.andreInntektskilder[4] = Object.assign({}, inntektskildetyper[4], {
                    avkrysset: false,
                });
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.hasOwnProperty("andreInntektskilder")).to.be.false;
            });

            it("Brukeren må ikke svare på om han/hun er sykmeldt for ANNET", () => {
                values.andreInntektskilder[5] = Object.assign({}, inntektskildetyper[5], {
                    avkrysset: true,
                });
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.hasOwnProperty("andreInntektskilder")).to.be.false;
            });

        });

    });


    describe("underUtdanningISykmeldingsperioden", () => {
        it("Skal validere underUtdanningISykmeldingsperioden", () => {
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.utdanning.underUtdanningISykmeldingsperioden).to.equal("Vennligst svar på om du har vært under utdanning");
        })

        describe("Hvis brukeren ikke har vært under utdanning", () => {
            beforeEach(() => {
                values.underUtdanningISykmeldingsperioden = false;
            });

            it("Skal ikke validere underUtdanningISykmeldingsperioden", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.underUtdanningISykmeldingsperioden).to.be.undefined;
            });

        });


        describe("Hvis brukeren har vært under utdanning", () => {
            beforeEach(() => {
                values.utdanning = {
                    underUtdanningISykmeldingsperioden: true,
                };
            });

            it("Skal ikke validere underUtdanningISykmeldingsperioden", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.underUtdanningISykmeldingsperioden).to.be.undefined;
            });

            describe("utdanningStartdato", () => {
                it("Det skal validere dersom feltet ikke er utfylt", () => {
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanning.utdanningStartdato).to.equal("Vennligst oppgi når du startet på utdanningen");
                });

                it("Skal ikke validere dersom felter er utfylt", () => {
                    values.utdanning.utdanningStartdato = "14.01.2017"
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanning.utdanningStartdato).to.be.undefined;
                });

                it("Skal klage sin nød hvis oppgitt dato er etter tom-dato i siste periode i sykmeldingen", () => {
                    const sykepengesoknad = getSoknad({
                        "aktiviteter": [{
                          "periode": {
                            "fom": "2016-07-15T00:00:00.000Z",
                            "tom": "2016-07-20T00:00:00.000Z"
                          },
                          "grad": 100,
                          "avvik": null
                        }],
                    })
                    values.utdanning.utdanningStartdato = "21.07.2016";
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanning.utdanningStartdato).to.equal("Datoen kan ikke være etter sykmeldingsperioden gikk ut den 20.07.2016");
                });

                it("Skal klage sin nød hvis oppgitt dato er etter gjenopptattArbeidFulltUtDato", () => {
                    const sykepengesoknad = getSoknad({
                        "aktiviteter": [{
                          "periode": {
                            "fom": "2016-07-15T00:00:00.000Z",
                            "tom": "2016-07-20T00:00:00.000Z"
                          },
                          "grad": 100,
                          "avvik": null
                        }],
                    })
                    values.utdanning.utdanningStartdato = "21.07.2016";
                    values.gjenopptattArbeidFulltUtDato = "18.07.2016";
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanning.utdanningStartdato).to.equal("Datoen kan ikke være etter sykmeldingsperioden gikk ut den 17.07.2016");
                });

                it("Skal være happy-go-lucky hvis oppgitt dato er samme dag som tom-dato i siste periode i sykmeldingen", () => {
                    const sykepengesoknad = getSoknad({
                        "aktiviteter": [{
                          "periode": {
                            "fom": "2016-07-15T00:00:00.000Z",
                            "tom": "2016-07-20T00:00:00.000Z"
                          },
                          "grad": 100,
                          "avvik": null
                        }],
                    })
                    values.utdanning.utdanningStartdato = "20.07.2016";
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanning.utdanningStartdato).to.be.undefined;
                });

                it("Skal være happy-go-lucky hvis oppgitt dato er før tom-dato i siste periode i sykmeldingen", () => {
                    const sykepengesoknad = getSoknad({
                        "aktiviteter": [{
                          "periode": {
                            "fom": "2016-07-15T00:00:00.000Z",
                            "tom": "2016-07-20T00:00:00.000Z"
                          },
                          "grad": 100,
                          "avvik": null
                        }],
                    })
                    values.utdanning.utdanningStartdato = "19.07.2016";
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanning.utdanningStartdato).to.be.undefined;
                });

            }); 

            describe("erUtdanningFulltidsstudium", () => {
                
                it("Skal validere dersom feltet ikke er utfylt", () => {
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanning.erUtdanningFulltidsstudium).to.equal("Vennligst svar på om utdanningen er et fulltidsstudium");
                });

                it("Skal ikke validere dersom feltet er utfylt med ja", () => {
                    values.utdanning.erUtdanningFulltidsstudium = true;
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanning.erUtdanningFulltidsstudium).to.be.undefined;
                });

                it("Skal ikke validere dersom feltet er utfylt med nei", () => {
                    values.utdanning.erUtdanningFulltidsstudium = false;
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanning.erUtdanningFulltidsstudium).to.be.undefined;
                });

            });

        });

        describe("Hvis brukeren ikke har vært under utdanning", () => {
            beforeEach(() => {
                values.utdanning = {
                    underUtdanningISykmeldingsperioden: false
                }
            })

            it("Skal ikke validere at utdanningStartdato er påkrevd", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.utdanningStartdato).to.be.undefined;
            });

            it("Skal ikke validere at erUtdanningFulltidsstudium er påkrevd", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.erUtdanningFulltidsstudium).to.be.undefined;
            });
        });

    });


});