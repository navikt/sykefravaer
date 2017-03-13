import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import sinon from 'sinon';
import { getSvarsideModus, Kvittering, BekreftetKvittering } from 'moter-npm';
import { Svarside, getMote, moteBekreftet, moteAvbrutt, moteIkkeBesvart, moteBesvartAlleAlternativer, moteBesvartMedNyeAlternativerBesvart, moteBesvartMedNyeAlternativerIkkeBesvart } from '../mockMote';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps } from '../../js/containers/MoteContainer';

describe("MoteContainer", () => {

    describe("Container", () => {

        let actions;
        let mote;

        beforeEach(() => {
            mote = getMote();
            actions = {
                hentMote: sinon.spy(),
            };
        });

        it("Skal vise AppSpinner hvis henter = true", () => {
            const comp = shallow(<Container actions={actions} henter ledetekster={ledetekster} />);
            expect(comp.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise en feilmelding hvis hentingFeilet = true", () => {
            const comp = shallow(<Container actions={actions} ledetekster={ledetekster} hentingFeilet />);
            expect(comp.contains(<Feilmelding />)).to.be.true;
        });

        describe("Hvis alle alternativer er besvart", () => {

            it("Skal vise Kvittering", () => {
                component = shallow(<Container actions={actions} mote={moteBesvartAlleAlternativer} ledetekster={ledetekster} />);
                expect(component.find(Kvittering)).to.have.length(1);
            });

        });


    });

    describe("mapStateToProps", () => {

        let state; 

        beforeEach(() => {
            state = {
                ledetekster: {
                    data: ledetekster,
                },
                mote: {
                    data: null,
                },
                svar: {
                    sendt: false,
                }
            }
        })    

        it("Skal returnere henter dersom det hentes møte", () => {
            state.mote.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter === false dersom det ikke hentes møte", () => {
            state.mote.henter = false;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.false;
        });

        it("Skal returnere hentingFeilet dersom henting av møte feiler", () => {
            state.mote.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.true;
        });

        it("Skal returnere hentingFeilet === false dersom henting av møte ikke feiler", () => {
            state.mote.hentingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.false;
        });

        it("Skal returnere hentingFeilet dersom henting av ledetekster feiler", () => {
            state.ledetekster.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.true;
        });

        it("Skal returnere hentingFeilet === false dersom henting av ledetekster ikke feiler", () => {
            state.ledetekster.hentingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.false;
        });

        it("Skal returnere moteIkkeFunnet dersom møte ikke finnes", () => {
            state.mote.moteIkkeFunnet = true;
            const props = mapStateToProps(state);
            expect(props.moteIkkeFunnet).to.be.true;
        });

        it("Skal returnere moteIkkeFunnet === false hvis møte finnes", () => {
            // state.mote.moteIkkeFunnet er nå undefined, så vi setter den ikke
            const props = mapStateToProps(state);
            expect(props.moteIkkeFunnet).to.be.false;
        });

        it("Skal returnere mote dersom mote finnes", () => {
            state.mote.data = getMote();
            const props = mapStateToProps(state);
            expect(props.mote).to.deep.equal(state.mote.data);
        });

    });

});