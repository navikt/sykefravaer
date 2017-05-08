import {List, Map, fromJS} from 'immutable';
import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import * as actiontyper from '../../js/actions/actiontyper';
import arbeidsgiversSykmeldinger from '../../js/reducers/arbeidsgiversSykmeldinger';
import * as arbActions from '../../js/actions/arbeidsgiversSykmeldinger_actions';
import * as dsActions from '../../js/actions/dinSykmelding_actions';
import * as brukerActions from '../../js/actions/brukerinfo_actions';

describe('arbeidsgiversSykmeldinger', () => {

    it('håndterer SET_ARBEIDSGIVERS_SYKMELDINGER', () => {
        const initialState = deepFreeze({});
        const action = arbActions.setArbeidsgiversSykmeldinger([{
            pair: ['Trainspotting', '28 Days Later'],
            tally: {Trainspotting: 1}
        }]);
        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }],
            henter: false,
            hentingFeilet: false
        });
    });

    it("Håndterer HENTER_ARBEIDSGIVERS_SYKMELDINGER", () => {
        const initialState = deepFreeze({});
        const action = arbActions.henterArbeidsgiversSykmeldinger();
        const nextState = arbeidsgiversSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET", () => {
        const initialState = deepFreeze({});
        const action = arbActions.hentArbeidsgiversSykmeldingerFeilet();
        const nextState = arbeidsgiversSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: true,
        });
    });

    it("Håndterer SET_ARBEIDSGIVER", () => {
        const initialState = deepFreeze({
            data: [{
                id: 1
            }, {
                id: 2
            }, {
                id: 69
            }],
            hentingFeilet: false,
            henter: false
        });
        const action = dsActions.setArbeidsgiver(69, {
            orgnummer: 12345678,
            navn: "Mosveens Verktøyutleie D/A"
        });
        const nextState = arbeidsgiversSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            hentingFeilet: false,
            henter: false,
            data: [{
                id: 1
            }, {
                id: 2
            }, {
                id: 69,
                valgtArbeidsgiver: {
                    orgnummer: 12345678,
                    navn: "Mosveens Verktøyutleie D/A"
                }
            }]
        })
    });           

    it('håndterer SET_ARBEIDSSITUASJON', () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        });
        const action = dsActions.setArbeidssituasjon("test", 23)
        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                valgtArbeidssituasjon: 'test'
            }, {
                id: 24,
            }]
        });
    });

    it("Håndterer SET_OPPLYSNINGENE_ER_RIKTIGE", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                }
            }, {
                id: 24
            }]
        });
        const action = dsActions.setOpplysningeneErRiktige(23, true);

        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                },
                opplysningeneErRiktige: true,
            }, {
                id: 24
            }]
        });

        const initialState2 = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24
            }]
        });
        const action2 = dsActions.setOpplysningeneErRiktige(23, false);

        const nextState2 = arbeidsgiversSykmeldinger(initialState2, action2);

        expect(nextState2).to.deep.equal({
            data: [{
                id: 23,
                opplysningeneErRiktige: false,
            }, {
                id: 24
            }]
        });
    });

    describe("Bekreft sykmelding", () => {
        it("Håndterer BEKREFTER_SYKMELDING", () => {
            const initialState = deepFreeze({
                data: [],
                henter: false,
                sender: false,
            });
            const action = dsActions.bekrefterSykmelding();
            const nextState = arbeidsgiversSykmeldinger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                sender: true,
                sendingFeilet: false,
            });

        });

        it("Håndterer SYKMELDING_BEKREFTET", () => {
            const initialState = deepFreeze({
                data: [{
                    id: 23,
                }, {
                    id: 24,
                }]
            });
            const action = dsActions.sykmeldingBekreftet(23);
            const nextState = arbeidsgiversSykmeldinger(initialState, action);

            expect(nextState).to.deep.equal({
                data: [{
                    id: 23,
                    status: 'BEKREFTET',
                }, {
                    id: 24,
                }]
            });        
        });

        it("Håndterer BEKREFT_SYKMELDING_FEILET", () => {
            const initialState = deepFreeze({
                data: [{
                    id: 23,
                }, {
                    id: 24,
                }]
            });
            const action = dsActions.bekreftSykmeldingFeilet(23);
            const nextState = arbeidsgiversSykmeldinger(initialState, action);

            expect(nextState).to.deep.equal({
                data: [{
                    id: 23,
                }, {
                    id: 24,
                }],
                sendingFeilet: true,
                sender: false,
                henter: false,
                hentingFeilet: false
            });        
        });

    })

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen ikke er feilaktig fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24
            }]
        });
        const action = dsActions.setFeilaktigOpplysning(23, "periode", true);

        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });

    });


    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen er feilaktig fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });
        const action = dsActions.setFeilaktigOpplysning(23, "periode", false);

        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": false
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen er feilaktig fra før og man prøver å sette den til feilaktig", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });
        const action = dsActions.setFeilaktigOpplysning(23, "periode", true);

        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom den settes til false", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });
        const action = dsActions.setFeilaktigOpplysning(23, "periode", false);

        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": false
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom det finnes en (annen) feilaktig opplysning fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                }
            }, {
                id: 24
            }]
        });
        const action = dsActions.setFeilaktigOpplysning(23, "periode", true);

        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                    "periode": true
                }
            }, {
                id: 24
            }]
        });

    });

    describe("Innsending", () => {

        let sykmelding, action, initialState; 

        beforeEach(() => {
            sykmelding = {
                id: 56,
                valgtArbeidsgiver: {
                    orgnummer: 123456789,
                    navn: "Olsens Sykkelbud"
                }
            };

            initialState = deepFreeze({
                data: [sykmelding],
                henter: false, 
                hentingFeilet: false
            });

            window = window || {};
            window.APP_SETTINGS = {
                REST_ROOT: 'http://tjenester.nav.no/syforest'
            }
        });

        it("Håndterer SENDER_SYKMELDING", () => {
            action = dsActions.senderSykmelding(56);
            const nextState = arbeidsgiversSykmeldinger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [sykmelding],
                henter: false,
                hentingFeilet: false,
                sender: true, 
                sendingFeilet: false
            });
        });

        it("Håndterer SEND_SYKMELDING_FEILET", () => {
            action = dsActions.sendSykmeldingFeilet(56);
            const nextState = arbeidsgiversSykmeldinger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [sykmelding],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: true
            });
        });        

        it("Håndterer SYKMELDING_SENDT", () => {
            action = dsActions.sykmeldingSendt(56, {
                arbeidsgiverForskutterer: true,
            });
            const nextState = arbeidsgiversSykmeldinger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{
                    id: 56,
                    status: 'SENDT',
                    valgtArbeidsgiver: {
                        orgnummer: 123456789,
                        navn: 'Olsens Sykkelbud'
                    },
                    arbeidsgiverForskutterer: true,
                }],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false
            });            
        });
    });

    it("Håndterer BRUKER_ER_UTLOGGET", () => {
        const initialState = deepFreeze({
            data: [{id: "5566"}],
            henter: false,
            hentingFeilet: false
        });
        const action = brukerActions.setErUtlogget();
        const nextState = arbeidsgiversSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: []
        })
    })

});
