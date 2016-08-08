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

import DinSykmelding from "../../js/components/sykmelding/DinSykmelding";
import FlereOpplysninger from "../../js/components/sykmeldingOpplysninger/FlereOpplysninger"
import DinSykmeldingBrukerInputContainer from "../../js/containers/DinSykmeldingBrukerInputContainer";
import DineSykmeldingOpplysninger from "../../js/components/sykmeldingOpplysninger/DineSykmeldingOpplysninger";

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

    it("Skal vise DineSykmeldingOpplysninger", () => {
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
            strengtFortroligAdresse: false,
        };

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}
                               visSendTilArbeidsgiver={true}/></Provider>);
        expect(component.find(DineSykmeldingOpplysninger)).to.have.length(1);
    });    

    it("Skal vise DinSykmeldingBrukerInputContainer dersom visSendTilArbeidsgiver === true", () => {
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
            strengtFortroligAdresse: false,
        };

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}
                               visSendTilArbeidsgiver={true}/></Provider>);
        expect(component.find(DinSykmeldingBrukerInputContainer)).to.have.length(1);
    });

    it("Skal ikke vise DinSykmeldingBrukerInputContainer dersom visSendTilArbeidsgiver === false", () => {
        const getState = {
            ledetekster: { ledetekster },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
        };

        const brukerinfo = {
            strengtFortroligAdresse: true,
        };

        const store = mockStore(getState);

        component = mount(
            <Provider store={store}>
                <DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}
                               visSendTilArbeidsgiver={false}/></Provider>);
        expect(component.find(DinSykmeldingBrukerInputContainer)).to.have.length(0);
    });

});