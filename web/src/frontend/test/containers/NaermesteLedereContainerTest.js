import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps } from '../../js/containers/NaermesteLedereContainer';
import Naermesteledere from '../../js/components/NaermesteLedere';

describe("NaermesteLedereContainer", () => {

    describe("Container", () => {

        let hentLedere;

        beforeEach(() => {
            hentLedere = sinon.spy();
        })

        it("Viser ingenting dersom det hentes ledere", () => {
            const compo = shallow(<Container hentLedere={hentLedere} henter />)
            expect(compo.html()).to.equal(null)
        });

        it("Viser ingenting dersom det ikke finnes ledere", () => {
            const compo = shallow(<Container hentLedere={hentLedere} ledere={[]} />)
            expect(compo.html()).to.equal(null)
        });

        it("Viser ledere dersom det finnes ledere", () => {
            const ledere = [{
                navn: "Ole Olsen",
                orgnummer: "123456789",
                organisasjonsnavn: "Solstrålen Barnehage"
            }]
            const compo = shallow(<Container hentLedere={hentLedere} ledere={ledere} />)
            expect(compo.html()).to.contain("Ole Olsen"); 
        });

        it("Henter ledere", () => {
            const compo = shallow(<Container hentLedere={hentLedere} />)
            expect(hentLedere.calledOnce).to.be.true;
        })
    })

    describe("mapStateToProps", () => {

        let state; 

        beforeEach(() => {
            state = {
                ledere: {}
            }
        })

        it("Skal returnere henter dersom det hentes ledere", () => {
            state.ledere.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter = false dersom det ikke hentes ledere", () => {
            state.ledere.henter = false;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.false;
        });

        it("Skal returnere ledere (1)", () => {
            state.ledere.data = [];
            const props = mapStateToProps(state);
            expect(props.ledere).to.deep.equal([]);
        });

        it("Skal returnere ledere (2)", () => {
            state.ledere.data = [{}, {}];
            const props = mapStateToProps(state);
            expect(props.ledere).to.deep.equal([{}, {}]);
        });

        it("Skal returnere hentingFeilet = true dersom henting feiler", () => {
            state.ledere.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.true;
        });

    });

});