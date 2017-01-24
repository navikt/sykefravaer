import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import AktiviteterISykmeldingsperioden, { Perioder, Periode, GradertPeriode, Inntektskilder, Utdanning } from '../../../../js/components/sykepengesoknad/Oppsummering/AktiviteterISykmeldingsperioden';
import { Avkrysset } from '../../../../js/components/sykepengesoknad/Oppsummering/opplysninger';
import { soknad } from './soknad';

describe("AktiviteterISykmeldingsperioden", () => {

    let component;
    let getSoknad = (_soknad) => {
      return Object.assign({}, soknad, _soknad);
    }
    let getSykmelding = (sykmelding) => {
        return Object.assign({}, {
            id: "3456789",
            pasient: {
                fnr: "***REMOVED***",
                fornavn: "Per",
                etternavn: "Person",
            },
            arbeidsgiver: "Selskapet AS",
            orgnummer: "123456789",
            status: 'NY',
            identdato: { year: 2015, monthValue: 12, dayOfMonth: 31 },
            diagnose: {
                hoveddiagnose: {
                    diagnose: "Influensa",
                    diagnosesystem: "ICPC",
                    diagnosekode: "LP2"
                },
            },
            mulighetForArbeid: {
                perioder: [{
                    grad: 50,
                        fom: { year: 2017, monthValue: 1, dayOfMonth: 1 },
                        tom: { year: 2017, monthValue: 1, dayOfMonth: 15 },
                    }, {
                    grad: 100,
                    fom: { year: 2017, monthValue: 1, dayOfMonth: 16 },
                    tom: { year: 2017, monthValue: 1, dayOfMonth: 31 },
                }],
            },
            friskmelding: {
                arbeidsfoerEtterPerioden: true,
            },
            utdypendeOpplysninger: {},
            arbeidsevne: {},
            meldingTilNav: {},
            tilbakedatering: {},
            bekreftelse: {
                sykmelder: "Ove Olsen",
                utstedelsesdato: { year: 2016, monthValue: 5, dayOfMonth: 2 }
            },
        }, sykmelding)
    }

    describe("Perioder", () => {
        let component;

        beforeEach(() => {
            component = shallow(<Perioder soknad={soknad} sykmelding={getSykmelding()} />);
        });

        it("Skal vise en periode og en gradert periode", () => {     
            expect(component.find(Periode)).to.have.length(1);
            expect(component.find(GradertPeriode)).to.have.length(1);
        });

    });

    describe("AktiviteterISykmeldingsperioden", () => {

        let component;

        beforeEach(() => {
            component = mount(<AktiviteterISykmeldingsperioden soknad={soknad} sykmelding={getSykmelding()} />);
        })

        it("Skal inneholde Perioder", () => {
            expect(component.find(Perioder)).to.have.length(1);
        });

        it("Skal inneholde Inntektskilder", () => {
            expect(component.find(Inntektskilder)).to.have.length(1);
        })

        it("Skal inneholde Utdanning", () => {
            expect(component.find(Utdanning)).to.have.length(1);
        })

    });

    describe("Periode med gradering", () => {
        let component;

        beforeEach(() => {
            const sykmelding = getSykmelding();
            component = render(<GradertPeriode soknadPeriode={soknad.perioder[0]} sykmeldingPeriode={sykmelding.mulighetForArbeid.perioder[0]} />);
        })

        it("Skal vise spørsmål som inneholder perioden og gradering", () => {
            expect(component.text()).to.contain("I perioden 01.01.2017 - 15.01.2017 skulle du jobbe 50 % av din normale arbeidstid hos SOLSTRÅLEN BARNEHAGE.");
        });

        it("Skal vise spørsmål Har du jobbet mer enn dette?", () => {
            expect(component.text()).to.contain("Har du jobbet mer enn dette?");
            expect(component.text()).to.contain("Ja")
        });

        it("Skal vise spørsmål om gjennomsnittlig jobbing", () => {
            expect(component.text()).to.contain("Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos SOLSTRÅLEN BARNEHAGE?");
            expect(component.text()).to.contain("80 prosent totalt per uke");
        });

        it("Skal vise spørsmål om normal jobbing", () => {
            expect(component.text()).to.contain("Hvor mange timer jobber du normalt per uke?");
            expect(component.text()).to.contain("37 timer");
        });

    });

    describe("Periode uten gradering", () => {
        let component;

        beforeEach(() => {
            const sykmelding = getSykmelding();
            component = render(<Periode soknadPeriode={soknad.perioder[1]} sykmeldingPeriode={sykmelding.mulighetForArbeid.perioder[1]} />);
        })

        it("Skal vise spørsmål som inneholder perioden og gradering", () => {
            expect(component.text()).to.contain("I perioden 16.01.2017 - 31.01.2017 var du 100 % sykmeldt fra SOLSTRÅLEN BARNEHAGE.");
        });

        it("Skal vise spørsmål Har du jobbet noe?", () => {
            expect(component.text()).to.contain("Har du jobbet noe?");
            expect(component.text()).to.contain("Ja")
        });

        it("Skal vise spørsmål om gjennomsnittlig jobbing", () => {
            expect(component.text()).to.contain("Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos SOLSTRÅLEN BARNEHAGE?");
            expect(component.text()).to.contain("80 prosent totalt per uke");
        });

        it("Skal ikke vise spørsmål om normal jobbing", () => {
            expect(component.text()).not.to.contain("Hvor mange timer jobber du normalt per uke?");
        });

    });

    describe("Inntektskilder", () => {

        let component;

        describe("Hvis man ikke har andre inntektskilder", () => {

            beforeEach(() => {
                component = render(<Inntektskilder soknad={getSoknad({
                    harAndreInntektskilder: false
                })} />)
            });

            it("Skal vise spørsmål om inntektskilder", () => {
                expect(component.text()).to.contain("Har du andre inntektskilder enn SOLSTRÅLEN BARNEHAGE?");
                expect(component.text()).to.contain("Nei")
            });

            it("Skal ikke spørre om hvilke inntektskilder dette er", () => {
                expect(component.text()).not.to.contain("Hvilke inntektskilder har du?");
            });

        });

        describe("Hvis man har andre inntektskilder", () => {
            beforeEach(() => {
                component = render(<Inntektskilder soknad={getSoknad({
                    harAndreInntektskilder: true,
                })} />)
            });

            it("SKal spørre om hvilke inntektskilder dette er", () => {
                expect(component.text()).to.contain("Hvilke inntektskilder har du?");
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
                component = render(<Utdanning soknad={getSoknad({
                    underUtdanning: false
                })} />);
            })

            it("Skal spørre om man var under utdanning", () => {
                expect(component.text()).to.contain("Har du vært under utdanning i løpet av perioden 01.01.2017 - 31.01.2017?");
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
                component = render(<Utdanning soknad={getSoknad({
                    underUtdanning: true,
                    utdanningStartdato: "15.01.2017",
                    erUtdanningFulltidsstudium: true
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