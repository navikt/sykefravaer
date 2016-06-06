import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import MeldingTilNAV from "../../js/components/MeldingTilNAV.js";
import DinSykmelding from "../../js/components/DinSykmelding.js";

let component;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Melding til NAV", () => {

    describe("navBoerTaTakISaken", () => {
        it("Skal vise checkbox dersom sykmelding.navBoerTaTakISaken === true", () => {
            let component = mount(<MeldingTilNAV sykmelding={getSykmelding({
                meldingTilNav: {
                    navBoerTaTakISaken: true
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-navBoerTaTakISaken").text()).to.equal("NAV bør ta tak i saken nå")
        });

        it("Skal ikke vise navBoerTaTakISaken dersom den ikke finnes", () => {
            let component = mount(<MeldingTilNAV sykmelding={getSykmelding({
                meldingTilNav: {
                    navBoerTaTakISaken: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-navBoerTaTakISaken").length).to.equal(0)
        });
    }); 

    describe("navBoerTaTakISaken med begrunnelse", () => {
        it("Skal vise checkbox og begrunnelse dersom sykmelding.navBoerTaTakISaken === true og navBoerTaTakISakenBegrunnelse = (noe)", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                meldingTilNav: {
                    navBoerTaTakISaken: true,
                    navBoerTaTakISakenBegrunnelse: "Den sykmeldte trenger bistand fra NAV"
                }
            })} ledetekster={ledetekster}/></Provider>);
            expect(component.find(".js-navBoerTaTakISaken").text()).to.equal("NAV bør ta tak i saken nå")
            expect(component.find(".js-navBoerTaTakISakenBegrunnelse").text()).to.equal("Den sykmeldte trenger bistand fra NAV")
        });

        it("Skal ikke vise begrunnelse dersom den ikke finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };
            const store = mockStore(getState);

            component = mount(
                <Provider store={store}><DinSykmelding sykmelding={getSykmelding({
                meldingTilNav: {
                    navBoerTaTakISaken: true
                }
            })} ledetekster={ledetekster}/></Provider>);
            expect(component.find(".js-navBoerTaTakISakenBegrunnelse").length).to.equal(0)
        });
    });


}); 