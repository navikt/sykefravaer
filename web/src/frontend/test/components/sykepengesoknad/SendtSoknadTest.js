import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import SendtSoknad, { getNokkelopplysninger, Knapperad, ConnectedKnapperad } from '../../../js/components/sykepengesoknad/SendtSoknad';
import { sendSykepengesoknadTilArbeidsgiver, sendSykepengesoknadTilNAV } from '../../../js/actions/sykepengesoknader_actions';
import { Soknad } from 'digisyfo-npm';
import Sidetopp from '../../../js/components/Sidetopp';
import SykmeldingUtdrag from '../../../js/components/sykepengesoknad/SykmeldingUtdrag';
import Soknadstatuspanel from '../../../js/components/sykepengesoknad/Soknadstatuspanel';
import { Avkrysset } from '../../../js/components/sykepengesoknad/SendtSoknad';
import  { getSoknad } from '../../mockSoknader';
import ledetekster from '../../mockLedetekster';
import { Varselstripe, setLedetekster } from 'digisyfo-npm';
import sinon from 'sinon';

describe("SendtSoknad", () => {

    let component; 
    let sykepengesoknad = getSoknad();

    beforeEach(() => {
        setLedetekster(Object.assign({}, ledetekster, {
            'sykepengesoknad.oppsummering.status.label': "Status",
            'sykepengesoknad.status.TIL_SENDING': 'Sendes...'
        }));
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />)
    });

    it("Skal inneholde en Sidetopp", () => {
        expect(component.contains(<Sidetopp tittel="Søknad om sykepenger" />)).to.be.true;
    });

    it("Skal inneholde et SykmeldingUtdrag", () => {
        expect(component.contains(<SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />)).to.be.true;
    });

    it("Skal inneholde en Soknad", () => {
        expect(component.contains(<Soknad sykepengesoknad={sykepengesoknad} tittel={'Oppsummering'}/>)).to.be.true;
    });

    it("Skal inneholde en Avkrysset", () => {
        expect(component.contains(<Avkrysset tekst="Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte" />)).to.be.true;
    });

    it("Skal inneholde Soknadstatuspanel", () => {
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        expect(component.find(Soknadstatuspanel)).to.have.length(1);
    });

    it("Skal inneholde ConnectedKnapperad", () => {
       component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
       expect(component.find(ConnectedKnapperad)).to.have.length(1); 
    })

    describe("Knapperad", () => {

        it("Skal vise en 'Send til arbeidsgiver'-knapp om søknaden ikke er sendt til arbeidsgiver", () => {
            component = shallow(<Knapperad sykepengesoknad={getSoknad({
                sendtTilArbeidsgiverDato: undefined,
                sendtTilNAVDato: new Date("2017-04-01")
            })} />);
            expect(component.find(".js-send-til-arbeidsgiver")).to.have.length(1);
        });


        it("Skal vise en 'Send til NAV'-knapp om søknaden ikke er sendt til NAV", () => {
            component = shallow(<Knapperad sykepengesoknad={getSoknad({
                sendtTilNAVDato: undefined,
                sendtTilArbeidsgiverDato: new Date("2017-04-01")
            })} />);
            expect(component.find(".js-send-til-nav")).to.have.length(1);
        });

        it("Skal ikke vise en 'Send til arbeidsgiver'-knapp om søknaden er sendt til arbeidsgiver", () => {
            component = shallow(<Knapperad sykepengesoknad={getSoknad({
                sendtTilArbeidsgiverDato: new Date("2017-04-01"),
                sendtTilNAVDato: new Date("2017-04-01")
            })} />);
            expect(component.find(".js-send-til-arbeidsgiver")).to.have.length(0);
        });

        it("Skal ikke vise en 'Send til NAV'-knapp om søknaden er sendt til NAV", () => {
            component = shallow(<Knapperad sykepengesoknad={getSoknad({
                sendtTilNAVDato: new Date("2017-04-01"),
                sendtTilArbeidsgiverDato: new Date("2017-04-01")
            })} />);
            expect(component.find(".js-send-til-nav")).to.have.length(0);
        });

        it("Skal kalle på dispatch med riktig action når man klikker på Send til arbeidsgiver", () => {
            const dispatch = sinon.spy();
            const preventDefault = sinon.spy();
            const expectedAction = sendSykepengesoknadTilArbeidsgiver("1")
            component = shallow(<Knapperad dispatch={dispatch} sykepengesoknad={getSoknad({
                id: "1",
                sendtTilArbeidsgiverDato: undefined,
                sendtTilNAVDato: new Date("2017-04-01")
            })} />);
            component.find(".js-send-til-arbeidsgiver").simulate("click", {
                preventDefault,
            });
            expect(dispatch.calledWith(expectedAction)).to.be.true;
        });

        it("Skal kalle på dispatch med riktig action når man klikker på Send til NAV", () => {
            const dispatch = sinon.spy();
            const preventDefault = sinon.spy();
            const expectedAction = sendSykepengesoknadTilNAV("1")
            component = shallow(<Knapperad dispatch={dispatch} sykepengesoknad={getSoknad({
                id: "1",
                sendtTilNAVDato: undefined,
                sendtTilArbeidsgiverDato: new Date("2017-04-01")
            })} />);
            component.find(".js-send-til-nav").simulate("click", {
                preventDefault,
            });
            expect(dispatch.calledWith(expectedAction)).to.be.true;
        });


    }); 

});