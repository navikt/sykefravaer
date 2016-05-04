import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import DinSykmelding from "../../js/components/DinSykmelding.js";

let component;

const sykmelding = {
    id: 3456789,
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: "2015-12-31T00:00:00Z",
        tom: "2016-01-06T00:00:00Z",
        grad: 67
    }],
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
};

const getSykmelding = (skmld = {}) => {
    return Object.assign({}, sykmelding, skmld);
}

describe("DinSykmelding", () => {

    beforeEach(() => {
        component = mount(<DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>)
    })

    it("Skal vise periode", () => {
        expect(component.find(".js-periode").text()).to.contain("31.12.2015");
        expect(component.find(".js-periode").text()).to.contain("06.01.2016");
    });

    it("Skal vise antall dager", () => {
       expect(component.find(".js-periode").text()).to.contain("7 dager");
    });    

    it("Skal vise avsender", () => {
        expect(component.find(".js-avsender").text()).to.contain("Ove Olsen");
    });

    it("Skal ikke vise avsender dersom det ikke finnes", () => {
        component = mount(<DinSykmelding sykmelding={getSykmelding({
            sykmelder: null
        })} ledetekster={ledetekster}/>)
        expect(component.find(".js-avsender").length).to.equal(0);
    });

    it("Skal vise arbeidsgiver", () => {
        expect(component.find(".js-arbeidsgiver").text()).to.equal("Selskapet AS");
    });

    it("Skal ikke vise arbeidsgiver dersom det ikke finnes", () => {
        component = mount(<DinSykmelding sykmelding={getSykmelding({
            arbeidsgiver: null
        })} ledetekster={ledetekster}/>)
        expect(component.find(".js-arbeidsgiver").length).to.equal(0);
    });

    describe("hoveddiagnose", () => {

        it("Skal vise hoveddiagnose dersom den finnes", () => {
            expect(component.find(".js-hoveddiagnose").text()).to.equal("Influensa")
            expect(component.find(".js-hoveddiagnose-kode").text()).to.equal("LP2")
            expect(component.find(".js-hoveddiagnose-system").text()).to.equal("ICPC")
        });

        it("Skal ikke vise hoveddiagnose dersom den ikke finnes (sykmelding.hoveddiagnose === null)", () => {
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                hoveddiagnose: null
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
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                bidiagnose: {
                    diagnose: "Mageknipe",
                    diagnosesystem: "IZPZ",
                    diagnosekode: "LP3"
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-bidiagnose").text()).to.equal("Mageknipe")
            expect(component.find(".js-bidiagnose-kode").text()).to.equal("LP3")
            expect(component.find(".js-bidiagnose-system").text()).to.equal("IZPZ")
        });        

    });

    describe("Svangerskapsrelatert", () => {
        it("Skal ikke vise svangerskap dersom sykmelding.svangerskap !== true", () => {
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                svangerskap: null
            })} ledetekster={ledetekster} />)
            expect(component.find(".js-svangerskap").length).to.equal(0);
        });

        it("Skal vise svangerskap dersom sykmelding.svangerskap === true", () => {
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                svangerskap: true
            })} ledetekster={ledetekster} />)
            expect(component.find(".js-svangerskap").length).to.equal(1);
            expect(component.find(".js-svangerskap").text()).to.equal("Sykdommen er svangerskapsrelatert")
        });

    });

    describe("Yrkesskade", () => {
        it("Skal ikke vise yrkesskadeDato dersom sykmelding.yrkesskadeDato !== true", () => {
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                yrkesskadeDato: null
            })} ledetekster={ledetekster} />)
            expect(component.find(".js-yrkesskadeDato").length).to.equal(0);
        });

        it("Skal vise yrkesskade dersom sykmelding.yrkesskadeDato === (dato)", () => {
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                yrkesskadeDato: "2015-12-31T00:00:00Z"
            })} ledetekster={ledetekster} />)
            expect(component.find(".js-yrkesskade").length).to.equal(1);
            expect(component.find(".js-yrkesskade").text()).to.equal("Sykdommen kan skyldes en skade/yrkessykdom")
            expect(component.find(".js-yrkesskadeDato").text()).to.contain("31.12.2015")
        });
    })

    describe("Lovfestet fraværsgrunn", () => {

        it("Skal ikke vise Lovfestet fraværsgrunn dersom det ikke finnes", () => {
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                fravaersgrunnLovfestet: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-fravaersgrunnLovfestet").length).to.equal(0);
        });

        it("Skal vise Lovfestet fraværsgrunn dersom det finnes", () => {
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                fravaersgrunnLovfestet: "Min gode grunn"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-fravaersgrunnLovfestet").text()).to.equal("Min gode grunn");
        });

    });

    describe("Beskriv fravær", () => {

        it("Skal ikke vise Beskriv fravær dersom det ikke finnes", () => {
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                fravaerBeskrivelse: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-fravaerBeskrivelse").length).to.equal(0);
        });

        it("Skal vise Beskriv fravær dersom det finnes", () => {
            component = mount(<DinSykmelding sykmelding={getSykmelding({
                fravaerBeskrivelse: "Beskrivelse av fraværet"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-fravaerBeskrivelse").text()).to.equal("Beskrivelse av fraværet");
        });

    });    

    describe("Flere opplysninger", () => {

        describe("Pasient er 100 prosent arbeidsfør etter denne perioden", () => {

            it("Skal vise checkbox dersom sykmelding.antarReturSammeArbeidsgiver === true", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    antarReturSammeArbeidsgiver: true
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-antarReturSammeArbeidsgiver").text()).to.equal("Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos samme arbeidsgiver")
            });

            it("Skal ikke vise noe dersom sykmelding.antarReturSammeArbeidsgiver === false", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    antarReturSammeArbeidsgiver: false
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-antarReturSammeArbeidsgiver").length).to.equal(0)
            });

        });


        describe("Beskriv kort sykehistorie, symptomer og funn i dagens situasjon", () => {
            it("Skal ikke vise dersom sykmelding.sykehistorie === null", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    sykehistorie: null
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-sykehistorie").length).to.equal(0); 
            });

            it("Skal vise dersom sykmelding.sykehistorie er en tekst", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    sykehistorie: "Min sykehistorie er ikke så lang"
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-sykehistorie").length).to.equal(1); 
                expect(component.find(".js-sykehistorie").text()).to.equal("Min sykehistorie er ikke så lang");
            });            
        });

        describe("NAV bør ta tak i saken nå", () => {
            it("Skal ikke vise dersom sykmelding.navBoerTaTakISaken === null", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    navBoerTaTakISaken: null
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-navBoerTaTakISaken").length).to.equal(0); 
            });

            it("Skal ikke vise dersom sykmelding.navBoerTaTakISaken === false", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    navBoerTaTakISaken: false
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-navBoerTaTakISaken").length).to.equal(0); 
            });            

            it("Skal vise checkbox dersom sykmelding.navBoerTaTakISaken === true", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    navBoerTaTakISaken: true
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-navBoerTaTakISaken").length).to.equal(1); 
                expect(component.find(".js-navBoerTaTakISaken").text()).to.equal("NAV bør ta tak i saken nå");
            }); 

        }); 

        describe("Telefonnummer til lege/sykmelder", () => {
            it("Skal ikke vise dersom sykmelding.sykmelderTlf === null", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    sykmelderTlf: null
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-sykmelderTlf").length).to.equal(0); 
            });

            it("Skal vise dersom sykmelding.sykehistorie er en tekst", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    sykmelderTlf: "22332244"
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-sykmelderTlf").length).to.equal(1); 
                expect(component.find(".js-sykmelderTlf").text()).to.equal("22332244");
            });            
        });

        describe("resultatAvBehandling", () => {
            it("Skal ikke vise dersom sykmelder.resultatAvBehandling === null", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    resultatAvBehandling: null
                })} ledetekster={ledetekster} />);
                expect(component.find(".js-resultatAvBehandling").length).to.equal(0);
            });

            it("Skal vise dersom sykmelder.resultatAvBehandling === 'Dette ga gode resultater'", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    resultatAvBehandling: "Dette ga gode resultater"
                })} ledetekster={ledetekster} />);
                expect(component.find(".js-resultatAvBehandling").text()).to.contain("Dette ga gode resultater")
            });
        });

        describe("henvisningUtredningBehandling", () => {
            it("Skal ikke vise dersom sykmelder.henvisningUtredningBehandling === null", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    henvisningUtredningBehandling: null
                })} ledetekster={ledetekster} />);
                expect(component.find(".js-henvisningUtredningBehandling").length).to.equal(0);
            });

            it("Skal vise dersom sykmelder.henvisningUtredningBehandling === 'Henvist til fysio, forventer bedring når han får hjelp til opptrening.'", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    henvisningUtredningBehandling: "Henvist til fysio, forventer bedring når han får hjelp til opptrening."
                })} ledetekster={ledetekster} />);
                expect(component.find(".js-henvisningUtredningBehandling").text()).to.contain("Henvist til fysio, forventer bedring når han får hjelp til opptrening.")
            });
        });

        describe("paavirkningArbeidsevne", () => {
            it("Skal ikke vise dersom sykmelder.paavirkningArbeidsevne === null", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    paavirkningArbeidsevne: null
                })} ledetekster={ledetekster} />);
                expect(component.find(".js-paavirkningArbeidsevne").length).to.equal(0);
            });

            it("Skal vise dersom sykmelder.paavirkningArbeidsevne === 'God påvirkning på arbeidsevne'", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    paavirkningArbeidsevne: "God påvirkning på arbeidsevne"
                })} ledetekster={ledetekster} />);
                expect(component.find(".js-paavirkningArbeidsevne").text()).to.contain("God påvirkning på arbeidsevne")
            });            
        })    



    });


});