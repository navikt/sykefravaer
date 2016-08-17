import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DinSykmelding from "../../js/components/sykmelding/DinSykmelding";
import DinSykmeldingSkjemaContainer from "../../js/containers/DinSykmeldingSkjemaContainer";
import FlereOpplysninger from "../../js/components/sykmeldingOpplysninger/FlereOpplysninger"
import VelgArbeidssituasjonContainer from "../../js/containers/VelgArbeidssituasjonContainer";
import DineSykmeldingOpplysninger from "../../js/components/sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import VelgArbeidsgiverContainer from "../../js/containers/VelgArbeidsgiverContainer";
import ArbeidsgiversSykmeldingContainer from "../../js/containers/ArbeidsgiversSykmeldingContainer";
import Varselstripe from "../../js/components/Varselstripe";
import StrengtFortroligInfo from "../../js/components/sykmelding/StrengtFortroligInfo";


import { Provider } from 'react-redux';


let component;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("DinSykmelding", () => {

    beforeEach(() => {

        const getState = {
            ledetekster: { 
                data: ledetekster,
            },
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

    it("Skal vise DineSykmeldingOpplysninger", () => {
        const getState = {
            ledetekster: { 
                data: ledetekster,
            },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
        };
        const store = mockStore(getState);

        const brukerinfo = {
            strengtFortroligAdresse: false,
        };

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster} visSendTilArbeidsgiver={false}/>
            </Provider>);
        expect(component.find(DineSykmeldingOpplysninger)).to.have.length(1);
    });

    it("Skal vise DinSykmeldingSkjemaContainer dersom erPilotarbeidsgiver === true", () => {
        const getState = {
            ledetekster: { 
                data: ledetekster,
            },
            arbeidsgiversSykmeldinger: {
                data: [{
                    id: "123"
                }]
            },
            arbeidsgivere: {
                data: [],
            },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
        };
        const store = mockStore(getState);

        const brukerinfo = {
            strengtFortroligAdresse: false,
        };

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding({
                    id: "123"
                })} ledetekster={ledetekster}
                               erPilotarbeidsgiver={true}/></Provider>);
        expect(component.find(DinSykmeldingSkjemaContainer)).to.have.length(1);
    });

    it("Skal vise info om utskrift i stedet for DinSykmeldingSkjema dersom harStrengtFortroligAdresse = true og erPilotarbeidsgiver = true", () => {
        component = shallow(<DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster} erPilotarbeidsgiver={true} harStrengtFortroligAdresse={true} />);
        expect(component.find(StrengtFortroligInfo)).to.have.length(1);
        expect(component.find(DinSykmeldingSkjemaContainer)).to.have.length(0);
    });

    it("Skal ikke vise info om utskrift dersom harStrengtFortroligAdresse = false", () => {
        component = shallow(<DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster} harStrengtFortroligAdresse={false} />);
        expect(component.find(StrengtFortroligInfo)).to.have.length(0);
    });

    it("Skal verken vise StrengtFortroligInfo eller DinSykmeldingSkjemaContainer dersom erPilotarbeidsgiver = false", () => {
        component = shallow(<DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster} erPilotarbeidsgiver={false} harStrengtFortroligAdresse={true} />);
        expect(component.find(StrengtFortroligInfo)).to.have.length(0);
        expect(component.find(DinSykmeldingSkjemaContainer)).to.have.length(0);
    });

});