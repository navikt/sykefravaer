import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import DineSykmeldingOpplysninger from "../../js/components/sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import SykmeldingPerioder from "../../js/components/sykmeldingOpplysninger/SykmeldingPerioder";
import FlereOpplysninger from "../../js/components/sykmeldingOpplysninger/FlereOpplysninger";

describe("DineSykmeldingOpplysninger", () => {

    let component;

    it("Skal vise perioder", () => {
        component = shallow(<DineSykmeldingOpplysninger sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(SykmeldingPerioder)).to.have.length(1)
    });

    it("Skal vise avsender", () => {
        expect(component.find(".js-avsender").text()).to.contain("Ove Olsen");
    });

    it("Skal ikke vise avsender dersom det ikke finnes", () => {
        const getState = {
            ledetekster: { ledetekster },
        };

        component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
            bekreftelse: {
                sykmelder: null
            }
        })} ledetekster={ledetekster}/>);
        expect(component.find(".js-avsender").length).to.equal(0);
    });

    it("Skal vise arbeidsgiver", () => {
        expect(component.find(".js-arbeidsgiver").text()).to.equal("Selskapet AS");
    });

    it("Skal ikke vise arbeidsgiver dersom det ikke finnes", () => {
        const getState = {
            ledetekster: { ledetekster },
        };

        component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
            arbeidsgiver: null
        })} ledetekster={ledetekster}/>)
        expect(component.find(".js-arbeidsgiver").length).to.equal(0);
    });


    it("Viser flere opplysninger", () => {
        const getState = {
            ledetekster: { ledetekster },
        };

        component = shallow(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
            friskmelding: {
                antarReturSammeArbeidsgiver: true
            }
        })} ledetekster={ledetekster}/>)
        expect(component.find(FlereOpplysninger)).to.have.length(1);
    })

    describe("hensynPaaArbeidsplassen", () => {

        it("Skal vise hensyn dersom feltet er utfylt", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                friskmelding: {
                    hensynPaaArbeidsplassen: "Tekst"
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-hensynPaaArbeidsplassen").text()).to.equal("Tekst");
        })

        it("Skal ikke vise hensyn dersom feltet ikke er utfylt", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                friskmelding: {
                    hensynPaaArbeidsplassen: null
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-hensynPaaArbeidsplassen").length).to.equal(0);
        })

    });

    describe("hoveddiagnose", () => {

        it("Skal vise hoveddiagnose dersom den finnes", () => {
            expect(component.find(".js-hoveddiagnose").text()).to.equal("Influensa")
            expect(component.find(".js-hoveddiagnose-kode").text()).to.contain("LP2")
            expect(component.find(".js-hoveddiagnose-system").text()).to.contain("ICPC")
        });

        it("Skal ikke vise hoveddiagnose dersom den ikke finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    hoveddiagnose: null
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-hoveddiagnose").length).to.equal(0)
            expect(component.find(".js-hoveddiagnose-kode").length).to.equal(0)
            expect(component.find(".js-hoveddiagnose-system").length).to.equal(0)
        });
    });


    describe("Bidiagnose", () => {

        it("Skal ikke vise bidiagnose dersom det ikke finnes", () => {
            expect(component.find(".js-bidiagnose").length).to.equal(0);
        });

        it("Skal vise hoveddiagnose dersom det finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    bidiagnoser: [{
                        diagnose: "Mageknipe",
                        diagnosesystem: "IZPZ",
                        diagnosekode: "LP3"
                    }]
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-bidiagnose").text()).to.equal("Mageknipe")
            expect(component.find(".js-bidiagnose-kode").text()).to.contain("LP3")
            expect(component.find(".js-bidiagnose-system").text()).to.contain("IZPZ")
        });

    });

    describe("Svangerskapsrelatert", () => {
        it("Skal ikke vise svangerskap dersom svangerskap !== true", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    svangerskap: null
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-svangerskap").length).to.equal(0);
        });

        it("Skal vise svangerskap dersom svangerskap === true", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    svangerskap: true
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-svangerskap").length).to.equal(1);
            expect(component.find(".js-svangerskap").text()).to.equal("Sykdommen er svangerskapsrelatert")
        });

    });

    describe("Yrkesskade", () => {
        it("Skal ikke vise yrkesskadeDato dersom yrkesskadeDato !== true", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    yrkesskadeDato: null
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-yrkesskadeDato").length).to.equal(0);
        });

        it("Skal vise yrkesskade dersom yrkesskadeDato === (dato)", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    yrkesskadeDato: { year: 2015, monthValue: 12, dayOfMonth: 31 }
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-yrkesskade").length).to.equal(1);
            expect(component.find(".js-yrkesskade").text()).to.equal("Sykdommen kan skyldes en skade/yrkessykdom")
            expect(component.find(".js-yrkesskadeDato").text()).to.contain("31.12.2015")
        });
    })

    describe("Lovfestet fraværsgrunn", () => {

        it("Skal ikke vise Lovfestet fraværsgrunn dersom det ikke finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    fravaersgrunnLovfestet: null
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-fravaersgrunnLovfestet").length).to.equal(0);
        });

        it("Skal vise Lovfestet fraværsgrunn dersom det finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    fravaersgrunnLovfestet: "Min gode grunn"
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-fravaersgrunnLovfestet").text()).to.equal("Min gode grunn");
        });

    });

    describe("Beskriv fravær", () => {

        it("Skal ikke vise Beskriv fravær dersom det ikke finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    fravaerBeskrivelse: null
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-fravaerBeskrivelse").length).to.equal(0);
        });

        it("Skal vise Beskriv fravær dersom det finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(<DineSykmeldingOpplysninger sykmelding={getSykmelding({
                diagnose: {
                    fravaerBeskrivelse: "Beskrivelse av fraværet"
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-fravaerBeskrivelse").text()).to.equal("Beskrivelse av fraværet");
        });

    });

    xdescribe("Arbeidsfør etter perioden", () => {

        it("Skal vise arbeidsfør etter perioden dersom sykmelding.arbeidsfoerEtterPerioden === true", () => {
            let component = shallow(<DinSykmelding sykmelding={{
                "id": 25,
                "fnr": "***REMOVED***",
                "fornavn": "FRIDA",
                "etternavn": "FROSK",
                "sykmelder": "Victor Frankenstein",
                "sykmelderTlf": "Tel:67151410",
                "arbeidsgiver": "PROMMEN BARNEHAVE",
                "hoveddiagnose": {
                    "diagnose": "TENDINITT INA",
                    "diagnosekode": "L87",
                    "diagnosesystem": "ICPC-2"
                },
                "bidiagnoser": [{
                    "diagnose": "GANGLION SENE",
                    "diagnosekode": "L87",
                    "diagnosesystem": "ICPC-2"
                }],
                "fravaersgrunnLovfestet": "CS",
                "fravaerBeskrivelse": "Vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider",
                "arbeidsfoerEtterPerioden": true,
                "svangerskap": true,
                "yrkesskade": true,
                "yrkesskadeDato": { year: 2016, monthValue: 4, dayOfMonth: 26 },
                "avventendeSykemeldingInnspillArbeidsgiver": null,
                "hensynPaaArbeidsplassen": "Må ta det pent",
                "antarReturSammeArbeidsgiver": false,
                "antattDatoReturSammeArbeidsgiver": null,
                "antarReturAnnenArbeidsgiver": false,
                "tilbakemeldingReturArbeid": null,
                "utenArbeidsgiverAntarTilbakeIArbeid": true,
                "utenArbeidsgiverAntarTilbakeIArbeidDato": { year: 2016, monthValue: 5, dayOfMonth: 20 },
                "utenArbeidsgiverTilbakemelding": { year: 2016, monthValue: 4, dayOfMonth: 30 },
                "perioder": [{
                    "fom": { year: 2016, monthValue: 5, dayOfMonth: 3 },
                    "tom": { year: 2016, monthValue: 5, dayOfMonth: 14 },
                    "grad": 100,
                    "behandlingsdager": null,
                    "reisetilskudd": null,
                    "avventende": null
                }],
                "startLegemeldtFravaer": { year: 2016, monthValue: 5, dayOfMonth: 3 },
                "aktivitetIkkeMulig433": [],
                "aktivitetIkkeMulig434": [],
                "aarsakAktivitetIkkeMulig433": null,
                "aarsakAktivitetIkkeMulig434": null,
                "sykehistorie": null,
                "paavirkningArbeidsevne": null,
                "resultatAvBehandling": null,
                "henvisningUtredningBehandling": null,
                "tilretteleggingArbeidsplass": "Fortsett som sist.",
                "tiltakNAV": "Pasienten har plager som er kommet tilbake etter operasjon. DEt er nylig tatt MR bildet som vier forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. Avhenger av funksjon og vurdering hos spesialist i ortopedi.",
                "tiltakAndre": "Drikk tran og gå lange turer",
                "navBoerTaTakISaken": true,
                "navBoerTaTakISakenBegrunnelse": "Hjelp fra NAV mottas med takk!",
                "innspillTilArbeidsgiver": "Arbeidsgiver bør skjerpe seg!",
                "dokumenterbarPasientkontakt": null,
                "tilbakedatertBegrunnelse": "Det har ikke vært mulig å kontakte pasient.",
                "utstedelsesdato": { year: 2016, monthValue: 5, dayOfMonth: 2 }
            }} ledetekster={ledetekster}/>);
            expect(component.find(".js-arbeidsfoerEtterPerioden").length).to.equal(1);
            expect(component.find(".js-arbeidsfoerEtterPerioden").text()).to.equal("Pasienten er 100 % arbeidsfør etter perioden");
        });

        it("Skal ikke vise arbeidsfør etter perioden dersom arbeidsfør etter perioden === false", () => {
            let component = shallow(<DinSykmelding sykmelding={{
                "id": 25,
                "fnr": "***REMOVED***",
                "fornavn": "FRIDA",
                "etternavn": "FROSK",
                "sykmelder": "Victor Frankenstein",
                "sykmelderTlf": "Tel:67151410",
                "arbeidsgiver": "PROMMEN BARNEHAVE",
                "hoveddiagnose": {
                    "diagnose": "TENDINITT INA",
                    "diagnosekode": "L87",
                    "diagnosesystem": "ICPC-2"
                },
                "bidiagnoser": [{
                    "diagnose": "GANGLION SENE",
                    "diagnosekode": "L87",
                    "diagnosesystem": "ICPC-2"
                }],
                "fravaersgrunnLovfestet": "CS",
                "fravaerBeskrivelse": "Vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider",
                "arbeidsfoerEtterPerioden": false,
                "svangerskap": true,
                "yrkesskade": true,
                "yrkesskadeDato": { year: 2016, monthValue: 4, dayOfMonth: 26 },
                "avventendeSykemeldingInnspillArbeidsgiver": null,
                "hensynPaaArbeidsplassen": "Må ta det pent",
                "antarReturSammeArbeidsgiver": false,
                "antattDatoReturSammeArbeidsgiver": null,
                "antarReturAnnenArbeidsgiver": false,
                "tilbakemeldingReturArbeid": null,
                "utenArbeidsgiverAntarTilbakeIArbeid": true,
                "utenArbeidsgiverAntarTilbakeIArbeidDato": { year: 2016, monthValue: 5, dayOfMonth: 20 },
                "utenArbeidsgiverTilbakemelding": { year: 2016, monthValue: 4, dayOfMonth: 30 },
                "perioder": [{
                    "fom": { year: 2016, monthValue: 5, dayOfMonth: 3 },
                    "tom": { year: 2016, monthValue: 5, dayOfMonth: 14 },
                    "grad": 100,
                    "behandlingsdager": null,
                    "reisetilskudd": null,
                    "avventende": null
                }],
                "startLegemeldtFravaer": { year: 2016, monthValue: 5, dayOfMonth: 3 },
                "aktivitetIkkeMulig433": [],
                "aktivitetIkkeMulig434": [],
                "aarsakAktivitetIkkeMulig433": null,
                "aarsakAktivitetIkkeMulig434": null,
                "sykehistorie": null,
                "paavirkningArbeidsevne": null,
                "resultatAvBehandling": null,
                "henvisningUtredningBehandling": null,
                "tilretteleggingArbeidsplass": "Fortsett som sist.",
                "tiltakNAV": "Pasienten har plager som er kommet tilbake etter operasjon. DEt er nylig tatt MR bildet som vier forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. Avhenger av funksjon og vurdering hos spesialist i ortopedi.",
                "tiltakAndre": "Drikk tran og gå lange turer",
                "navBoerTaTakISaken": true,
                "navBoerTaTakISakenBegrunnelse": "Hjelp fra NAV mottas med takk!",
                "innspillTilArbeidsgiver": "Arbeidsgiver bør skjerpe seg!",
                "dokumenterbarPasientkontakt": null,
                "tilbakedatertBegrunnelse": "Det har ikke vært mulig å kontakte pasient.",
                "utstedelsesdato": { year: 2016, monthValue: 5, dayOfMonth: 2 }
            }} ledetekster={ledetekster}/>);
            expect(component.find(".js-arbeidsfoerEtterPerioden").length).to.equal(0);
        });

    });

}); 