import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps } from '../../../js/containers/sykepengesoknader/UtbetalingerlenkeContainer';

describe("UtbetalingerlenkeContainer", () => {

    let hentLedere;
    let actions;
    let state;

    beforeEach(() => {
        hentLedere = sinon.spy();
        actions = {
            hentLedere,
        }
    });

    it("Skal ikke vise noe dersom man ikke har ledere", () => {
        state = {
            ledere: {
                data: []
            }
        };
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.html()).to.be.null;
    });

    it("Skal ikke vise noe dersom man har leder hos en arbeidsgiver som forskutterer lønn", () => {
        state = {
            ledere: {
                data: [{
                    arbeidsgiverForskuttererLoenn: true
                }]
            }
        };
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.html()).to.be.null;
    });


    it("Skal ikke vise noe dersom man har leder hos en arbeidsgiver som vi ikke vet hvorvidt forskutterer lønn", () => {
        state = {
            ledere: {
                data: [{
                    arbeidsgiverForskuttererLoenn: null
                }]
            }
        };
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.html()).to.be.null;
    });

    it("Skal vise noe dersom man har leder hos en arbeidsgiver som ikke forskutterer lønn", () => {
        state = {
            ledere: {
                data: [{
                    arbeidsgiverForskuttererLoenn: false
                }]
            }
        };
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.html()).not.to.be.null;
    });

    it("Skal vise noe dersom man har leder hos en arbeidsgiver som forskutterer lønn og en arbeidsgiver som ikke forskutterer lønn", () => {
        state = {
            ledere: {
                data: [{
                    arbeidsgiverForskuttererLoenn: false
                }, {
                    arbeidsgiverForskuttererLoenn: true
                }]
            }
        };
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.html()).not.to.be.null;
    });

    it("Skal hente ledere dersom ledere ikke er hentet", () => {
        state.ledere = {
            data: [],
            hentet: false,
        };
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(hentLedere.called).to.be.true;

    });

    it("Skal ikke hente ledere dersom ledere er hentet", () => {
        state.ledere = {
            data: [],
            hentet: true,
        };
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(hentLedere.called).to.be.false;

    })


});