import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DinSykmelding from "../../js/components/DinSykmelding";
import SykmeldingPerioder from "../../js/components/SykmeldingPerioder";
import KvitteringPanel from "../../js/components/KvitteringPanel";
import ArbeidsgiversSykmelding from "../../js/components/ArbeidsgiversSykmelding";
import FlereOpplysninger from "../../js/components/FlereOpplysninger";

import { Provider } from 'react-redux';


let component;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("DinSykmelding", () => {

    beforeEach(() => {

        const getState = {
            ledetekster: { ledetekster },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
        };
        const store = mockStore(getState);

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>
            </Provider>
        )
    })

    it("Skal vise kvittering dersom status er sendt", () => {
        let sykmelding = getSykmelding();
        sykmelding.status = 'SENDT';
        component = shallow(<DinSykmelding sykmelding={sykmelding} ledetekster={ledetekster}/>);
        expect(component.find(KvitteringPanel)).to.have.length(1)
    });

    it("Skal vise ikke kvittering dersom status ikke er sendt", () => {
        let sykmelding = getSykmelding();
        sykmelding.status = 'NY';
        component = shallow(<DinSykmelding sykmelding={sykmelding} ledetekster={ledetekster}/>);
        expect(component.find(KvitteringPanel)).to.have.length(0)
    });

    it("Skal vise arbedsgiveropplysninger dersom status er sendt", () => {
        let sykmelding = getSykmelding();
        sykmelding.status = 'SENDT';
        component = shallow(<DinSykmelding sykmelding={sykmelding} ledetekster={ledetekster}/>);
        expect(component.find(ArbeidsgiversSykmelding)).to.have.length(1)
    });

    it("Skal ikke vise arbedsgiveropplysninger dersom status ikke er sendt", () => {
        let sykmelding = getSykmelding();
        sykmelding.status = 'NY';
        component = shallow(<DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(ArbeidsgiversSykmelding)).to.have.length(0)
    });

    it("Skal vise perioder", () => {
        component = shallow(<DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(SykmeldingPerioder)).to.have.length(1)
    });

    it("Skal vise avsender", () => {
        expect(component.find(".js-avsender").text()).to.contain("Ove Olsen");
    });

    it("Skal ikke vise avsender dersom det ikke finnes", () => {

        const getState = {
            ledetekster: { ledetekster },
        };
        const store = mockStore(getState);

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding({
            bekreftelse: {
                sykmelder: null
            }
        })} ledetekster={ledetekster}/>
            </Provider>);
        expect(component.find(".js-avsender").length).to.equal(0);
    });

    it("Skal vise arbeidsgiver", () => {
        expect(component.find(".js-arbeidsgiver").text()).to.equal("Selskapet AS");
    });

    it("Skal ikke vise arbeidsgiver dersom det ikke finnes", () => {
        const getState = {
            ledetekster: { ledetekster },
        };
        const store = mockStore(getState);

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding({
            arbeidsgiver: null
        })} ledetekster={ledetekster}/></Provider>)
        expect(component.find(".js-arbeidsgiver").length).to.equal(0);
    });



    it("Skal vise en knapp dersom visSendTilArbeidsgiver === true", () => {
        const getState = {
            ledetekster: { ledetekster },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
        };
        const store = mockStore(getState);

        const brukerinfo = {
            toggleSendTilArbeidsgiver: true,
            strengtFortroligAdresse: false,
        };

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}
                               visSendTilArbeidsgiver={true}/></Provider>);
        expect(component.find(".js-videre")).to.have.length(1);
    });

    it("Skal ikke vise en knapp dersom visSendTilArbeidsgiver === false", () => {
        const getState = {
            ledetekster: { ledetekster },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
        };

        const brukerinfo = {
            toggleSendTilArbeidsgiver: true,
            strengtFortroligAdresse: true,
        };

        const store = mockStore(getState);

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}
                               visSendTilArbeidsgiver={false}/></Provider>);
        expect(component.find(".js-videre")).to.have.length(0);
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
                "bidiagnose": {
                    "diagnose": "GANGLION SENE",
                    "diagnosekode": "L87",
                    "diagnosesystem": "ICPC-2"
                },
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
                "bidiagnose": {
                    "diagnose": "GANGLION SENE",
                    "diagnosekode": "L87",
                    "diagnosesystem": "ICPC-2"
                },
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

    describe("hensynPaaArbeidsplassen", () => {

        it("Skal vise hensyn dersom feltet er utfylt", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}>
                    <DinSykmelding sykmelding={getSykmelding({
                friskmelding: {
                    hensynPaaArbeidsplassen: "Tekst"
                }
            })} ledetekster={ledetekster}/></Provider>);
            expect(component.find(".js-hensynPaaArbeidsplassen").text()).to.equal("Tekst");
        })

        it("Skal ikke vise hensyn dersom feltet ikke er utfylt", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}>
                    <DinSykmelding sykmelding={getSykmelding({
                friskmelding: {
                    hensynPaaArbeidsplassen: null
                }
            })} ledetekster={ledetekster}/></Provider>);
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
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}>
                    <DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    hoveddiagnose: null
                }
            })} ledetekster={ledetekster}/></Provider>)
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
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    bidiagnose: {
                        diagnose: "Mageknipe",
                        diagnosesystem: "IZPZ",
                        diagnosekode: "LP3"
                    }
                }
            })} ledetekster={ledetekster}/></Provider>)
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
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    svangerskap: null
                }
            })} ledetekster={ledetekster}/></Provider>)
            expect(component.find(".js-svangerskap").length).to.equal(0);
        });

        it("Skal vise svangerskap dersom svangerskap === true", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    svangerskap: true
                }
            })} ledetekster={ledetekster}/></Provider>)
            expect(component.find(".js-svangerskap").length).to.equal(1);
            expect(component.find(".js-svangerskap").text()).to.equal("Sykdommen er svangerskapsrelatert")
        });

    });

    describe("Yrkesskade", () => {
        it("Skal ikke vise yrkesskadeDato dersom yrkesskadeDato !== true", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    yrkesskadeDato: null
                }
            })} ledetekster={ledetekster}/></Provider>)
            expect(component.find(".js-yrkesskadeDato").length).to.equal(0);
        });

        it("Skal vise yrkesskade dersom yrkesskadeDato === (dato)", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    yrkesskadeDato: { year: 2015, monthValue: 12, dayOfMonth: 31 }
                }
            })} ledetekster={ledetekster}/></Provider>)
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
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    fravaersgrunnLovfestet: null
                }
            })} ledetekster={ledetekster}/></Provider>);
            expect(component.find(".js-fravaersgrunnLovfestet").length).to.equal(0);
        });

        it("Skal vise Lovfestet fraværsgrunn dersom det finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    fravaersgrunnLovfestet: "Min gode grunn"
                }
            })} ledetekster={ledetekster}/></Provider>);
            expect(component.find(".js-fravaersgrunnLovfestet").text()).to.equal("Min gode grunn");
        });

    });

    describe("Beskriv fravær", () => {

        it("Skal ikke vise Beskriv fravær dersom det ikke finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    fravaerBeskrivelse: null
                }
            })} ledetekster={ledetekster}/></Provider>);
            expect(component.find(".js-fravaerBeskrivelse").length).to.equal(0);
        });

        it("Skal vise Beskriv fravær dersom det finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                diagnose: {
                    fravaerBeskrivelse: "Beskrivelse av fraværet"
                }
            })} ledetekster={ledetekster}/></Provider>);
            expect(component.find(".js-fravaerBeskrivelse").text()).to.equal("Beskrivelse av fraværet");
        });

    });

    describe("Flere opplysninger", () => {

        it("Viser flere opplysninger", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                friskmelding: {
                    antarReturSammeArbeidsgiver: true
                }
            })} ledetekster={ledetekster}/></Provider>)
            expect(component.find(FlereOpplysninger)).to.have.length(1);
        })

        describe("Pasient er 100 prosent arbeidsfør etter denne perioden", () => {

            it("Skal vise checkbox dersom antarReturSammeArbeidsgiver === true", () => {
                const getState = {
                    ledetekster: { ledetekster },
                };
                const store = mockStore(getState);

                component = mount(
                    <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                    friskmelding: {
                        antarReturSammeArbeidsgiver: true
                    }
                })} ledetekster={ledetekster}/></Provider>)
                expect(component.find(".js-antarReturSammeArbeidsgiver").text()).to.equal("Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos samme arbeidsgiver")
            });

            it("Skal ikke vise noe dersom antarReturSammeArbeidsgiver === false", () => {
                const getState = {
                    ledetekster: { ledetekster },
                };
                const store = mockStore(getState);

                component = mount(
                    <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                    friskmelding: {
                        antarReturSammeArbeidsgiver: false
                    }
                })} ledetekster={ledetekster}/></Provider>)
                expect(component.find(".js-antarReturSammeArbeidsgiver").length).to.equal(0)
            });

        });

        describe("NAV bør ta tak i saken nå", () => {
            it("Skal ikke vise dersom navBoerTaTakISaken === null", () => {
                const getState = {
                    ledetekster: { ledetekster },
                };
                const store = mockStore(getState);

                component = mount(
                    <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                    meldingTilNav: {
                        navBoerTaTakISaken: null
                    }
                })} ledetekster={ledetekster}/></Provider>)
                expect(component.find(".js-navBoerTaTakISaken").length).to.equal(0);
            });

            it("Skal ikke vise dersom navBoerTaTakISaken === false", () => {
                const getState = {
                    ledetekster: { ledetekster },
                };
                const store = mockStore(getState);

                component = mount(
                    <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                    meldingTilNav: {
                        navBoerTaTakISaken: false
                    }
                })} ledetekster={ledetekster}/></Provider>)
                expect(component.find(".js-navBoerTaTakISaken").length).to.equal(0);
            });

            it("Skal vise checkbox dersom navBoerTaTakISaken === true", () => {
                const getState = {
                    ledetekster: { ledetekster },
                };
                const store = mockStore(getState);

                component = mount(
                    <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                    meldingTilNav: {
                        navBoerTaTakISaken: true
                    }
                })} ledetekster={ledetekster}/></Provider>)
                expect(component.find(".js-navBoerTaTakISaken").length).to.equal(1);
                expect(component.find(".js-navBoerTaTakISaken").text()).to.equal("NAV bør ta tak i saken nå");
            });

        });

        describe("Telefonnummer til lege/sykmelder", () => {
            it("Skal ikke vise dersom sykmelderTlf === null", () => {
                const getState = {
                    ledetekster: { ledetekster },
                };
                const store = mockStore(getState);

                component = mount(
                    <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                    bekreftelse: {
                        sykmelderTlf: null
                    }
                })} ledetekster={ledetekster}/></Provider>)
                expect(component.find(".js-sykmelderTlf").length).to.equal(0);
            });

            it("Skal vise dersom sykmelding.sykehistorie er en tekst", () => {
                const getState = {
                    ledetekster: { ledetekster },
                };
                const store = mockStore(getState);

                component = mount(
                    <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                    bekreftelse: {
                        sykmelderTlf: "22332244"
                    }
                })} ledetekster={ledetekster}/></Provider>)
                expect(component.find(".js-sykmelderTlf").length).to.equal(1);
                expect(component.find(".js-sykmelderTlf").text()).to.equal("22332244");
            });
        });
    });
});