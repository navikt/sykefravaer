import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Utvidbar from "../../js/components/Utvidbar.js";
import FlereOpplysninger from "../../js/components/FlereOpplysninger.js";

import SendTilArbeidsgiver from "../../js/components/SendTilArbeidsgiver.js";
import VelgArbeidsgiverContainer from '../../js/containers/VelgArbeidsgiverContainer.js';
import ArbeidsgiversSykmelding from "../../js/components/ArbeidsgiversSykmelding.js";

let component;
let submitHandler;
let scrollTilFeilmelding; 
let sendSykmelding;

describe("SendTilArbeidsgiver", () => {

    beforeEach(() => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>)
    })

    it("Skal vise ArbeidsgiversSykmelding", () => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(ArbeidsgiversSykmelding)).to.have.length(1)
    });

    it("Skal vise VelgArbeidsgiverContainer", () => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(VelgArbeidsgiverContainer)).to.have.length(1)
    });

    it("Skal sende egen state videre til VelgArbeidsgiverContainer", () => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(VelgArbeidsgiverContainer).prop("erFeil")).to.be.false;
        expect(component.find(VelgArbeidsgiverContainer).prop("feilmelding")).to.equal("");
        expect(component.find(VelgArbeidsgiverContainer).prop("forsoektSendt")).to.equal(false);
    });


    describe("Innsending", () => {
        beforeEach(() => {
            submitHandler = sinon.spy(SendTilArbeidsgiver.prototype, "submitHandler");
            scrollTilFeilmelding = sinon.stub(SendTilArbeidsgiver.prototype, "scrollTilFeilmelding");
            sendSykmelding = sinon.stub();
        });

        afterEach(() => {
            scrollTilFeilmelding.restore(); 
            submitHandler.restore(); 
        })

        it("Skal kalle på submitHandler når man prøver å sende inn skjemaet", () => {
            component = shallow(<SendTilArbeidsgiver
                sykmelding={getSykmelding()}
                ledetekster={ledetekster} />)
            component.find(".js-send").simulate("click");
            expect(SendTilArbeidsgiver.prototype.submitHandler.callCount).to.equal(1)
        });        

        it("Skal sette state riktig dersom arbeidsgiver ikke er valgt", () => {
            component = shallow(<SendTilArbeidsgiver
                sykmelding={getSykmelding()}
                ledetekster={ledetekster} />)
            component.find(".js-send").simulate("click");
            expect(component.state("erFeil")).to.be.true;
            expect(component.state("feilmelding")).to.equal("Vennligst velg arbeidsgiver");
        });

        it("Skal sette state riktig dersom valgtArbeidsgiver.orgnummer === '0'", () => {
            component = shallow(<SendTilArbeidsgiver
                sykmelding={getSykmelding({
                    valgtArbeidsgiver: {
                        orgnummer: "0"
                    }
                })}
                ledetekster={ledetekster} />)
            component.find(".js-send").simulate("click");
            expect(component.state("erFeil")).to.be.true;
            expect(component.state("feilmelding")).to.equal("Du må sende sykmeldingen på papir");
        });

        it("Skal oppdatere state i VelgArbeidsgiverContainer når man prøver å sende", () => {
            component = shallow(<SendTilArbeidsgiver
                sykmelding={getSykmelding({
                    valgtArbeidsgiver: {
                        orgnummer: "0"
                    }
                })}
                ledetekster={ledetekster} />)
            component.find(".js-send").simulate("click");
            expect(component.find(VelgArbeidsgiverContainer).prop("erFeil")).to.be.true;
            expect(component.find(VelgArbeidsgiverContainer).prop("feilmelding")).to.equal("Du må sende sykmeldingen på papir");
            expect(component.find(VelgArbeidsgiverContainer).prop("forsoektSendt")).to.be.true;
        });

        it("Skal kalle på sendSykmelding dersom valgtArbeidsgiver.orgnummer === '123456789'", () => {
            component = shallow(<SendTilArbeidsgiver
                sykmelding={getSykmelding({
                    id: "79",
                    valgtArbeidsgiver: {
                        orgnummer: "123456789"
                    }
                })}
                ledetekster={ledetekster}
                sendSykmelding={sendSykmelding} />)
            component.find(".js-send").simulate("click");
            expect(sendSykmelding.callCount).to.equal(1);
            expect(sendSykmelding.getCall(0).args[0]).to.equal("79"); 
        });


    })

});
