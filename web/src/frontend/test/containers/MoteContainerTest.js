import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import sinon from 'sinon';
import { Kvittering, Svarside, BekreftetKvittering } from 'moter-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps } from '../../js/containers/MoteContainer';

describe("MoteContainer", () => {

    describe("Container", () => {

        let actions;
        let deltaker;

        beforeEach(() => {
            deltaker = {
                "deltakerUuid": "min-deltaker-id",
                "alternativer": [{
                    "id": 273,
                    "tid": "2017-09-09T07:09:00Z",
                    "tidligereValgt": false,
                    "sted": "Oslo"
                }, {
                    "id": 272,
                    "tid": "2017-09-08T07:09:00Z",
                    "tidligereValgt": false,
                    "sted": "Oslo"
                }],
                "avvik": [],
                "naermesteLeder": "Helge Fredheim",
                "svarTidspunkt": null
            };
            actions = {
                hentDeltaker: sinon.spy(),
            };
        });

        it("Skal vise AppSpinner hvis henter = true", () => {
            const comp = shallow(<Container actions={actions} henter ledetekster={ledetekster} />);
            expect(comp.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise en feilmelding hvis fantIkke = true", () => {
            const comp = shallow(<Container actions={actions} ledetekster={ledetekster} fantIkke />);
            expect(comp.contains(<Feilmelding />)).to.be.true;
        });

        it("Skal vise en feilmelding hvis hentingFeilet = true", () => {
            const comp = shallow(<Container actions={actions} ledetekster={ledetekster} hentingFeilet />);
            expect(comp.contains(<Feilmelding />)).to.be.true;
        });

        it("Skal vise en Kvittering hvis brukeren har svart", () => {
            const deltaker_ = Object.assign({}, deltaker, {
                avvik: ['INGEN_AV_TIDSPUNKTENE_PASSER']
            })
            const comp = shallow(<Container actions={actions} harSvart deltaker={deltaker_} ledetekster={ledetekster} />);
            expect(comp.contains(<Kvittering deltaker={deltaker_} ledetekster={ledetekster} />)).to.be.true;
        });

        it("Skal vise en Feilmelding hvis motetUtgaatt = true", () => {
            const deltaker_ = Object.assign({}, deltaker, {
                motetUtgaatt: true
            })
            const comp = shallow(<Container actions={actions} harSvart motetUtgaatt deltaker={deltaker_} ledetekster={ledetekster} />);
            expect(comp.find(Feilmelding)).to.have.length(1);
        });

        it("Skal vise en BekreftetKvittering hvis tidspunkt er bekreftet", () => {
            const deltaker_ = Object.assign({}, deltaker, {
                bekreftetAlternativ: {
                    "id": 272,
                    "tid": "2017-09-08T07:09:00Z",
                    "tidligereValgt": false,
                    "sted": "Oslo"
                }
            });
            const comp = shallow(<Container actions={actions} erBekreftet deltaker={deltaker_} ledetekster={ledetekster} />);
            expect(comp.contains(<BekreftetKvittering deltaker={deltaker_} ledetekster={ledetekster} />)).to.be.true;
        });

        it("Skal vise en Svarside hvis brukeren ikke har svart", () => {
            const comp = shallow(<Container actions={actions} deltaker={deltaker} ledetekster={ledetekster} />);
            expect(comp.find(Svarside)).to.have.length(1);
            expect(comp.find(Svarside).props()).to.deep.equal({
                deltakerId: "min-deltaker-id",
                deltaker,
                ledetekster,
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
                deltaker: {
                    data: {
                        "bekreftetAlternativ": null,
                        "deltakerUuid": "min-deltaker-id",
                        "alternativer": [{
                            "id": 273,
                            "tid": "2017-09-09T07:09:00Z",
                            "tidligereValgt": false,
                            "sted": "Oslo"
                        }, {
                            "id": 272,
                            "tid": "2017-09-08T07:09:00Z",
                            "tidligereValgt": false,
                            "sted": "Oslo"
                        }],
                        "avvik": [],
                        "naermesteLeder": "Helge Fredheim",
                        "svarTidspunkt": null
                    },
                    henter: false,
                    hentingFeilet: false,
                    fantIkkeDeltaker: false
                },
                svar: {
                    sendt: false,
                }
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

        it("Skal returnere hentingFeilet dersom henting av møte feiler", () => {
            state.deltaker.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.true;
        });

        it("Skal returnere hentingFeilet === false dersom henting av møte ikke feiler", () => {
            state.deltaker.hentingFeilet = false;
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

        it("Skal returnere harSvart", () => {
            state.deltaker.data = {
                svarTidspunkt: "2017-09-12T07:09:00Z",
                alternativer: [{
                    opprettet: "2017-09-13T07:09:00Z"
                }]
            };
            const props = mapStateToProps(state);
            expect(props.harSvart).to.be.false;
        });

        it("Skal returnere harSvart når svar er sendt", () => {
            state.svar.sendt = true;
            state.deltaker.data = {
                svarTidspunkt: "2017-09-12T07:09:00Z",
                alternativer: [{
                    opprettet: "2017-09-11T07:09:00Z"
                }]
            };
            const props = mapStateToProps(state);
            expect(props.harSvart).to.be.true;
        });

        it("Skal returnere harSvart når svar er sendt tidligere (med avvik)", () => {
            state.deltaker.data = {
                "deltakerUuid": "min-deltaker-id",
                "alternativer": [{
                    "id": 273,
                    "tid": "2017-09-09T07:09:00Z",
                    "tidligereValgt": false,
                    "sted": "Oslo"
                }, {
                    "id": 272,
                    "tid": "2017-09-08T07:09:00Z",
                    "tidligereValgt": false,
                    "sted": "Oslo"
                }],
                "avvik": ["MITT_FINE_AVVIK"],
                "naermesteLeder": "Helge Fredheim",
                "svarTidspunkt": "2017-08-08T07:09:00Z"
            }
            const props = mapStateToProps(state);
            expect(props.harSvart).to.be.true;
        });

        it("Skal returnere harSvart når svar er sendt tidligere (med tidspunkt)", () => {
            state.deltaker.data = {
                "deltakerUuid": "min-deltaker-id",
                "alternativer": [{
                    "id": 273,
                    "tid": "2017-09-09T07:09:00Z",
                    "tidligereValgt": true,
                    "sted": "Oslo"
                }, {
                    "id": 272,
                    "tid": "2017-09-08T07:09:00Z",
                    "tidligereValgt": false,
                    "sted": "Oslo"
                }],
                "avvik": [],
                "naermesteLeder": "Helge Fredheim",
                "svarTidspunkt": "2017-08-08T07:09:00Z"
            }
            const props = mapStateToProps(state);
            expect(props.harSvart).to.be.true;
        });

        it("Skal returnere erBekreftet når møtet ikke er bekreftet", () => {
            const props = mapStateToProps(state);
            expect(props.erBekreftet).to.be.false
        });

        it("Skal returnere erBekreftet når møtet er bekreftet", () => {
            state.deltaker.data.bekreftetAlternativ = {
                "id": 272,
                "tid": "2017-09-08T07:09:00Z",
                "tidligereValgt": false,
                "sted": "Oslo"
            };
            const props = mapStateToProps(state);
            expect(props.erBekreftet).to.be.true
        });

        it("Skal returnere motetUtgaatt", () => {
            const props = mapStateToProps(state);
            expect(props.motetUtgaatt).to.be.false;
        });

        it("Skal returnere motetUtgaatt hvis møtet er utgått", () => {
            state.deltaker.motetUtgaatt = true;
            const props = mapStateToProps(state);
            expect(props.motetUtgaatt).to.be.true;
        });


    });

});