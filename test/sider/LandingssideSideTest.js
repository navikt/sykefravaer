import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import deepFreeze from 'deep-freeze';
import { Container, mapStateToProps } from '../../js/sider/LandingssideSide';
import brukerinfo from '../../js/reducers/brukerinfo';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('LandingssideSide', () => {
    let hentMote;
    let hentMotebehov;
    let hentSykepengesoknader;
    let hentSoknader;
    let hentLedere;
    let hentDineSykmeldinger;
    let hentSykeforloep;
    let hentSykeforloepMetadata;
    let hentOppfolgingsdialoger;
    let hentOppfolging;
    let hentOppfolgingsforlopsPerioder;
    let hentToggles;
    let hentSykmeldtinfodata;

    let state;
    let actions;

    beforeEach(() => {
        hentMote = sinon.spy();
        hentMotebehov = sinon.spy();
        hentSykepengesoknader = sinon.spy();
        hentLedere = sinon.spy();
        hentDineSykmeldinger = sinon.spy();
        hentSykeforloep = sinon.spy();
        hentSykeforloepMetadata = sinon.spy();
        hentOppfolgingsdialoger = sinon.spy();
        hentOppfolgingsforlopsPerioder = sinon.spy();
        hentSoknader = sinon.spy();
        hentOppfolging = sinon.spy();
        hentToggles = sinon.spy();
        hentSykmeldtinfodata = sinon.spy();

        actions = {
            hentMote,
            hentMotebehov,
            hentSykepengesoknader,
            hentLedere,
            hentDineSykmeldinger,
            hentSykeforloep,
            hentSykeforloepMetadata,
            hentOppfolgingsdialoger,
            hentOppfolgingsforlopsPerioder,
            hentSoknader,
            hentOppfolging,
            hentToggles,
            hentSykmeldtinfodata,
        };

        state = {
            dineSykmeldinger: {
                data: [],
            },
            sykepengesoknader: {
                data: [],
            },
            mote: {},
            motebehov: {},
            ledere: {
                data: [],
            },
            sykeforloep: {},
            sykeforloepMetadata: {},
            oppfolgingsdialoger: {
                data: [],
            },
            oppfolgingsforlopsPerioder: {},
            ledetekster: {},
            hendelser: {},
            soknader: {
                data: [],
            },
            brukerinfo: brukerinfo(),
            toggles: {},
        };
    });

    describe('Henting av data', () => {
        describe('Møte', () => {
            it('Skal hente møte om møte ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentMote.calledOnce).to.equal(true);
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter om møte er hentet', () => {
                state.mote.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter til true om mote hentes nå', () => {
                state.mote.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(true);
            });

            it('Skal sette henter om henting av møte feilet', () => {
                state.mote.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });
        });

        describe('Møtebehov', () => {
            it('Skal hente møtebehov om møte ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentMotebehov.calledOnce).to.equal(true);
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter om møtebehov er hentet', () => {
                state.motebehov.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter møtebehov om hentes nå', () => {
                state.motebehov.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(true);
            });

            it('Skal sette henter om henting av møtebehov feilet', () => {
                state.motebehov.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });
        });

        describe('Sykepengesøknader', () => {
            it('Skal hente sykepengesøknader dersom sykepengesøknader ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentSykepengesoknader.calledOnce).to.equal(true);
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter dersom sykepengesøknader er hentet', () => {
                state.sykepengesoknader.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter sykepengesøknader hentes nå', () => {
                state.sykepengesoknader.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(true);
            });

            it('Skal sette henter dersom henting av sykepengesøknader har feilet', () => {
                state.sykepengesoknader.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });
        });

        describe('Søknader', () => {
            it('Skal hente søknader dersom søknader ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentSoknader.calledOnce).to.equal(true);
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter til false dersom søknader er hentet', () => {
                state.soknader.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter til true dersom søknader hentes nå', () => {
                state.soknader.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(true);
            });

            it('Skal sette henter til false dersom henting av søknader har feilet', () => {
                state.soknader.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });
        });

        describe('Ledere', () => {
            it('Skal hente ledere dersom ledere ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentLedere.calledOnce).to.equal(true);
                expect(props.henter).to.equal(false);
            });

            it('Skal ikke hente ledere dersom ledere er hentet', () => {
                state.ledere.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentLedere.called).to.equal(false);
                expect(props.henter).to.equal(false);
            });

            it('Skal ikke hente ledere dersom ledere hentes nå', () => {
                state.ledere.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentLedere.called).to.equal(false);
                expect(props.henter).to.equal(true);
            });

            it('Skal ikke hente ledere dersom henting av ledere har feilet', () => {
                state.ledere.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentLedere.called).to.equal(false);
                expect(props.henter).to.equal(false);
            });
        });

        describe('Dine sykmeldinger', () => {
            it('Skal hente dineSykmeldinger', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentDineSykmeldinger.calledOnce).to.equal(true);
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter til false dersom sykmeldinger er hentet', () => {
                state.dineSykmeldinger.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });

            it('Skal sette henter til true dersom dineSykmeldinger hentes nå', () => {
                state.dineSykmeldinger.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(true);
            });

            it('Skal sette henter til false dersom dineSykmeldinger har feilet', () => {
                state.dineSykmeldinger.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });
        });

        describe('Sykeforløp', () => {
            it('Skal hente sykeforloep', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentSykeforloep.calledOnce).to.equal(true);
                expect(props.henter).to.equal(false);
            });
        });

        describe('Sykeforløpmetadata', () => {
            it('Skal hente sykeforloepMetadata dersom sykeforloepMetadata ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentSykeforloepMetadata.calledOnce).to.equal(true);
                expect(props.henter).to.equal(false);
            });

            it('Skal ikke hente sykeforloepMetadata dersom sykeforloepMetadata er hentet', () => {
                state.sykeforloepMetadata.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });

            it('Skal ikke hente sykeforloepMetadata dersom sykeforloepMetadata hentes nå', () => {
                state.sykeforloepMetadata.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(true);
            });

            it('Skal ikke hente sykeforloepMetadata dersom henting av sykeforløp har feilet', () => {
                state.sykeforloepMetadata.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(false);
            });
        });

        describe('Oppfølgingsdialoger', () => {
            it('Skal hente oppfolgingsdialogerSagas dersom oppfolgingsdialogerSagas ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentOppfolgingsdialoger.calledOnce).to.equal(true);
                expect(props.henter).to.equal(false);
            });

            it('Skal ikke hente oppfolgingsdialogerSagas dersom oppfolgingsdialogerSagas er hentet', () => {
                state.oppfolgingsdialoger.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentOppfolgingsdialoger.called).to.equal(false);
                expect(props.henter).to.equal(false);
            });

            it('Skal ikke hente oppfolgingsdialogerSagas dersom oppfolgingsdialogerSagas hentes nå', () => {
                state.oppfolgingsdialoger.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentOppfolgingsdialoger.called).to.equal(false);
                expect(props.henter).to.equal(true);
            });

            it('Skal ikke hente oppfolgingsdialogerSagas dersom henting av sykeforløp har feilet', () => {
                state.oppfolgingsdialoger.hentingFeilet = true;
                state.oppfolgingsdialoger.hentet = false;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentOppfolgingsdialoger.called).to.equal(false);
                expect(props.henter).to.equal(false);
            });
        });

        describe('Ledetekster', () => {
            it('Skal returnere henter = true dersom ledetekster hentes', () => {
                state.ledetekster.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter).to.equal(true);
            });
        });
    });

    describe('mapStateToProps', () => {
        describe('harDialogmote', () => {
            it('Skal være true hvis bruker har dialogmøte', () => {
                state.mote.data = {};
                const props = mapStateToProps(state);
                expect(props.harDialogmote).to.equal(true);
            });

            it('Skal være false hvis bruker ikke har dialogmøte', () => {
                state.mote.data = null;
                const props = mapStateToProps(state);
                expect(props.harDialogmote).to.equal(false);
            });

            it('Skal være false hvis henting av dialogmøte har feilet', () => {
                state.mote = {
                    data: null,
                    henter: false,
                    hentingFeilet: true,
                    hentet: true,
                };
                const props = mapStateToProps(state);
                expect(props.harDialogmote).to.equal(false);
            });
        });

        describe('harSykmeldinger', () => {
            it('Skal være true hvis bruker har sykmeldinger', () => {
                state.dineSykmeldinger.data = [{}];
                const props = mapStateToProps(state);
                expect(props.harSykmeldinger).to.equal(true);
            });

            it('Skal være false hvis bruker ikke har sykmeldinger', () => {
                state.dineSykmeldinger.data = [];
                const props = mapStateToProps(state);
                expect(props.harSykmeldinger).to.equal(false);
            });

            it('Skal være false hvis henting av sykmeldinger har feilet', () => {
                state.dineSykmeldinger.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.harSykmeldinger).to.equal(false);
            });
        });

        describe('harSykepengesoknader', () => {
            it('Skal være true hvis bruker har sykepengesoknader', () => {
                state.sykepengesoknader.data = [{}];
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader).to.equal(true);
            });

            it('Skal være false hvis bruker ikke har sykepengesoknader', () => {
                state.sykepengesoknader.data = [];
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader).to.equal(false);
            });

            it('Skal være false hvis henting av sykmeldinger har feilet', () => {
                state.dineSykmeldinger.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.harSykmeldinger).to.equal(false);
            });
        });

        describe('harSykepengesoknader', () => {
            it('Skal være true hvis bruker har sykepengesoknader', () => {
                state.sykepengesoknader.data = [{}];
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader).to.equal(true);
            });

            it('Skal være false hvis bruker ikke har sykepengesoknader', () => {
                state.sykepengesoknader.data = [];
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader).to.equal(false);
            });

            it('Skal være false hvis henting av sykepengesøknader har feilet', () => {
                state.sykepengesoknader.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader).to.equal(false);
            });
        });

        describe('skalViseOppfolgingsdialog', () => {
            it('Skal være false om vi har oppfolgingdialog eller ledere', () => {
                state.oppfolgingsdialoger.data = [];
                state.ledere.data = [];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog).to.equal(false);
            });

            it('Skal være true om vi har leder, men ikke oppfolgingsdialog', () => {
                state.oppfolgingsdialoger.data = [];
                state.ledere.data = [{}];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog).to.equal(true);
            });

            it('Skal være true om vi har en oppfolgingsdialog, men ingen ledere', () => {
                state.oppfolgingsdialoger.data = [{}];
                state.ledere.data = [];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog).to.equal(true);
            });

            it('Skal være true om vi har 1 oppfolgingsdialog og leder', () => {
                state.oppfolgingsdialoger.data = [{}];
                state.ledere.data = [{}];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog).to.equal(true);
            });
        });

        describe('hentingFeilet', () => {
            it('Skal være false om henting av ledetekster var vellykket', () => {
                state.ledetekster.hentingFeilet = false;
                const props = mapStateToProps(state);
                expect(props.hentingFeilet).to.equal(false);
            });

            it('Skal være false om henting av ledetekster feilet', () => {
                state.ledetekster.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.hentingFeilet).to.equal(true);
            });
        });
    });
});
