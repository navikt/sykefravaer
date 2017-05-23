import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import { sendSykepengesoknadTilArbeidsgiver, sendSykepengesoknadTilNAV } from '../../../js/actions/sykepengesoknader_actions';
import SendtSoknad, { getNokkelopplysninger, Knapperad, ConnectedKnapperad } from '../../../js/components/sykepengesoknad/SendtSoknad';
import { Soknad } from 'digisyfo-npm';
import Sidetopp from '../../../js/components/Sidetopp';
import SykmeldingUtdrag from '../../../js/components/sykepengesoknad/SykmeldingUtdrag';
import Soknadstatuspanel from '../../../js/components/sykepengesoknad/Soknadstatuspanel';
import Lightbox from '../../../js/components/Lightbox';
import { Avkrysset } from '../../../js/components/sykepengesoknad/SendtSoknad';
import { startEndringForespurt } from '../../../js/actions/sykepengesoknader_actions';
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

    it("Skal inneholde en ConnectedKnapperad", () => {
        component = shallow(<SendtSoknad sykepengesoknad={sykepengesoknad} />);
        expect(component.find(ConnectedKnapperad)).to.have.length(1);
    });

    describe("Knapperad", () => {

        let clock;

        beforeEach(() => {
            clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
        });

        afterEach(() => {
            clock.restore();
        });

        it("1) Skal inneholde en knapp for å endre søknaden hvis det er mindre enn tre måneder siden søknaden ble sendt", () => {
            const component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: "88",
                sendtTilNAVDato: new Date("2017-01-14"),
                sendtTilArbeidsgiverDato: null,
            })} />);
            expect(component.find(".js-endre")).to.have.length(1);
        });

        it("2) Skal ikke inneholde en knapp for å endre søknaden hvis det er mer enn tre måneder siden søknaden ble sendt", () => {
            const component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: "88",
                sendtTilNAVDato: new Date("2016-09-16"),
                sendtTilArbeidsgiverDato: null,
            })} />);
            expect(component.find(".js-endre")).to.have.length(0);
        });

        it("3) Skal inneholde en knapp for å endre søknaden hvis det er mer enn tre måneder siden søknaden ble sendt til NAV men mindre enn tre måneder siden søknaden ble sendt til arbeidsgiver", () => {
            const component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: "88",
                sendtTilNAVDato: new Date("2016-09-16"),
                sendtTilArbeidsgiverDato: new Date("2016-12-20"),
            })} />);
            expect(component.find(".js-endre")).to.have.length(1);
        });

        it("4) Skal inneholde en knapp for å endre søknaden hvis det er nøyaktig tre måneder siden søknaden ble sendt", () => {
            const component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: "88",
                sendtTilNAVDato: new Date("2016-10-16"),
                sendtTilArbeidsgiverDato: null,
            })} />);
            expect(component.find(".js-endre")).to.have.length(1);
        });

        it("5) Skal ikke inneholde en knapp for å endre søknaden hvis det tre måneder og én dag siden søknaden ble sendt", () => {
            const component = shallow(<Knapperad sykepengesoknad={getSoknad({
                id: "88",
                sendtTilNAVDato: new Date("2016-09-15"),
                sendtTilArbeidsgiverDato: null,
            })} />);
            expect(component.find(".js-endre")).to.have.length(0);
        });

        it("Skal starte endring når man klikker på endre", () => {
            const dispatch = sinon.spy();
            const preventDefault = sinon.spy();
            const action = startEndringForespurt("88");
            const component = shallow(<Knapperad sykepengesoknad={getSoknad({id: "88", sendtTilNAVDato: new Date("2016-10-16")})} dispatch={dispatch} />);
            component.find(".js-endre").simulate("click", { preventDefault });
            expect(preventDefault.called).to.be.true;
            expect(dispatch.calledWith(action)).to.be.true;
        });

    });

    it("Skal returnere null dersom sykepengesoknaden har status KORRIGERT", () => {
        const component = shallow(<Knapperad sykepengesoknad={getSoknad({status: "KORRIGERT"})} />);
        expect(component.html()).to.be.null;
    });

});