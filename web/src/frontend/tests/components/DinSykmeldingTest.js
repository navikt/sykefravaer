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
import DineSykmeldingOpplysninger from "../../js/components/sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import ArbeidsgiversSykmeldingContainer from "../../js/containers/ArbeidsgiversSykmeldingContainer";
import Varselstripe from "../../js/components/Varselstripe";


import { Provider } from 'react-redux';


let component;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("DinSykmelding -", () => {

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
            form: {}
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
            form: {}
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

    it("Skal vise DinSykmeldingSkjemaContainer dersom harPilotarbeidsgiver === true", () => {
        const getState = {
            ledetekster: { 
                data: ledetekster,
            },
            arbeidsgiversSykmeldinger: {
                data: [{
                    id: "123"
                }]
            },
            dineSykmeldinger: {

            },
            arbeidsgivere: {
                data: [],
            },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
            form: {}
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
                               harPilotarbeidsgiver={true}/></Provider>);
        expect(component.find(DinSykmeldingSkjemaContainer)).to.have.length(1);
    });

    it("Skal ikke vise DinSykmeldingSkjemaContainer dersom harPilotarbeidsgiver = false", () => {
        component = shallow(<DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster} harPilotarbeidsgiver={false} harStrengtFortroligAdresse={true} />);
        expect(component.find(DinSykmeldingSkjemaContainer)).to.have.length(0);
    });

});