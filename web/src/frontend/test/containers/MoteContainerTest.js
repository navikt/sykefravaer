import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps } from '../../js/containers/MoteContainer';

describe("MoteContainer", () => {

    describe("Container", () => {

        let actions;

        beforeEach(() => {
            actions = {
                hentDeltaker: sinon.spy(),
            }
        })

        it("Skal vise spinner dersom deltaker hentes", () => {
            const compo = shallow(<Container henter actions={actions} />);
            expect(compo.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise Feilmelding dersom deltaker ikke finnes", () => {
            const compo = shallow(<Container fantIkkeDeltaker actions={actions} />);
            expect(compo.find(Feilmelding)).to.have.length(1);
        });

    });

    describe("mapStateToProps", () => {

        let state; 

        beforeEach(() => {
            state = {
                ledetekster: {
                    data: ledetekster,
                },
                deltaker: {
                    data: {},
                    henter: false,
                    hentingFeilet: false,
                    fantIkkeDeltaker: false
                },
            }
        })    

        it("Skal returnere henter dersom det hentes møte", () => {
            state.deltaker.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter === false dersom det ikke hentes møte", () => {
            state.deltaker.henter = false;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.false;
        });

        it("Skal returnere fantIkkeDeltaker dersom deltaker ikke finnes", () => {
            state.deltaker.fantIkkeDeltaker = true;
            const props = mapStateToProps(state);
            expect(props.fantIkkeDeltaker).to.be.true;
        });

        it("Skal returnere fantIkkeDeltaker === false deltaker finnes", () => {
            state.deltaker.fantIkkeDeltaker = false;
            const props = mapStateToProps(state);
            expect(props.fantIkkeDeltaker).to.be.false;
        });

        it("Skal returnere deltaker dersom deltaker finnes", () => {
            state.deltaker.data = {
                navn: "Ole"
            };
            const props = mapStateToProps(state);
            expect(props.deltaker).to.deep.equal({
                navn: "Ole"
            });
        });


    })

})