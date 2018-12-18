import chai from 'chai';
import React from 'react';
import * as router from 'react-router';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import deepFreeze from 'deep-freeze';
import { Container, mapStateToProps } from '../../js/sider/LandingssideSide';
import getSykmelding from '../mock/mockSykmeldinger';
import brukerinfo from '../../js/reducers/brukerinfo';
import { REDIRECT_ETTER_LOGIN } from '../../js/gateway-api/gatewayApi';

chai.use(chaiEnzyme());
const expect = chai.expect;

const storage = {};
const localStorage = {};
localStorage.getItem = (key) => {
    return storage[key];
};
localStorage.setItem = (key, value) => {
    storage[key] = value;
};

localStorage.removeItem = (a) => {
    storage[a] = undefined;
};

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

        window.localStorage = localStorage;
    });

    describe('Henting av data', () => {
        describe('Møte', () => {
            it('Skal hente møte om møte ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentMote.calledOnce)
                    .to
                    .equal(true);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter om møte er hentet', () => {
                state.mote.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter til true om mote hentes nå', () => {
                state.mote.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(true);
            });

            it('Skal sette henter om henting av møte feilet', () => {
                state.mote.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });
        });

        describe('Møtebehov', () => {
            it('Skal hente møtebehov om møte ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentMotebehov.calledOnce)
                    .to
                    .equal(true);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter om møtebehov er hentet', () => {
                state.motebehov.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter møtebehov om hentes nå', () => {
                state.motebehov.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(true);
            });

            it('Skal sette henter om henting av møtebehov feilet', () => {
                state.motebehov.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });
        });

        describe('Sykepengesøknader', () => {
            it('Skal hente sykepengesøknader dersom sykepengesøknader ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentSykepengesoknader.calledOnce)
                    .to
                    .equal(true);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter dersom sykepengesøknader er hentet', () => {
                state.sykepengesoknader.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter sykepengesøknader hentes nå', () => {
                state.sykepengesoknader.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(true);
            });

            it('Skal sette henter dersom henting av sykepengesøknader har feilet', () => {
                state.sykepengesoknader.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });
        });

        describe('Søknader', () => {
            it('Skal hente søknader dersom søknader ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentSoknader.calledOnce)
                    .to
                    .equal(true);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter til false dersom søknader er hentet', () => {
                state.soknader.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter til true dersom søknader hentes nå', () => {
                state.soknader.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(true);
            });

            it('Skal sette henter til false dersom henting av søknader har feilet', () => {
                state.soknader.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });
        });

        describe('Ledere', () => {
            it('Skal hente ledere dersom ledere ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentLedere.calledOnce)
                    .to
                    .equal(true);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal ikke hente ledere dersom ledere er hentet', () => {
                state.ledere.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentLedere.called)
                    .to
                    .equal(false);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal ikke hente ledere dersom ledere hentes nå', () => {
                state.ledere.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentLedere.called)
                    .to
                    .equal(false);
                expect(props.henter)
                    .to
                    .equal(true);
            });

            it('Skal ikke hente ledere dersom henting av ledere har feilet', () => {
                state.ledere.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentLedere.called)
                    .to
                    .equal(false);
                expect(props.henter)
                    .to
                    .equal(false);
            });
        });

        describe('Dine sykmeldinger', () => {
            it('Skal hente dineSykmeldinger', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentDineSykmeldinger.calledOnce)
                    .to
                    .equal(true);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter til false dersom sykmeldinger er hentet', () => {
                state.dineSykmeldinger.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal sette henter til true dersom dineSykmeldinger hentes nå', () => {
                state.dineSykmeldinger.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(true);
            });

            it('Skal sette henter til false dersom dineSykmeldinger har feilet', () => {
                state.dineSykmeldinger.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });
        });

        describe('Sykeforløp', () => {
            it('Skal hente sykeforloep', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentSykeforloep.calledOnce)
                    .to
                    .equal(true);
                expect(props.henter)
                    .to
                    .equal(false);
            });
        });

        describe('Sykeforløpmetadata', () => {
            it('Skal hente sykeforloepMetadata dersom sykeforloepMetadata ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentSykeforloepMetadata.calledOnce)
                    .to
                    .equal(true);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal ikke hente sykeforloepMetadata dersom sykeforloepMetadata er hentet', () => {
                state.sykeforloepMetadata.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal ikke hente sykeforloepMetadata dersom sykeforloepMetadata hentes nå', () => {
                state.sykeforloepMetadata.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(true);
            });

            it('Skal ikke hente sykeforloepMetadata dersom henting av sykeforløp har feilet', () => {
                state.sykeforloepMetadata.hentingFeilet = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(false);
            });
        });

        describe('Oppfølgingsdialoger', () => {
            it('Skal hente oppfolgingsdialogerSagas dersom oppfolgingsdialogerSagas ikke er hentet', () => {
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentOppfolgingsdialoger.calledOnce)
                    .to
                    .equal(true);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal ikke hente oppfolgingsdialogerSagas dersom oppfolgingsdialogerSagas er hentet', () => {
                state.oppfolgingsdialoger.hentet = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentOppfolgingsdialoger.called)
                    .to
                    .equal(false);
                expect(props.henter)
                    .to
                    .equal(false);
            });

            it('Skal ikke hente oppfolgingsdialogerSagas dersom oppfolgingsdialogerSagas hentes nå', () => {
                state.oppfolgingsdialoger.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentOppfolgingsdialoger.called)
                    .to
                    .equal(false);
                expect(props.henter)
                    .to
                    .equal(true);
            });

            it('Skal ikke hente oppfolgingsdialogerSagas dersom henting av sykeforløp har feilet', () => {
                state.oppfolgingsdialoger.hentingFeilet = true;
                state.oppfolgingsdialoger.hentet = false;
                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);
                expect(hentOppfolgingsdialoger.called)
                    .to
                    .equal(false);
                expect(props.henter)
                    .to
                    .equal(false);
            });
        });

        describe('Ledetekster', () => {
            it('Skal returnere henter = true dersom ledetekster hentes', () => {
                state.ledetekster.henter = true;
                const props = mapStateToProps(deepFreeze(state));
                expect(props.henter)
                    .to
                    .equal(true);
            });
        });
    });

    describe('mapStateToProps', () => {
        describe('harDialogmote', () => {
            it('Skal være true hvis bruker har dialogmøte', () => {
                state.mote.data = {};
                const props = mapStateToProps(state);
                expect(props.harDialogmote)
                    .to
                    .equal(true);
            });

            it('Skal være false hvis bruker ikke har dialogmøte', () => {
                state.mote.data = null;
                const props = mapStateToProps(state);
                expect(props.harDialogmote)
                    .to
                    .equal(false);
            });

            it('Skal være false hvis henting av dialogmøte har feilet', () => {
                state.mote = {
                    data: null,
                    henter: false,
                    hentingFeilet: true,
                    hentet: true,
                };
                const props = mapStateToProps(state);
                expect(props.harDialogmote)
                    .to
                    .equal(false);
            });
        });

        describe('harSykmeldinger', () => {
            it('Skal være true hvis bruker har sykmeldinger', () => {
                state.dineSykmeldinger.data = [{}];
                const props = mapStateToProps(state);
                expect(props.harSykmeldinger)
                    .to
                    .equal(true);
            });

            it('Skal være false hvis bruker ikke har sykmeldinger', () => {
                state.dineSykmeldinger.data = [];
                const props = mapStateToProps(state);
                expect(props.harSykmeldinger)
                    .to
                    .equal(false);
            });

            it('Skal være false hvis henting av sykmeldinger har feilet', () => {
                state.dineSykmeldinger.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.harSykmeldinger)
                    .to
                    .equal(false);
            });
        });

        describe('harSykepengesoknader', () => {
            it('Skal være true hvis bruker har sykepengesoknader', () => {
                state.sykepengesoknader.data = [{}];
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader)
                    .to
                    .equal(true);
            });

            it('Skal være false hvis bruker ikke har sykepengesoknader', () => {
                state.sykepengesoknader.data = [];
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader)
                    .to
                    .equal(false);
            });

            it('Skal være false hvis henting av sykmeldinger har feilet', () => {
                state.dineSykmeldinger.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.harSykmeldinger)
                    .to
                    .equal(false);
            });
        });

        describe('harSykepengesoknader', () => {
            it('Skal være true hvis bruker har sykepengesoknader', () => {
                state.sykepengesoknader.data = [{}];
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader)
                    .to
                    .equal(true);
            });

            it('Skal være false hvis bruker ikke har sykepengesoknader', () => {
                state.sykepengesoknader.data = [];
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader)
                    .to
                    .equal(false);
            });

            it('Skal være false hvis henting av sykepengesøknader har feilet', () => {
                state.sykepengesoknader.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.harSykepengesoknader)
                    .to
                    .equal(false);
            });
        });

        describe('skalViseOppfolgingsdialog', () => {
            let clock;
            let getSykmeldingMedTomDato;
            let utgaattSykmelding;
            let fremtidigSykmelding;
            let fremtidigSykmeldingUtenArbeidsgiver;
            let sykmeldingSomErUtgaattForMindreEnnFireManederSiden;
            let sykmeldingSomNettoppErUtgaatt;

            beforeEach(() => {
                clock = sinon.useFakeTimers(new Date('2018-05-01').getTime());
                getSykmeldingMedTomDato = (tomdato) => {
                    const fom = new Date(tomdato);
                    fom.setDate(fom.getTime() - 18);
                    return getSykmelding({
                        orgnummer: '123',
                        mulighetForArbeid: {
                            perioder: [{
                                fom,
                                tom: tomdato,
                            }],
                        },
                    });
                };

                utgaattSykmelding = getSykmeldingMedTomDato(new Date('2017-12-22'));
                fremtidigSykmelding = getSykmeldingMedTomDato(new Date('2018-06-13'));
                fremtidigSykmeldingUtenArbeidsgiver = getSykmeldingMedTomDato(new Date('2018-06-13'));
                fremtidigSykmeldingUtenArbeidsgiver.orgnummer = null;
                sykmeldingSomErUtgaattForMindreEnnFireManederSiden = getSykmeldingMedTomDato(new Date('2018-01-01'));
                sykmeldingSomNettoppErUtgaatt = getSykmeldingMedTomDato(new Date('2017-31-12'));
            });

            afterEach(() => {
                clock.restore();
            });

            it('Skal være true om vi har en oppfolgingsdialog, men ingen sykmeldinger', () => {
                state.oppfolgingsdialoger.data = [{}];
                state.dineSykmeldinger.data = [];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog)
                    .to
                    .equal(true);
            });

            it('Skal være true om vi har ingen oppfolgingsdialogerSagas, men en sykmelding som gikk ut for mindre enn fire måneder siden', () => {
                state.dineSykmeldinger.data = [utgaattSykmelding, sykmeldingSomErUtgaattForMindreEnnFireManederSiden];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog)
                    .to
                    .equal(true);
            });

            it('Skal være false om vi har ingen oppfolgingsdialogerSagas, men en sykmelding som gikk ut for fire måneder og én dag siden', () => {
                state.dineSykmeldinger.data = [utgaattSykmelding, sykmeldingSomNettoppErUtgaatt];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog)
                    .to
                    .equal(false);
            });

            it('Skal være false om det finnes fremtidig sykmelding uten arbeidsgiver', () => {
                state.dineSykmeldinger.data = [fremtidigSykmeldingUtenArbeidsgiver];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog)
                    .to
                    .equal(false);
            });

            it('Skal være true om det finnes fremtidig sykmelding med arbeidsgiver', () => {
                state.dineSykmeldinger.data = [fremtidigSykmelding];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog)
                    .to
                    .equal(true);
            });

            it('Skal være false om det eksisterer 1 sykmelding uten orgnummer', () => {
                state.dineSykmeldinger.data = [fremtidigSykmeldingUtenArbeidsgiver];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog)
                    .to
                    .equal(false);
            });

            it('Skal være false om henting av oppfølgingsdialoger har feilet', () => {
                state.dineSykmeldinger.data = [{
                    orgnummer: '123',
                    mulighetForArbeid: {
                        perioder: [],
                    },
                }];
                state.oppfolgingsdialoger.data = [];
                state.oppfolgingsdialoger.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog)
                    .to
                    .equal(false);
            });

            it('Skal være false om henting av sykmeldinger har feilet', () => {
                state.dineSykmeldinger.data = [];
                state.dineSykmeldinger.hentingFeilet = true;
                state.oppfolgingsdialoger.data = [{}];
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog)
                    .to
                    .equal(false);
            });

            it('Skal være false om henting av ledere har feilet', () => {
                state.dineSykmeldinger.data = [fremtidigSykmelding];
                state.oppfolgingsdialoger.data = [{}];
                state.ledere.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.skalViseOppfolgingsdialog)
                    .to
                    .equal(false);
            });
        });

        describe('hentingFeilet', () => {
            it('Skal være false om henting av ledetekster var vellykket', () => {
                state.ledetekster.hentingFeilet = false;
                const props = mapStateToProps(state);
                expect(props.hentingFeilet)
                    .to
                    .equal(false);
            });

            it('Skal være false om henting av ledetekster feilet', () => {
                state.ledetekster.hentingFeilet = true;
                const props = mapStateToProps(state);
                expect(props.hentingFeilet)
                    .to
                    .equal(true);
            });
        });

        describe('redirect etter innlogging', () => {
            it('Redirecter om en url er satt i localStorage', () => {
                localStorage.setItem(REDIRECT_ETTER_LOGIN, 'www.vg.no');

                const spy = sinon.spy();
                router.browserHistory = { push: spy };

                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);

                expect(spy.withArgs('www.vg.no').calledOnce).to.equal(true);
            });

            it('Redirecter ikke om en url ikke er satt i localStorage', () => {
                localStorage.setItem(REDIRECT_ETTER_LOGIN, undefined);

                const spy = sinon.spy();
                router.browserHistory = { push: spy };

                const props = mapStateToProps(deepFreeze(state));
                shallow(<Container {...props} actions={actions} />);

                expect(spy.withArgs('www.vg.no').notCalled).to.equal(true);
            });
        });
    });
});
