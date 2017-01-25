import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../ledetekster_mock";

chai.use(chaiEnzyme());
const expect = chai.expect;

import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import FravaerOgFriskmelding from '../../../js/components/sykepengesoknad/FravaerOgFriskmelding/FravaerOgFriskmelding';
import { Container, mapStateToProps } from '../../../js/containers/sykepengesoknad/FravaerOgFriskmeldingContainer';
import { soknader } from '../../mockSoknader';

describe("FravaerOgFriskmeldingContainer", () => {

    let state;
    let ownProps;
    let minSoknad; 

    beforeEach(() => {
        minSoknad = {
          "id": "min-soknad-id",
          "status": "NY",
          "innsendtDato": null,
          "opprettetDato": "2017-01-19",
          "arbeidsgiver": {
            "navn": "BYGGMESTER BLOM AS",
            "orgnummer": "***REMOVED***",
            "naermesteLeder": null
          },
          "identdato": "2016-07-15",
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
              "fom": "2016-07-15",
              "tom": "2017-01-19"
            },
            "grad": 100,
            "avvik": null
          }],
          "andreInntektskilder": [],
          "utdanning": null
        }
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
    });

    describe("Container", () => {
        it("Skal vise spinner hvis det hentes", () => {
            const component = shallow(<Container henter />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal ikke vise spinner hvis det ikke hentes", () => {
            const component = shallow(<Container />);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it("Skal vise feilmelding hvis henting feiler", () => {
            const component = shallow(<Container hentingFeilet />);
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal ikke vise feilmelding hvis henting ikke feiler", () => {
            const component = shallow(<Container sykepengesoknad={minSoknad} />);
            expect(component.find(Feilmelding)).to.have.length(0);
        }); 

        it("Skal vise feilmelding hvis søknaden ikke finnes", () => {
            const component = shallow(<Container sykepengesoknad={undefined} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal vise FravaerOgFriskmelding hvis alt er OK", () => {
            const component = shallow(<Container sykepengesoknad={minSoknad} ledetekster={ledetekster} />);
            expect(component.find(FravaerOgFriskmelding)).to.have.length(1);
            expect(component.find(FravaerOgFriskmelding).prop("sykepengesoknad")).to.deep.equal(minSoknad);
            expect(component.find(AppSpinner)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
        }); 

    });

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
    });

});