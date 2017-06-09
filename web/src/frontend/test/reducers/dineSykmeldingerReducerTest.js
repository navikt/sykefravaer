import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import dineSykmeldinger from '../../js/reducers/dineSykmeldinger';
import * as actiontyper from '../../js/actions/actiontyper';
import * as actions from '../../js/actions/dineSykmeldinger_actions';
import * as dinSykmeldingActions from '../../js/actions/dinSykmelding_actions';
import * as brukerActions from '../../js/actions/brukerinfo_actions';


describe('dineSykmeldingerReducer', () => {

    it('håndterer SET_DINE_SYKMELDINGER når man ikke har sykmeldinger fra før', () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = actions.setDineSykmeldinger([{
            pair: ['Trainspotting', '28 Days Later'],
            tally: {Trainspotting: 1}
        }])
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
    });

    it('håndterer SET_DINE_SYKMELDINGER når man har sykmeldinger fra før, ved å kun overskrive properties som finnes', () => {
        const initialState = deepFreeze({
            hentet: false,
            data: [{
                id: 44, 
                fornavn: "Harald",
                etternavn: "R.",
            }, {
                id: 55,
                fornavn: "Sonja",
                etternavn: "Haraldsen"
            }]
        });
        const action = actions.setDineSykmeldinger([{
            id: 44,
            fornavn: "Harald",
            etternavn: "R",
            diagnose: "Forkjølet"
        }, {
            id: 55,
            fornavn: "Sonja",
            etternavn: "Haraldsen"
        }])
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 44,
                fornavn: "Harald",
                etternavn: "R",
                diagnose: "Forkjølet",
            }, {
                id: 55, 
                fornavn: "Sonja",
                etternavn: "Haraldsen"
            }],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
    });

    it("Håndterer HENTER_DINE_SYKMELDINGER når man ikke har data fra før", () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = actions.henterDineSykmeldinger();
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
            hentet: false,
        });
    });

    it("Håndterer HENTER_DINE_SYKMELDINGER når man har data fra før", () => {
        const initialState = deepFreeze({
            data: [{
                id: 77, 
            }, {
                id: 6789
            }]
        });
        const action = actions.henterDineSykmeldinger();
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [{
                id: 77, 
            }, {
                id: 6789
            }],
            henter: true,
            hentet: false,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENT_DINE_SYKMELDINGER_FEILET", () => {
        const initialState = deepFreeze({
            hentet: true,
        });
        const action = actions.hentDineSykmeldingerFeilet();
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: true,
            hentet: false,
        });
    });

    it("håndterer SET_SORTERING dersom man ikke har sortering fra før", () => {
        const initialState = deepFreeze({});
        const action = actions.sorterSykmeldinger("arbeidsgiver", "tidligere");
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: {
                tidligere: "arbeidsgiver"
            }
        });
    });

    it("håndterer SET_SORTERING dersom man har sortering fra før", () => {
        const initialState = deepFreeze({
            sortering: {
                tidligere: "dato"
            }
        });
        const action = actions.sorterSykmeldinger("arbeidsgiver", "tidligere");
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: {
                tidligere: "arbeidsgiver"
            }
        });
    });

    it("håndterer SET_SORTERING dersom man har sortering fra før, men ikke for den innsendte statusen", () => {
        const initialState = deepFreeze({
            sortering: {
                tidligere: "dato"
            }
        });
        const action = actions.sorterSykmeldinger("arbeidsgiver", "nye");
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: {
                tidligere: "dato",
                nye: "arbeidsgiver"
            }
        });
    });


    it('håndterer SET_ARBEIDSSITUASJON', () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        });
        const action = dinSykmeldingActions.setArbeidssituasjon("test", 23);
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                valgtArbeidssituasjon: 'test'
            }, {
                id: 24,
            }]
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
        const action = dinSykmeldingActions.sykmeldingBekreftet(23);
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sender: false,
            sendingFeilet: false,
            data: [{
                id: 23,
                status: 'BEKREFTET',
            }, {
                id: 24,
            }]
        });        
    });

    it("Håndterer AVBRYTER_SYKMELDING", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        });
        const action = dinSykmeldingActions.avbryterSykmelding();
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
            }, {
                id: 24,
            }],
            avbryter: true,
            avbrytFeilet: false,
        });           
    });

    it("Håndterer SYKMELDING_AVBRUTT", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }],
        });
        const action = dinSykmeldingActions.sykmeldingAvbrutt(23);
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                status: 'AVBRUTT'
            }, {
                id: 24,
            }],
            avbryter: false,
            avbrytFeilet: false,
        });        
    });

    it("Håndterer AVBRYT_SYKMELDING_FEILET", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }],
            avbryter: true
        });
        const action = dinSykmeldingActions.avbrytSykmeldingFeilet();
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
            }, {
                id: 24,
            }],
            avbryter: false,
            avbrytFeilet: true,
        });        
    });


    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen ikke er feilaktig fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24
            }]
        });
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", true);
        const nextState = dineSykmeldinger(initialState, action);

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
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", false);

        const nextState = dineSykmeldinger(initialState, action);

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
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", true);

        const nextState = dineSykmeldinger(initialState, action);

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
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", false);

        const nextState = dineSykmeldinger(initialState, action);

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
        const action = dinSykmeldingActions.setFeilaktigOpplysning(23, "periode", true);

        const nextState = dineSykmeldinger(initialState, action);

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
        const action = dinSykmeldingActions.setOpplysningeneErRiktige(23, true);

        const nextState = dineSykmeldinger(initialState, action);

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
        const action2 = dinSykmeldingActions.setOpplysningeneErRiktige(23, false);

        const nextState2 = dineSykmeldinger(initialState2, action2);

        expect(nextState2).to.deep.equal({
            data: [{
                id: 23,
                opplysningeneErRiktige: false,
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer BRUKER_ER_UTLOGGET", () => {
        const initialState = deepFreeze({
            data: [{id: "5566"}],
            henter: false,
            hentingFeilet: false
        });
        const action = brukerActions.setErUtlogget();
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: []
        })
    });

    it("Håndterer SYKMELDING_SENDT", () => {
        const initialState = deepFreeze({
            data: [{id: 56}],
            henter: false,
            hentingFeilet: false
        });
        const action = dinSykmeldingActions.sykmeldingSendt(56);
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [{
                id: 56,
                status: 'SENDT',
            }],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false
        });
    });
}); 