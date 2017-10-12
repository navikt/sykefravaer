import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import sinon from 'sinon';
import { getSvarsideModus, Kvittering, BekreftetKvittering, Svarside } from 'moter-npm';
import { getMote, moteBekreftet, moteAvbrutt, moteIkkeBesvart, moteBesvartAlleAlternativer, moteBesvartMedNyeAlternativerBesvart, moteBesvartMedNyeAlternativerIkkeBesvart } from '../mockMote';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps, mapDispatchToProps } from '../../js/containers/MoteContainer';

describe("MoteContainer", () => {

    describe("Container", () => {

        let moteActions;
        let svarActions;
        let actions;
        let mote;
        let clock;

        beforeEach(() => {
            mote = getMote();
            moteActions = {
                hentMote: sinon.spy(),
            };
            svarActions = {
                sendSvar: sinon.spy(),
            };
            actions = Object.assign({}, svarActions, moteActions);
            clock = sinon.useFakeTimers(1485524800000); // in a distant future in a galaxy far, far away
        });

        it("Skal vise AppSpinner hvis henter = true", () => {
            const comp = shallow(<Container actions={actions} henter />);
            expect(comp.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise en feilmelding hvis hentingFeilet = true", () => {
            const comp = shallow(<Container actions={actions} hentingFeilet />);
            expect(comp.contains(<Feilmelding />)).to.be.true;
        });

        it("Skal sende alle props videre til Svarside", () => {
            const comp = shallow(<Container mote={mote} actions={actions} banan="banan" eple="eple" />);
            const s = comp.find(Svarside);
            expect(s.prop("banan")).to.equal("banan");
            expect(s.prop("eple")).to.equal("eple");
            expect(s.prop("mote")).to.deep.equal(mote);
        });

        it("Skal sende sendSvar videre til Svarside", () => {
            const comp = shallow(<Container mote={mote} actions={actions} />);
            expect(comp.find(Svarside).prop("sendSvar")).to.deep.equal(svarActions.sendSvar)
        })

        describe("Hvis alle alternativer er besvart", () => {

            it("Skal vise Kvittering", () => {
                mote = moteBesvartAlleAlternativer;
                const component = shallow(<Container actions={actions} mote={mote} />);
                expect(component.find(Kvittering)).to.have.length(1);
            });

        });


    });

    describe("mapDispatchToProps", () => {

        let dispatch;
        let props;

        beforeEach(() => {
            dispatch = sinon.spy();
            props = mapDispatchToProps(dispatch);
        });

        it("Skal returnere et actions-object", () => {
            expect(typeof props.actions).to.equal("object");
        });

        it("Skal returnere møteActions og svarActions", () => {
            const a = props.actions;
            expect(typeof a.sendSvar).to.equal("function");
            expect(typeof a.hentMote).to.equal("function");
        })
    })

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

        it("Skal returnere sender === true dersom svar sendes", () => {
            state.svar.sender = true;
            const props = mapStateToProps(state);
            expect(props.sender).to.be.true;
        });

        it("Skal returnere sender === false dersom svar ikke sendes", () => {
            state.svar.sender = false;
            const props = mapStateToProps(state);
            expect(props.sender).to.be.false;
        });

        it("Skal returnere sendingFeilet === true dersom sending av svar feiler", () => {
            state.svar.sendingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.sendingFeilet).to.be.true;
        });

        it("Skal returnere sendingFeiløet === false dersom sendiung av svar ikke har feilet", () => {
            state.svar.sendingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.sendingFeilet).to.be.false;
        });        

    });

});