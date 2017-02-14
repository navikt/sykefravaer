import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import AktiviteterISykmeldingsperioden, { Aktiviteter, Aktivitet, Inntektskilder, Utdanning } from '../../../../js/components/sykepengesoknad/Oppsummering/AktiviteterISykmeldingsperioden';
import { Avkrysset } from '../../../../js/components/sykepengesoknad/Oppsummering/opplysninger';
import { getSoknad } from '../../../mockSoknader';
import ledetekster from '../../../ledetekster_mock';


describe("AktiviteterISykmeldingsperioden (Oppsummering)", () => {

    let component;
    let sykepengesoknad;

    beforeEach(() => {
        sykepengesoknad = getSoknad();
    });

    describe("Aktiviteter", () => {
        let component;

        beforeEach(() => {
            component = shallow(<Aktiviteter sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />);
        });

        it("Skal vise to Aktivitet", () => {     
            expect(component.find(Aktivitet)).to.have.length(2);
        });

        it("Skal sende arbeidsgiver videre til hver Aktivitet", () => {
            expect(component.find(Aktivitet).first().prop("arbeidsgiver")).to.equal("BYGGMESTER BLOM AS")
        })

    });

    describe("AktiviteterISykmeldingsperioden", () => {

        let component;

        beforeEach(() => {
            component = mount(<AktiviteterISykmeldingsperioden sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />);
        })

        it("Skal inneholde Aktiviteter", () => {
            expect(component.find(Aktiviteter)).to.have.length(1);
        });

        it("Skal inneholde Inntektskilder", () => {
            expect(component.find(Inntektskilder)).to.have.length(1);
        });

        it("Skal inneholde Utdanning", () => {
            expect(component.find(Utdanning)).to.have.length(1);
        });

    });

    describe("Periode med gradering", () => {

        let component;
        let soknad;

        describe("Med avvik", () => {
            beforeEach(() => {
                soknad = getSoknad({
                    aktiviteter: [{
                      "periode": {
                        "fom": "2017-01-01",
                        "tom": "2017-01-15"
                      },
                      "grad": 100,
                      "avvik": null
                    }, {
                      "periode": {
                        "fom": "2017-01-16",
                        "tom": "2017-01-30"
                      },
                      "grad": 30,
                      "avvik": {
                        "arbeidsgrad": 80,
                        "arbeidstimerNormalUke": "37,5"
                      }
                    }]
                });
                component = mount(<Aktivitet ledetekster={ledetekster} arbeidsgiver="BYGGMESTER BLOM AS" aktivitet={soknad.aktiviteter[1]} />);
            });

            it("Skal vise spørsmål som inneholder perioden og gradering", () => {
                expect(component.text()).to.contain("I perioden 16.01.2017 - 30.01.2017 skulle du jobbe 70 % av din normale arbeidstid hos BYGGMESTER BLOM AS");
            });

            it("Skal vise spørsmål Har du jobbet mer enn dette?", () => {
                expect(component.text()).to.contain("Har du jobbet mer enn dette?");
                expect(component.text()).to.contain("Ja")
            });

            it("Skal vise spørsmål om gjennomsnittlig jobbing", () => {
                expect(component.text()).to.contain("Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos BYGGMESTER BLOM AS");
                expect(component.text()).to.contain("80 prosent totalt per uke");
            });

            it("Skal vise spørsmål om normal jobbing", () => {
                expect(component.text()).to.contain("Hvor mange timer jobber du normalt per uke?");
                expect(component.text()).to.contain("37,5 timer");
            });

            it("Skal vise avvik", () => {
                expect(component.find(".js-avvik")).to.have.length(1);
            });

        });

        describe("Uten avvik", () => {
            beforeEach(() => {
                soknad = getSoknad({
                    aktiviteter: [{
                      "periode": {
                        "fom": "2017-01-01",
                        "tom": "2017-01-15"
                      },
                      "grad": 100,
                      "avvik": null
                    }, {
                      "periode": {
                        "fom": "2017-01-16",
                        "tom": "2017-01-30"
                      },
                      "grad": 30,
                      "avvik": null
                    }]
                });
                component = mount(<Aktivitet ledetekster={ledetekster} arbeidsgiver="BYGGMESTER BLOM AS" ledetekster={ledetekster} aktivitet={soknad.aktiviteter[1]} />);
            });

            it("Skal vise spørsmål som inneholder perioden og gradering", () => {
                expect(component.text()).to.contain("I perioden 16.01.2017 - 30.01.2017 skulle du jobbe 70 % av din normale arbeidstid hos BYGGMESTER BLOM AS");
            });

            it("Skal vise spørsmål Har du jobbet mer enn dette?", () => {
                expect(component.text()).to.contain("Har du jobbet mer enn dette?");
                expect(component.text()).to.contain("Nei")
            });

            it("Skal ikke vise spørsmål om gjennomsnittlig jobbing", () => {
                expect(component.text()).not.to.contain("Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos BYGGMESTER BLOM AS");
            });

            it("Skal vise spørsmål om normal jobbing", () => {
                expect(component.text()).not.to.contain("Hvor mange timer jobber du normalt per uke?");
            });

            it("Skal ikke vise avvik", () => {
                expect(component.find(".js-avvik")).to.have.length(0);
            });

        });

    });

    describe("Periode uten gradering uten avvik", () => {
        let component;

        beforeEach(() => {
            const soknad = getSoknad({
                aktiviteter: [{
                  "periode": {
                    "fom": "2017-01-01",
                    "tom": "2017-01-15"
                  },
                  "grad": 100,
                  "avvik": null
                }, {
                  "periode": {
                    "fom": "2017-01-16",
                    "tom": "2017-01-30"
                  },
                  "grad": 30,
                  "avvik": null
                }]
            });
            component = render(<Aktivitet ledetekster={ledetekster} arbeidsgiver="BYGGMESTER BLOM AS" aktivitet={soknad.aktiviteter[0]} />);
        })

        it("Skal vise spørsmål som inneholder perioden og gradering", () => {
            expect(component.text()).to.contain("I perioden 01.01.2017 - 15.01.2017 skulle du ikke jobbe hos BYGGMESTER BLOM AS.");
        });

        it("Skal vise spørsmål Har du jobbet noe?", () => {
            expect(component.text()).to.contain("Har du jobbet?");
            expect(component.text()).to.contain("Nei")
        });

        it("Skal ikke vise avvik", () => {
            expect(component.find(".js-avvik")).to.have.length(0);
        });

    });

    describe("Periode uten gradering med avvik", () => {
        let component;

        beforeEach(() => {
            const soknad = getSoknad({
                aktiviteter: [{
                  "periode": {
                    "fom": "2017-01-01",
                    "tom": "2017-01-15"
                  },
                  "grad": 100,
                  "avvik": {
                    timer: 7,
                    arbeidstimerNormalUke: 39
                  }
                }, {
                  "periode": {
                    "fom": "2017-01-16",
                    "tom": "2017-01-30"
                  },
                  "grad": 30,
                  "avvik": null
                }]
            });
            component = render(<Aktivitet ledetekster={ledetekster} arbeidsgiver="BYGGMESTER BLOM AS" aktivitet={soknad.aktiviteter[0]} />);
        })

        it("Skal vise avvik", () => {
            expect(component.find(".js-avvik")).to.have.length(1);
        });

    });

    describe("Inntektskilder", () => {

        let component;

        describe("Hvis man ikke har andre inntektskilder", () => {

            beforeEach(() => {
                component = render(<Inntektskilder ledetekster={ledetekster} sykepengesoknad={getSoknad({
                    andreInntektskilder: [],
                })} />)
            });

            it("Skal vise spørsmål om inntektskilder", () => {
                expect(component.text()).to.contain("Har du andre inntektskilder enn BYGGMESTER BLOM AS");
                expect(component.text()).to.contain("Nei")
            });

            it("Skal ikke spørre om hvilke inntektskilder dette er", () => {
                expect(component.text()).not.to.contain("Hvilke andre inntektskilder har du?");
            });

        });

        describe("Hvis man har andre inntektskilder", () => {
            beforeEach(() => {
                component = render(<Inntektskilder ledetekster={ledetekster} sykepengesoknad={getSoknad({
                    andreInntektskilder: [{
                        annenInntektskildeType: "ANDRE_ARBEIDSFORHOLD",
                        sykmeldt: true
                    }, {
                        annenInntektskildeType: "FRILANSER",
                        sykmeldt: false
                    }, {
                        annenInntektskildeType: "ANNET",
                        sykmeldt: false
                    }],
                })} />)
            });

            it("SKal spørre om hvilke inntektskilder dette er", () => {
                expect(component.text()).to.contain("Hvilke andre inntektskilder har du?");
            })
            
            it("Skal liste opp inntektskildene", () => {
                expect(component.text()).to.contain("Andre arbeidsforhold");
                expect(component.text()).to.contain("Frilanser");
                expect(component.text()).to.contain("Annet");
                expect(component.text()).not.to.contain("Selvstendig næringsdrivende");
            });

            it("Skal spørre om bruker er sykmeldt", () => {
                expect(component.find(".js-inntektskilde-sykmeldt")).to.have.length(2);
                expect(component.find(".js-inntektskilde-sykmeldt").first().text()).to.contain("Ja")
                expect(component.find(".js-inntektskilde-sykmeldt").last().text()).to.contain("Nei")
            });

        })

    });

    describe("Utdanning", () => {

        let component;

        describe("Dersom man ikke har vært under utdanning", () => {
            beforeEach(() => {
                component = render(<Utdanning ledetekster={ledetekster} sykepengesoknad={getSoknad({
                    utdanning: null
                })} />);
            })

            it("Skal spørre om man var under utdanning", () => {
                expect(component.text()).to.contain("Har du vært under utdanning i løpet av perioden 01.01.2017 - 25.01.2017?");
                expect(component.text()).to.contain("Nei");
            });

            it("Skal ikke spørre og vise svar på om utdanningen er et fulltidsstudium", () => {
                expect(component.find(".js-utdanning-fulltid")).to.have.length(0)
            });


            it("Skal ikke spørre og vise svar på om utdanningen er et fulltidsstudium", () => {
                expect(component.find(".js-utdanning-start")).to.have.length(0)
            });
        });

        describe("Dersom man har vært under utdanning", () => {
            beforeEach(() => {
                component = render(<Utdanning ledetekster={ledetekster} sykepengesoknad={getSoknad({
                    utdanning: {
                        utdanningStartdato: "2017-01-15",
                        erUtdanningFulltidsstudium: true
                    }
                })} />);
            })

            it("Skal spørre og vise svar på når utdanningen startet", () => {
                expect(component.find(".js-utdanning-start").text()).to.contain("Når startet du på utdanningen?");
                expect(component.find(".js-utdanning-start").text()).to.contain("15.01.2017");
            });

            it("Skal spørre og vise svar på om utdanningen er et fulltidsstudium", () => {
                expect(component.find(".js-utdanning-fulltid").text()).to.contain("Er utdanningen et fulltidsstudium?");
                expect(component.find(".js-utdanning-fulltid").text()).to.contain("Ja");
            });
        })


    });

});