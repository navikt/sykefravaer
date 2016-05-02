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
        component = shallow(<DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>)
    })

    it("Skal vise periode", () => {
        expect(component.find(".js-periode")).to.contain("31.12.2015");
        expect(component.find(".js-periode")).to.contain("06.01.2016");
    });

    it("Skal vise antall dager", () => {
       expect(component.find(".js-periode").text()).to.contain("7 dager");
    });    

    it("Skal vise avsender", () => {
        expect(component.find(".js-avsender")).to.contain("Ove Olsen");
    });

    it("Skal vise arbeidsgiver", () => {
        expect(component.find(".js-arbeidsgiver")).to.contain("Selskapet AS");
    });

    it("Skal vise hoveddiagnose", () => {
        expect(component.find(".js-hoveddiagnose")).to.contain("Influensa")
        expect(component.find(".js-hoveddiagnose-kode")).to.contain("LP2")
        expect(component.find(".js-hoveddiagnose-system")).to.contain("ICPC")
    });

    describe("Bidiagnose", () => {

        it("Skal ikke vise bidiagnose dersom det ikke finnes", () => {
            expect(component.find(".js-bidiagnose").length).to.equal(0);
        });


        it("Skal vise hoveddiagnose dersom det finnes", () => {
            component = shallow(<DinSykmelding sykmelding={getSykmelding({
                bidiagnose: {
                    diagnose: "Mageknipe",
                    diagnosesystem: "IZPZ",
                    diagnosekode: "LP3"
                }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-bidiagnose")).to.contain("Mageknipe")
            expect(component.find(".js-bidiagnose-kode")).to.contain("LP3")
            expect(component.find(".js-bidiagnose-system")).to.contain("IZPZ")
        });        

    })

    describe("Flere opplysninger", () => {

        describe("Når startet det legemeldte fraværet?", () => {

            it("Skal ikke vise dersom sykmelding.startLegemeldtFravaer === null", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    startLegemeldtFravaer: null
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-startLegemeldtFravaer").length).to.equal(0); 
            });

            it("Skal vise dersom sykmelding.startLegemeldtFravaer er en dato", () => {
                component = shallow(<DinSykmelding sykmelding={getSykmelding({
                    startLegemeldtFravaer: "2016-04-27T22:00:00.000Z"
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-startLegemeldtFravaer").length).to.equal(1); 
                expect(component.find(".js-startLegemeldtFravaer").text()).to.equal("28.04.2016");
            });

        });

        describe("Pasient er 100 prosent arbeidsfør etter denne perioden", () => {

            it("Skal vise 'ja' dersom sykmelding.antarReturTilArbeid === true", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    antarReturTilArbeid: true
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-antarReturTilArbeid").text()).to.equal("Ja")
            });

            it("Skal vise 'Nei' dersom sykmelding.antarReturTilArbeid === false", () => {
                component = shallow(<DinSykmelding sykmelding={getSykmelding({
                    antarReturTilArbeid: false
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-antarReturTilArbeid").text()).to.equal("Nei")
            });

        });

        describe("Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos samme arbeidsgiver", () => {

            it("Skal vise 'ja' dersom sykmelding.arbeidfoerEtterPerioden === true", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    arbeidfoerEtterPerioden: true
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-arbeidfoerEtterPerioden").text()).to.equal("Ja")
            });

            it("Skal vise 'Nei' dersom sykmelding.arbeidfoerEtterPerioden === false", () => {
                component = shallow(<DinSykmelding sykmelding={getSykmelding({
                    arbeidfoerEtterPerioden: false
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-arbeidfoerEtterPerioden").text()).to.equal("Nei")
            });

        });

        describe("Når antar du at dette kan skje?", () => {
            it("Skal ikke vise dersom sykmelding.antattDatoReturTilArbeid === null", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    antattDatoReturTilArbeid: null
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-antattDatoReturTilArbeid").length).to.equal(0); 
            });

            it("Skal vise dersom sykmelding.antattDatoReturTilArbeid er en dato", () => {
                component = shallow(<DinSykmelding sykmelding={getSykmelding({
                    antattDatoReturTilArbeid: "2016-03-15T22:00:00.000Z"
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-antattDatoReturTilArbeid").length).to.equal(1); 
                expect(component.find(".js-antattDatoReturTilArbeid").text()).to.equal("15.03.2016");
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
                component = shallow(<DinSykmelding sykmelding={getSykmelding({
                    sykehistorie: "Min sykehistorie er ikke så lang"
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-sykehistorie").length).to.equal(1); 
                expect(component.find(".js-sykehistorie").text()).to.equal("Min sykehistorie er ikke så lang");
            });            
        });

        describe("NAV bør ta tak i saken nå", () => {
            it("Skal ikke vise dersom sykmelding.navboerTaTakISaken === null", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    navboerTaTakISaken: null
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-navboerTaTakISaken").length).to.equal(0); 
            });

            it("Skal ikke vise dersom sykmelding.navboerTaTakISaken === false", () => {
                component = mount(<DinSykmelding sykmelding={getSykmelding({
                    navboerTaTakISaken: false
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-navboerTaTakISaken").length).to.equal(0); 
            });            

            it("Skal vise 'Ja' dersom sykmelding.navboerTaTakISaken === true", () => {
                component = shallow(<DinSykmelding sykmelding={getSykmelding({
                    navboerTaTakISaken: true
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-navboerTaTakISaken").length).to.equal(1); 
                expect(component.find(".js-navboerTaTakISaken").text()).to.equal("Ja");
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
                component = shallow(<DinSykmelding sykmelding={getSykmelding({
                    sykmelderTlf: "22332244"
                })} ledetekster={ledetekster}/>)
                expect(component.find(".js-sykmelderTlf").length).to.equal(1); 
                expect(component.find(".js-sykmelderTlf").text()).to.equal("22332244");
            });            
        });



    });


});