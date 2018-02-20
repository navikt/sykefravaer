import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import {
    hentSykmeldingGyldigForOppfoelging,
    hentSykmeldingIkkeGyldigForOppfoelging,
} from '../../mockSykmeldinger';
import {
    mapStateToProps,
    OppfolgingsdialogSide,
} from '../../../js/containers/oppfolgingsdialog/OppfolgingsdialogContainer';
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Oppfolgingsdialog from '../../../js/components/oppfolgingsdialoger/Oppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogContainer', () => {

    describe('mapStateToProps', () => {
        let clock;
        const dagensDato = new Date('2017-01-01');
        beforeEach(() => {
            clock = sinon.useFakeTimers(dagensDato.getTime());
        });

        afterEach(() => {
            clock.restore();
        });

        const ownProps = {
            params: {
                oppfolgingsdialogId: '1',
            },
        };
        const state = {
            ledetekster: {
                data: {
                    'min.tekst': 'Dette er en test',
                },
            },
            dineSykmeldinger: {
                data: [],
            },
            oppfolgingsdialoger: {
                data: [{
                    id: ownProps.params.oppfolgingsdialogId,
                    virksomhet: {
                        virksomhetsnummer: '12345678',
                    },
                    arbeidstaker: {
                        fnr: '81549300',
                    },
                }],
            },
            tilgang: {
                data: {
                    harTilgang: true,
                    ikkeTilgangGrunn: null,
                },
            },
            avbrytdialogReducer: {

            },
            nullstill: {

            },
            samtykke: {

            },
        };

        it('Skal returnere props', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.erOppfolgingsdialogTilgjengelig).to.deep.equal(false);
        });

        it('Skal returnere erOppfolgingsdialogTilgjengelig lik false, om oppfolgingdialog ikke er knyttet til gyldig sykmelding(feil orgnummer) og ikke er godkjent', () => {
            const res = mapStateToProps(Object.assign({}, state, {
                dineSykmeldinger: {
                    data: [Object.assign({}, hentSykmeldingGyldigForOppfoelging(dagensDato), {
                        orgnummer: '',
                    })],
                },
            }), ownProps);
            expect(res.erOppfolgingsdialogTilgjengelig).to.deep.equal(false);
        });

        it('Skal returnere erOppfolgingsdialogTilgjengelig lik false, om oppfolgingdialog ikke er knyttet til gyldig sykmelding(for gammel sykmelding) og ikke er godkjent', () => {
            const res = mapStateToProps(Object.assign({}, state, {
                dineSykmeldinger: {
                    data: [Object.assign({}, hentSykmeldingIkkeGyldigForOppfoelging(dagensDato), {
                        orgnummer: '12345678',
                    })],
                },
            }), ownProps);
            expect(res.erOppfolgingsdialogTilgjengelig).to.deep.equal(false);
        });

        it('Skal returnere erOppfolgingsdialogTilgjengelig lik true, om oppfolgingdialog ikke er knyttet til gyldig sykmelding men er godkjent', () => {
            const res = mapStateToProps(Object.assign({}, state, {
                oppfolgingsdialoger: {
                    data: [Object.assign({}, state.oppfolgingsdialoger.data[0], {
                        godkjentPlan: {
                            gyldighetstidspunkt: {
                                tom: '2016-12-31',
                            },
                        },
                    }),
                    ],
                },
                dineSykmeldinger: {
                    data: [Object.assign({}, hentSykmeldingGyldigForOppfoelging(dagensDato), {
                        orgnummer: '12345678',
                    })],
                },
            }), ownProps);
            expect(res.erOppfolgingsdialogTilgjengelig).to.deep.equal(true);
        });

        it('Skal returnere erOppfolgingsdialogTilgjengelig lik true, om oppfolgingdialog er knyttet til gyldig sykmelding, men ikke er godkjent', () => {
            const res = mapStateToProps(Object.assign({}, state, {
                oppfolgingsdialoger: {
                    data: [Object.assign({}, state.oppfolgingsdialoger.data[0], {
                        godkjentPlan: null,
                    }),
                    ],
                },
                dineSykmeldinger: {
                    data: [Object.assign({}, hentSykmeldingGyldigForOppfoelging(dagensDato), {
                        orgnummer: '12345678',
                    })],
                },
            }), ownProps);
            expect(res.erOppfolgingsdialogTilgjengelig).to.deep.equal(true);
        });
    });

    describe('OppfolgingsdialogSide', () => {
        let sjekkTilgang;
        let hentOppfolgingsdialoger;
        let settDialog;
        let hentArbeidsforhold;
        let hentDineSykmeldinger;
        let hentToggles;
        let dineSykmeldinger;
        let toggles;
        let tilgang;
        let oppfolgingsdialogerReducer;
        let navigasjontoggles;
        const harTilgang = {
            harTilgang: true,
        };
        const ikkeTilgang = {
            harTilgang: false,
        };
        beforeEach(() => {
            dineSykmeldinger = {
                henter: false,
                hentet: false,
                hentingFeilet: false,
                data: [],
            };
            toggles = {
                henter: false,
                hentet: false,
            };
            navigasjontoggles = {
                steg: 1,
            };
            tilgang = {};
            oppfolgingsdialogerReducer = {};

            sjekkTilgang = sinon.spy();
            hentOppfolgingsdialoger = sinon.spy();
            settDialog = sinon.spy();
            hentArbeidsforhold = sinon.spy();
            hentDineSykmeldinger = sinon.spy();
            hentToggles = sinon.spy();
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgang={tilgang}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                henter
                hentet={false}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise spinner dersom sender', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgang={tilgang}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                sender
                hentet={false}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom hentingFeilet', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgang={tilgang}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                hentet={false}
                hentingFeilet
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom sendingFeilet', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgang={tilgang}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                hentet={false}
                sendingFeilet
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom sykmeldt ikke har tilgang', () => {
            const component = shallow(<OppfolgingsdialogSide
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: ikkeTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom henting er OK, og erOppfolgingsdialogTilgjengelig er false', () => {
            const component = shallow(<OppfolgingsdialogSide
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: harTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
                navigasjontoggles={navigasjontoggles}
                erOppfolgingsdialogTilgjengelig={false}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise Oppfolgingsdialog dersom henting er OK, og erOppfolgingsdialogTilgjengelig er true', () => {
            const component = shallow(<OppfolgingsdialogSide
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: harTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
                navigasjontoggles={navigasjontoggles}
                erOppfolgingsdialogTilgjengelig
            />);
            expect(component.find(Oppfolgingsdialog)).to.have.length(1);
        });
    });
});
