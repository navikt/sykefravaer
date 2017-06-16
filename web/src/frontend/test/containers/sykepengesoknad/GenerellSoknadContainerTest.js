import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";

chai.use(chaiEnzyme());
const expect = chai.expect;

import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import FoerDuBegynner from '../../../js/components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import { GenerellSoknad, mapStateToProps } from '../../../js/containers/sykepengesoknad/GenerellSoknadContainer';
import { soknader } from '../../mockSoknader';
import sinon from 'sinon';

describe("GenerellSoknadContainer", () => {

    let state;
    let ownProps;
    let minSoknad; 
    let hentSykepengesoknader;
    let actions;

    beforeEach(() => {
        minSoknad = {
          "id": "min-soknad-id",
          "status": "NY",
          "opprettetDato": new Date("2017-01-19"),
          "arbeidsgiver": {
            "navn": "BYGGMESTER BLOM AS",
            "orgnummer": "***REMOVED***",
            "naermesteLeder": null
          },
          "identdato": new Date("2016-07-15"),
          "ansvarBekreftet": false,
          "bekreftetKorrektInformasjon": false,
          "arbeidsgiverUtbetalerLoenn": false,
          "egenmeldingsperioder": [],
          "gjenopptattArbeidFulltUtDato": null,
          "ferie": [],
          "permisjon": [],
          "utenlandsOpphold": [],
          "aktiviteter": [{
            "periode": {
              "fom": new Date("2016-07-15"),
              "tom": new Date("2017-01-19")
            },
            "grad": 100,
            "avvik": null
          }],
          "andreInntektskilder": [],
          "utdanning": null
        }
        minKorreksjon = {
          "id": "min-korreksjon",
          "status": "SENDT",
          "korrigerer": "min-soknad-id",
          "opprettetDato": new Date("2017-06-19"),
          "arbeidsgiver": {
            "navn": "BYGGMESTER BLOM AS",
            "orgnummer": "***REMOVED***",
            "naermesteLeder": null
          },
          "identdato": new Date("2016-07-15"),
          "ansvarBekreftet": false,
          "bekreftetKorrektInformasjon": false,
          "arbeidsgiverUtbetalerLoenn": false,
          "egenmeldingsperioder": [],
          "gjenopptattArbeidFulltUtDato": null,
          "ferie": [],
          "permisjon": [],
          "utenlandsOpphold": [],
          "aktiviteter": [{
            "periode": {
              "fom": new Date("2016-07-15"),
              "tom": new Date("2017-01-19")
            },
            "grad": 100,
            "avvik": null
          }],
          "andreInntektskilder": [],
          "utdanning": null
        };
        ownProps = {
            params: {
                sykepengesoknadId: "min-soknad-id"
            }
        }
        state = {
            sykepengesoknader: {
                data: [...soknader, minSoknad]
            },
            ledetekster: {
                henter: false,
                hentingFeilet: false,
                data: ledetekster,
            }
        }
        hentSykepengesoknader = sinon.spy();
        actions = { hentSykepengesoknader };
    });

    describe("GenerellSoknad", () => {
        it("Skal vise spinner hvis det hentes", () => {
            const component = shallow(<GenerellSoknad actions={actions} henter />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal ikke vise spinner hvis det ikke hentes", () => {
            const component = shallow(<GenerellSoknad actions={actions} />);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it("Skal vise feilmelding hvis henting feiler", () => {
            const component = shallow(<GenerellSoknad actions={actions} hentingFeilet />);
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal ikke vise feilmelding hvis henting ikke feiler", () => {
            const component = shallow(<GenerellSoknad actions={actions} sykepengesoknad={minSoknad} />);
            expect(component.find(Feilmelding)).to.have.length(0);
        }); 

        it("Skal vise feilmelding hvis søknaden ikke finnes", () => {
            const component = shallow(<GenerellSoknad actions={actions} sykepengesoknad={undefined} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal vise innsendt komponent hvis alt er OK", () => {
            const component = shallow(<GenerellSoknad actions={actions} Component={FoerDuBegynner} sykepengesoknad={minSoknad} />);
            expect(component.find(FoerDuBegynner)).to.have.length(1);
            expect(component.find(FoerDuBegynner).prop("sykepengesoknad")).to.deep.equal(minSoknad);
            expect(component.find(AppSpinner)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
        }); 

        it("Skal hente sykepengesoknader hvis de ikke er hentet", () => {
            const component = shallow(<GenerellSoknad actions={actions} Component={FoerDuBegynner} sykepengesoknad={minSoknad} />);
            expect(hentSykepengesoknader.called).to.be.true;
        });

        it("Skal hente sykepengesoknader hvis de ikke er hentet", () => {
            const component = shallow(<GenerellSoknad sykepengesoknaderHentet actions={actions} Component={FoerDuBegynner} sykepengesoknad={minSoknad} />);
            expect(hentSykepengesoknader.called).to.be.false;
        });

    })

    describe("mapStateToProps", () => {
        it("Skal returnere riktig søknad hvis den finnes", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.sykepengesoknad).to.deep.equal(minSoknad)
        });

        it("Skal returnere undefined hvis søknaden ikke finnes", () => {
            ownProps.params.sykepengesoknadId = "ukjent-soknad"
            const props = mapStateToProps(state, ownProps);
            expect(props.sykepengesoknad).to.be.undefined;
        });

        it("Skal returnere korrigert søknad hvis den finnes", () => {
            ownProps.params.sykepengesoknadId = "min-korreksjon";
            state.sykepengesoknader.data = [...state.sykepengesoknader.data, minKorreksjon];
            const props = mapStateToProps(state, ownProps);
            expect(props.sykepengesoknad).to.deep.equal(minKorreksjon);
            expect(props.korrigertSoknad).to.deep.equal(minSoknad);
        });

        it("Skal returnere henter hvis søknader hentes", () => {
            state.sykepengesoknader.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henter).to.be.true;
        });

        it("Skal ikke returnere henter hvis søknader ikke hentes", () => {
            state.sykepengesoknader.henter = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.henter).to.be.false;
        });

        it("Skal returnere hentingFeilet hvis henting av søknader feiler", () => {
            state.sykepengesoknader.hentingFeilet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.hentingFeilet).to.be.true;
        });

        it("Skal ikke returnere hentingFeilet hvis henting av søknader ikke feiler", () => {
            state.sykepengesoknader.hentingFeilet = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.hentingFeilet).to.be.false;
        });

        it("Skal returnere sendingFeilet === true dersom sending av søknaden feiler", () => {
            state.sykepengesoknader.sendingFeilet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.sendingFeilet).to.be.true;
        });

        it("Skal returnere sendingFeilet === false dersom sending av søknaden ikke feiler", () => {
            state.sykepengesoknader.sendingFeilet = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.sendingFeilet).to.be.false;
        });

        it("Skal returnere sender === true dersom søknad sendes", () => {
            state.sykepengesoknader.sender = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.sender).to.be.true;
        });

        it("Skal returnere sender === false dersom søknad ikke sendes", () => {
            state.sykepengesoknader.sender = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.sender).to.be.false;
        });

        it("Skal returnere sykepengesoknaderHentet hvis søknader er hentet", () => {
            state.sykepengesoknader.hentet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.sykepengesoknaderHentet).to.be.true; 
        });

        it("Skal returnere sykepengesoknaderHentet = false hvis søknader ikke er hentet", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.sykepengesoknaderHentet).to.be.false; 
        });

        it("Skal returnere skjemasoknad hvis det finnes skjemasoknad med values", () => {
            state.form = {
                SYKEPENGERSKJEMA: {
                    values: {
                        random: "random"
                    }
                }
            };
            const props = mapStateToProps(state, ownProps);
            expect(props.skjemasoknad).to.deep.equal({
                random: "random",
            });
        });

    });

});